class QrNode {
    constructor(id, orderitem_id, ticket_code, qr_code, created_at) {
        this.id = id;
        this.orderitem_id = orderitem_id;
        this.ticket_code = ticket_code;
        this.qr_code = qr_code;
        this.created_at = created_at;
        
        this.prev = null;
        this.next = null;
    }

    toJSON() {
        return {
            id: this.id,
            orderitem_id: this.orderitem_id,
            ticket_code: this.ticket_code,
            qr_code: this.qr_code,
            created_at: this.created_at,
        }
    }
}

class QrList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(id, orderitem_id, ticket_code, qr_code,) {
        const newNode = new QrNode(id, orderitem_id, ticket_code, qr_code, new Date());
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

    delateById(orderitem_id) {
        if (this.head === null) {
            return { error: true, message: "Data ksosong"};
        }

        let current = this.head;

        while(current) {
            if (current.id === orderitem_id) {
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
            if (current.orderitem_id.id === id) {
                result.push(current);
            }

            current = current.next;
        }

        return result;
    }

}

const qrList = new QrList();

module.exports = {
    qrList
}