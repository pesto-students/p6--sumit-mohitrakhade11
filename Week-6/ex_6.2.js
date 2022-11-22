// O(n)
const spiralOrder = (matrix) => {
	let ans = [];
	if (matrix[0].length === 1 && matrix.length === 1) {
		return matrix[0];
	}
	let top = 0,
		bottom = matrix.length - 1,
		left = 0,
		right = matrix[0].length - 1;
	// 0 - left to right
	// 1 - top to bottom
	// 2 - right to left
	// 3 - bottom to top
	let direction = 0;
	while (top <= bottom && left <= right) {
		if (direction === 0) {
			for (let i = left; i <= right; i++) {
				ans.push(matrix[top][i]);
			}
			top++;
		} else if (direction === 1) {
			for (let i = top; i <= bottom; i++) {
				ans.push(matrix[i][right]);
			}
			right--;
		} else if (direction === 2) {
			for (let i = right; i >= left; i--) {
				ans.push(matrix[bottom][i]);
			}
			bottom--;
		} else if (direction === 3) {
			for (let i = bottom; i >= top; i--) {
				ans.push(matrix[i][left]);
			}
			left++;
		}
		direction = (direction + 1) % 4;
	}
	return ans;
};
const nums = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];
console.log(spiralOrder(nums));