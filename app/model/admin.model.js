// 

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

class AdminNode {
    constructor(id, username, email, password, created_at, updated_at) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            createdAt: this.created_at
        };
    }
}

// Simpan sebagai promise
const adminPromise = (async () => {
    const hashedPassword = await bcrypt.hash("admin12345678", 10);
    return new AdminNode(uuidv4(), "admin", "admin@gmail.com", hashedPassword, new Date(), new Date());
})();

module.exports = { adminPromise };
