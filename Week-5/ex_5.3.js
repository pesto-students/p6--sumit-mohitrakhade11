const hasDuplicate = (arr) => new Set(arr).size === arr.length;
console.log(hasDuplicate([1, 3, 4, 2, 5, 2, 9]) ? "The array does not have duplicates." : "The array does have duplicates.");