var head;

class Node {
	constructor(val) {
		this.data = val;
		this.next = null;
	}
}

function rotate(head, k) {
	if (!head || !head.next || k === 0) return head;
	let len = 1;
	let temp = head;
	while (temp.next !== null) {
		len++;
		temp = temp.next;
		if (temp.next === null) {
			temp.next = head;
			break;
		}
	}
	k = k % len;
	if (k === 0) {
		temp.next = null;
		return head;
	}
	while (--k) {
		head = head.next;
	}
	temp = head;
	head = head.next;
	temp.next = null;
	return head;
}
function printList(node) {
	while (node !== null) {
		console.log(node.data + " ");
		node = node.next;
	}
}

head = new Node(2);
head.next = new Node(4);
head.next.next = new Node(7);
head.next.next.next = new Node(8);
head.next.next.next.next = new Node(9);

console.log("List - ");
printList(head);
head = rotate(head, 6);
console.log("List Rotated - ");
printList(head);