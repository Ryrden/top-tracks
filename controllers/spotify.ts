import { Request, Response } from "express";
import querystring from "querystring";
import request from "request";
import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
import { Track } from "../models/TrackModel";

dotenv.config();

const client_id = process.env.CLIENT_ID || ""; // Your client id
const client_secret = process.env.CLIENT_SECRET || ""; // Your secret
const redirect_uri = process.env.REDIRECT_URI || ""; // Your redirect uri

const generateRandomString = (length: number): string => {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const Authorization = (req: Request, res: Response): void => {
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
export const Callback = (req: Request, res: Response): void => {
    const getTopMusicsFromUser: any = (error: any, response: Response, body: any ): void => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            const refresh_token = body.refresh_token;

            axios
                .get("https://api.spotify.com/v1/me/top/tracks?limit=25", {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response: AxiosResponse) => {
                    const topMusics = response.data.items.map((item: Track) => {
                        const artists: string[] = item.artists.map((artist) => {
                            return artist.name;
                        });
                        const allArtistis = artists.join(", ");
                        return {
                            name: item.name,
                            artists: allArtistis,
                            cover: item.album.images[0].url,
                        };
                    });
                    res.render("home", { data: topMusics });
                })
                .catch((err) => {
                    const {status, data} = err.response;
                    console.log(status, data);
                });
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

export const RefreshToken = (req: Request, res: Response): void => {
    const func: any = (error: any, response: Response, body: any): void => {
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
