<script>
	import { Button, Label, Input } from 'flowbite-svelte';
	// import { Icon, Photo } from 'svelte-hero-icons';

	import Editor from '@tinymce/tinymce-svelte';
	import { conf } from '$lib/tinymce';
	import { PUBLIC_TINYMCE } from '$env/static/public';
	import { enhance } from '$app/forms';

	let tinyValue = '';

	// preview
	let coverImageSrc = '';

	const showPreview = (event) => {
		const target = event.target;
		const files = target.files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);

			// const preview = document.getElementById('avatar-preview') as HTMLImageElement;
			// preview.src = src;
			coverImageSrc = src;
			console.log(coverImageSrc);
		}
	};

	const imageInputClick = () => {
		document.getElementById('imageInput').click();
	};

	const imageRemove = () => {
		coverImageSrc = '';
		let fileVal = document.getElementById('imageInput');
		fileVal.value = '';
	};
</script>

<div class="mx-auto max-w-2xl">
	<div class="mt-10">
		<form
			action="?/createPost"
			method="post"
			class="space-y-4"
			enctype="multipart/form-data"
			use:enhance
		>
			<!-- 커버 이미지 -->
			<div>
				{#if coverImageSrc}
					<div class="flex items-center justify-evenly">
						<img src={coverImageSrc} alt="" class="h-60 w-60 object-contain" />
						<div>
							<Button color="light" on:click={imageInputClick}>Change</Button>
							<Button color="red" outline on:click={imageRemove}>Remove</Button>
						</div>
					</div>
				{:else}
					<Button color="yellow" size="xl" class="mb-6" on:click={imageInputClick}
						>Add a cover image</Button
					>
				{/if}
				<input
					type="file"
					name="cover_image"
					id="imageInput"
					value=""
					hidden
					on:change={showPreview}
				/>
			</div>

			<!-- 제목 -->
			<div>
				<Label class="text-lg">Your title</Label>
				<Input type="text" name="title" placeholder="post title here..." required />
			</div>

			<!-- 내용 (rich text editor : tinymce) -->
			<div>
				<Label class="text-lg">Your content</Label>
				<Editor apiKey={PUBLIC_TINYMCE} bind:value={tinyValue} {conf} />
			</div>

			<input type="hidden" name="content" value={tinyValue} />
			<Button type="submit" color="blue">Publish</Button>
		</form>
	</div>
</div>
