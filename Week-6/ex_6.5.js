const pairWithADifference = (nums, k) => {
	// O(nlogn)
	nums.sort((a, b) => a - b);
	let i = 0,
		j = 1;
	while (i < nums.length && j < nums.length) {
		if (i !== j && (nums[j] - nums[i] === k || nums[i] - nums[j] === k)) {
			return 1;
		} else if (nums[j] - nums[i] > k) {
			i++;
		} else if (nums[j] - nums[i] < k) {
			j++;
		}
	}
	return 0;
};
var nums = [1, 2, 4, 5, 3, 1];
console.log(pairWithADifference(nums, 2));