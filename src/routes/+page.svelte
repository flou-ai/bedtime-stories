<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ ltm } = data);

	onMount(() => {
		console.log(data);
		if (!ltm.state.writing_instructions) {
			goto('/welcome');
		} else {
			goto('/stories');
		}
	});
</script>
