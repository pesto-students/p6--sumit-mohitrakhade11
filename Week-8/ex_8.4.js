class Graph {
	constructor() {
		this.list = {};
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
			this.list[secondVertex].add(firstVertex);
		} else {
			this.list[firstVertex].delete(secondVertex);
			this.list[secondVertex].delete(firstVertex);
		}
	}
	removeVertex(vertex) {
		if (!this.list[vertex]) {
			return "Vertex doesn't exist!";
		}
		for (let i of this.list[vertex]) {
			this.addOrRemoveEdge(i, vertex, 0);
		}
		delete this.list[vertex];
	}
	getList() {
		for (let i in this.list) {
			console.log(i, [...this.list[i]]);
		}
		return this.list;
	}
}

const checkPath = (graph) => {
	for (let i in graph) {
		if (graph[i].size < 2) {
			return false;
		}
	}
	return true;
};

const newGraph = new Graph();
newGraph.addVertex(0);
newGraph.addVertex(1);
newGraph.addVertex(2);
newGraph.addVertex(3);
newGraph.addVertex(4);
newGraph.addVertex(5);
newGraph.addOrRemoveEdge(0, 1, 1);
newGraph.addOrRemoveEdge(0, 2, 1);
newGraph.addOrRemoveEdge(3, 4, 1);
newGraph.addOrRemoveEdge(4, 5, 1);
newGraph.addOrRemoveEdge(5, 3, 1);
console.log(checkPath(newGraph.getList()));