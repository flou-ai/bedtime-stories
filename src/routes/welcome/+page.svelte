<script lang="ts">
	import { transition } from '$lib/flou';
	import { goto, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import { tick } from 'svelte';

	export let data: PageData;
	let newSettings: string = '';
	let loading: boolean = false;

	$: ({ ltm } = data);

	const handleUpdateSettings = async () => {
		loading = true;
		// update the settings
		await transition(ltm.id, 'update_settings', 'bedtime_story_writer_2', { settings: newSettings }, 'bedtime_story_writer_2:settings_updated');
		// write the first story
		await transition(ltm.id, 'write_story', 'bedtime_story_writer_2', {}, 'bedtime_story_writer_2:story_written');
		// refresh the ltm
		await invalidateAll();
		await tick();
		// go to last story
		goto(`/stories/${ltm.state.stories.length - 1}`);
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to Bedtime Stories</h2>
		<div class="flex justify-center space-x-2"></div>
		<div class="space-y-2">
			<p>
				Please tell us a bit about your family:
				<br />
				<small> You can edit this later. </small>
			</p>
			<textarea
				rows={4}
				class="w-full md:w-[600px]"
				placeholder="What kind of stories would you like?
Do you have a preferred length?
Anything else you'd like to tell us?
Do you want to include your family in the stories?"
				bind:value={newSettings}
			></textarea>
		</div>
		<button class="btn variant-filled" on:click={handleUpdateSettings}> Write a story </button>
		{#if loading}
			<p>Loading...</p>
		{/if}
	</div>
</div>

<style lang="postcss">
</style>
