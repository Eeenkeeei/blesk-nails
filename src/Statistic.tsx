import React from 'react';
import {MyChart} from "./StatsGraphic";
import Http from "./http";
import moment from 'moment'
import {RecordsInDay} from "./interfaces";
import {CircularProgress, Typography} from "@material-ui/core";
const http = new Http();

export default class Statistic extends React.Component {

    state = {
        uploadedRecords: false as any
    }

    componentDidMount(): void {
        http.getRecordsByDate(new Date().getFullYear().toString(), 10)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        uploadedRecords: result
                    })
                }
            )
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

        const dataForStats: {x: number, y: number}[] = [];
        recordsInMonth.forEach(data => {
            dataForStats.push({x: recordsInMonth.indexOf(data)+1, y: data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost})
        })

        if (dataForStats.length !== 0){
            return (
                <div>
                    <Typography>Октябрь</Typography>
                    <MyChart data={dataForStats}/>
                </div>
            )
        } else return <CircularProgress/>
    }
}