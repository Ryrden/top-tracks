"use client";

import {useRouter} from "next/navigation"; // Import from next/navigation
import {getAuthorizationUrl, getTokenFromCode} from "../services/SpotifyService";
import Button from "@/components/Button";
import Image from "next/image";

export default function Home() {
	const navigation = useRouter(); // Use useNavigation() from next/navigation

	const handleClick = async () => {
		// Generate the Spotify authorization URL
		const authorizationUrl = getAuthorizationUrl();

		// Redirect the user to Spotify for authentication
		navigation.push(authorizationUrl, {scroll: false});
	};

	return (
		<main className="flex flex-col items-center py-16">
			<span id="logo" className="flex flex-col items-center justify-center">
				<Image src="/Spotify_Logo_RGB_Green.png" alt="Spotify Logo" width={150} height={150} className="mb-2"/>
				<h1 className="text-5xl">Top Tracks</h1>
			</span>
			<h2 className="text-lg mt-4">Image Grid Generator</h2>
			<Button variant="primary" className="mt-8" onClick={() => handleClick()}>
				Log in Spotify
			</Button>
		</main>
	);
}
