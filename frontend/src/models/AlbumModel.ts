import { Artist } from "./ArtistModel";

export type Album = {
    album_type: string;
    artists: Array<Artist>;
    tracks: Array<any>;
    available_markets: Array<string>;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: {
        height: number;
        url: string;
        width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
        reason: string;
    };
    total_tracks: number;
    type: string;
    uri: string;
};
