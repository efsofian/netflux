import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../components/Loading/Loading.component";
import magic from "../lib/magic-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	const [isLoading, setIsLoading] = useState(false); // true
	const router = useRouter();

	useEffect(() => {
		// const asyncMetaFetcher = async () => {
		// 	try {
		// 		const isLoggedIn = await magic.user.isLoggedIn();
		// 		if (isLoggedIn) {
		// 			router.push("/");
		// 		} else {
		// 			router.push("/login");
		// 		}
		// 	} catch (e) {}
		// };
		// asyncMetaFetcher();
	}, []);

	useEffect(() => {
		const handleComplete = () => {
			setIsLoading(false);
		};

		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);
		return () => {
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, [router]);

	return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
