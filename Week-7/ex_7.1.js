
var head;

class Node {
	constructor(val) {
		this.data = val;
		this.next = null;
	}
}

function reverse(head) {
	let prev = null;
	while (head) {
		[head.next, prev, head] = [prev, head, head.next];
	}
	return prev;
}
function printList(node) {
	while (node !== null) {
		console.log(node.data + " ");
		node = node.next;
	}
}

head = new Node(85);
head.next = new Node(15);
head.next.next = new Node(4);
head.next.next.next = new Node(20);

console.log("List - ");
printList(head);
head = reverse(head);
console.log("List Reversed - ");
printList(head);