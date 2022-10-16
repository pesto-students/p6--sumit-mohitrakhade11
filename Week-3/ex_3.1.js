
const memoizedAdd = () => {
    let cache = {};
    return (n) => {
      if (n in cache) {
        console.log('from cache');
        return cache[n];
      }
      else {
        console.log('Calculated result');
        let result = n + 10;
        cache[n] = result;
        return result;
      }
    }
  }
  const newAdd = memoizedAdd();
  console.log(newAdd(9));
  console.log(newAdd(2));
  console.log(newAdd(9));
  console.log(newAdd(2));
  
  
  
  