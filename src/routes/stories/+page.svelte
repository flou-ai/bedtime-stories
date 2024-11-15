<script lang="ts">
	import { transition } from '$lib/flou';
	import { goto, invalidateAll } from '$app/navigation';
	import { tick } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let loading = false;

	$: ({ ltm } = data);
	$: stories = ltm.state.stories || [];

	const handleCreateStory = async () => {
		loading = true;
		const story = await transition(
			ltm.id,
			'write_story',
			'bedtime_story_writer_2',
			{},
			'bedtime_story_writer_2:story_written'
		);
		console.log('story', story);
		// refresh the ltm
		await invalidateAll();
		await tick();
		// go to last story
		goto(`/stories/${ltm.state.stories.length - 1}`);
	};
</script>

<div class="container mx-auto p-4 space-y-8">
	<div class="flex justify-between items-center">
		<h1 class="h1">Your Stories</h1>
		<button class="btn variant-filled" on:click={handleCreateStory} disabled={loading}>
			{#if loading}
				Creating story...
			{:else}
				Create New Story
			{/if}
		</button>
	</div>

	{#if stories.length === 0}
		<p class="text-center py-8">
			No stories yet. Click the button above to create your first story!
		</p>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each stories as story, i}
				<div class="card p-4 space-y-4">
					<h3 class="h3">Story {i + 1}</h3>
					<p class="line-clamp-3">{story}</p>
					<div class="flex justify-end">
						<button class="btn variant-ghost" on:click={() => goto(`/stories/${i}`)}>
							Read More
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
