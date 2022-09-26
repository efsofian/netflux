import Card from "./Card.component";
import styles from "./SectionCard.module.css";

const SectionCards = ({ title, videos = [], size }) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.cardWrapper}>
				{videos.map((video) => (
					<Card
						key={video.id}
						id={video.id}
						imgUrl={video.imgUrl}
						size={size}
					/>
				))}
			</div>
		</section>
	);
};

export default SectionCards;
