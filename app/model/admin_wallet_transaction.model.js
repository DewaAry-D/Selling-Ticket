class AdminWaletTransactionNode {
    constructor({
        id,
        admin_wallet_id,
        order_id,
        wallet_transaction_user_id,
        status,
        amount_total,
        fee,
        created_at
    }) {
        this.id = id;
        this.admin_wallet_id = admin_wallet_id;
        this.order_id = order_id,
        this.wallet_transaction_user_id = wallet_transaction_user_id;
        this.status = status
        this.amount_total = amount_total;
        this.fee = fee;
        this.created_at = created_at;

        this.prev = null;
        this.next = null;
    }

    toJSON() {
        return {
            id: this.id,
            admin_wallet_id: this.admin_wallet_id,
            order_id: this.order_id,
            wallet_transaction_user_id: this.wallet_transaction_user_id,
            status: this.status,
            amount_total: this.amount_total,
            fee: this.fee,
            created_at: this.created_at
        };
    }
}

class AdminWaletTransactionList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(
        id,
        admin_wallet_id,
        order_id,
        wallet_transaction_user_id,
        status,
        amount_total,
        fee
    ) {
        const newNode = new AdminWaletTransactionNode({
            id,
            admin_wallet_id,
            order_id,
            wallet_transaction_user_id,
            status,
            amount_total,
            fee,
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

const adminWaletList = new AdminWaletTransactionList();
adminWaletList.append()

module.exports = { adminWaletList };
