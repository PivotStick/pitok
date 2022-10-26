/**
 * @param {HTMLElement} node
 * @param {() => void} callback
 */
export const clickoutside = (node, callback) => {
	/**
	 * @param {MouseEvent} e
	 */
	const mousedown = (e) => {
		if (e.target instanceof HTMLElement && !node.contains(e.target)) {
			callback();
		}
	};

	window.addEventListener('mousedown', mousedown);

	return {
		destroy() {
			window.removeEventListener('mousedown', mousedown);
		}
	};
};
