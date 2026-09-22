<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';
	import { alert } from '$lib/stores/alert.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import ButtonLoading from '$lib/components/ui/ButtonLoading.svelte';
	import AvatarCloudStacked from '$lib/components/avatar/AvatarCloudStacked.svelte';
	import AvatarStacked from '$lib/components/avatar/AvatarStacked.svelte';
	import { formatTime } from '$lib/utils/date';

	let { data, form } = $props();

	$effect(() => {
		if (form?.feedback) alert.feedback(form.feedback);
	});

	let pending = $state<number | null>(null);
	const has = (slotId: number) => data.assigned.includes(slotId);

	const submit = (slotId: number) => () => {
		pending = slotId;
		return async ({ update }: { update: (o?: { reset?: boolean }) => Promise<void> }) => {
			await update({ reset: false });
			pending = null;
		};
	};
	const linkClass = 'text-prime-600 dark:text-prime-400 hover:text-prime-500 text-sm/6 font-medium';
</script>

<svelte:head>
	<title>{m.nav_shifts()} · Kids Bday 2027</title>
</svelte:head>

<div class="px-4 py-6 sm:px-6 lg:px-8">
	<h1 class="text-base leading-7 font-semibold text-second-900 dark:text-white">
		{m.nav_shifts()}
	</h1>
	<p class="mt-1 max-w-2xl text-sm leading-6 text-second-500 dark:text-second-300">
		{m.shifts_subtitle()}
	</p>
</div>
<div class="overflow-hidden border-t border-second-100 dark:border-second-800">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
			<table class="w-full text-left">
				<thead class="sr-only">
					<tr
						><th>{m.shifts_singular()}</th><th class="hidden sm:table-cell">{m.nav_guests()}</th><th
						></th></tr
					>
				</thead>
				<tbody>
					{#each data.shifts as shift (shift.id)}
						<tr class="text-sm/6 text-second-900 dark:text-second-200">
							<th scope="colgroup" colspan="3" class="relative isolate py-2 font-semibold">
								<span class="flex items-baseline gap-x-3">
									<span class="text-lg font-semibold">{shift.name}</span>
									<span class="text-sm font-normal italic">{shift.description}</span>
								</span>
								<div
									class="absolute inset-y-0 right-full -z-10 w-screen border-b border-second-200 bg-second-50 dark:border-second-700 dark:bg-second-900"
								></div>
								<div
									class="absolute inset-y-0 left-0 -z-10 w-screen border-b border-second-200 bg-second-50 dark:border-second-700 dark:bg-second-900"
								></div>
							</th>
						</tr>
						{#each shift.slots as slot, index (slot.id)}
							{@const full = slot.assigned >= slot.capacity}
							<tr>
								<td class="relative py-5 pr-6">
									<div class="flex items-start gap-x-3">
										<div class="text-sm/6 font-medium text-second-900 dark:text-second-200">
											{index + 1}.&nbsp;{m.shifts_singular()}
										</div>
										{#if has(slot.id)}<Badge>{m.shifts_assigned()}</Badge>{/if}
										{#if full}<Badge>{m.shifts_full()}</Badge>{/if}
									</div>
									<div class="mt-1 text-xs/5 text-second-500 dark:text-second-400">
										<time datetime={slot.startAt}>{formatTime(slot.startAt)}</time>
										<span>&nbsp;&#8209;&nbsp;</span>
										<time datetime={slot.endAt}>{formatTime(slot.endAt)}</time>
									</div>
								</td>
								<td class="hidden xs:table-cell">
									<AvatarCloudStacked>
										{#each slot.guests as guest (guest.id)}
											<AvatarStacked
												initials={guest.initials}
												src={guest.image}
												name={guest.name ?? ''}
											/>
										{/each}
									</AvatarCloudStacked>
								</td>
								<td class="py-5 text-right">
									<div class="mb-1 flex items-center justify-end gap-x-4">
										<AvatarCloudStacked class="-space-x-1! xs:hidden">
											{#each slot.guests as guest (guest.id)}
												<AvatarStacked
													initials={guest.initials}
													src={guest.image}
													name={guest.name ?? ''}
													small
												/>
											{/each}
										</AvatarCloudStacked>
										<div
											class="mt-1 rounded-xl bg-second-100 px-2 py-0.5 text-xs/5 text-second-600 dark:bg-second-800 dark:text-second-400"
										>
											{slot.assigned}/{slot.capacity}
										</div>
									</div>
									<div class="flex justify-end">
										{#if !data.user}
											<a href="/guests" class="{linkClass} hover:underline"
												>{m.shifts_please_log_in()}</a
											>
										{:else if has(slot.id)}
											<form method="POST" action="?/unassign" use:enhance={submit(slot.id)}>
												<input type="hidden" name="slotId" value={slot.id} />
												<ButtonLoading
													type="submit"
													loading={pending === slot.id}
													class={linkClass}
												>
													{m.shifts_unassign()}
												</ButtonLoading>
											</form>
										{:else}
											<form method="POST" action="?/assign" use:enhance={submit(slot.id)}>
												<input type="hidden" name="slotId" value={slot.id} />
												<ButtonLoading
													type="submit"
													loading={pending === slot.id}
													disabled={full}
													class="{linkClass} disabled:cursor-not-allowed disabled:opacity-50"
												>
													{m.shifts_assign()}
												</ButtonLoading>
											</form>
										{/if}
									</div>
								</td>
							</tr>
						{/each}
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
