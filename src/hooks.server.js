import { pb } from '$lib/pocketbase.js';

export async function handle({ event, resolve }) {
	// before
	console.log('핸들 체크!!');
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	// authStore.isValid 가 true라는 것은 pb_auth=... 가 있다는 말
	// 즉 token이 있다는 말
	if (pb.authStore.isValid) {
		try {
			await pb.collection('users').authRefresh();
			console.log('authStore.isValid해서 authRefresh 했나?');
		} catch (_) {
			pb.authStore.clear();
		}
	}

	// 이제 server-side actions 에서 event.locals.pb instance에 접근 가능
	event.locals.pb = pb;
	// utils의 serializeNonPOJOs 함수를 써도됨
	// authStore의 model 타입을 일반 객체 타입으로 접근할 수 있도록
	event.locals.user = structuredClone(pb.authStore.model);

	// 이 부분이 server side에서 벌어지는 일
	// 비즈니스 로직, DB CRUD
	// +page.server.ts, +server.ts
	const response = await resolve(event);

	// after
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({}));

	return response;
}
