<script>
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

	import { page } from '$app/stores';
	let activeClass =
		'flex items-center p-2 text-base font-normal text-gray-900 bg-indigo-200 dark:bg-gray-700 rounded-lg dark:text-white hover:bg-indigo-100 dark:hover:bg-gray-700';
	$: activeUrl = $page.url.pathname;

	const sideBarClass = 'bg-white rounded-2xl';

	const sideNavMenu = [
		{
			title: 'Home',
			href: '/',
			icon: '🏠'
		},
		{
			title: 'Reading List',
			href: '/readingList',
			icon: '📜'
		},
		{
			title: 'Video',
			href: '/video',
			icon: '📺'
		},
		{
			title: 'Tags',
			href: '/tags',
			icon: '🏷️'
		},
		{
			title: 'FAQ',
			href: '/faq',
			icon: '💡'
		},
		{
			title: 'Shop',
			href: '/shop',
			icon: '🎁'
		},
		{
			title: 'About',
			href: '/about',
			icon: '❓'
		},
		{
			title: 'Contact',
			href: '/contact',
			icon: '📧'
		}
	];
</script>

<div class="flex flex-row h-screen mt-4">
	<div class="mx-4">
		<Sidebar class="hidden md:block">
			<SidebarWrapper class={sideBarClass}>
				<SidebarGroup>
					{#each sideNavMenu as navItem}
						<SidebarItem
							label={navItem.title}
							href={navItem.href}
							{activeClass}
							class="hover:bg-indigo-100"
							active={activeUrl === `${navItem.href}`}
						>
							<svelte:fragment slot="icon">{navItem.icon}</svelte:fragment>
						</SidebarItem>
					{/each}
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</div>
	<div class="flex-1 mr-4">
		<slot />
	</div>
</div>
