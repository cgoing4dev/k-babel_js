import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	// 모든 포스트 가져오기

	try {
		const records = await locals.pb.collection('post').getFullList({
			sort: '-created',
			expand: 'post_hits(post), user'
		});

		// console.log(records);
		console.log(serializeNonPOJOs(records));

		return {
			post: serializeNonPOJOs(records)
		};
	} catch (err) {
		throw error(404);
	}
}
