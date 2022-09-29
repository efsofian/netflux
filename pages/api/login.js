import jwt from "jsonwebtoken";
import { setTokenCookie } from "../../lib/cookies";
import { isNewUser, createNewUser } from "../../lib/hasuraQueries";
import { magicAdmin } from "../../lib/magic-server";

export default async function login(req, res) {
	if (req.method === "POST") {
		try {
			const auth = req.headers.authorization;
			const didToken = auth ? auth.substr(7) : "";
			console.log("we work");
			console.log({ didToken });
			const metadata = await magicAdmin.users.getMetadataByToken(didToken);

			const token = jwt.sign(
				{
					...metadata,
					iat: Math.floor(Date.now() / 1000),
					exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
					"https://hasura.io/jwt/claims": {
						"x-hasura-allowed-roles": ["user", "admin"],
						"x-hasura-default-role": "user",
						"x-hasura-user-id": `${metadata.issuer}`,
					},
				},
				process.env.HASURA_JWT_SECRET
			);
			const isNewUserQuery = await isNewUser(token, metadata.issuer);
			isNewUserQuery && (await createNewUser(token, metadata));
			setTokenCookie(token, res);
			res.status(200).json({ done: true });
		} catch (e) {
			console.log("error", e);
			res.status(500).json({ done: false });
		}
	} else {
		res.send({ done: false });
	}

	// if (req.method === "POST") {
	// 	try {
	// 		const auth = req.headers.authorization;
	// 		const didToken = auth ? auth.substr(7) : "";
	//
	// 		console.log("metaa", metadata);
	// 		// const token = jwt.sign(
	// 		// 	{
	// 		// 		...metadata,
	// 		// 		iat: Math.floor(Date.now() / 1000),
	// 		// 		exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
	// 		// 		"https://hasura.io/jwt/claims": {
	// 		// 			"x-hasura-allowed-roles": ["user", "admin"],
	// 		// 			"x-hasura-default-role": "user",
	// 		// 			"x-hasura-user-id": `${metadata.issuer}`,
	// 		// 		},
	// 		// 	},
	// 		// 	"11111111111111111111111111111111"
	// 		// );
	// 		// console.log("metadata server", metadata);
	// 		res.status(200).json({ name: "John Doe" });
	// 	} catch (e) {
	// 		console.error("something went wrong: ", e);
	// 	}
	// } else {
	// 	res.send({ done: false });
	// }
}
