export class APIPayload<T> {
    public data: T;
    public token: any;

    constructor(data: T, token: string) {
        this.data = data;
        this.token = token;
    }
}