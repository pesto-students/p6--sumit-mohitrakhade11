function createIncrement() {
    let count=0;
    function increment() {
    count++;
    }
    let message=`Count is${count}`;
    function log() {
    console.log(message);
       }
    return[increment,log];
    }
    const[increment,log] =createIncrement();
    increment();
    increment();
    increment();
    log();

// o/p : Count is0
// count is 0 because when increment() is invoked 
// thrice but it did't changed the value of count because message() is taking
// value from globel scope not from scope of increment().