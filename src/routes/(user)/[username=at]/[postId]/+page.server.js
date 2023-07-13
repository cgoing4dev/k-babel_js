import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = async ({ locals, params, cookies }) => {
	// [ 조회수 작업 ]
	// postId 에 해당하는 조회수 record 가져오기
	const record = await locals.pb
		.collection('post_hits')
		.getFirstListItem(`post="${params.postId}"`);

	// 첫 방문이면 조회수 +1 증가
	const visited = cookies.get(`visited_${params.postId}`);
	if (!visited) {
		locals.pb.collection('post_hits').update(record.id, {
			// post: params.postId,
			'hits+': 1
		});
		console.log('조회수 증가시켰니???');
		cookies.set(`visited_${params.postId}`, true);
	}

	// [ post 상세데이터 가져오기 ]
	try {
		const post = serializeNonPOJOs(
			await locals.pb.collection('post').getOne(params.postId, {
				// 글쓴이 정보, 조회수 expand해서 보냄
				expand: 'user, post_hits(post)'
			})
		);
		console.log('상세글 보기 테스트 중');

		return {
			post: post
		};
	} catch (err) {
		console.log('Error: ', err);
		throw error(400, 'error occured');
	}
};
