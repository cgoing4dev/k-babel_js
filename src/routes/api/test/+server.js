import { json } from '@sveltejs/kit';

export const GET = () => {
	const test = {
		name: '최현준',
		age: 36,
		major: ['naoe', 'computer engineering']
	};

	return json(test);
};
