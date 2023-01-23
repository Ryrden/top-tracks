import { Request, Response } from "express";
import querystring from "querystring";
import request from "request";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const client_id = process.env.CLIENT_ID || ""; // Your client id
const client_secret = process.env.CLIENT_SECRET || ""; // Your secret
const redirect_uri = process.env.REDIRECT_URI || ""; // Your redirect uri

const generateRandomString = (length: number) => {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const Authorization = (req: Request, res: Response) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope =
        "user-read-private user-read-email user-top-read user-follow-read";
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
            querystring.stringify({
                response_type: "code",
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state,
            })
    );
};

const stateKey = "spotify_auth_state";
export const Callback = (req: Request, res: Response) => {
    const getTopMusicsFromUser: any = (
        error: any,
        response: Response,
        body: any
    ) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token,
                refresh_token = body.refresh_token;

            const options = {
                url: "https://api.spotify.com/v1/me/top/tracks?limit=10",
                headers: { Authorization: "Bearer " + access_token },
                json: true,
            };

            axios
                .get("https://api.spotify.com/v1/me/top/tracks?limit=25", {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    const topMusics = response.data.items.map((item: any) => {
                        return {
                            name: item.name,
                            cover: item.album.images[0].url,
                        };
                    });
                    res.render("home", { data: topMusics });
                })
                .catch((err) => {
                    console.log(err.response.message);
                });
            // use the access token to access the Spotify Web API
            /* request.get(options, (error: any, response: any, body: any) => {
                //getting the top 10 musics name and cover album
                res.render("home",{data: body});
            });
 */
            // we can also pass the token to the browser to make requests from there
            /* res.redirect(
                "/#" +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token,
                    })
            ); */
        } else {
            res.redirect(
                "/#" +
                    querystring.stringify({
                        error: "invalid_token",
                    })
            );
        }
    };

    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect(
            "/#" +
                querystring.stringify({
                    error: "state_mismatch",
                })
        );
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: "authorization_code",
            },
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(client_id + ":" + client_secret).toString(
                        "base64"
                    ),
            },
            json: true,
        };

        request.post(authOptions, getTopMusicsFromUser);
    }
};

export const RefreshToken = (req: Request, res: Response) => {
    const func: any = (error: any, response: Response, body: any) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                access_token: access_token,
            });
        }
    };

    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization:
                "Basic " +
                Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        },
        json: true,
    };

    request.post(authOptions, func);
};
