<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ ltm, params } = data);
	$: story = ltm.state.stories[params.id];
</script>

<div class="flex flex-wrap justify-between items-center align-center gap-y-4">
	<h1 class="h1">{story.title}</h1>
	<button class="btn !p-0" on:click={() => goto('/stories')}> ← Back to Stories </button>
</div>

<div class="prose dark:prose-invert !my-20 text-justify mx-auto">
	{#each story.content.split('\n') as paragraph}
		<p>{paragraph}</p>
	{/each}
</div>


<div class="flex flex-wrap justify-between items-center align-center gap-y-4 !mb-20">
	<button class="btn !p-0" on:click={() => goto('/stories')}> ← Back to Stories </button>
	<button class="btn !p-0" on:click={() => goto('/stories')}> Continue Story → </button>
</div>
