import { useState } from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import { motion } from "framer-motion";
import cls from "classnames";

const Card = ({
	imgUrl = "/static/clifford.webp",
	size = "medium",
	id,
	shouldScale = true,
}) => {
	const [imgSrc, setImgSrc] = useState(imgUrl);
	const classMap = {
		large: styles.lgItem,
		medium: styles.mdItem,
		small: styles.smItem,
	};
	const handleError = () => {
		console.log("from error");
		setImgSrc(
			"https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80"
		);
	};
	const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
	const shouldHover = shouldScale && {
		whileHover: { ...scale },
	};
	return (
		<div className={styles.container}>
			<motion.div
				className={cls(styles.imgMotionWrapper, classMap[size])}
				{...shouldHover}>
				<Image
					src={imgSrc}
					alt="pics"
					layout="fill"
					onError={handleError}
					className={styles.cardImg}
				/>
			</motion.div>
		</div>
	);
};

export default Card;
