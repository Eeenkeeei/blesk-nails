import React from 'react';
import {FormControl, Grid, InputLabel, MenuItem, NativeSelect, Paper, Select, Typography} from "@material-ui/core";
import isMobile from 'ismobilejs';


interface TimetableState {
    selectedMonth: number
}

export default class Timetable extends React.Component<TimetableState> {

    state = {
        selectedMonth: new Date().getUTCMonth()+1
    };

    public handleChangeMonth = (evt: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        this.setState({
            selectedMonth: evt.target.value
        })
    };

    public render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
            >
                <Paper style={{padding: '10px'}}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant={"h6"}>
                            Запись. Сегодня: {new Date().toLocaleDateString('ru')}
                        </Typography>
                    </Grid>
                    <FormControl style={{marginTop: '1rem'}}>
                        <InputLabel htmlFor="age-simple">Месяц</InputLabel>
                        {/* Селектор для ПК */}
                        {!isMobile().any ? <Select
                            value={this.state.selectedMonth}
                            onChange={(evt)=>this.handleChangeMonth(evt)}
                            inputProps={{
                                name: 'age',
                                id: 'age-simple',
                            }}
                            style={{width: '300px'}}
                        >
                            <MenuItem value={10}>Октябрь</MenuItem>
                            <MenuItem value={11}>Ноябрь</MenuItem>
                            <MenuItem value={12}>Декабрь</MenuItem>
                        </Select> : null}
                        {/* Селектор для телефонов */}
                        {isMobile().any ? <NativeSelect
                            value={this.state.selectedMonth}
                            onChange={(evt)=>this.handleChangeMonth(evt)}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-helper',
                            }}
                            style={{width: '320px'}}
                        >
                            <option value={10}>Октябрь</option>
                            <option value={11}>Ноябрь</option>
                            <option value={12}>Декабрь</option>
                        </NativeSelect> : null}
                    </FormControl>
                </Paper>

            </Grid>
        )
    }
}