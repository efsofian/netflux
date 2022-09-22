import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner/Banner.component";
import Navbar from "../components/Navbar/Navbar.component";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Netflux</title>
				<meta name="description" content="netflix video movies" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar username="efsofian@gmail.com" />
			<Banner
				title="Cliff the dog"
				subTitle="a very cute dog"
				imgUrl="/static/clifford.webp"
			/>

			{/* <Card /> */}
		</div>
	);
}
