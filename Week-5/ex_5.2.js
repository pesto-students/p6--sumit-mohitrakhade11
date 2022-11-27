const vowelCount = (str) => {
	const vowelMap = new Map();
	for (let char of str) {
		if ("aeiou".includes(char.toLowerCase())) {
			vowelMap.has(char.toLowerCase()) ? vowelMap.set(char.toLowerCase(), vowelMap.get(char.toLowerCase()) + 1) : vowelMap.set(char.toLowerCase(), 1);
		}
	}
	console.log(vowelMap);
};
vowelCount("pesto tech assignment");