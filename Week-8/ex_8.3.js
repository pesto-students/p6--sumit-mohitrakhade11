class TreeNode {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

const createBinaryTree = (array) => {
	if (!array.length) return null;
	const root = new TreeNode(array[0]);
	const queue = [root];
	let i = 1;
	while (queue.length && i < array.length) {
		const node = queue.shift();
		if (array[i]) {
			node.left = new TreeNode(array[i]);
			queue.push(node.left);
		}
		if (array[i + 1]) {
			node.right = new TreeNode(array[i + 1]);
			queue.push(node.right);
		}
		i += 2;
	}
	return root;
};

const levelOrder = (root) => {
	if (!root) return [];
	const queue = [root];
	const result = [];
	while (queue.length) {
		const level = [];
		const length = queue.length;
		for (let i = 0; i < length; i++) {
			const node = queue.shift();
			if (node) {
				level.push(node.value);
				if (node.left) {
					queue.push(node.left);
				}
				if (node.right) {
					queue.push(node.right);
				}
			}
		}
		result.push(level);
	}
	return result;
};

console.log(levelOrder(createBinaryTree([3, 9, 20, null, null, 15, 7])));