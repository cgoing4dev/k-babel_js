<script>
	import '../app.postcss';
	import { getImageURL } from '$lib/utils.js';

	import { Navbar, NavBrand, Button } from 'flowbite-svelte';
	import { Avatar, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
	import { Modal, A } from 'flowbite-svelte';
	import { Icon, Bars3 } from 'svelte-hero-icons';

	import { avatarSrcStore } from '$lib/store';
	import { sideNavMenu } from '$lib/etc/navMenu';

	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;

	export let data;

	let formModal = false;
	let loginModal = false;
	$: authButtonTxt = loginModal ? 'Log in with Google' : 'Sign up with Google';

	// 로그인한 유저의 아바타 사진
	$: $avatarSrcStore = data.user?.avatar
		? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
		: data.user?.avatarUrl;

	// 반응형 구현하기 위해 폭을 파악하기 위해 임시로 내비게이션에 띄우는 용도
	let width = 0;

	import { Drawer, CloseButton } from 'flowbite-svelte';
	import { sineIn, linear } from 'svelte/easing';

	let drawerHidden = true;
	let transitionParams = {
		x: -320,
		duration: 30,
		easing: linear
	};
</script>

<svelte:window bind:innerWidth={width} />

<Modal bind:open={formModal} size="xs" class="w-full" outsideclose>
	<div class="flex flex-col space-y-10">
		<span
			class="font-['Audiowide'] text-center text-3xl font-medium text-purple-500 dark:text-white"
		>
			K-Talk
		</span>
		<span class="text-center text-2xl text-black font-medium">K-Talk는 이런 공간이에요.</span>
		<Button href="/api/googleAuth" outline color="purple" class="rounded-3xl w-full">
			<svg
				width="20px"
				height="20px"
				class="mr-2"
				viewBox="-0.5 0 48 48"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				fill="#000000"
				stroke="#000000"
				><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><g id="SVGRepo_iconCarrier">
					<title>Google-color</title> <desc>Created with Sketch.</desc> <defs />
					<g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
						<g id="Color-" transform="translate(-401.000000, -860.000000)">
							<g id="Google" transform="translate(401.000000, 860.000000)">
								<path
									d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
									id="Fill-1"
									fill="#FBBC05"
								/>
								<path
									d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
									id="Fill-2"
									fill="#EB4335"
								/>
								<path
									d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
									id="Fill-3"
									fill="#34A853"
								/>
								<path
									d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
									id="Fill-4"
									fill="#4285F4"
								/>
							</g>
						</g>
					</g>
				</g></svg
			>
			{authButtonTxt}</Button
		>
	</div>
</Modal>

<Navbar let:hidden let:toggle class="sticky top-0 z-30 py-1 border-b">
	<div class="flex gap-4">
		<div class="md:hidden">
			<button
				class="hover:bg-gray-300 rounded-md p-1"
				on:click={() => (drawerHidden = !drawerHidden)}
			>
				<Icon src={Bars3} class="md:hidden" size="32" />
			</button>
		</div>
		<NavBrand href="/">
			<span class="font-['Audiowide'] text-2xl"> K-Babel </span>
		</NavBrand>
	</div>
	<div>
		<span>{width} px</span>
		{#if width >= 1536}
			<span>(2xl)</span>
		{:else if width >= 1280}
			<span>(xl)</span>
		{:else if width >= 1024}
			<span>(lg)</span>
		{:else if width >= 768}
			<span>(md)</span>
		{:else if width >= 640}
			<span>(sm)</span>
		{:else if width < 640}
			<span>(폰)</span>
		{/if}
	</div>

	<div>
		{#if data.user}
			<div class="flex space-x-4 items-center">
				<Button href="/new" pill size="sm">Create Post</Button>
				<Avatar
					id="user-drop"
					src={$avatarSrcStore}
					class="cursor-pointer object-contain"
					size="md"
				/>
				<!-- 아바타 클릭 시, Dropdown -->
				<Dropdown triggeredBy="#user-drop">
					<DropdownItem href={`/@${data.user.username}`}>
						<span class="block text-sm"> {data.user.name} </span>
						<span class="block truncate text-sm font-medium">
							{'@' + data.user.username}
						</span>
					</DropdownItem>
					<DropdownDivider />
					<DropdownItem href="/dashboard">Dashboard</DropdownItem>
					<DropdownItem href="/settings">Settings</DropdownItem>
					<DropdownDivider />
					<DropdownItem href="/api/logout">Log out</DropdownItem>
				</Dropdown>
			</div>
		{:else}
			<Button
				size="sm"
				color="light"
				pill
				on:click={() => {
					formModal = true;
					loginModal = true;
				}}>Log in</Button
			>
			<Button
				size="sm"
				color="purple"
				pill
				on:click={() => {
					formModal = true;
					loginModal = false;
				}}
				class="hover:bg-white hover:text-indigo-500 hover:ring-2 hover:ring-indigo-500"
				>Sign Up</Button
			>
		{/if}
	</div>
</Navbar>

<div class="lg:container lg:mx-auto h-screen">
	<slot />
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={drawerHidden} class="z-50">
	<div class="flex items-center">
		<h5
			class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
		>
			Info
		</h5>
		<CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white" />
	</div>
	<ul class="space-y-2 text-md p-2">
		{#each sideNavMenu as navItem}
			<a href={navItem.href} on:click={() => (drawerHidden = true)}>
				<li
					class="hover:bg-gray-100 hover:rounded-md p-2 {activeUrl === navItem.href
						? 'bg-gray-100 rounded-md'
						: ''}"
				>
					<span>
						{navItem.icon}
					</span>
					<span class="ml-2">
						{navItem.title}
					</span>
				</li>
			</a>
		{/each}
	</ul>
</Drawer>
