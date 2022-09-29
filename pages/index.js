import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner/Banner.component";
import Navbar from "../components/Navbar/Navbar.component";
import SectionCards from "../components/Card/SectionCard.component";
import Card from "../components/Card/Card.component";
import styles from "../styles/Home.module.css";
import { getPopularVideos, getVideos } from "../lib/transfVideos";

export default function Home({
	disneyVideos,
	productivityVideos,
	travelVideos,
	popularVideos,
}) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Netflux</title>
				<meta name="description" content="netflix video movies" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.main}>
				<Navbar />
				<Banner
					title="Cliff the dog"
					subTitle="a very cute dog"
					imgUrl="/static/clifford.webp"
					videoId="4zH5iYM4wJo"
				/>
				<div className={styles.sectionWrapper}>
					<SectionCards title="Disney" videos={disneyVideos} size="large" />
					<SectionCards title="Travel" videos={travelVideos} size="small" />
					<SectionCards
						title="Productivity"
						videos={productivityVideos}
						size="medium"
					/>
					<SectionCards title="Popular" videos={popularVideos} size="small" />
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	const disneyVideos = await getVideos("disney trailer");
	const productivityVideos = await getVideos("Productivity");
	const travelVideos = await getVideos("travel");
	const popularVideos = await getPopularVideos();

	// const popularVideos = await getVideos("disney trailer");
	return {
		props: {
			disneyVideos,
			productivityVideos,
			travelVideos,
			popularVideos,
		},
	};
}
