<script>
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getImageURL } from '$lib/utils.js';
	import { Avatar, Card, Heading, Span } from 'flowbite-svelte';
	import { Button, Label, Input, Checkbox, Fileupload } from 'flowbite-svelte';

	import { Icon, Pencil } from 'svelte-hero-icons';

	export let data;
	let loading = false;

	let avatarSrc = data.user?.avatar
		? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
		: data.user?.avatarUrl;

	const showPreview = (event) => {
		const target = event.target;
		const files = target.files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			console.log(src);
			avatarSrc = src;
		}
	};

	// form use:enhance 함수
	const submitUpdateProfile = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<form
	action="?/updateProfile"
	method="post"
	class="flex flex-col bg-white rounded-2xl p-6 space-y-6"
	enctype="multipart/form-data"
	use:enhance={submitUpdateProfile}
>
	<Heading tag="h4">User</Heading>
	<Label class="space-y-2" for="name">
		<span>Name</span>
		<Input type="text" name="name" id="name" value={data.user.name} disabled={loading} />
	</Label>
	<Label class="space-y-2" for="email">
		<span>Email</span>
		<Input type="email" name="email" id="email" value={data.user.email} disabled />
	</Label>
	<Label class="space-y-2 relative" for="avatar">
		<span>Profile image</span>
		<Avatar
			src={avatarSrc}
			class="cursor-pointer object-contain"
			size="lg"
			id="avatar-preview"
			on:change={showPreview}
		/>
		<Label class="absolute -bottom-2 left-14 bg-indigo-300 p-1.5 rounded-full">
			<Icon src={Pencil} class="w-4 h-4" />
		</Label>
		<input
			type="file"
			name="avatar"
			id="avatar"
			value=""
			accept="image/*"
			hidden
			class="w-4"
			on:change={showPreview}
			disabled={loading}
		/>
	</Label>
	<Button type="submit" disabled={loading}>Update Profile</Button>
</form>
