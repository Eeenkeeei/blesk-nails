
export default class Http {

    public url = process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEVELOPMENT_URL : process.env.REACT_APP_PUBLIC_URL;

    public getRecordsByDate(year: string, month: string) {
        return fetch(this.url + '/getRecordsByDate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({year, month})
        });
    }

    public updateRecord(year: string, month: string, day: number, number: number, time: string, comment: string, cost: number) {
        return fetch(this.url + '/updateRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({year, month, day, number, time, comment, cost})
        });
    }

    public auth(password: string) {
        return fetch(this.url + '/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password})
        });
    }

    public authToken (token: string) {
        return fetch(this.url + '/authToken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    }

    public setPassword(password: string) {
        return fetch(this.url + '/setPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password})
        });
    }
}
