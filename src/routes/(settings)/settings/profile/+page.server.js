import { error } from '@sveltejs/kit';

export const actions = {
	updateProfile: async ({ request, locals }) => {
		const data = await request.formData();
		const userAvatar = data.get('avatar');
		// console.log(userAvatar);

		if (userAvatar.size === 0) {
			data.delete('avatar');
			console.log('deleted? : ', data);
		}

		try {
			const { name, avatar } = await locals.pb.collection('users').update(locals.user?.id, data);

			// handle이 actions보다 먼저 일어나기 때문에 locals 업데이트를 해줘야 함.
			// actions가 서버에서 일어나고 load function이 reload되지 않기 때문
			locals.user.name = name;
			locals.user.avatar = avatar;
		} catch (err) {
			console.log('Error: ', err);
			throw error(400, 'Something went wrong updating your profile');
		}

		return {
			success: true
		};
	}
};
