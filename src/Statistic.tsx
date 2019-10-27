import React from 'react';
import {MyChart} from "./StatsGraphic";
import Http from "./http";
import moment from 'moment'
import {RecordsInDay} from "./interfaces";
import {CircularProgress, FormControl, InputLabel, MenuItem, NativeSelect, Select} from "@material-ui/core";
import isMobile from "ismobilejs";

const http = new Http();

interface StatisticProps {

}

interface StatisticState {
    selectedMonth: number,
    uploadedRecords: any
}

export default class Statistic extends React.Component <StatisticProps, StatisticState> {

    state = {
        selectedMonth: new Date().getUTCMonth() + 1,
        uploadedRecords: false as any
    };

    public handleChangeMonth = (evt: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        this.setState({
            selectedMonth: Number(evt.target.value),
        })
    };

    public uploadRecords = (monthNumber: number) => {
        http.getRecordsByDate(new Date().getFullYear().toString(), monthNumber)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        uploadedRecords: result
                    })
                }
            )
    };

    componentDidMount(): void {
        this.uploadRecords(this.state.selectedMonth)
    }

    componentDidUpdate(prevProps: Readonly<StatisticProps>, prevState: Readonly<StatisticState>, snapshot?: any): void {
        if (prevState.selectedMonth !== this.state.selectedMonth) {
            this.setState({
                uploadedRecords: false
            }, () => {
                this.uploadRecords(this.state.selectedMonth)
            })
        }
    }

    public render() {
        const recordsInMonth: RecordsInDay[] = []; // массив дней с записями в выбранном месяце

        if (this.state.uploadedRecords !== false) {
            const daysInMonth = moment().daysInMonth();
            let startNumber = 1;
            while (startNumber <= daysInMonth) {
                recordsInMonth.push(this.state.uploadedRecords[startNumber]);
                startNumber++
            }
        }
        const dataForStats: { x: number, y: number }[] = [];
        recordsInMonth.forEach(data => {
            if (data !== undefined) {
                dataForStats.push({
                    x: recordsInMonth.indexOf(data) + 1,
                    y: data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost
                })

            }
        });
        if (dataForStats.length !== 0) {
            return (
                <div>
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

                    <MyChart data={dataForStats}/>
                </div>
            )
        } else return <CircularProgress/>
    }
}