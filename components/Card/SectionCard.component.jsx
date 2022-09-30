import Link from "next/link";
import cls from "classnames";
import Card from "./Card.component";
import styles from "./SectionCard.module.css";

const SectionCards = ({
	title,
	videos = [],
	size,
	shouldWrap,
	shouldScale,
}) => {
	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{title}</h2>
			<div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
				{videos.map((video) => {
					return (
						<Link href={`/video/${video.id}`} key={video.id}>
							<a>
								<Card
									id={video.id}
									imgUrl={video.imgUrl}
									size={size}
									shouldScale={shouldScale}
								/>
							</a>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default SectionCards;
