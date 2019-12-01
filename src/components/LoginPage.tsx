import React, {FormEvent, useState} from 'react';
import {TextField, Typography} from "@material-ui/core";
import Http from "../storage/http";
import {LocalStorage} from "../storage/localStorage";

interface LoginPageProps {
    setConfirmed: (value: boolean) => void
}

export const LoginPage = (props: LoginPageProps) => {
    const http = new Http();
    const ls = new LocalStorage();
    const [pass, setPass] = useState('');

    const submit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        http.auth(pass)
            .then(res => res.json())
            .then((result) => {
                if (typeof result === 'string'){
                    ls.setToken(result);
                    props.setConfirmed(true)
                } else {
                    console.log(result)
                }
            })
    };

    return (
        <div className="LoginPage_Container">
            <form className="LoginPage_BodyContainer" onSubmit={event => submit(event)}>
                <Typography variant="subtitle2" className="LoginPage_Label" style={{fontSize: '1.3rem'}}>Введите
                    пароль</Typography>
                <TextField variant={"outlined"} className="LoginPage_Input" style={{marginLeft: '25px'}}
                           placeholder="Пароль" type="password"
                           onChange={(evt) => setPass(evt.target.value)}
                />
            </form>
        </div>
    )
};
