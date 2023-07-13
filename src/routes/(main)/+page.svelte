<script>
	import { Alert, Heading, ImagePlaceholder, Skeleton, TextPlaceholder } from 'flowbite-svelte';

	import { getImageURL } from '$lib/utils.js';

	export let data;
</script>

<div class="space-y-4">
	{#each data.post as post}
		<a href={`/@${post.expand.user.username}/${post.id}`} class="block hover:shadow-xl">
			<div class="card card-compact card-side bg-base-100 shadow grid grid-cols-3">
				<div class="card-body col-span-2">
					<!-- Avatar -->
					<div class="flex items-center mb-2">
						<div class="avatar flex">
							<div class="w-10 rounded-full">
								<img
									src={post.expand.user.avatar
										? getImageURL(
												post.expand.user.collectionId,
												post.expand.user.id,
												post.expand.user.avatar
										  )
										: post.expand.user.avatarUrl}
									alt="avatar"
								/>
							</div>
						</div>
						<div class="ml-2">
							<p>{post.expand.user.name}</p>
							<p>{post.created.split(' ')[0]}</p>
						</div>
					</div>
					<!-- Title -->
					<h2 class="card-title pl-4">{post.title}</h2>
					<p class="pl-4">{@html post.content}</p>
				</div>
				<!-- Cover Image -->
				<figure>
					<img
						src={getImageURL(post.collectionId, post.id, post.cover_image)}
						alt="Movie"
						class="h-56 object-cover"
					/>
				</figure>
			</div>
		</a>
	{/each}
</div>
