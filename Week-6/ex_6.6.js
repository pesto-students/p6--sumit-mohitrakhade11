const threeSumClosest = (nums, target) => {
	nums.sort((a, b) => a - b);
	let low = 0,
		high = 0,
		res = 0,
		sum = 0;
	let closeness = Number.MAX_VALUE;
	for (let i = 0; i < nums.length - 2; i++) {
		low = i + 1;
		high = nums.length - 1;
		while (low < high) {
			sum = nums[i] + nums[low] + nums[high];
			if (sum - target === 0) {
				return sum;
			}
			if (closeness > Math.abs(sum - target)) {
				closeness = Math.abs(sum - target);
				res = sum;
			}
			if (sum > target) high--;
			else low++;
		}
	}
	return res;
};
const nums = [-1, 2, 1, -4];
console.log(threeSumClosest(nums, 1));