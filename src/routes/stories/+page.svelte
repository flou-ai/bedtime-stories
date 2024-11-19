<script lang="ts">
	import { transition } from '$lib/flou';
	import { goto, invalidateAll } from '$app/navigation';
	import { tick } from 'svelte';
	import type { PageData } from './$types';
	import { format } from 'timeago.js';

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

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
</script>

<div class="flex flex-wrap justify-between items-center align-center gap-y-4 gap-x-4">
	<h1 class="h1">Bedtime Stories</h1>
	<div class="flex flex-wrap gap-4">
		<button class="btn variant-outline-primary" on:click={handleCreateStory} disabled={loading}>
			{#if loading}
				Creating story...
			{:else}
				Create New Story
			{/if}
		</button>
		<button class="btn variant-outline-primary" on:click={() => goto('/instructions')}>
			Modify stories instructions
		</button>
	</div>
</div>

{#if stories.length === 0}
	<p class="text-center py-8">No stories yet. Click the button above to create your first story!</p>
{:else}
	<div class="grid gap-20 !my-20">
		{#each stories.slice().reverse() as story, i}
			<div class="text-justify mx-auto max-w-65ch">
				<div title={formatDate(story.date)}>{format(story.date)}</div>
				<a href={`/stories/${stories.length - 1 - i}`} class="">
					<h3 class="h3">{story.title}</h3>
					<p class="line-clamp-3 prose dark:prose-invert ">{story.summary}</p>
				</a>
				<div class="flex flex-wrap justify-end gap-y-4">
					<button class="btn !p-0" on:click={() => goto('/stories')}> Continue Story → </button>
				</div>
			</div>
		{/each}
	</div>
{/if}
