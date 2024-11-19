<script lang="ts">
	import { transition } from '$lib/flou';
	import { goto, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import { tick } from 'svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data: PageData;
	let newWritingInstructions: string = '';
	let loading: boolean = false;
	let status: 'idle' | 'instructions' | 'writing' = 'idle';

	$: ({ ltm } = data);

	const handleUpdateInstructions = async () => {
		status = 'instructions';
		await transition(
			ltm.id,
			'update_instructions',
			'bedtime_story_writer_2',
			{ writing_instructions: newWritingInstructions },
			'bedtime_story_writer_2:instructions_updated'
		);
		// write the first story
		status = 'writing';
		await transition(
			ltm.id,
			'write_story',
			'bedtime_story_writer_2',
			{},
			'bedtime_story_writer_2:story_written'
		);
		// refresh the ltm
		await invalidateAll();
		await tick();
		// go to last story
		goto(`/stories/${ltm.state.stories.length - 1}`);
	};

	const handleSaveInstructions = async () => {
		status = 'instructions';
		await transition(
			ltm.id,
			'update_instructions',
			'bedtime_story_writer_2',
			{ writing_instructions: newWritingInstructions },
			'bedtime_story_writer_2:instructions_updated'
		);
		await invalidateAll();
		goto('/stories');
	};
</script>

<div class="text-center space-y-4">
	<h2 class="h2">Bedtime Stories: writing instructions</h2>
	<div class="flex justify-center space-x-2"></div>
	<p>
		What would you like for your stories?
		<br />
		<small> You can modify this later. </small>
	</p>
	<textarea
		rows={4}
		class="w-full md:w-[600px]"
		placeholder="What kind of stories would you like?
Do you have a preferred length?
Anything else you'd like to tell us?
Do you want to include your family in the stories?"
		bind:value={newWritingInstructions}
	></textarea>
	<div class="flex justify-center gap-4">
		{#if status === 'idle'}
			<button class="btn variant-filled" on:click={handleSaveInstructions}>
				Save new instructions
			</button>
			<button class="btn variant-filled" on:click={handleUpdateInstructions}>
				Update instructions and write a story
			</button>
		{:else if status === 'instructions'}
			<p class="flex items-center gap-2">
				<ProgressRadial width="w-6" stroke={100} />
				Setting up writing instructions
			</p>
		{:else if status === 'writing'}
			<p class="flex items-center gap-2">
				<ProgressRadial width="w-6" stroke={100} />
				Writing your bedtime story
			</p>
		{/if}
	</div>
</div>

<style lang="postcss">
</style>
