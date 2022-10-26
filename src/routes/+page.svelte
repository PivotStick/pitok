<script>
	import { goto } from '$app/navigation';
	import { datas } from '$lib/stores/datas';
	import { onMount } from 'svelte';

	const APP_NAME = 'PITOK';

	let name = '';

	const submit = () => {
		name = name.trim();

		if ($datas.players.find((p) => p.name.toLowerCase() === name.toLowerCase())) {
			alert('Ce nom est déjà pris');
			return;
		}

		datas.update((v) => {
			v.players.push({ name, cards: [] });
			return v;
		});

		name = '';
	};

	onMount(datas.resetScores);

	$: $datas.randomOffset = Math.floor(Math.random() * $datas.players.length);
</script>

<main>
	<h1 class="app-name">
		{#each APP_NAME as letter, i}
			<span style:--index={i}>{letter}</span>
		{/each}
	</h1>

	<label>
		Nombre de tours (1 minimum)
		<input type="number" bind:value={$datas.roundCount} min="1" />
	</label>

	{#each $datas.players as player}
		<div class="player">
			<input type="text" bind:value={player.name} />
			<button
				class="delete"
				on:click={() => {
					datas.update((v) => {
						v.players = v.players.filter((p) => p !== player);
						return v;
					});
				}}
			>
				Supprimer
			</button>
		</div>
	{/each}
	<form on:submit|preventDefault={submit}>
		<input type="text" bind:value={name} placeholder="Nom du joueur" />
		<button type="submit">Ajouter</button>
	</form>

	<button
		class="start"
		disabled={$datas.players.length < 2 || $datas.roundCount < 1}
		on:click={() => {
			goto('/game');
		}}
	>
		Commencer
	</button>
</main>

<style lang="scss">
	main {
		display: grid;
		place-content: center;

		gap: 1em;
		height: 100vh;
	}

	.start {
		background-color: black;
		color: white;
	}

	.player {
		.delete {
			background-color: var(--primary);
			color: white;
		}

		&:nth-child(even) {
			.delete {
				background-color: black;
			}
		}
	}

	.app-name {
		display: flex;
		justify-content: center;

		font-size: 4em;
		margin-bottom: 2em;
		gap: 0.5em;

		span {
			display: block;
			animation: float 1000ms ease calc(var(--index, 0) * -200ms) infinite alternate;

			&:nth-child(odd) {
				color: var(--primary);
			}
		}
	}

	@keyframes float {
		0% {
			transform: translateY(0.5em) rotate(-15deg);
		}
		100% {
			transform: translateY(-0.25em) rotate(15deg);
		}
	}
</style>
