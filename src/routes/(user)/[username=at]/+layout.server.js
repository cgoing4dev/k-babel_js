import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	// userId 찾기
	// 골뱅이 제거
	const username = params.username.slice(1);

	try {
		// url에 있는 username을 이용해서 member에 대한 정보를 가져오기
		const member = await locals.pb.collection('users').getFirstListItem(`username="${username}"`);

		// url에 해당하는 특정 member가 쓴 post 가져오기
		// expand로 조회수까지 가져오기
		const post = await locals.pb.collection('post').getList(1, 50, {
			filter: `user="${member.id}"`,
			sort: '-created',
			expand: 'post_hits(post)'
		});

		console.log('특정 멤버 url 테스트 중');
		console.log(post);

		return {
			member: serializeNonPOJOs(member),
			memberPosts: serializeNonPOJOs(post)
		};
	} catch (err) {
		throw error(404);
	}
};
