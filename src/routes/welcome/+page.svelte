<script lang="ts">
	import { transition } from '$lib/flou';
	import { goto, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import { tick } from 'svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data: PageData;
	let newInstructions: string = '';
	let status: 'idle' | 'instructions' | 'writing' = 'idle';

	$: ({ ltm } = data);

	const handleUpdateInstructions = async () => {
		status = 'instructions';
		await transition(
			ltm.id,
			'update_instructions',
			'bedtime_story_writer_2',
			{ writing_instructions: newInstructions },
			'bedtime_story_writer_2:instructions_updated'
		);
		status = 'writing';
		// write the first story
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
</script>

<div class="text-center space-y-4">
	<h2 class="h2">Welcome to Bedtime Stories</h2>
	<p>
		Please tell us a bit about your family :)
		<br />
		<small>(You can modify this later)</small>
	</p>

	<textarea
		rows={4}
		class="w-full md:w-[600px] dark:bg-surface-700"
		placeholder="What kind of stories would you like?
Do you have a preferred length?
Anything else you'd like to tell us?
Do you want to include your family in the stories?"
		bind:value={newInstructions}
	></textarea>

{#if status === 'idle'}
	<button class="btn variant-filled" on:click={handleUpdateInstructions}> Write a story </button>
{:else if status === 'instructions'}
	<p class="flex items-center gap-2">
		<ProgressRadial width="w-6" stroke={100} />
		Setting up writing instructions
	</p>
{:else if status === 'writing'}
	<p class="flex items-center gap-2">
		<ProgressRadial width="w-6" stroke={100} />
		Writing your first story
	</p>
{/if}

</div>