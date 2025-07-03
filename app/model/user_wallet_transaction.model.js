class UserWalletTransactionNode {
    constructor({
        id,
        user_wallet_id,
        status,
        amount,
        orderitems_id,
        created_at
    }) {
        this.id = id;
        this.user_wallet_id = user_wallet_id;
        this.status = status
        this.amount = amount;
        this.orderitems_id = orderitems_id;
        this.created_at = created_at;

        this.prev = null;
        this.next = null;
    }

    toJSON() {
        return {
            id: this.id,
            user_wallet_id: this.user_wallet_id,
            status: this.status,
            amount: this.amount,
            orderitems_id: this.orderitems_id,
            created_at: this.created_at
        };
    }
}

class UserWalletTransactionList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(
        id,
        user_wallet_id,
        status,
        amount,
        orderitems_id = null
    ) {
        const newNode = new UserWalletTransactionNode({
            id,
            user_wallet_id,
            status,
            amount,
            orderitems_id,
            created_at: new Date()
        });

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

    findByUserId(id) {
        let current = this.head;
        while (current) {
            if (current.user_wallet_id.id === id) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    updateById(id, newData) {
        let current = this.head;

        while (current) {
            if (current.id === id) {
                
                // const unProtectedFields = ['amount'];

                for (let key in newData) {
                    if (key in current && unProtectedFields.includes(key)) {
                        current[key] = newData[key];
                    }
                }

                current.created_at = new Date();

                return current;
            }
            current = current.next;
        }

        return null; 
    }

    delateById(id) {
        if (this.head === null) {
            return { error: true, message: "Data ksosong"};
        }

        let current = this.head;

        while(current) {
            if (current.id === id) {
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

    show(query) {
        let { status = '', page = 1, limit = 10 } = query;

        if (status === 'semua') {
            status = '';
        }

        let current = this.head;
        const result = [];

        while (current) {
            const matchStatus =
                status === 'deposit' ? current.is_accepted :
                status === 'credit' ? current.is_rejected :
                true;

            if (matchStatus ) {
                result.push(current);
            }

            current = current.next;
        }

        // Pagination logic
        const pageInt = parseInt(page);
        const limitInt = parseInt(limit);
        const startIndex = (pageInt - 1) * limitInt;
        const paginated = result.slice(startIndex, startIndex + limitInt);

        return {
            data: paginated,
            meta: {
                total: result.length,
                page: pageInt,
                limit: limitInt,
                totalPages: Math.ceil(result.length / limitInt)
            }
        };
    }
}

const userWalletTransactionList = new UserWalletTransactionList();

module.exports = { userWalletTransactionList };
