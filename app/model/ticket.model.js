class TicketNode {
    constructor({
        id,
        user_id,
        ticket_aplication_id,
        name,
        code,
        description,
        theme,
        type_tickets,
        batch,
        start_date,
        end_date,
        price,
        limit,
        available_limit,
        start_event,
        end_event,
        foto_event,
        location,
        created_at,
        updated_at
    }) {
        this.id = id;
        this.user_id = user_id;
        this.ticket_aplication_id = ticket_aplication_id;
        this.name = name;
        this.code = code;
        this.description = description;
        this.theme = theme;
        this.type_tickets = type_tickets;
        this.batch = batch;
        this.start_date = start_date;
        this.end_date = end_date;
        this.price = price;
        this.limit = limit;
        this.available_limit = available_limit;
        this.start_event = start_event;
        this.end_event = end_event;
        this.foto_event = foto_event;
        this.location = location;
        this.created_at = created_at;
        this.updated_at = updated_at;

        this.prev = null;
        this.next = null;
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            ticket_aplication_id: this.ticket_aplication_id,
            name: this.name,
            code: this.code,
            description: this.description,
            theme: this.theme,
            type_tickets: this.type_tickets,
            batch: this.batch,
            start_date: this.start_date,
            end_date: this.end_date,
            price: this.price,
            limit: this.limit,
            available_limit: this.available_limit,
            start_event: this.start_event,
            end_event: this.end_event,
            foto_event: this.foto_event,
            location: this.location,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

class TicketList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(
        id,
        user_id,
        ticket_aplication_id,
        name,
        code,
        description,
        theme,
        type_tickets,
        batch,
        start_date,
        end_date,
        price,
        limit,
        available_limit,
        start_event,
        end_event,
        foto_event,
        location
    ) {
        const newNode = new TicketNode({
            id,
            user_id,
            ticket_aplication_id,
            name,
            code,
            description,
            theme,
            type_tickets,
            batch,
            start_date,
            end_date,
            price,
            limit,
            available_limit,
            start_event,
            end_event,
            foto_event,
            location,
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
            if (current.id == parseInt(id)) {
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
                const protectedFields = ['uuid', 'user_id', 'created_at'];//key yang tidak boleh diupdate

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

    show(query) {
        let { tema = ''} = query;

        // status = String(status || '');

        let current = this.head;
        const result = [];

        while (current) {

            const matchTema = tema
                ? current.theme.toLowerCase() === tema.toLowerCase() : true;

            const time = new Date();

            if (matchTema &&  
                time >= current.start_date && 
                time <= current.end_date && 
                current.available_limit > 0) {
                result.push(current);
            }

            current = current.next;
        }

        return {
            data: result,
        };
    }

    findAll() {
        let current = this.head;
        const result = [];

        while(current) {
            result.push(current);
            current = current.next;
        }

        return result;
    }
}

const ticketList = new TicketList();

module.exports = { ticketList };
