class TreeNode {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

const createTree = (i, array) => {
	let current = null;
	if (i < array.length) {
		current = new TreeNode(array[i]);
		current.left = createTree(2 * i + 1, array);
		current.right = createTree(2 * i + 2, array);
	}
	return current;
};

const maxDepth = (node, depth) => {
	if (node === null) {
		return depth;
	}
	depth++;
	const left = maxDepth(node.left, depth);
	const right = maxDepth(node.right, depth);
	return Math.max(left, right);
};

console.log(maxDepth(createTree(0, [5, 3, 6, 2, 4, 1, 7, 9, 10, 11]), 0));