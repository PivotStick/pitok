<script>
	import { clickoutside } from '$lib/actions/clickoutside';
	import { scale } from 'svelte/transition';
	import CardsMenu from './CardsMenu.svelte';

	/**
	 * @type {import("$lib/@types/card").Card[] | undefined}
	 */
	export let selection = undefined;

	let show = false;
</script>

<button on:click={() => (show = true)}>
	{#if selection === undefined}
		🔎
	{:else}
		✅
	{/if}
</button>

{#if show}
	<div transition:scale class="menu" use:clickoutside={() => (show = false)}>
		<CardsMenu bind:selection />
	</div>
{/if}

<style>
	.menu {
		position: fixed;
		left: 50%;
		top: 50%;

		translate: -50% -50%;

		z-index: 10;
	}
</style>
