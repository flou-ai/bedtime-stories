<script lang="ts">
	import '../app.postcss';
	import type { PageData } from './$types';
	import { goto, invalidateAll } from '$app/navigation';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { LightSwitch } from '@skeletonlabs/skeleton';

	export let data: PageData;
	$: ({ ltm } = data);

	const handleRestart = async () => {
		localStorage.clear();
		await invalidateAll();
		goto('/');
	};

	let isMenuOpen = false;
	const toggleMenu = () => (isMenuOpen = !isMenuOpen);
</script>

<!-- App Shell -->
<div class="min-h-screen">
	<header class="sticky top-0 z-10 backdrop-blur-sm p-4">
		<nav class="container mx-auto flex flex-wrap items-center justify-between">
			<a href="/" class="text-xl uppercase font-bold">Bedtime Stories</a>

			<!-- Hamburger button -->
			<button class="lg:hidden p-2" on:click={toggleMenu} aria-label="Toggle menu">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if isMenuOpen}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					{:else}
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					{/if}
				</svg>
			</button>

			<!-- Navigation links -->
			<div class={`w-full lg:w-auto lg:flex ${isMenuOpen ? 'block' : 'hidden'} mt-4 lg:mt-0`}>
				<div class="flex flex-col lg:flex-row gap-2 items-center">
					<a
						class="btn btn-sm"
						href={`http://localhost:5173/inspect/${ltm.id}`}
						target="_blank"
						rel="noreferrer"
					>
						Inspect in Studio
					</a>
					<button class="btn btn-sm" on:click={handleRestart}> Restart </button>
					<LightSwitch />
				</div>
			</div>
		</nav>
	</header>
	<main class="space-y-4 px-4 container mx-auto max-w-3xl">
		<slot />
	</main>
	<footer class="p-4 text-center">
		<p>
			<span class="[text-shadow:_0_-1px_2px_rgba(0,0,0,0.15)]">⭐</span> Powered by <a class="underline hover:text-primary-500 transition-colors" href="https://flou.ai" target="_blank" rel="noreferrer">Flou</a> <span class="[text-shadow:_0_1px_2px_rgba(0,0,0,0.15)]">⭐</span>
		</p>
	</footer>
</div>
