import Link from "next/link";
import Card from "./Card.component";
import styles from "./SectionCard.module.css";

const SectionCards = ({ title, videos = [], size }) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.cardWrapper}>
				{videos.map((video) => {
					console.log(video);
					return (
						<Link href={`/video/${video.id}`} key={video.id}>
							<a>
								<Card id={video.id} imgUrl={video.imgUrl} size={size} />
							</a>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default SectionCards;
