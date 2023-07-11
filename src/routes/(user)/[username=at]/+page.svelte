<script>
	import { Card, MenuButton, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';
	import { avatarSrcStore } from '$lib/store.js';
	export let data;
</script>

<Card>
	<div class="flex justify-end">
		<MenuButton />
		<Dropdown class="w-36">
			<DropdownItem>Edit</DropdownItem>
			<DropdownItem>Export data</DropdownItem>
			<DropdownItem>Delete</DropdownItem>
		</Dropdown>
	</div>
	<div class="flex flex-col items-center space-y-3">
		<Avatar size="lg" src={$avatarSrcStore} />
		<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.user?.name}</h5>
		<span class="text-sm text-gray-500 dark:text-gray-400">{data.user?.email}</span>
		<div class="flex mt-4 space-x-3 lg:mt-6">
			<Button>Add friend</Button>
			<Button color="light" class="dark:text-white">Message</Button>
		</div>
	</div>
</Card>
<!-- <p>{data.userPosts.expand['post(user)'][0].title}</p> -->
<p>{data.userPosts.expand['post(user)'].length}</p>
