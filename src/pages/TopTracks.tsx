import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getTopTracks} from "../services/SpotifyService";
import {UserTopTrack} from "@/models/UserTopTrack";
import Image from "next/image";

export default function TopTracks() {
	const router = useRouter();
	const [topTracks, setTopTracks] = useState<UserTopTrack[]>([]);

	useEffect(() => {
		// Fetch top tracks when the page loads
		const fetchData = async () => {
			const accessToken = localStorage.getItem("access_token");
			if (!accessToken) {
				// Redirect to login if the access token is not available
				router.push("/");
				return;
			}

			const tracks = await getTopTracks(accessToken);
			setTopTracks(tracks);
			console.log(tracks);
		};

		fetchData();
	}, [router]);

	return (
		<>
			<h1 className="text-5xl">Your Top Tracks</h1>
			<div className="flex">
				{topTracks.map((track: UserTopTrack, index) => (
					<span key={index} className="text-center">
						{/* <Image src={track.cover} alt={track.name} width={300} height={300} /> */}
						<p className="mt-2">{track.name}</p>
					</span>
				))}
			</div>
		</>
	);
}
