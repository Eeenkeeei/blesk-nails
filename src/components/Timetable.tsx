import React from 'react';
import {
    CircularProgress,
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
import DayListComponent from "./DayListComponent";
import Http from "../storage/http";
import {RecordsInDay} from "../common/interfaces";

const http = new Http();

interface TimetableState {
    selectedMonth: number
    uploadedRecords: any // объект с полями-номерами дня, в каждом поле по 4 поля с записями
    openSnackbar: boolean
}

export default class Timetable extends React.Component<TimetableState> {

    state = {
        selectedMonth: new Date().getUTCMonth() + 1,
        uploadedRecords: {loading: true} as any
    };

    public handleChangeMonth = (evt: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        this.setState({
            selectedMonth: Number(evt.target.value),
        }, () => {
            this.downloadRecords()
        })
    };

    public downloadRecords = () => {
        this.setState({uploadedRecords: {loading: true}}, ()=>{
            http.getRecordsByDate(new Date().getFullYear().toString(), this.state.selectedMonth)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            uploadedRecords: result
                        })
                    }
                )
        })

    };

    public updateRecords = (items: any) => {
        this.setState({
            uploadedRecords: items
        })
    };

    componentDidMount(): void {
        this.downloadRecords()
    }

    public render() {
        const daysInMonth = 33 - new Date(
            new Date(
                new Date().getFullYear(), this.state.selectedMonth - 1
            ).getFullYear(),
            new Date(
                new Date().getFullYear(), this.state.selectedMonth - 1
            ).getMonth(),
            33).getDate();
        let recordsInMonth: RecordsInDay[] = []; // массив дней с записями в выбранном месяце
        let startNumber = 1;
        while (startNumber <= daysInMonth) {
            if (this.state.uploadedRecords) {
                recordsInMonth.push(this.state.uploadedRecords[startNumber]);
                startNumber++
            }
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
                            onChange={(evt) => this.handleChangeMonth(evt)}
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
                            onChange={(evt) => this.handleChangeMonth(evt)}
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
                    {this.state.uploadedRecords.loading ? <CircularProgress/> : <React.Fragment>
                        {recordsInMonth.map(recordInDay => {
                            return (
                                <DayListComponent key={Math.random()}
                                                  dayNumber={recordsInMonth.indexOf(recordInDay) + 1}
                                                  selectedMonth={this.state.selectedMonth}
                                                  recordsInDay={recordInDay}
                                                  updateRecords={this.updateRecords}
                                />
                            )
                        })}
                    </React.Fragment>}
                </Paper>

            </Grid>
        )
    }
}