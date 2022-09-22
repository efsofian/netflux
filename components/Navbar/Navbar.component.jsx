import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

const Navbar = ({ username }) => {
	const router = useRouter();
	const [showDropdown, setShowDropdown] = useState(false);
	const handleOnClickHome = (e) => {
		router.push("/");
	};
	const handleOnClickMyList = (e) => {
		router.push("/browse/my-list");
	};
	const handleDropdown = (e) => {
		setShowDropdown((oldState) => !oldState);
	};
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
									<Link href="/login">
										<a className={styles.linkName}>Sign Out</a>
									</Link>

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
