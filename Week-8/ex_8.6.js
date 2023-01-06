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

const getAllPath = (graph, end) => {
	const result = [];
	const path = [];
	const search = (target) => {
		path.push(target);
		if (target === end) {
			result.push([...path]);
		}
		graph[target].forEach((i) => {
			search(i);
		});
		path.pop();
	};
	search(0);
	return result;
};

const newGraph = new Graph();
for (let i = 0; i < 5; i++) {
	newGraph.addVertex(i);
}
newGraph.addOrRemoveEdge(0, 1, 1);
newGraph.addOrRemoveEdge(0, 3, 1);
newGraph.addOrRemoveEdge(0, 4, 1);
newGraph.addOrRemoveEdge(1, 2, 1);
newGraph.addOrRemoveEdge(1, 3, 1);
newGraph.addOrRemoveEdge(2, 3, 1);
newGraph.addOrRemoveEdge(3, 4, 1);
newGraph.addOrRemoveEdge(1, 4, 1);
newGraph.logList();
console.log(getAllPath(newGraph.list, 4));