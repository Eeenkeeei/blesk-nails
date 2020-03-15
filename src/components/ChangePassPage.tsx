import React, {useState} from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import Http from "../storage/http";
import {LocalStorage} from "../storage/localStorage";

export const ChangePassPage = () => {

    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [success, setSuccess] = useState(false);
    const http = new Http();
    const ls = new LocalStorage();


    const savePassword = () => {
        http.setPassword(newPass)
            .then(res => res.json())
            .then(result => {
                if (typeof result === 'string') {
                    ls.setToken(result);
                    setSuccess(true)
                }
            })
            .catch(e => {
                console.log(e)
            })
    };

    return (<div>
        <Typography>
            Введите новый пароль
        </Typography>
        <div  style={{display: 'block'}}>
        <TextField type="password"  variant={"outlined"} fullWidth={true}
               onChange={(evt) => setNewPass(evt.target.value)} value={newPass} label="Новый пароль">

        </TextField>
        <TextField type="password" variant={"outlined"} fullWidth={true} style={{marginTop: '1rem'}}
               onChange={(evt) => setConfirmPass(evt.target.value)} value={confirmPass} label="Повтор нового пароля">
        </TextField>
        </div>
        <Button variant={"outlined"} disabled={newPass !== confirmPass} onClick={() => savePassword()} style={{marginTop: '1rem'}}>
            Сохранить новый пароль
        </Button>
        {success ? <Typography>Пароль сохранен</Typography> : null}
    </div>)
}
