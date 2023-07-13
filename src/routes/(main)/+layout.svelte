<script>
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { sideNavMenu } from '$lib/etc/navMenu.js';

	let activeClass = 'flex items-center p-2 bg-gray-200 rounded-lg hover:bg-gray-100';
	$: activeUrl = $page.url.pathname;
</script>

<div class="grid grid-cols-4 gap-4 m-4">
	<!-- 사이드바 -->
	<div class="hidden md:block md:col-span-1 h-fit bg-white rounded-2xl">
		<ul class="space-y-2 text-md p-2">
			{#each sideNavMenu as navItem}
				<a href={navItem.href}>
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
	</div>

	<!-- 메인 -->
	<main class="col-span-4 md:col-span-3">
		<slot />
	</main>
</div>
