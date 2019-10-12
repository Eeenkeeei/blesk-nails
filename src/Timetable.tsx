import React from 'react';
import {
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    NativeSelect,
    Paper,
    Select,
    Typography
} from "@material-ui/core";
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
        const daysInMonth = 33 - new Date(
            new Date(
                new Date().getFullYear(),this.state.selectedMonth-1
            ).getFullYear(),
            new Date(
                new Date().getFullYear(),this.state.selectedMonth-1
            ).getMonth(),
            33).getDate();
        let dayNumber: number[] = []; // массив чисел в выбранном месяце
        let startNumber = 1;
        while (startNumber <= daysInMonth) {
            dayNumber.push(startNumber);
            startNumber++
        }



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

                <Paper style={{marginTop: '1rem'}}>
                    {dayNumber.map(dayNumber => {
                        return (
                            <Grid container
                                  direction="column"
                                  justify="center"
                                  alignItems="stretch"
                                  key={dayNumber}
                                  style={{marginTop: '1rem', marginLeft: '1rem'}}>
                                <Typography style={{marginLeft: '2rem'}} variant={"h6"}>{dayNumber}.{this.state.selectedMonth}</Typography>

                                <Grid container
                                      direction="row"
                                      justify="flex-start"
                                      alignItems="center"
                                      style={{height: '2.5rem'}}
                                >
                                    <Grid item xs={3} sm={1} style={{borderRight: '1px solid grey'}}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>9:00</Typography>
                                    </Grid>
                                    <Grid item xs={7} sm={9} style={{borderRight: '1px solid grey'}}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem', marginLeft: '0.5rem'}}>Маша, услуга</Typography>
                                    </Grid>
                                    <Grid item xs={2} sm={2}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem', marginLeft: '0.5rem' }}>700</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container
                                      direction="row"
                                      justify="flex-start"
                                      alignItems="center"
                                      style={{height: '2.5rem'}}
                                >
                                    <Grid item xs={3} sm={1}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>-</Typography>
                                    </Grid>
                                    <Grid item xs={7} sm={9}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>-</Typography>
                                    </Grid>
                                    <Grid item xs={2} sm={2}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>-</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container
                                      direction="row"
                                      justify="flex-start"
                                      alignItems="center"
                                      style={{height: '2.5rem'}}
                                >
                                    <Grid item xs={3} sm={1}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>15:30</Typography>
                                    </Grid>
                                    <Grid item xs={7} sm={9}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>Рома, секас</Typography>
                                    </Grid>
                                    <Grid item xs={2} sm={2}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>1</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container
                                      direction="row"
                                      justify="flex-start"
                                      alignItems="center"
                                      style={{height: '2.5rem'}}
                                >
                                    <Grid item xs={3} sm={1}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>19:00</Typography>
                                    </Grid>
                                    <Grid item xs={7} sm={9}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>Ксюха, услуга</Typography>
                                    </Grid>
                                    <Grid item xs={2} sm={2}>
                                        <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>600</Typography>
                                    </Grid>
                                </Grid>

                                <Divider/>
                            </Grid>
                        )
                    })}
                </Paper>

            </Grid>
        )
    }
}