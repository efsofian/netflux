export async function isNewUser(token, issuer) {
	const operationsDoc = `
    query isNewUser($issuer: String!) {
		users(where: {issuer: {_eq: $issuer}})
      {
		id
        email
        issuer
      }
    }
  `;
	const response = await queryHasuraGQL(
		operationsDoc,
		"isNewUser",
		{
			issuer,
		},
		token
	);
	return response?.data?.users?.length === 0;
}

export async function createNewUser(token, metadata) {
	const { issuer, email, publicAddress } = metadata;
	const operationsDoc = `
    mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
		insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
		  returning {
			email
			id
			issuer
		  }
		}
	  }
	`;

	const response = await queryHasuraGQL(
		operationsDoc,
		"createNewUser",
		{
			issuer,
			email,
			publicAddress,
		},
		token
	);
	return response;
}

async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
	const result = await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName,
		}),
	});

	return await result.json();
}