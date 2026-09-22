<script lang="ts">
	import { AttendanceStatus, type PublicGuest } from '$lib/types/guest';
	import Avatar from './Avatar.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let { guest }: { guest: PublicGuest } = $props();

	const bg = $derived(
		guest.attendanceStatus === AttendanceStatus.ATTENDING
			? 'bg-green-50 dark:bg-green-950'
			: guest.attendanceStatus === AttendanceStatus.MAYBE_ATTENDING
				? 'bg-yellow-50 dark:bg-yellow-950'
				: guest.attendanceStatus === AttendanceStatus.NOT_ATTENDING
					? 'bg-red-50 dark:bg-red-950'
					: ''
	);
</script>

<div class="m-2 block shrink-0 rounded-xl p-2 {bg}">
	<div class="flex items-center">
		<Avatar src={guest.image} initials={guest.initials} />
		<div class="ml-3">
			{#if guest.firstName && guest.lastName}
				<div class="flex flex-col flex-wrap gap-x-1 xs:flex-row">
					<span class="text-sm font-medium text-second-700 dark:text-second-300"
						>{guest.firstName}</span
					>
					<span class="text-sm font-medium text-second-700 dark:text-second-300"
						>{guest.lastName}</span
					>
				</div>
			{:else}
				<div class="text-sm font-medium text-second-700 dark:text-second-300">{guest.email}</div>
			{/if}
			{#if guest.bio}
				<p class="text-xs font-medium text-second-500">{guest.bio}</p>
			{/if}
		</div>
		{#if guest.companions.length > 0}
			<Badge class="mx-2" title={guest.companions.map((c) => c.name).join(', ')}>
				+{guest.companions.length}
			</Badge>
		{/if}
	</div>
</div>
