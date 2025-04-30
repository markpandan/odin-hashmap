function Node(key = null, value = null) {
  this.key = key;
  this.value = value;
  this.next = null;
}

// TODO: Refractor
export default class LinkedList {
  constructor(node = null) {
    this.head = node;
    this.tail = this.head;
    this.size = 0;
  }

  // TODO: Fix this function. Using this will give us an infinite loop for an unknown reason.
  // // If there are no Nodes has been set, and we were about to create a new one, this function will be called.
  // #setNewLinkedList(newNode) {
  //   this.node = this.head = this.tail = newNode;
  //   return;
  // }

  append(key = null, value) {
    let newNode = new Node(key, value);
    this.size += 1;
    if (!this.head) {
      this.head = this.head = this.tail = newNode;
      return;
    }

    let pointer = this.head;
    while (pointer.next != null) {
      pointer = pointer.next;
    }
    pointer.next = newNode;
    this.tail = pointer.next;
  }

  prepend(value) {
    let newNode = new Node(value);
    this.size += 1;
    if (!this.head) {
      this.head = this.head = this.tail = newNode;
      return;
    }

    newNode.next = this.head;
    this.head = newNode;
  }

  at(index) {
    let pointer = this.head;
    for (let i = 0; i < index; i++) {
      pointer = pointer.next;
    }

    return pointer;
  }

  pop() {
    if (!this.head) throw new RangeError("No arrays to be erased");

    let pointer = this.head;

    // If there is only one Node, we already considered clearing the linked list itself.
    if (pointer.next == null) {
      pointer = null;
      return;
    }

    while (pointer.next.next != null) {
      pointer = pointer.next;
    }

    pointer.next = null;
    this.tail = pointer;

    this.size -= 1;
  }

  // Optional: Consider the search terms to not be case-sensitive
  contains(value) {
    let pointer = this.head;
    while (pointer != null) {
      if (pointer.value == value) {
        return true;
      }
      pointer = pointer.next;
    }

    return false;
  }

  find(value) {
    let pointer = this.head;

    let index = 0;
    while (pointer != null) {
      if (pointer.value == value) {
        return index;
      }
      pointer = pointer.next;
      index += 1;
    }

    return null;
  }

  toString() {
    let pointer = this.head;

    let string = "";
    while (pointer.next != null) {
      string += `( ${pointer.value} ) -> `;
      pointer = pointer.next;
    }
    string += `( ${pointer.value} ) -> null`;

    return string;
  }

  // TODO: Create an error invocation if the index was out of range
  // TODO: Edit the "this.tail" variable if the operation was at the last index.
  insertAt(value, index) {
    let pointer = this.head;
    for (let i = 0; i < index - 1; i++) {
      pointer = pointer.next;
    }

    let newNode = new Node(value);
    let temp = pointer.next;
    pointer.next = newNode;
    newNode.next = temp;

    this.size += 1;
  }

  // TODO: Create an error invocation if the index was out of range.
  // TODO: Edit the "this.tail" variable if the operation was at the last index.
  removeAt(index) {
    let pointer = this.head;
    for (let i = 0; i < index - 1; i++) {
      pointer = pointer.next;
    }

    pointer.next = pointer.next.next;

    this.size -= 1;
  }
}

// const list = new LinkedList();
// list.append("Test");
// list.append("Test2");
// list.append("Test3");
// list.append("Test4");
// list.prepend("Start");
// list.insertAt("Inserted", 2);
// list.removeAt(3);

// console.log(list.toString());
// console.log(`List Size: ${list.size}`);
