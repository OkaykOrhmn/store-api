export class EditeUsername {

    public id: number | null = null;
    public username: string | null = null;

    constructor({ id, username }) {
        this.id = id;
        this.username = username;
    }
}

export class Register {

    public id: number;
    public username: string;
    public password: string;

    constructor({ id, username, password }) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

