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
import {LocalStorage} from "../storage/localStorage";

const http = new Http();
const localStorage = new LocalStorage();

interface TimetableState {
    selectedMonth: number
    uploadedRecords: any | undefined // объект с полями-номерами дня, в каждом поле по 4 поля с записями
    loading: boolean
}

interface TimetableProps {
    setConfirmed: (value: boolean) => void
}

export default class Timetable extends React.Component<TimetableProps, TimetableState> {

    state = {
        selectedMonth: new Date().getUTCMonth() + 1,
        uploadedRecords: {loading: true} as any,
        loading: true
    };

    public handleChangeMonth = (evt: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        this.setState({
            selectedMonth: Number(evt.target.value),
        }, () => {
            this.downloadRecords()
        })
    };

    public downloadRecords = () => {
        http.getRecordsByDate(new Date().getFullYear().toString(), this.state.selectedMonth)
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
        if (localStorage.getData()) {
            this.setState({
                uploadedRecords: JSON.parse(localStorage.getData() as string)
            });
        }
        this.downloadRecords();
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
                            value={this.state.selectedMonth}
                            onChange={(evt) => this.handleChangeMonth(evt)}
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
                            style={{width: '320px'}}
                        >
                            <option value={10}>Октябрь</option>
                            <option value={11}>Ноябрь</option>
                            <option value={12}>Декабрь</option>
                        </NativeSelect> : null}
                    </FormControl>
                </Paper>

                <Paper style={{marginTop: '1rem'}}>
                    {!this.state.uploadedRecords ? <CircularProgress/> : <>
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
                    </>}
                </Paper>
            </Grid>
        )
    }
}
