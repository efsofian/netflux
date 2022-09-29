import videoData from "../data/videos";

const fetchVideos = async (url) => {
	const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
	const BASE_URL = "youtube.googleapis.com/youtube/v3";
	try {
		const response = await fetch(
			`https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}` // remove x
		);
		return (data = await response.json());
	} catch (e) {
		console.error(`something went wrong with videos library: `, e);
		return [];
	}
};

export const getCommonVideos = async (url) => {
	const isDev = process.env.DEVELOPMENT;
	try {
		const data = isDev ? videoData : await fetchVideos(url);
		if (data.error) {
			console.error("youtube api error");
			console.error(data.error);
			return [];
		}
		return data.items.map((item) => {
			const id = item.id?.videoId || item.id;
			return {
				title: item.snippet?.title,
				imgUrl: item.snippet?.thumbnails.high.url,
				id,
				description: item.snippet?.description,
				publishTime: item.snippet?.publishedAt,
				channelTitle: item.snippet?.channelTitle,
				statistics: item.statistics
					? item.statistics.viewCount
					: { viewCount: 0 },
			};
		});
	} catch (e) {
		console.error(e);
	}
};

export const getVideos = (searchQuery) => {
	const URL = `search?part=snippet&maxResults=25&q=${searchQuery}&type=video`;
	return getCommonVideos(URL);
};

export const getPopularVideos = () => {
	const URL = `videos?part=snippet&2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=FR`;
	return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId) => {
	const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
	return getCommonVideos(URL);
};
