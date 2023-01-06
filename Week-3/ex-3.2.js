// call function
let hero = {
    firstname:"john",
    lastname:"wick",
    
}
let printFullname = function(hometown, country) {
    console.log(this.firstname +" "+ this.lastname + " from " + hometown + ", "+ country)
}
let hero2 ={
    firstname: "thomas",
    lastname : "shelby",
}

// call method with function borrowing
console.log(" call method")
printFullname.call(hero2,"small heath", "london" )
printFullname.call(hero, "continetal", "illuminati")


// only differnce between call and apply is parameter is passed as a array in apply
console.log(" apply method")
printFullname.apply(hero2,["small heath", "london"])
printFullname.apply(hero, ["continetal", "illuminati"])

// bind
// bind method is much similar to call but diff is
//insted of directly calling method it binds method binds method with object and returns as a copy of that method i.e function

let printName = printFullname.bind(hero2,"small heath", "london")
console.log(" bind method")
printName();