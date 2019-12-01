export class LocalStorage {
    public data:any;
    public token:any;
    constructor() {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        this.data = JSON.parse(localStorage.getItem('data') as string);
        this.token = JSON.parse(localStorage.getItem('pass') as string);
    }

    addData(data:any) {
        this.data = data;
        this.save();
    }

    getData() {
        return(localStorage.getItem('data'))
    }

    save() {
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    getToken() {
        return (localStorage.getItem('token'))
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }


}
