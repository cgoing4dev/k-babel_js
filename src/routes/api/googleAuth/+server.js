import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals, url, cookies }) => {
	console.log('여긴 들어왔니~~~?');

	const authMethods = await locals.pb?.collection('users').listAuthMethods();

	console.log(authMethods);

	const redirectURL = `${url.origin}/api/oauth2-redirect`;

	const googleAuthProvider = authMethods.authProviders[0];
	const authProviderURL = `${googleAuthProvider.authUrl}${redirectURL}`;

	const state = googleAuthProvider.state;
	const verifier = googleAuthProvider.codeVerifier;

	cookies.set('state', state);
	cookies.set('verifier', verifier);

	console.log(authProviderURL);

	throw redirect(302, authProviderURL);
};
