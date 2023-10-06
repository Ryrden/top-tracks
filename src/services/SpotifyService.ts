import SpotifyWebApi from "spotify-web-api-js";
import axios, { AxiosResponse } from "axios";
import { Track } from "../models/TrackModel";
import { UserTopTrack } from "@/models/UserTopTrack";

// get env from next.config.js
const client_id = process.env.CLIENT_ID || ""; // Your client id
const client_secret = process.env.CLIENT_SECRET || ""; // Your secret
const redirect_uri = process.env.REDIRECT_URI || ""; // Your redirect uri

export const spotifyApi = new SpotifyWebApi();

export const setAccessToken= (token: string) => {
	spotifyApi.setAccessToken(token);
}

const generateRandomString = (length: number): string => {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const getAuthorizationUrl = (): string => {
    const state = generateRandomString(16);
    // Store the state securely in a session or database for later verification
    // For now, we'll just generate it and include it in the URL
    return (
        "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
            response_type: "code",
            client_id: client_id,
            scope:
                "user-read-private user-read-email user-top-read user-follow-read",
            redirect_uri: redirect_uri,
            state: state,
        })
    );
};

export const getTokenFromCode = async (code: string): Promise<string | null> => {
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        data: new URLSearchParams({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: "authorization_code",
        }).toString(),
    };

    try {
        const response = await axios(authOptions);
        return response.data.access_token || null;
    } catch (error) {
        console.error("Error getting access token:", error);
        return null;
    }
};

export const getTopTracks = async (accessToken: string): Promise<UserTopTrack[]> => {
    try {
        spotifyApi.setAccessToken(accessToken);
        const response = await spotifyApi.getMyTopTracks({ limit: 25 });
        const topMusics: any = response.items.map((item: any) => {
            const artists: string[] = item.artists.map((artist: any) => {
                return artist.name;
            });
            const allArtists = artists.join(", ");
            return {
                name: item.name,
                artists: allArtists,
                cover: item.album.images[0].url,
            };
        });
        return topMusics;
    } catch (error) {
        console.error("Error fetching top tracks:", error);
        return [];
    }
};

export const refreshToken = async (refreshToken: string): Promise<string | null> => {
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        data: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }).toString(),
    };

    try {
        const response = await axios(authOptions);
        return response.data.access_token || null;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};

// const stateKey = "spotify_auth_state";
// export const Callback: RequestHandler = (req, res) => {
//     const getTopMusicsFromUser: RequestCallback = (error, response, body) => {
//         if (!error && response.statusCode === 200) {
//             const access_token = body.access_token;

//             axios
//                 .get("https://api.spotify.com/v1/me/top/tracks?limit=25", {
//                     headers: {
//                         Authorization: `Bearer ${access_token}`,
//                     },
//                 })
//                 .then((response: AxiosResponse) => {
//                     const topMusics = response.data.items.map((item: Track) => {
//                         const artists: string[] = item.artists.map((artist) => {
//                             return artist.name;
//                         });
//                         const allArtistis = artists.join(", ");
//                         return {
//                             name: item.name,
//                             artists: allArtistis,
//                             cover: item.album.images[0].url,
//                         };
//                     });
//                     res.render("home", { data: topMusics });
//                 })
//                 .catch((err) => {
//                     return new Error("Something went wrong: " + err);
//                 });
//         } else {
//             return new Error("Something went wrong: " + "invalid_token");
//         }
//     };
//     // your application requests refresh and access tokens
//     // after checking the state parameter

//     const code = req.query.code || null;
//     const state = req.query.state || null;
//     const storedState = req.cookies ? req.cookies[stateKey] : null;

//     if (state === null || state !== storedState) {
//         return new Error("Something went wrong: " + "state_mismatch");
//     } else {
//         res.clearCookie(stateKey);
//         const authOptions = {
//             url: "https://accounts.spotify.com/api/token",
//             form: {
//                 code: code,
//                 redirect_uri: redirect_uri,
//                 grant_type: "authorization_code",
//             },
//             headers: {
//                 Authorization:
//                     "Basic " +
//                     Buffer.from(client_id + ":" + client_secret).toString(
//                         "base64"
//                     ),
//             },
//             json: true,
//         };

//         request.post(authOptions, getTopMusicsFromUser);
//     }
// };

// export const RefreshToken: RequestHandler = (req, res) => {
//     const func: RequestCallback = (error, response, body) => {
//         if (!error && response.statusCode === 200) {
//             const access_token = body.access_token;
//             res.send({
//                 access_token: access_token,
//             });
//         }
//     };

//     // requesting access token from refresh token
//     const refresh_token = req.query.refresh_token;
//     const authOptions = {
//         url: "https://accounts.spotify.com/api/token",
//         headers: {
//             Authorization:
//                 "Basic " +
//                 Buffer.from(client_id + ":" + client_secret).toString("base64"),
//         },
//         form: {
//             grant_type: "refresh_token",
//             refresh_token: refresh_token,
//         },
//         json: true,
//     };

//     request.post(authOptions, func);
// };
