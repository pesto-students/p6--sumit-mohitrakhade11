function createStack() {
	let myitems = new Map();
	return {
		push(item) {
			myitems.set(item);
		},
		pop() {
			return myitems.delete();
		},
	};
}

const stack = createStack();
stack.push(10);
stack.push(5);
stack.pop(); 
console.log(stack.myitems);