"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getTopTracks} from "../../services/SpotifyService";
import {UserTopTrack} from "@/models/UserTopTrack";
import Button from "@/components/Button";
import Image from "next/image";
import html2canvas from "html2canvas";

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

	const downloadImage = () => {
		// download a screenshot of the div
		const imageGrid = document.querySelector<HTMLElement>("#imageGrid");
		const options: any = {
			backgroundColor: "black",
			useCORS: true,
			scale: 2,
		};
		if (imageGrid) {
			window.scrollTo(0, 0);
			html2canvas(imageGrid, options).then((canvas) => {
				const a = document.createElement("a");
				a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
				a.download = "top-tracks.jpg";
				a.click();
			});
		}
	};

	return (
		<main className="flex flex-col items-center py-16">
			<h1 className="text-4xl mb-8">Yours Top Tracks</h1>
			<div id="imageGrid" className="grid grid-cols-[repeat(5,minmax(3rem,1fr))] xs:mx-4 md:mx-16">
				{topTracks.map((track, index) => (
					<div key={index} className="relative">
						<p className="xs:text-[0.35rem] sm:text-[0.65rem] md:text-[0.70rem] font-outline-2 text-white absolute top-0 left-0 p-[0.5px]">
							{track.name}
						</p>
						<Image src={track.cover} alt={track.name} width={150} height={150} />
					</div>
				))}
			</div>
			{/* A button to download the entire div above */}
			<Button variant="primary" className="mt-8" onClick={() => downloadImage()}>
				Download
			</Button>
		</main>
	);
}
