import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
};

export const actions = {
	createPost: async ({ request, locals }) => {
		const formData = await request.formData();

		// 커버 이미지
		const coverImage = formData.get('cover_image');

		if (coverImage.size === 0) {
			formData.delete('cover_image');
		}

		// formData에 user 정보 추가
		if (locals.user !== null) {
			formData.append('user', locals.user.id);
		}

		// formData 저장
		try {
			const post = await locals.pb.collection('post').create(formData);
			await locals.pb.collection('post_hits').create({
				post: post.id,
				hits: 0
			});
		} catch (err) {
			console.log('Error: ', err);
			return fail(400, { err: '에러 발생' });
		}

		throw redirect(303, '/');
	}
};
