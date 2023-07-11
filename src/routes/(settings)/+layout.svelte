<script>
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

	import { page } from '$app/stores';
	let activeClass =
		'flex items-center p-2 text-base font-normal text-gray-900 bg-indigo-200 dark:bg-gray-700 rounded-lg dark:text-white hover:bg-indigo-100 dark:hover:bg-gray-700';
	$: activeUrl = $page.url.pathname;

	const sideBarClass = 'bg-white rounded-2xl';

	const sideNavMenu = [
		{
			title: 'Profile',
			href: '/settings/profile',
			icon: '🙂'
		},
		{
			title: 'Account',
			href: '/settings/account',
			icon: '🪪'
		},
		{
			title: 'Notifications',
			href: '/settings/notifications',
			icon: '📩'
		},
		{
			title: 'Billing',
			href: '/settings/billing',
			icon: '💳'
		},
		{
			title: 'Organization',
			href: '/settings/organization',
			icon: '🏴'
		}
	];

	export let data;
	const emailId = data.user?.email.split('@')[0] ?? '';
</script>

<div class="flex m-4 lg:px-32 2xl:px-60">
	<div class="">
		<Sidebar class="hidden md:block">
			<SidebarWrapper class={sideBarClass}>
				<SidebarGroup>
					<div class="bg-gray-500 rounded-xl p-2 mb-4 text-center font-bold text-white">
						Setting for @{emailId}
					</div>
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
	<div class="flex-1 mx-10">
		<slot />
	</div>
</div>
