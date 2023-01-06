class TreeNode {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

const isBST = (root) => {
	if (!root) return false;
	const array = [root];
	let node;
	while (array.length) {
		node = array.shift() ?? null;
		if (node) {
			if (node.left) {
				if (node.left.value < node.value) {
					array.push(node.left);
				} else {
					return false;
				}
			}
			if (node.right) {
				if (node.right.value > node.value) {
					array.push(node.right);
				} else {
					return false;
				}
			}
		}
	}
	return true;
};

// let root = new TreeNode(2);
// root.left = new TreeNode(1);
// root.right = new TreeNode(3);

let root = new TreeNode(5);
root.left = new TreeNode(1);
root.right = new TreeNode(4);
root.right.left = new TreeNode(3);
root.right.right = new TreeNode(6);

console.log(isBST(root));