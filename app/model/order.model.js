class OrderNode {
    constructor(id, user_id, order_number, total_price, created_at, updated_at) {
        this.id = id;
        this.user_id = user_id;
        this.order_number = order_number;
        this.total_price = total_price;
        this.created_at = created_at;
        this.updated_at = updated_at;
        
        this.prev = null;
        this.next = null;
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            order_number: this.order_number,
            total_price: this.total_price,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}

class OrderList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(id, user_id, order_number, total_price) {
        const newNode = new OrderNode(id, user_id, order_number, total_price, new Date(), new Date());
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
                const unProtectedFields = ['total'];//key yang boleh diupdate

                for (let key in newData) {
                    if (key in current && unProtectedFields.includes(key)) {
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

    delateById(order_id) {
        if (this.head === null) {
            return { error: true, message: "Data ksosong"};
        }

        let current = this.head;

        while(current) {
            if (current.id === order_id) {
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

const orderList = new OrderList();

module.exports = {
    orderList
}