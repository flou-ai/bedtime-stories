<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { goto, invalidateAll } from '$app/navigation';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	export let data: PageData;
	$: ({ ltm } = data);

	const handleRestart = async () => {
		localStorage.clear();
		await invalidateAll();
		goto('/');
	};
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Bedtime Stories</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://flou.ai?utm_source=bedtimestories"
					target="_blank"
					rel="noreferrer"
				>
					Made with Flou
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href={`http://localhost:5173/inspect/${ltm.id}`}
					target="_blank"
					rel="noreferrer"
				>
					Inspect in Studio
				</a>
				<button
					class="btn btn-sm variant-ghost-surface"
					on:click={handleRestart}
				>
					Restart
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
