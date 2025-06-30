class BiodataNode {
    constructor(
        id,
        user_id,
        name,
        date_of_birth,
        phone_number,
        province,
        city,
        address,
        foto_profile,
        created_at,
        updated_at
    ) {
        this.id = id;
        this.user_id = user_id;
        this.name = name;
        this.date_of_birth = date_of_birth;
        this.phone_number = phone_number;
        this.province = province;
        this.city = city;
        this.address = address;
        this.foto_profile = foto_profile;
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
            date_of_birth: this.date_of_birth,
            phone_number: this.phone_number,
            province: this.province,
            city: this.city,
            address: this.address,
            foto_profile: this.foto_profile,
            created_at: this.created_at,
            updated_at: this.updated_at,
            prev: this.prev?.id ?? null,
            next: this.next?.id ?? null
        };
    }
}

class BiodataList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append( id,
            user_id,
            name,
            date_of_birth,
            phone_number,
            province,
            city,
            address,
            foto_profile,
        ) {
        const newNode = new BiodataNode(
            id,
            user_id,
            name,
            date_of_birth,
            phone_number,
            province,
            city,
            address,
            foto_profile, 
            new Date(), 
            new Date()
        );
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

const biodataList = new BiodataList();

module.exports = {
    biodataList
};