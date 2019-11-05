export class LocalStorage {
    public data:any;
    constructor() {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        this.data = JSON.parse(<string>localStorage.getItem('data'));
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
}