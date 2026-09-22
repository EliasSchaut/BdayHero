<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';
	import { alert } from '$lib/stores/alert.svelte';
	import { AttendanceStatus } from '$lib/types/guest';
	import { FormSubmitState } from '$lib/components/form/submit-state.svelte';
	import CountUp from '$lib/components/ui/CountUp.svelte';
	import Spinner from '$lib/components/ui/Spinner.svelte';
	import HeadingItalic from '$lib/components/ui/HeadingItalic.svelte';
	import IconLabel from '$lib/components/ui/IconLabel.svelte';
	import Dropdown from '$lib/components/ui/Dropdown.svelte';
	import DropdownItem from '$lib/components/ui/DropdownItem.svelte';
	import ConfirmDialog from '$lib/components/ui/ConfirmDialog.svelte';
	import Divider from '$lib/components/ui/Divider.svelte';
	import DividerPlus from '$lib/components/ui/DividerPlus.svelte';
	import DividerText from '$lib/components/ui/DividerText.svelte';
	import EmailInput from '$lib/components/form/EmailInput.svelte';
	import NameInput from '$lib/components/form/NameInput.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Select from '$lib/components/form/Select.svelte';
	import Switch from '$lib/components/form/Switch.svelte';
	import RadioGroup from '$lib/components/form/RadioGroup.svelte';
	import RadioOption from '$lib/components/form/RadioOption.svelte';
	import Submit from '$lib/components/form/Submit.svelte';
	import SignInButton from '$lib/components/auth/SignInButton.svelte';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import AvatarCloud from '$lib/components/avatar/AvatarCloud.svelte';
	import AvatarProfile from '$lib/components/avatar/AvatarProfile.svelte';
	import Bars3 from '~icons/heroicons/bars-3';
	import { fly, scale } from 'svelte/transition';

	let { data, form } = $props();

	$effect(() => {
		if (form?.feedback) alert.feedback(form.feedback);
	});
	$effect(() => {
		if (data.oauthError) alert.feedback(data.oauthError);
	});

	const signIn = new FormSubmitState();
	const update = new FormSubmitState();

	// form state derived from the loaded profile
	let attendance = $state(String(AttendanceStatus.NOT_RESPONDED));
	let numCompanions = $state(0);
	let deleteOpen = $state(false);
	let deleteForm = $state<HTMLFormElement>();
	$effect(() => {
		attendance = String(data.profile?.attendanceStatus ?? AttendanceStatus.NOT_RESPONDED);
		numCompanions = data.profile?.companions.length ?? 0;
	});
</script>

<svelte:head>
	<title>{m.nav_guests()} · Kids Bday 2026</title>
</svelte:head>

<div
	class="m-auto flex w-min flex-col justify-center space-y-12 text-center align-middle font-semibold"
>
	{#if data.count > 0}
		<div
			class="m-auto my-16 w-min text-4xl font-bold"
			in:scale={{ start: 0.3, duration: 1500, delay: 300 }}
		>
			<CountUp value={data.count} class="inline-block scale-[3] tabular-nums" />
		</div>
	{:else}
		<Spinner class="mx-auto my-16 size-6" />
	{/if}
	<span class="text-3xl font-semibold text-nowrap" in:fly={{ y: 20, duration: 1200 }}>
		{m.guests_countup_tail()}!
	</span>
</div>

<div class="mt-20 flex justify-center">
	<div
		class="flex min-h-96 w-full items-center justify-center bg-second-50 p-8 inset-shadow-sm xs:mx-12 xs:w-fit xs:min-w-96 xs:rounded-4xl dark:bg-second-900"
	>
		{#if !data.user}
			<div class="mx-4 w-full">
				<h3 class="text-center font-semibold">{m.guests_signin_title()}</h3>
				<div class="my-4 flex w-full flex-col gap-y-1">
					<form method="POST" action="?/social" class="flex flex-col gap-y-1" use:enhance>
						{#each ['google', 'github', 'discord'] as const as provider (provider)}
							<SignInButton {provider} disabled={!data.providers.includes(provider)} />
						{/each}
					</form>
					<form
						method="POST"
						action="?/magicLink"
						use:enhance={signIn.enhance()}
						class="flex flex-col gap-y-4"
					>
						<EmailInput id="email" placeholder={m.guests_signin_via_local()} required />
						<Submit state={signIn.state}>{m.guests_signin_submit()}</Submit>
					</form>
				</div>
			</div>
		{:else if data.profile}
			{@const profile = data.profile}
			<form
				method="POST"
				action="?/update"
				use:enhance={update.enhance()}
				class="flex w-full flex-col gap-y-6"
			>
				<div class="flex justify-end">
					<Dropdown class="rounded-md p-2 hover:bg-second-100 dark:hover:bg-second-800">
						{#snippet trigger()}
							<span class="sr-only">{m.guests_profile_open_menu()}</span>
							<Bars3 class="size-6" aria-hidden="true" />
						{/snippet}
						<DropdownItem onSelect={() => (deleteOpen = true)}
							>{m.guests_profile_delete_account()}</DropdownItem
						>
						<DropdownItem onSelect={() => document.forms.namedItem('signOut')?.requestSubmit()}>
							{m.guests_profile_logout()}
						</DropdownItem>
					</Dropdown>
				</div>

				<RadioGroup name="attendanceStatus" bind:value={attendance}>
					<RadioOption value={String(AttendanceStatus.ATTENDING)}>
						<IconLabel icon="check" solid={attendance === String(AttendanceStatus.ATTENDING)}>
							{m.guests_profile_attendance_attending()}
						</IconLabel>
					</RadioOption>
					<RadioOption value={String(AttendanceStatus.MAYBE_ATTENDING)}>
						<IconLabel
							icon="question"
							solid={attendance === String(AttendanceStatus.MAYBE_ATTENDING)}
						>
							{m.guests_profile_attendance_maybe()}
						</IconLabel>
					</RadioOption>
					<RadioOption value={String(AttendanceStatus.NOT_ATTENDING)}>
						<IconLabel icon="x" solid={attendance === String(AttendanceStatus.NOT_ATTENDING)}>
							{m.guests_profile_attendance_not_attending()}
						</IconLabel>
					</RadioOption>
				</RadioGroup>

				<div
					class="flex flex-col gap-y-2 rounded-lg bg-second-100 p-4 inset-shadow-sm dark:bg-second-800"
				>
					<div class="flex w-full items-end justify-between gap-x-4">
						<Avatar src={profile.image} initials={profile.initials} class="size-10 xs:size-9" />
						<EmailInput
							id="emailDisplay"
							value={profile.email}
							disabled
							class="w-full opacity-80"
						/>
					</div>
					<NameInput
						id="firstName"
						label={m.common_form_labels_first_name()}
						value={profile.firstName ?? ''}
						placeholder="Alexander"
					/>
					<NameInput
						id="lastName"
						label={m.common_form_labels_last_name()}
						value={profile.lastName ?? ''}
						placeholder="Hamilton"
					/>

					<DividerText>{m.guests_profile_options_title()}</DividerText>
					<div class="flex flex-col gap-y-2 font-medium text-second-800 dark:text-second-300">
						<div class="flex justify-between">
							<span>{m.guests_profile_options_public()}</span>
							<Switch
								id="profilePublic"
								checked={profile.profilePublic}
								label={m.guests_profile_options_public()}
							/>
						</div>
						<div class="flex justify-between">
							<span>{m.guests_profile_options_needs_bed()}</span>
							<Switch
								id="needBed"
								checked={profile.needBed}
								label={m.guests_profile_options_needs_bed()}
							/>
						</div>
						<div class="flex justify-between">
							<span>{m.guests_profile_options_has_bed()}</span>
							<Switch
								id="hasBed"
								checked={profile.hasBed}
								label={m.guests_profile_options_has_bed()}
							/>
						</div>
						<div class="flex justify-between">
							<span>{m.guests_profile_options_vegan()}</span>
							<Switch
								id="isVegan"
								checked={profile.isVegan}
								label={m.guests_profile_options_vegan()}
							/>
						</div>
					</div>

					<DividerPlus class="mt-2" />
					<div class="flex items-center justify-between">
						<span>{m.guests_profile_companions_title()}</span>
						<Select id="numCompanions" bind:value={numCompanions}>
							{#each Array.from({ length: data.maxCompanions + 1 }, (_, i) => i) as n (n)}
								<option value={n}>+{n}</option>
							{/each}
						</Select>
					</div>
					{#each Array.from({ length: numCompanions }, (_, i) => i) as i (i)}
						<NameInput
							id="companions"
							label="{i + 1}. {m.guests_profile_companions_name()}"
							value={profile.companions[i]?.name ?? ''}
							placeholder="Eliza Hamilton"
							required
						/>
					{/each}
					<Divider class="my-2" />
					<Input
						id="bio"
						type="text"
						placeholder={m.guests_profile_note()}
						maxlength={20}
						value={profile.bio ?? ''}
					/>
				</div>

				<Submit state={update.state}>{m.guests_profile_update()}</Submit>
			</form>
			<form method="POST" action="?/signOut" name="signOut" class="hidden" use:enhance></form>
			<form
				method="POST"
				action="?/delete"
				bind:this={deleteForm}
				class="hidden"
				use:enhance
			></form>
			<ConfirmDialog
				bind:open={deleteOpen}
				title={m.guests_profile_delete_confirm_title()}
				body={m.guests_profile_delete_confirm_body()}
				cancelLabel={m.guests_profile_delete_confirm_cancel()}
				confirmLabel={m.guests_profile_delete_confirm_ok()}
				onConfirm={() => deleteForm?.requestSubmit()}
			/>
		{:else}
			<Spinner class="size-12" />
		{/if}
	</div>
</div>

<HeadingItalic class="my-10" title={m.guests_list_title()} />
<AvatarCloud>
	{#each data.guests.filter((g) => g.profilePublic) as guest (guest.id)}
		<AvatarProfile {guest} />
	{/each}
</AvatarCloud>
