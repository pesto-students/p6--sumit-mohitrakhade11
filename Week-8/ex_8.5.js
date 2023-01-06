class Graph {
	constructor() {
		this.list = [];
	}
	addVertex(vertex) {
		if (this.list[vertex]) {
			return "Vertex already exists!";
		}
		this.list[vertex] = new Set();
	}
	addOrRemoveEdge(firstVertex, secondVertex, what) {
		if (!this.list[firstVertex]) {
			return `${firstVertex} not found!`;
		}
		if (!this.list[secondVertex]) {
			return `${secondVertex} not found!`;
		}
		if (what) {
			this.list[firstVertex].add(secondVertex);
		} else {
			this.list[firstVertex].delete(secondVertex);
		}
	}
	removeVertex(vertex) {
		if (!this.list[vertex]) {
			return "Vertex doesn't exists!";
		}
		for (let i of this.list[vertex]) {
			this.addOrRemoveEdge(i, vertex, 0);
		}
		delete this.list[vertex];
	}
	logList() {
		for (let i in this.list) {
			console.log(i, [...this.list[i]]);
		}
	}
}

const arrayConverter = (list) => {
	result = [];
	subarray = [];
	for (let i = 1; i <= list.length - 1; i++) {
		list[i].forEach((element) => {
			subarray.push(i);
			subarray.push(element);
			if (subarray.length === 2) {
				result.push(subarray);
				subarray = [];
			}
		});
	}
	return result;
};

const findJudge = (trust, n) => {
	const arr = new Array(n + 1).fill(0);
	for (let [i, j] of trust) {
		--arr[i];
		++arr[j];
	}
	for (let i = 1; i < arr.length; ++i) {
		if (arr[i] === n - 1) {
			return i;
		}
	}
	return -1;
};

const newGraph = new Graph();
for (let i = 1; i < 3; i++) {
	newGraph.addVertex(i);
}
newGraph.addOrRemoveEdge(1, 2, 1);
newGraph.logList();
console.log(arrayConverter(newGraph.list));
console.log(findJudge(arrayConverter(newGraph.list), 2));