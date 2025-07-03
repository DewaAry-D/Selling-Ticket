class CartNode {
    constructor(id, user_id, ticket_id, quantity, total, created_at, updated_at) {
        this.id = id;
        this.user_id = user_id;
        this.ticket_id = ticket_id;
        this.quantity = quantity;
        this.total = total;
        this.created_at = created_at;
        this.updated_at = updated_at;
        
        this.prev = null;
        this.next = null;
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            ticket_id: this.ticket_id,
            quantity: this.quantity,
            total: this.total,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}

class CartList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(id, user_id, ticket_id, quantity, total) {
        const newNode = new CartNode(id, user_id, ticket_id, quantity, total, new Date(), new Date());
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        return newNode;
    }

    updateById(id, newData) {
        let current = this.head;

        while (current) {
            if (current.id === id) {
                // Update properti satu per satu jika ada
                const protectedFields = ['id', 'user_id', 'ticket_id', 'created_at'];//key yang tidak boleh diupdate

                for (let key in newData) {
                    if (key in current && !protectedFields.includes(key)) {
                        current[key] = newData[key];
                    }
                }

                current.updated_at = new Date();

                return current;
            }
                current = current.next;
            }

            return null; 
    }

    delateById(cart_id) {
        if (this.head === null) {
            return { error: true, message: "Data ksosong"};
        }

        let current = this.head;

        while(current) {
            if (current.id === cart_id) {
                if (current.prev) {
                    current.prev.next = current.next;
                } else {
                    this.head = current.next;
                }

                if (current.next) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev;
                }

            return { sukses: true, message: "Cart berhasil dihapus", data: current };
            }
        }
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

    findAll(user_id) {
        let current = this.head;
        const result = [];

        while(current) {
            if (current.user_id.id === user_id) {
                result.push(current);
            }

            current = current.next;
        }

        return result;
    }
}

const cartList = new CartList();

module.exports = {
    cartList
}