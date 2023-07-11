import { redirect } from '@sveltejs/kit';

export const GET = ({ locals }) => {
	locals.pb.authStore.clear();
	locals.user = null;

	console.log('authStore.clear 수행');

	throw redirect(303, '/');
};
