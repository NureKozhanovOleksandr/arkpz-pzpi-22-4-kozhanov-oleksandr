// Приклад 1
// код до рефакторингу
{
  class User {
    constructor(id, name) {
      this.id = id;
      this.name = name;
    }
  }

  const user1 = new User(1, "Alice");
  const user2 = new User(1, "Alice");

  console.log(user1 === user2); // false
}
// код після рефакторингу
{
  class User {
    constructor(id, name) {
      this.id = id;
      this.name = name;
    }
  }

  class UserRepository {
    constructor() {
      this.users = new Map();
    }

    getUser(id, name) {
      if (!this.users.has(id)) {
        this.users.set(id, new User(id, name));
      }
      return this.users.get(id);
    }
  }

  const userRepo = new UserRepository();
  const user1 = userRepo.getUser(1, "Alice");
  const user2 = userRepo.getUser(1, "Alice");

  console.log(user1 === user2); // true
}
// Приклад 2
// код до рефакторингу
{
  function calculateDiscount(type, amount) {
    if (type === "student") {
      return amount * 0.8;
    } else if (type === "senior") {
      return amount * 0.85;
    } else if (type === "regular") {
      return amount * 0.9;
    } else {
      throw new Error("Invalid discount type");
    }
  }

  console.log(calculateDiscount("student", 100)); // 80
  console.log(calculateDiscount("senior", 100));  // 85
  console.log(calculateDiscount("regular", 100)); // 90
}
// код після рефакторингу
{
  class DiscountCalculator {
    static studentDiscount(amount) {
      return amount * 0.8;
    }
    static seniorDiscount(amount) {
      return amount * 0.85;
    }
    static regularDiscount(amount) {
      return amount * 0.9;
    }
  }

  console.log(DiscountCalculator.studentDiscount(100)); // 80
  console.log(DiscountCalculator.seniorDiscount(100));  // 85
  console.log(DiscountCalculator.regularDiscount(100)); // 90
}
// Приклад 3
// код до рефакторингу
{
  class Order {
    constructor(customer, amount) {
      this.customer = customer;
      this.amount = amount;
    }

    getCustomer() {
      return this.customer;
    }
  }

  const order = new Order("Alice", 100);
  console.log(order.getCustomer()); // Alice
}
// код після рефакторингу
{
  class Customer {
    constructor(name) {
      this.name = name;
      this.orderHistory = [];
    }
  
    addOrder(order) {
      this.orderHistory.push(order);
    }
  
    getOrderHistory() {
      return this.orderHistory;
    }
  }
  
  class Order {
    constructor(customer, amount) {
      this.customer = customer;
      this.amount = amount;
      this.customer.addOrder(this);
    }
  
    getCustomerName() {
      return this.customer.name;
    }
  }
  
  const customer = new Customer("Alice");
  const order = new Order(customer, 100);
  console.log(order.getCustomerName()); // Alice
  console.log(customer.getOrderHistory()); // [Order]
}
