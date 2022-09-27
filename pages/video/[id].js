import { useRouter } from "next/router";
import Modal from "react-modal";
import cls from "classnames";
import styles from "../../styles/Video.module.css";

Modal.setAppElement("#__next");
const VideoPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const video = {
		title: "title",
		publishTime: "1999-01-01",
		description: "good movie",
		channelTitle: "Paramount pictures",
		viewCount: 19929,
	};
	const { title, publishTime, description, channelTitle, viewCount } = video;
	return (
		<div className={styles.container}>
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

export default VideoPage;
