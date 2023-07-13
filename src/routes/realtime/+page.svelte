<script>
	import { pb } from '$lib/pocketbase';
	import { onDestroy, onMount } from 'svelte';

	let builtRecords = [];

	async function getRecords() {
		const records = await pb.collection('post_hits').getFullList({
			sort: '-created'
		});

		const results = records.map((record) => {
			return {
				id: record.id,
				hits: record.hits
			};
		});

		return results;
	}

	pb.collection('post_hits').subscribe('*', async (e) => {
		console.log(e);
		builtRecords = await getRecords();
	});

	onMount(async () => {
		builtRecords = await getRecords();
	});

	onDestroy(() => {
		pb.collection('post_hits').unsubscribe('*');
	});
</script>

<p>realtime DB 테스트</p>

{#each builtRecords ?? [] as record}
	<p>{`post id: ${record.id}`}</p>
	<p>{`post hits: ${record.hits}`}</p>
{/each}
