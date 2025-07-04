

class OrderItemNode {
    constructor(id, order_id, ticket_id, quantitiy, price, total_price, created_at, updated_at) {
        this.id = id;
        this.order_id = order_id;
        this.ticket_id = ticket_id;
        this.quantitiy = quantitiy;
        this.price = price;
        this.total_price = total_price;
        this.created_at = created_at;
        this.updated_at = updated_at;
        
        this.prev = null;
        this.next = null;
    }

    toJSON() {
        return {
            id: this.id,
            order_id: this.order_id,
            ticket_id: this.ticket_id,
            quantitiy: this.quantitiy,
            price: this.price,
            total_price: this.total_price,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}

class OrderItemList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(id, order_id, ticket_id, quantitiy, price, total_price,) {
        const newNode = new OrderItemNode(id, order_id, ticket_id, quantitiy, price, total_price, new Date(), new Date());
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
                const protectedFields = ['id', 'user_id', 'order_number', 'created_at'];//key yang tidak boleh diupdate

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

    delateById(oItem_id) {
        if (this.head === null) {
            return { error: true, message: "Data ksosong"};
        }

        let current = this.head;

        while(current) {
            if (current.id === oItem_id) {
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

    findAll(id) {
        let current = this.head;
        const result = [];

        while(current) {
            if (current.order_id.id === id) {
                result.push(current);
            }

            current = current.next;
        }

        return result;
    }
}

const orderItemList = new OrderItemList();

module.exports = {
    orderItemList
}