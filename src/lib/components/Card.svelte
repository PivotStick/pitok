<script context="module">
	/**
	 * @type {Record<string, string>}
	 */
	const suits = {
		S: '♠',
		H: '♥',
		D: '♦',
		C: '♣',
		J: '🃏'
	};
</script>

<script>
	/**
	 * @type {import("$lib/@types/card").Card}
	 */
	export let card;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card {card.suit}" on:click>
	<div class="corner top">
		{card.corner}
	</div>

	<div class="suit">
		{suits[card.suit] || card.suit}
	</div>

	<div class="corner bottom">
		{card.corner}
	</div>
</div>

<style lang="scss">
	.card {
		user-select: none;
		border: 1px solid #eee;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		padding: 1em;
		border-radius: 1em;
		aspect-ratio: 1 / 1.5;

		&.H,
		&.D {
			color: red;
		}

		&.J,
		&.S,
		&.C {
			color: black;
		}

		.suit {
			align-self: center;
			font-size: 3em;
		}

		.corner {
			font-weight: 900;
			font-size: 2em;

			&.top {
				align-self: flex-start;
			}

			&.bottom {
				align-self: flex-end;
			}
		}
	}
</style>
