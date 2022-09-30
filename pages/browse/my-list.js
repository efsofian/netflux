import Head from "next/head";
import SectionCards from "../../components/Card/SectionCard.component";
import Navbar from "../../components/Navbar/Navbar.component";
import { getMyList } from "../../lib/transfVideos";
import styles from "../../styles/MyList.module.css";
import RedirectUser from "../../utils/redirectUser";

const MyList = ({ myListVideos }) => {
	console.log(myListVideos);
	return (
		<div>
			<Head>
				<title>My List</title>
			</Head>
			<main className={styles.main}>
				<Navbar />
				<div className={styles.sectionWrapper}>
					<SectionCards
						title="My List"
						videos={myListVideos}
						size="small"
						shouldWrap
						shouldScale={false}
					/>
				</div>
			</main>
		</div>
	);
};

export async function getServerSideProps(context) {
	const { userId, token } = await RedirectUser(context);
	if (!userId) {
		return {
			props: {},
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	const data = await getMyList(userId, token);

	return {
		props: {
			myListVideos: data,
		},
	};
}

export default MyList;
