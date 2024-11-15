<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ ltm, params } = data);
	$: story = ltm.state.stories[params.id];
</script>

<div class="container mx-auto p-4 space-y-8">
	<div class="flex justify-between items-center">
		<h1 class="h1">Story #{params.id + 1}</h1>
		<button class="btn variant-ghost" on:click={() => goto('/stories')}> Back to Stories </button>
	</div>

	<div class="card p-6">
        <div class="prose max-w-none">
            {#each story.split('\n') as paragraph}
                <p>{paragraph}</p>
            {/each}
        </div>
	</div>
</div>
