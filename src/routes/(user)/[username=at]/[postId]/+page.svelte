<script>
	import { Card, Button, Toggle } from 'flowbite-svelte';
	import { getImageURL } from '$lib/utils';

	export let data;
</script>

{data.post.cover_image}
{@html data.post.content}

<Card
	img={getImageURL(data.post.collectionId, data.post.id, data.post.cover_image)}
	href="/"
	horizontal
>
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		Noteworthy technology acquisitions 2021
	</h5>
	<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
		Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological
		order.
	</p>
</Card>
