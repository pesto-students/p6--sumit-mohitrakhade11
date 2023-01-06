
var nextGreaterElement = function (nums) {
	let newArr = [];
	let m = new Map();
	for (let n of nums) {
		while (newArr.length && newArr[newArr.length - 1] < n) {
			m.set(newArr[newArr.length - 1], n);
			newArr.pop();
		}
		newArr.push(n);
	}
	let ans = [];
	for (let n of nums) {
		ans.push(m.has(n) ? m.get(n) : -1);
	}
	return ans;
};
var nums = [6, 8, 0, 1, 3];
console.log(nextGreaterElement(nums));