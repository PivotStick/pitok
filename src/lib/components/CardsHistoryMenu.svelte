<script>
	import Card from './Card.svelte';

	/**
	 * @type {import("$lib/@types/card").Card[][]}
	 */
	export let rounds;

	let round = 0;

	$: points = rounds[round].reduce((acc, card) => acc + card.value, 0);
</script>

<div class="container">
	<div class="tabs">
		{#each rounds as _, i}
			<button class:active={i === round} on:click={() => (round = i)}>
				{i + 1}
			</button>
		{/each}
	</div>

	<div class="points">{points} points</div>

	<div class="cards">
		{#each rounds[round] as card (card.id)}
			<Card {card} />
		{:else}
			<div class="empty">Aucunes cartes</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		border: 1px solid #eee;
		background-color: white;
		border-radius: 1rem;
		overflow: auto;
		color: #333;

		font-size: 1rem;

		max-height: 25rem;
		width: 35rem;
	}

	.points {
		padding: 2rem;
		padding-bottom: 0;
		font-size: 1.5rem;
		font-weight: 900;
	}

	.tabs {
		display: flex;
		gap: 1rem;
		padding: 2rem;
		padding-bottom: 0;
		overflow: auto;

		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}

		button {
			border: 1px solid #eee;

			&:not(.active) {
				background-color: white;
				color: #aaa;
			}
		}
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
		padding: 2rem;
		gap: 1rem;

		font-size: 0.6rem;

		.empty {
			font-size: 2rem;
			font-weight: 900;
			width: max-content;
		}
	}
</style>
