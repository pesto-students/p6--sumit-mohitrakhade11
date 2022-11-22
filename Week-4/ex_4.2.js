var Person = function () {};
Person.prototype.initialize = function (name, age) {
	this.name = name;
	this.age = age;
};

var Teacher = function () {
	this.teach = function (subject) {
		console.log(`${this.name} is now teaching ${subject}`);
	};
};
Teacher.prototype = new Person();

var him = new Teacher();

him.initialize("Adam", 45);
him.teach("Inheritance");