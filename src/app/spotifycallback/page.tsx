"use client";

import {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {getTokenFromCode} from "../../services/SpotifyService";

function SpotifyCallback() {
	const navigation = useRouter();
	const params = useSearchParams();

	useEffect(() => {
		// Obtain the authorization code from the query parameters
		const code = params.get("code");

		if (code) {
			// Use the code to obtain the access token
			getTokenFromCode(code as string)
				.then((accessToken) => {
					if (accessToken) {
						// Store the access token (e.g., in local storage)
						localStorage.setItem("access_token", accessToken);
						// Redirect to the desired page (e.g., the home page)
						navigation.push("/toptracks");
					} else {
						// Handle the case where access token retrieval fails
						// You can redirect to an error page or display an error message
					}
				})
				.catch((error) => {
					console.error("Error getting access token:", error);
					// Handle the error appropriately (e.g., show an error message)
				});
		}
	}, [params, navigation]);

	return (
		<main className="flex flex-col items-center py-16">
			<h1 className="text-xl">Processing...</h1>
		</main>
	);
}

export default SpotifyCallback;
