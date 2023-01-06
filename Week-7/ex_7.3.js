var head;

class Node {
	constructor(val) {
		this.data = val;
		this.next = null;
	}
}

function hasCycle(head) {
	if (head === null) return false;
	let fast = head;
	let slow = head;
	while (fast.next !== null && fast.next.next !== null) {
		fast = fast.next.next;
		slow = slow.next;
		if (fast === slow) return true;
	}
	return false;
}

head = new Node(85);
head.next = new Node(15);
head.next.next = new Node(4);
head.next.next.next = new Node(20);
head.next.next.next.next = new Node(22);
head.next.next.next.next.next = head.next.next;

console.log(hasCycle(head));