import React from 'react';
import Http from "../storage/http";
import {RecordsInDay} from "../common/interfaces";
import {CircularProgress} from "@material-ui/core";
import {Line} from 'react-chartjs-2';
import {NewStatisticGraphic} from "./NewStatisticGraphic";

const http = new Http();

interface StatisticProps {

}

interface StatisticState {
    selectedMonth: number,
    loading: boolean,
    october: RecordsInDay[],
    november: RecordsInDay[],
    december: RecordsInDay[]
}

export default class Statistic extends React.Component <StatisticProps, StatisticState> {

    state = {
        selectedMonth: new Date().getUTCMonth() + 1,
        loading: true,
        october: [],
        november: [],
        december: []
    };

    public uploadRecordsInMonthByMonthNumber = async (monthNumber: number) => {
        return new Promise (((resolve, reject) => {
            http.getRecordsByDate(new Date().getFullYear().toString(), monthNumber.toString())
                .then(res => res.json())
                .then(
                    (result) => {
                        resolve(result)
                    }
                )
        }))
    };

    public uploadRecords = () => {
        const uploadOctober = new Promise ((resolve, reject) => {
            resolve(this.uploadRecordsInMonthByMonthNumber(10))
        });
        const uploadNovember = new Promise ((resolve, reject) => {
            resolve(this.uploadRecordsInMonthByMonthNumber(11))
        });
        const uploadDecember = new Promise ((resolve, reject) => {
            resolve(this.uploadRecordsInMonthByMonthNumber(12))
        });
        Promise.all([uploadOctober, uploadNovember, uploadDecember]).then(values => {
            this.setState({
                loading: false,
                october: values[0] as any,
                november: values[1] as any,
                december: values[2] as any
            })
        });
    };

    componentDidMount(): void {
        this.uploadRecords()
    }

    componentDidUpdate(prevProps: Readonly<StatisticProps>, prevState: Readonly<StatisticState>, snapshot?: any): void {
        if (prevState.selectedMonth !== this.state.selectedMonth) {
            this.setState({
                loading: false
            }, () => {
                this.uploadRecords()
            })
        }
    }

    public render() {
        const recordsInOctober: RecordsInDay[] = []; // массив дней с записями в выбранном месяце
        const recordsInNovember: RecordsInDay[] = []; // массив дней с записями в выбранном месяце
        const recordsInDecember: RecordsInDay[] = []; // массив дней с записями в выбранном месяце

        const labelsForGraphic: number[] = [];
        let totalOctoberSum = 0;
        let totalNovemberSum = 0;
        let totalDecemberSum = 0;

        recordsInOctober.forEach(data => {
            if (data !== undefined) {
                totalOctoberSum += data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost
            }
        });

        let octoberData: number[] = [];
        let novemberData: number[] = [];
        let decemberData: number[] = [];

        const daysInMonth = 31;
        let startNumber = 1;

        while (startNumber <= daysInMonth) {
            recordsInOctober.push(this.state.october[startNumber]);
            recordsInNovember.push(this.state.november[startNumber]);
            recordsInDecember.push(this.state.december[startNumber]);
            labelsForGraphic.push(startNumber);
            startNumber++
        }

        recordsInOctober.forEach(data => {
            if (data !== undefined) {
                octoberData.push(data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost);
                totalOctoberSum += data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost
            }
        });

        recordsInNovember.forEach(data => {
            if (data !== undefined) {
                novemberData.push(data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost);
                totalNovemberSum += data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost
            }
        });

        recordsInDecember.forEach(data => {
            if (data !== undefined) {
                decemberData.push(data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost);
                totalDecemberSum += data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost
            }
        });
        console.log();
        const data = {
            labels: labelsForGraphic,
            datasets: [
               new NewStatisticGraphic(`Октябрь: ${totalOctoberSum}`,
                   octoberData,
                   'rgba(75,192,192,0.4)',
                   'rgba(75,192,192,1)',
                   'rgba(75,192,192,1)',
                   'rgba(75,192,192,1)',
                   'rgba(220,220,220,1)'),
                new NewStatisticGraphic(`Ноябрь: ${totalNovemberSum}`,
                    novemberData,
                    'rgba(230,151,255,0.4)',
                    'rgb(186,130,255)',
                    'rgb(235,143,255)',
                    'rgb(186,130,255)',
                    'rgba(220,220,220,1)'),
                new NewStatisticGraphic(`Декабрь ${totalDecemberSum}`,
                    decemberData,
                    'rgba(99,206,255,0.98)',
                    'rgb(72,89,192)',
                    'rgb(74,84,192)',
                    'rgb(81,111,192)',
                    'rgba(220,220,220,1)'),
            ]
        };
        if (!this.state.loading) {
            return (
                <div>
                    <Line data={data} />
                </div>
            )
        } else return <CircularProgress/>
    }
}
