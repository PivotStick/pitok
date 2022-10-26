import { writable } from 'svelte/store';

const key = '______DATAS';

/**
 * @typedef {{
 * 	name: string;
 * 	cards: import('$lib/@types/card').Card[][];
 * }} Player
 *
 * @type {Player[]}
 */
let players = [];

const d = {
	roundCount: 0,
	players,
	round: 0,
	randomOffset: 0
};

const init = () => {
	/**
	 * @type {import('svelte/store').Writable<typeof d>}
	 */
	const store = writable(JSON.parse(localStorage.getItem(key) || JSON.stringify(d)));

	store.subscribe((value) => localStorage.setItem(key, JSON.stringify(value)));

	return {
		...store,
		resetScores: () => {
			store.update((d) => {
				d.round = 0;
				d.players.forEach((p) => (p.cards = []));
				d.randomOffset = Math.floor(Math.random() * d.players.length);
				return d;
			});
		}
	};
};

export const datas = init();
