import { useRouter } from "next/router";
import Modal from "react-modal";
import cls from "classnames";
import Navbar from "../../components/Navbar/Navbar.component";
import styles from "../../styles/Video.module.css";
import { getYoutubeVideoById } from "../../lib/transfVideos";

Modal.setAppElement("#__next");
const VideoPage = ({ video }) => {
	const router = useRouter();
	const { id } = router.query;
	const {
		title,
		publishTime,
		description,
		channelTitle,
		statistics: { viewCount = 0 },
	} = video;

	return (
		<div className={styles.container}>
			<Navbar />
			<Modal
				isOpen={true}
				className={styles.modal}
				onRequestClose={() => router.back()}
				overlayClassName={styles.overlay}
				contentLabel={"watch the video"}>
				<iframe
					className={styles.videoPlayer}
					id="ytplayer"
					type="text/html"
					width="100%"
					height="360"
					src={`https://www.youtube.com/embed/${router.query.id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
					frameBorder="0"></iframe>
				<div className={styles.modalBody}>
					<div className={styles.modalBodyContent}>
						<div className={styles.col1}>
							<p className={styles.publishTime}>{publishTime}</p>
							<p className={styles.title}>{title}</p>
							<p className={styles.description}>{description}</p>
						</div>
						<div className={styles.col2}>
							<p className={cls(styles.subText, styles.subTextWrapper)}>
								<span className={styles.textColor}>Cast: </span>
								<span className={styles.channelTitle}>{channelTitle}</span>
							</p>
							<p className={cls(styles.subText, styles.subTextWrapper)}>
								<span className={styles.textColor}>View Count: </span>
								<span className={styles.channelTitle}>{viewCount}</span>
							</p>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export async function getStaticProps({ params: { id } }) {
	const videoArray = await getYoutubeVideoById(id);

	return {
		props: { video: videoArray.length > 0 ? videoArray[0] : {} },
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
	const paths = listOfVideos.map((vidId) => {
		return {
			params: { id: vidId },
		};
	});
	return {
		paths,
		fallback: "blocking",
	};
}

export default VideoPage;
