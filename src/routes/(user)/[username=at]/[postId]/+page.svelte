<script>
	import { Card, Button, Toggle, Span, Heading } from 'flowbite-svelte';
	import { getImageURL } from '$lib/utils';
	import { Icon, Heart, ChatBubbleLeft, Bookmark, CursorArrowRays } from 'svelte-hero-icons';
	import { memberAvatarSrc } from '$lib/store.js';

	// data에는 post 에 대한 정보가 있음
	// 그리고 parent로부터 member, memberPosts에도 접근 가능
	export let data;
</script>

<!-- post 상세페이지 -->

<div class="md:grid md:grid-cols-9 lg:grid-cols-12 gap-4 m-4">
	<!-- 리액션 Bottom nav : mobile -->
	<div class="btm-nav btm-nav-lg md:hidden z-10">
		<li>
			<a href="" class="tooltip tooltip-top flex items-center" data-tip="Like">
				<Icon src={Heart} solid class="h-8 w-8" />
				<span class="ml-2">0</span>
			</a>
		</li>
		<li>
			<a href="" class="tooltip tooltip-top flex items-center" data-tip="Comments">
				<Icon src={ChatBubbleLeft} class="h-8 w-8" />
				<span class="ml-2">0</span>
			</a>
		</li>
		<li>
			<a href="" class="tooltip tooltip-top flex items-center" data-tip="Hits">
				<Icon src={CursorArrowRays} solid class="h-8 w-8" />
				<span class="ml-2">{data.post.expand['post_hits(post)'][0].hits}</span>
			</a>
		</li>
		<li>
			<a href="" class="tooltip tooltip-top flex items-center" data-tip="Bookmark">
				<Icon src={Bookmark} class="h-8 w-8" />
				<span class="ml-2">0</span>
			</a>
		</li>
	</div>
	<!-- 리액션 -->
	<aside class="hidden p-4 w-full md:block md:col-span-1" aria-label="Article actions">
		<div class="sticky top-20">
			<ul class="h-full space-y-8 text-center">
				<li>
					<a href="" class="tooltip tooltip-top" data-tip="Like">
						<Icon src={Heart} solid class="h-8 w-8" />
					</a>
					<p>0</p>
				</li>
				<li>
					<div class="tooltip tooltip-top" data-tip="Comments">
						<Icon src={ChatBubbleLeft} class="h-8 w-8" />
					</div>
					<p>0</p>
				</li>
				<li>
					<a href="" class="tooltip tooltip-top" data-tip="Hits">
						<Icon src={CursorArrowRays} solid class="h-8 w-8" />
					</a>
					<!-- <p>{data.postHits.hits}</p> -->
					<p>{data.post.expand['post_hits(post)'][0].hits}</p>
				</li>
				<li>
					<a href="" class="tooltip tooltip-top" data-tip="Bookmark">
						<Icon src={Bookmark} class="h-8 w-8" />
					</a>
					<p>0</p>
				</li>
			</ul>
		</div>
	</aside>
	<!-- 본문 -->
	<main class="card bg-white md:col-span-8 lg:col-span-8">
		<figure class="p-4">
			<img
				src={getImageURL(data.post.collectionId, data.post.id, data.post.cover_image)}
				alt="Shoes"
				class="w-3/4"
			/>
		</figure>
		<div class="card-body">
			<h2 class="card-title">{data.post.title}</h2>
			<p>{@html data.post.content}</p>
			<hr />
			<!-- 댓글 Area -->
			<div class="alert my-4">
				<p class="text-xl">Comments</p>
			</div>
			<div class="relative">
				<div class="avatar absolute top-1 left-0">
					<div class="w-10 rounded-full">
						<img src={$memberAvatarSrc} alt="avatar" />
					</div>
				</div>

				<!-- xs -->
				<div class="ml-14">
					<textarea
						placeholder="Please leave a comment"
						class="textarea textarea-bordered w-full"
					/>
				</div>
				<Button class="float-right mt-2" color="yellow">Submit</Button>
			</div>
			<hr class="mt-2" />
		</div>
	</main>

	<!-- 글쓴이 정보 -->
	<aside
		class="w-full mt-4 md:mt-0 md:col-span-8 md:col-start-2 lg:col-span-3 space-y-4"
		aria-label="Author details"
	>
		<div class="card card-compact bg-white lg:col-span-8">
			<div class="card-body">
				<!-- Avatar -->
				<!-- src={data.post?.expand.user.avatar || data.post?.expand.user.avatarUrl} -->
				<div class="flex items-center mb-2">
					<div class="avatar flex">
						<div class="w-10 rounded-full">
							<img src={$memberAvatarSrc} alt="avatar" />
						</div>
					</div>
					<div class="ml-2">
						<p>{data.post?.expand?.user?.username}</p>
						<!-- <p>{post.created.split(' ')[0]}</p> -->
					</div>
				</div>
				<Button class="uppercase">Follow</Button>
			</div>
		</div>
		<div class="card card-compact bg-white lg:col-span-8">
			<div class="card-body">
				<Heading tag="h4">
					More from <Span highlight>{data.post.expand.user.username}</Span>
				</Heading>
				<hr />
				<div>포스트 1</div>
				<div>포스트 2</div>
			</div>
		</div>
	</aside>
</div>
