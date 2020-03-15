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
import Http from "../storage/http";
import {RecordsInDay} from "../common/interfaces";
import {LocalStorage} from "../storage/localStorage";
import ListSubheader from "@material-ui/core/ListSubheader";
import {DayComponent} from "./DayComponent";

const http = new Http();
const localStorage = new LocalStorage();
const moment = require('moment');

interface TimetableState {
    selectedDate: string
    uploadedRecords: any | undefined // объект с полями-номерами дня, в каждом поле по 4 поля с записями
    loading: boolean
}

interface TimetableProps {
    setConfirmed: (value: boolean) => void
    isConfirmed: boolean
}

export default class Timetable extends React.Component<TimetableProps, TimetableState> {

    state = {
        selectedDate: moment().format('YYYY-MM'),
        uploadedRecords: {loading: true} as any,
        loading: true
    };

    public handleChangeMonth = (evt: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        this.setState({
            selectedDate: String(evt.target.value)
        }, () => {
            this.downloadRecords()
        })
    };

    public downloadRecords = () => {
        http.getRecordsByDate(this.state.selectedDate.split('-')[0], this.state.selectedDate.split('-')[1])
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        uploadedRecords: result,
                        loading: false
                    });
                    localStorage.addData(result)
                }
            )
    };

    public updateRecords = (items: any) => {
        this.setState({
            uploadedRecords: items
        })
    };

    componentDidMount(): void {
        const token = localStorage.getToken();
        if (process.env.NODE_ENV !== "development") {
            if (token) {
                http.authToken(token)
                    .then(res => res.json())
                    .then(result => {
                        if (result) {
                            this.props.setConfirmed(true)
                        } else {
                            this.props.setConfirmed(false)
                        }
                    })
            } else {
                this.props.setConfirmed(false)
            }
        }
        if (localStorage.getData()) {
            this.setState({
                uploadedRecords: JSON.parse(localStorage.getData() as string)
            });
        }
        if (this.props.isConfirmed) {
            this.downloadRecords();
        }
    }

    public render() {
        const daysInMonth = moment(this.state.selectedDate + '-01').daysInMonth()
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
                {this.state.loading ? <div className="loadingMessage">
                    Данные обновляются
                </div> : null}
                <Paper style={{padding: '10px'}}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant={"h6"}>
                            Запись. Сегодня: {new Date().toLocaleDateString('ru')}
                        </Typography>
                    </Grid>
                    <FormControl style={{marginTop: '1rem'}}>
                        <InputLabel>Месяц</InputLabel>
                        {/* Селектор для ПК */}
                        {!isMobile().any ? <Select
                            value={this.state.selectedDate}
                            onChange={(evt) => this.handleChangeMonth(evt)}
                            style={{width: '300px'}}
                        >
                            <ListSubheader onClick={(evt)=>evt.preventDefault()}>2019</ListSubheader>
                            <MenuItem value={"2019-10"}>Октябрь</MenuItem>
                            <MenuItem value={"2019-11"}>Ноябрь</MenuItem>
                            <MenuItem value={"2019-12"}>Декабрь</MenuItem>
                            <ListSubheader>2020</ListSubheader>
                            <MenuItem value={"2020-01"}>Январь</MenuItem>
                            <MenuItem value={"2020-02"}>Февраль</MenuItem>
                            <MenuItem value={"2020-03"}>Март</MenuItem>
                            <MenuItem value={"2020-04"}>Апрель</MenuItem>
                            <MenuItem value={"2020-05"}>Май</MenuItem>
                            <MenuItem value={"2020-06"}>Июнь</MenuItem>
                        </Select> : null}
                        {/* Селектор для телефонов */}
                        {isMobile().any ? <NativeSelect
                            value={this.state.selectedDate}
                            onChange={(evt) => this.handleChangeMonth(evt)}
                            style={{width: '320px'}}
                        >
                            <optgroup label="2019">
                                <option value={"2019-10"}>Октябрь</option>
                                <option value={"2019-11"}>Ноябрь</option>
                                <option value={"2019-12"}>Декабрь</option>
                            </optgroup>
                            <optgroup label="2020">
                                <option value={"2020-01"}>Январь</option>
                                <option value={"2020-02"}>Февраль</option>
                                <option value={"2020-03"}>Март</option>
                                <option value={"2020-04"}>Апрель</option>
                                <option value={"2020-05"}>Май</option>
                                <option value={"2020-06"}>Июнь</option>
                            </optgroup>
                        </NativeSelect> : null}
                    </FormControl>
                </Paper>

                <div style={{marginTop: '1rem'}}>
                    {!this.state.uploadedRecords ? <CircularProgress/> : <>
                        {recordsInMonth.map(recordInDay => {
                            return (
                                <DayComponent key={Math.random()}
                                              dayNumber={recordsInMonth.indexOf(recordInDay) + 1}
                                              selectedDate={this.state.selectedDate}
                                              recordsInDay={recordInDay}
                                              updateRecords={this.updateRecords}
                                />
                            )
                        })}
                    </>}
                </div>
            </Grid>
        )
    }
}
