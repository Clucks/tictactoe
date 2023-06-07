let board = [];

function personFactory(name, age) {
  function sayHello() {
    console.log('hello!' + name);
  }
  
  return ({
    name, age, sayHello
  });
}
let vince = personFactory("vincent",19);
