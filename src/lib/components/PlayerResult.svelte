<script>
	import { clickoutside } from '$lib/actions/clickoutside';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { scale, slide } from 'svelte/transition';
	import CardsHistoryMenu from './CardsHistoryMenu.svelte';

	/**
	 * @type {import("$lib/stores/datas").Player & {
	 *  total: number;
	 * }}
	 */
	export let player;
	/**
	 * @type {number}
	 */
	export let index;
	/**
	 * @type {number}
	 */
	export let percent;

	const tween = tweened(0, {
		easing: expoOut,
		duration: 2000
	});

	let showName = false;
	let showHistory = false;

	onMount(() => {
		tween.set(player.total);
		const clear = setTimeout(() => {
			showName = true;
		}, 2500 + (1 - percent) * 3000);

		return () => {
			clearTimeout(clear);
		};
	});
</script>

<div class="player">
	<p class="points">{Math.round($tween)}</p>
	{#if showName}
		<h2 class="name" in:slide={{ easing: expoOut }}>
			{player.name}
			<button class="show-history" on:click={() => (showHistory = true)}>Historique</button>
		</h2>
	{/if}
	{#if $$slots.default}
		<p class="text"><slot /></p>
	{/if}

	{#if showHistory}
		<div class="history" transition:scale use:clickoutside={() => (showHistory = false)}>
			<CardsHistoryMenu rounds={player.cards} />
		</div>
	{/if}
</div>

<style lang="scss">
	.player {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5em;

		.text {
			font-weight: 900;
		}

		&:first-child {
			font-size: 1.75em;
			margin: 1em;
			color: var(--primary);
		}
	}

	.history {
		position: fixed;

		left: 50%;
		top: 50%;

		translate: -50% -50%;
	}

	.show-history {
		font-size: 1rem;
	}

	.name {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.points {
		font-size: 2.5em;
		font-weight: 900;
	}
</style>
