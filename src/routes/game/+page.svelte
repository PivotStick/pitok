<script>
	import { goto } from '$app/navigation';
	import PointsSelector from '$lib/components/CardsSelector.svelte';
	import { datas } from '$lib/stores/datas';
	import { scale, slide } from 'svelte/transition';

	const nextRound = () => {
		$datas.round++;

		if ($datas.round === $datas.roundCount) {
			goto('/results');
		}
	};

	$: current = ($datas.round + $datas.randomOffset) % $datas.players.length;
	$: round = $datas.round + 1;
</script>

<main>
	<h1 class="title">
		{#if $datas.round === $datas.roundCount}
			Finis !
		{:else}
			Tour {round} /
			<input type="number" min={round} bind:value={$datas.roundCount} />
		{/if}
	</h1>

	{#each $datas.players as player, i}
		<div class="player">
			<h2 style="color: {current === i ? 'var(--primary)' : 'currentColor'}">
				{player.name}
			</h2>
			<PointsSelector bind:selection={player.cards[$datas.round]} />
		</div>
	{/each}

	{#if $datas.players.every((p) => typeof p.cards[$datas.round] !== 'undefined')}
		<button in:slide on:click={nextRound}>
			{#if round === $datas.roundCount}
				Finir
			{:else}
				Tour suivant
			{/if}
		</button>
	{/if}
</main>

<style lang="scss">
	main {
		display: grid;
		place-content: center;

		gap: 1.5em;

		height: 100vh;

		.title {
			text-align: center;
			font-weight: 900;
			font-size: 3em;
			margin-bottom: 1em;
			padding-bottom: 0.25em;
			border-bottom: 1px solid currentColor;

			input {
				font: inherit;
				border-radius: 0;
				border: none;
				padding: 0;
				outline: none;
				width: 4ch;
				min-width: 0;
			}
		}
	}

	.player {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
	}
</style>
