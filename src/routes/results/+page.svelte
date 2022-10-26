<script>
	import { goto } from '$app/navigation';
	import { datas } from '$lib/stores/datas';
	import PlayerResult from '$lib/components/PlayerResult.svelte';

	const texts = [
		'Le DIEU VIVANT 😱',
		'Ouais respect 😎',
		"Bon écoute, c'est pas mal 😏",
		'Tu peux faire mieux 😒',
		"Bon, c'est pas terrible 😑",
		"T'es qui gros ? 😤",
		'Tu peux pas faire pire 😡',
		'Sors de chez moi le sang'
	];

	$: players = $datas.players
		.map((p) => ({
			name: p.name,
			cards: p.cards,
			total: p.cards.reduce((a, b) => a + b.reduce((pc, cc) => pc + cc.value, 0), 0)
		}))
		.sort((a, b) => a.total - b.total);
</script>

<main>
	{#each players as player, i (player.name)}
		{@const percent = i / players.length}
		{@const text = texts[Math.floor(percent * texts.length)]}
		<PlayerResult {percent} index={i} {player}>{text}</PlayerResult>
	{/each}
	<div class="buttons">
		<button
			on:click={() => {
				goto('/game');
				datas.resetScores();
			}}
		>
			Recommencer
		</button>
		<button
			on:click={() => {
				goto('/');
			}}
		>
			Nouvelle partie
		</button>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2em;

		height: 100vh;

		.buttons {
			margin-top: 2em;

			display: flex;
			gap: 1em;
		}
	}
</style>
