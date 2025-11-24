const crypto = require("crypto-js");

class Block {
  constructor(index, task, previousHash = "") {
    this.index = index;
    this.task = task;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto.SHA256(
      this.index + this.task + this.previousHash
    ).toString();
  }
}

class TodoBlockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTask(task) {
    const newBlock = new Block(
      this.chain.length,
      task,
      this.getLatestBlock().hash
    );
    this.chain.push(newBlock);
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const curr = this.chain[i];
      const prev = this.chain[i - 1];

      if (curr.hash !== curr.calculateHash()) return false;
      if (curr.previousHash !== prev.hash) return false;
    }
    return true;
  }
}

// ------------------------------
// Testing the To-Do List
// ------------------------------

const todo = new TodoBlockchain();

todo.addTask("Buy groceries");
todo.addTask("Complete blockchain project");
todo.addTask("Go to the gym");

console.log(JSON.stringify(todo, null, 2));

console.log("Is blockchain valid?", todo.isValid());
