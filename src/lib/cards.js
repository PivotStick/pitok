const suits = ['C', 'D', 'H', 'S'];
const redKings = ['D13', 'H13'];
const names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'D', 'R'];

/**
 * @type {import("./@types/card").Card[]}
 */
export const cards = [
	...Array(2)
		.fill(undefined)
		.map((_, i) => ({
			id: `J${i + 1}`,
			suit: 'J',
			corner: 'J',
			value: -1
		})),
	...suits.flatMap((suit) =>
		Array(13)
			.fill(undefined)
			.map((_, i) => {
				const n = i + 1;
				const id = `${suit}${n}`;
				return {
					id,
					suit,
					corner: names[i],
					value: redKings.includes(id) ? 0 : Math.min(n, 10)
				};
			})
	)
];
