<script>
	import { cards } from '$lib/cards';
	import { onMount } from 'svelte';
	import Card from './Card.svelte';

	/**
	 * @type {import("$lib/@types/card").Card[] | undefined}
	 */
	export let selection = undefined;

	let filters = [
		{
			name: 'Piques',
			suit: 'S',
			icon: '♠'
		},
		{
			name: 'Coeurs',
			suit: 'H',
			icon: '♥'
		},
		{
			name: 'Trèfles',
			suit: 'C',
			icon: '♣'
		},
		{
			name: 'Carreaux',
			suit: 'D',
			icon: '♦'
		},
		{
			name: 'Joker',
			suit: 'J',
			icon: '🃏'
		}
	];

	/**
	 * @type {typeof filters[number] | null}
	 */
	let filter = null;

	onMount(() => {
		if (selection === undefined) {
			selection = [];
		}
	});

	$: filteredCards = filter !== null ? cards.filter((card) => filter?.suit === card.suit) : cards;
</script>

<div class="container">
	<ul class="filters">
		{#each filters as f}
			{@const active = f === filter}
			<li class:active class={f.suit}>
				<button on:click={() => (filter = active ? null : f)}>
					{f.icon}
					{f.name}
				</button>
			</li>
		{/each}
	</ul>

	<div class="cards">
		{#each filteredCards as card (card.id)}
			{@const selected = selection?.includes(card)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="card"
				class:selected
				style:font-size=".5rem"
				on:click={() => {
					if (!selection) selection = [];

					if (selected) {
						selection = selection.filter((c) => c !== card);
					} else {
						selection = [...selection, card];
					}
				}}
			>
				<Card {card} />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		cursor: default;
		border: 1px solid #eee;
		background-color: white;
		border-radius: 1em;

		height: 25em;
		width: 35em;
		overflow: auto;
	}

	.points {
		padding: 2rem;
		padding-bottom: 0;
		text-align: start;
		font-weight: 900;
		font-size: 1.5rem;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(4em, 1fr));
		gap: 1em;
		padding: 2em;
	}

	.card {
		cursor: pointer;
		border-radius: 1em;
		outline: 0px solid #f1f1f1;

		transition-property: outline-width;

		&.selected {
			outline-width: 0.5em;
		}
	}

	.filters {
		display: flex;
		gap: 1em;

		overflow: auto;
		padding: 2em;
		padding-bottom: 0;
		align-items: stretch;

		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}

		li {
			flex-shrink: 0;

			--active-clr: black;

			button {
				border: 1px solid #eee;
				background-color: white;
				color: #aaa;
				height: 100%;
			}

			&.S,
			&.C,
			&.J {
				--active-clr: #000;
			}

			&.H,
			&.D {
				--active-clr: #f00;
			}

			&.active {
				button {
					background-color: #eee;
					color: var(--active-clr);
				}
			}
		}
	}
</style>
