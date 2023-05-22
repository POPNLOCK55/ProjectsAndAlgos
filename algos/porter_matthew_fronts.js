class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class LinkedList {
    constructor() {
        this._length = 0;
        this.head = null;
    }
    addFront(val) {
        let new_node = new Node(val);
        if (!this.head) {
            this.head = new_node;
            this._length += 1;
            return this;
        }
        new_node.next = this.head;
        this.head = new_node;
        this._length += 1;
        return this;
    }
    removeFront() {
        if (this.head === null) {
            return this.head;
        }
        let deletedHead = this.head;
        let nextNode = deletedHead.next;
        this.head = nextNode;
        this._length--;
        return deletedHead;
    }
    front() {
        if (this.head === null) {
            return null;
        } else {
            return this.head.data;
        }
    }
    display() {
                if (this.head === null) {
            return this.head;
        }
        let iterate = this.head;
        let output = [];
        while(iterate !== null){
            if(iterate.next === null){
                output.push(iterate.data);
            }else{
                output.push(iterate.data)
                output.push(', ')
            }
            iterate = iterate.next;
        }
        return output.join('');
    }
}

var sll = new LinkedList();

sll.addFront(235);
sll.addFront(432);
sll.addFront(999);

console.log(sll.display());

console.log(sll);

sll.removeFront();

console.log(sll);

console.log(sll);
console.log(sll.front())

