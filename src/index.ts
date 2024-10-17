// A simple interface defining a structure for a Person
interface Person {
  name: string;
  age: number;
  greet(): void;
}

// A class that implements the Person interface
class Student implements Person {
  constructor(
    public name: string,
    public age: number,
    public studentID: string,
  ) {}

  // Method to greet a person
  greet(): void {
    console.log(`Hello, my name is ${this.name}, and I am ${this.age} years old.`);
  }

  // Additional method specific to Student class
  showID(): void {
    console.log(`My student ID is ${this.studentID}`);
  }
}

// Function to create and greet a student
function introduce(student: Student): void {
  student.greet();
  student.showID();
}

// Creating a new Student instance
const john = new Student('John Doe', 20, 'ST12345');

// Introducing the student
introduce(john);
