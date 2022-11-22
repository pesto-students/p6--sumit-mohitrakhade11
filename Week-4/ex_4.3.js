const fibonacci = (n) => ({
	[Symbol.iterator]: () => {
		let i = 0;
		let previousNumber = 0,
			nextNumber = 0;
		return {
			next: () => {
				if (i++ < n) {
					[previousNumber, nextNumber] = [nextNumber, previousNumber + nextNumber || 1];
					return {
						value: previousNumber,
						done: false,
					};
				} else {
					return {
						done: true,
					};
				}
			},
		};
	},
});

console.log([...fibonacci(10)]);