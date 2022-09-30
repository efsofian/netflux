import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import cls from "classnames";
import Navbar from "../../components/Navbar/Navbar.component";
import DisLike from "../../components/Icons/DislikeIcon.component";
import Like from "../../components/Icons/LikeIcon.component";
import styles from "../../styles/Video.module.css";
import { getYoutubeVideoById } from "../../lib/transfVideos";

Modal.setAppElement("#__next");
const VideoPage = ({ video }) => {
	const [toggleLike, setToggleLike] = useState(false);
	const [toggleDislike, setToggleDislike] = useState(false);
	const router = useRouter();
	const { id } = router.query;
	const {
		title,
		publishTime,
		description,
		channelTitle,
		statistics: { viewCount = 0 },
	} = video;

	const runRatingService = async (favourited) => {
		return await fetch("/api/stats", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				videoId: router.query.id,
				favourited,
			}),
		});
	};
	const handleToggleLike = async () => {
		setToggleLike(!toggleLike);
		setToggleDislike(toggleLike);
		const response = await runRatingService(!toggleLike ? 1 : 0);
		console.log(await response.json());
	};

	const handleToggleDislike = async () => {
		setToggleDislike(!toggleDislike);
		setToggleLike(toggleDislike);
		const response = await runRatingService(!toggleDislike ? 0 : 1);
		console.log(await response.json());
	};

	useEffect(() => {
		console.log("triggered by useEffect");
		const asyncFetcher = async () => {
			const response = await fetch(`/api/stats?videoId=${router.query.id}`);
			const data = await response.json();
			console.log("heeere data", data);
			if (data.length > 0) {
				const favourited = data[0].favourited;
				if (favourited === 1) {
					setToggleLike(true);
				} else if (favourited === 0) {
					setToggleDislike(true);
				}
			}
		};

		asyncFetcher();
	}, [router.query.id]);

	return (
		<div className={styles.container}>
			<Navbar />
			<Modal
				isOpen={true}
				className={styles.modal}
				onRequestClose={() => router.back()}
				overlayClassName={styles.overlay}
				contentLabel="watch the video">
				<iframe
					className={styles.videoPlayer}
					id="ytplayer"
					type="text/html"
					width="100%"
					height="360"
					src={`https://www.youtube.com/embed/${router.query.id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
					frameBorder="0"></iframe>
				<div className={styles.likeDislikeBtnWrapper}>
					<div className={styles.likeBtnWrapper}>
						<button onClick={handleToggleLike}>
							<div className={styles.btnWrapper}>
								<Like selected={toggleLike} />
							</div>
						</button>
					</div>
					<button onClick={handleToggleDislike}>
						<div className={styles.btnWrapper}>
							<DisLike selected={toggleDislike} />
						</div>
					</button>
				</div>

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
