class UserWalletNode {
    constructor({
        id,
        user_id,
        belence,
        updated_at
    }) {
        this.id = id;
        this.user_id = user_id;
        this.belence = belence;
        this.updated_at = updated_at;

        this.prev = null;
        this.next = null;
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            belence: this.belence,
            updated_at: this.updated_at
        };
    }
}

class UserWalletList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(
        id,
        user_id,
        belance = 0,
    ) {
        const newNode = new UserWalletNode({
            id,
            user_id,
            belance,
            updated_at: new Date()
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
            if (current.user_id.id === id) {
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
                
                const unProtectedFields = ['belence'];

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

    // show(query) {
    //     let { search = '', tema = '', status = '', page = 1, limit = 10 } = query;

    //     if (tema === 'semua') {
    //         tema = '';
    //     }

    //     let current = this.head;
    //     const result = [];

    //     while (current) {
    //         const matchSearch = search
    //             ? (current.name.toLowerCase().includes(search.toLowerCase())) : true;

    //         const matchTema = tema
    //             ? current.theme.toLowerCase() === tema.toLowerCase() : true;

    //         const matchStatus =
    //             status === 'accepted' ? current.is_accepted :
    //             status === 'rejected' ? current.is_rejected :
    //             true;

    //         const time = new Date();

    //         if (matchSearch && 
    //             matchTema && 
    //             matchStatus && 
    //             time >= current.start_date && 
    //             time <= current.end_date && 
    //             current.available_limit > 0) {
    //             result.push(current);
    //         }

    //         current = current.next;
    //     }

    //     // Pagination logic
    //     const pageInt = parseInt(page);
    //     const limitInt = parseInt(limit);
    //     const startIndex = (pageInt - 1) * limitInt;
    //     const paginated = result.slice(startIndex, startIndex + limitInt);

    //     return {
    //         data: paginated,
    //         meta: {
    //             total: result.length,
    //             page: pageInt,
    //             limit: limitInt,
    //             totalPages: Math.ceil(result.length / limitInt)
    //         }
    //     };
    // }
}

const userWalletList = new UserWalletList();

module.exports = { userWalletList };
