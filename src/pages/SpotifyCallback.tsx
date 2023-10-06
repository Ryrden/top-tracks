import { useEffect } from "react";
import { useRouter } from "next/router";
import { getTokenFromCode } from "../services/SpotifyService";

function SpotifyCallback() {
    const router = useRouter();

    useEffect(() => {
        // Obtain the authorization code from the query parameters
        const { code } = router.query;

        if (code) {
            // Use the code to obtain the access token
            getTokenFromCode(code as string)
                .then((accessToken) => {
                    if (accessToken) {
                        // Store the access token (e.g., in local storage)
                        localStorage.setItem("access_token", accessToken);
                        // Redirect to the desired page (e.g., the home page)
                        router.push("/TopTracks");
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
    }, [router]);

    return <div>Processing...</div>;
}

export default SpotifyCallback;
