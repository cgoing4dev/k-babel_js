import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = ({ locals, params }) => {
	const getPost = async (postId) => {
		try {
			const post = serializeNonPOJOs(await locals.pb.collection('post').getOne(postId));

			return post;
		} catch (err) {
			console.log('Error: ', err);
			throw error(400, 'error occured');
		}
	};

	return {
		post: getPost(params.postId)
	};
};
