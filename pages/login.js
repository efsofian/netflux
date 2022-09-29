import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import magic from "../lib/magic-client";
import { useState, useEffect } from "react";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const handleOnChange = (e) => {
		setMsg("");
		setEmail(e.target.value);
	};
	const handleLoginWithEmail = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (email) {
			try {
				const didToken = await magic.auth.loginWithMagicLink({ email });
				if (didToken) {
					const response = await fetch("/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${didToken}`,
						},
					});
					const loggedResponse = await response.json();
					if (loggedResponse.done) {
						console.log({ loggedResponse });
						router.push("/");
					} else {
						setIsLoading(false);
						setUserMsg("Something went wrong logging in");
					}
				}
			} catch (e) {
				console.error(e);
				setIsLoading(false);
			}
		} else {
			setIsLoading(false);
			setMsg("enter a valid email address");
		}
	};

	const handleComplete = () => {
		setIsLoading(false);
	};

	useEffect(() => {
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);
		return () => {
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, []);
	return (
		<div className={styles.container}>
			<Head>
				<title>Netflix SignIn</title>
			</Head>
			<header className={styles.header}>
				<div className={styles.headerWrapper}>
					<Link className={styles.logoLink} href="/">
						<div className={styles.logoWrapper}>
							<Image
								src="/static/netflix.svg"
								alt="netflix logo"
								height="34px"
								width="128px"
							/>
						</div>
					</Link>
				</div>
			</header>
			<main className={styles.main}>
				<div className={styles.mainWrapper}>
					<h1 className={styles.signinHeader}>Sign In</h1>
					<input
						type="text"
						placeholder="Email address"
						className={styles.emailInput}
						onChange={handleOnChange}
					/>
					<p className={styles.userMsg}>{msg}</p>
					<button onClick={handleLoginWithEmail} className={styles.loginBtn}>
						{isLoading ? "Loading..." : "Sign In"}
					</button>
				</div>
			</main>
		</div>
	);
};

export default LoginPage;
