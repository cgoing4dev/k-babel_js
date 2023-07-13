<script>
	import { Card } from 'flowbite-svelte';
	import { getImageURL } from '$lib/utils.js';
	import { formatDate } from '$lib/utils.js';
	import { Icon, ChatBubbleLeft, FaceSmile, CursorArrowRays, Heart } from 'svelte-hero-icons';
	import { memberAvatarSrc } from '$lib/store.js';

	// member, memberPosts
	export let data;

	// url에 해당하는 특정 member의 아바타
	// $: memberAvatar = data.member.avatar
	// 	? getImageURL(data.member.collectionId, data.member.id, data.member.avatar)
	// 	: data.member.avatarUrl;

	// store로 관리하자
	$memberAvatarSrc = data.member.avatar
		? getImageURL(data.member.collectionId, data.member.id, data.member.avatar)
		: data.member.avatarUrl;
</script>

<!-- 특정 member에 대한 정보와 그 member가 쓴 post를 나열하는 페이지 -->

<div class="lg:grid lg:grid-cols-3">
	<!-- User profile -->
	<div class="col-span-1 p-4">
		<div class="card bg-base-100 shadow">
			<div class="avatar flex justify-center pt-8">
				<div class="w-24 rounded-full">
					<img src={$memberAvatarSrc} alt="avatar" />
				</div>
			</div>
			<div class="card-body text-center space-y-2">
				<h5 class="text-2xl font-bold">
					{data.member.name}
				</h5>
				<p class="text-gray-500">
					{data.member.username}
				</p>
				<p>
					🥳 Joined on {formatDate(data.member.created.split(' ')[0])}
				</p>
			</div>
		</div>
	</div>

	<!-- Post Card -->
	<div class="col-span-2 p-4 space-y-4">
		{#each data.memberPosts.items as post}
			<a href={`/@${data.member.username}/${post.id}`} class="block hover:shadow-xl">
				<div class="card card-compact card-side bg-base-100 shadow grid grid-cols-3">
					<div class="card-body col-span-2">
						<!-- Avatar -->
						<div class="flex items-center mb-2">
							<div class="avatar flex">
								<div class="w-10 rounded-full">
									<img src={$memberAvatarSrc} alt="avatar" />
								</div>
							</div>
							<div class="ml-2">
								<p>{data.member.name}</p>
								<p>{post.created.split(' ')[0]}</p>
							</div>
						</div>
						<!-- Title -->
						<h2 class="card-title pl-4">{post.title}</h2>
						<p class="pl-4">tag line</p>
						<!-- Action -->
						<div class="card-actions justify-between">
							<div class="tooltip flex" data-tip="Reactions">
								<Icon src={Heart} solid class="w-6 text-gray-500" />
								<span class="ml-2">0</span>
							</div>
							<div class="tooltip flex" data-tip="Comments">
								<Icon src={ChatBubbleLeft} class="w-6 text-gray-500" />
								<span class="ml-2">0</span>
							</div>
							<!-- 조회수 -->
							<div class="tooltip flex" data-tip="Hits">
								<Icon src={CursorArrowRays} solid class="w-6 text-gray-500" />
								<span class="ml-2">{post.expand['post_hits(post)'][0].hits}</span>
							</div>
						</div>
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
</div>
