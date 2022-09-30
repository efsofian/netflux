import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";
import magic from "../../lib/magic-client";

const Navbar = () => {
	const router = useRouter();
	const [showDropdown, setShowDropdown] = useState(false);
	const [username, setUsername] = useState("");
	const [didToken, setDidToken] = useState("");
	const handleOnClickHome = (e) => {
		e.preventDefault();
		router.push("/");
	};
	const handleOnClickMyList = (e) => {
		e.preventDefault();
		router.push("/browse/my-list");
	};
	const handleDropdown = (e) => {
		setShowDropdown((oldState) => !oldState);
	};
	const handleSignOut = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/logout", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${didToken}`,
					"Content-Type": "application/json",
				},
			});
			const res = await response.json();
		} catch (e) {
			console.error(`error loggin out :${e}`);
			router.push("/login");
		}
	};

	useEffect(() => {
		const asyncMetaFetcher = async () => {
			try {
				const { email, issuer, publicAddress } = await magic.user.getMetadata();
				const dtk = await magic.user.getIdToken();
				setDidToken(dtk);
				if (email) {
					setUsername(email);
				}
			} catch (e) {
				console.error(`error retrieving email :${e}`);
			}
		};
		asyncMetaFetcher();
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
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

				<ul className={styles.navItems}>
					<li className={styles.navItem} onClick={handleOnClickHome}>
						Home
					</li>
					<li className={styles.navItem2} onClick={handleOnClickMyList}>
						My List
					</li>
				</ul>
				<nav className={styles.navContainer}>
					<div>
						<button className={styles.usernameBtn} onClick={handleDropdown}>
							<p className={styles.username}>{username}</p>
							<Image
								src="/static/expand.svg"
								alt="expand dropdown"
								height="16px"
								width="16px"
							/>
						</button>
						{showDropdown && (
							<div className={styles.navDropdown}>
								<div>
									<a onClick={handleSignOut} className={styles.linkName}>
										Sign Out
									</a>

									<div className={styles.lineWrapper}></div>
								</div>
							</div>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
