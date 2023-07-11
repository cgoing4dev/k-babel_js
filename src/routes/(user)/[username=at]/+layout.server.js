import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	// userId 찾기
	// 골뱅이 제거
	const username = params.username.slice(1);

	// let record;
	try {
		const record = await locals.pb.collection('users').getFirstListItem(`username="${username}"`, {
			expand: 'post(user)'
		});

		return {
			userPosts: serializeNonPOJOs(record)
		};
	} catch (err) {
		throw error(404);
	}
};
