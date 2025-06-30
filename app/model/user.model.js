class UserNode {
    constructor(id, username, email, password, updated_at, created_at) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.prev = null;
        this.next = null;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            createdAt: this.createdAt,
            // prev: this.prev?.id ?? null,
            // next: this.next?.id ?? null
        };
    }
}

class UserList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(id, username, email, password) {
        const newNode = new UserNode(id, username, email, password, new Date(), new Date());
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        return newNode;
    }

    findById(id) {
        let current = this.head;
        while (current) {
            if (current.id === id) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    findByEmail(email) {
        let current = this.head;
        while (current) {
            if (current.email === email) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    show() {
        let current = this.head;
        let array = [];
        while(current) {
            console.log(current);
            array.push(current);
            current = current.next;
        }
        return array;
    }
}

const userList = new UserList();

module.exports = {
    userList
};