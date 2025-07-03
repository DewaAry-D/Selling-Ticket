class TicketApplicationNode {
    constructor({
        id,
        user_id,
        name,
        description,
        theme,
        code,
        type_tickets,
        batch,
        start_date,
        end_date,
        file_application,
        price,
        limit,
        start_event,
        end_event,
        foto_event,
        location,
        is_accepted = false,
        is_rejected = false,
        reject_message = null,
        created_at,
        updated_at
    }) {
        this.id = id;                         
        this.user_id = user_id;                   
        this.name = name;                       
        this.description = description;           
        this.theme = theme;                       // enum (education, music, sport, comedy, culture)
        this.code = code;   
        this.type_tickets = type_tickets;     
        this.batch = batch;
        this.start_date = start_date;
        this.end_date = end_date;        
        this.file_application = file_application;
        this.price = price;
        this.limit = limit;
        this.start_event = start_event;
        this.end_event = end_event; 
        this.foto_event = foto_event;
        this.location = location;
        this.is_accepted = is_accepted;           
        this.is_rejected = is_rejected;           
        this.reject_message = reject_message;     
        this.created_at = created_at;             
        this.updated_at = updated_at;     
        
        this.prev = null;
        this.next = null;
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            name: this.name,
            description: this.description,
            theme: this.theme,
            code: this.code,
            type_tickets: this.type_tickets,
            batch: this.batch,
            start_date: this.start_date,
            end_date: this.end_date,
            file_application: this.file_application,
            price: this.price,
            limit: this.limit,
            start_event: this.start_event,
            end_event: this.end_event,
            foto_event: this.foto_event,
            location: this.location,
            is_accepted: this.is_accepted,
            is_rejected: this.is_rejected,
            reject_message: this.reject_message,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

class TicketApplicationList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(
        id,
        user_id,
        name,
        description,
        theme,
        code,
        type_tickets,
        batch,
        start_date,
        end_date,
        file_application,
        price,
        limit,
        start_event,
        end_event,
        foto_event,
        location,
    ) {
        const newNode = new TicketApplicationNode({
            id,
            user_id,
            name,
            description,
            theme,
            code,
            type_tickets,
            batch,
            start_date,
            end_date,
            file_application,
            price,
            limit,
            start_event,
            end_event,
            foto_event,
            location,
            is_accepted: false,
            is_rejected: false,
            reject_message: null,
            created_at: new Date(),
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

    updateById(id, newData) {
        let current = this.head;

        while (current) {
            if (current.id === id) {
                // Update properti satu per satu jika ada
            
                const unProtectedFields = ['avilable_limit']//filed yang hanya boleh diubah

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

    show(query) {
        let { search = '', tema = '', status = '', page = 1, limit = 10 } = query;

        if (tema === 'semua') {
            tema = '';
        }

        let current = this.head;
        const result = [];

        while (current) {
            const matchSearch = search
                ? (current.name.toLowerCase().includes(search.toLowerCase())) : true;

            const matchTema = tema
                ? current.theme.toLowerCase() === tema.toLowerCase() : true;

            const matchStatus =
                status === 'accepted' ? current.is_accepted :
                status === 'rejected' ? current.is_rejected :
                true;

            if (matchSearch && matchTema && matchStatus) {
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

    showForUser(user_id, query) {
        let { search = '', tema = '', status = '', page = 1, limit = 10 } = query;

        if (tema === 'semua') {
            tema = '';
        }

        let current = this.head;
        const result = [];

        while (current) {
            const matchSearch = search
                ? (current.name.toLowerCase().includes(search.toLowerCase())) : true;

            const matchTema = tema
                ? current.theme.toLowerCase() === tema.toLowerCase() : true;

            const matchStatus =
                status === 'accepted' ? current.is_accepted :
                status === 'rejected' ? current.is_rejected :
                true;

            if (matchSearch && 
                matchTema && 
                matchStatus &&
                current.user_id.id === user_id) {
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

const ticketApplicationList = new TicketApplicationList();

module.exports = { ticketApplicationList };