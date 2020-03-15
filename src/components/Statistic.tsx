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
    december: RecordsInDay[],
    jan: RecordsInDay[],
    feb: RecordsInDay[],
    mar: RecordsInDay[],
}

export default class Statistic extends React.Component <StatisticProps, StatisticState> {

    state = {
        selectedMonth: new Date().getUTCMonth() + 1,
        loading: true,
        october: [],
        november: [],
        december: [],
        jan: [],
        feb: [],
        mar: [],
    };

    public uploadRecordsInMonthByMonthNumber = async (year: string, monthNumber: string) => {
        return new Promise (((resolve, reject) => {
            http.getRecordsByDate(year, monthNumber)
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
            resolve(this.uploadRecordsInMonthByMonthNumber('2019', '10'))
        });
        const uploadNovember = new Promise ((resolve, reject) => {
            resolve(this.uploadRecordsInMonthByMonthNumber('2019', '11'))
        });
        const uploadDecember = new Promise ((resolve, reject) => {
            resolve(this.uploadRecordsInMonthByMonthNumber('2019', '12'))
        });
        const uploadJanuary= new Promise ((resolve, reject) => {
            resolve(this.uploadRecordsInMonthByMonthNumber('2020', '01'))
        });
        const uploadFebruary = new Promise ((resolve, reject) => {
            resolve(this.uploadRecordsInMonthByMonthNumber('2020', '02'))
        });
        const uploadMarch= new Promise ((resolve, reject) => {
            resolve(this.uploadRecordsInMonthByMonthNumber('2020', '03'))
        });
        Promise.all([uploadOctober, uploadNovember, uploadDecember, uploadJanuary, uploadFebruary, uploadMarch]).then(values => {
            this.setState({
                loading: false,
                october: values[0] as any,
                november: values[1] as any,
                december: values[2] as any,
                jan: values[3] as any,
                feb: values[4] as any,
                mar: values[5] as any
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
        const recordsInJan: RecordsInDay[] = []; // массив дней с записями в выбранном месяце
        const recordsInFeb: RecordsInDay[] = []; // массив дней с записями в выбранном месяце
        const recordsInMar: RecordsInDay[] = []; // массив дней с записями в выбранном месяце

        const labelsForGraphic: number[] = [];
        let totalOctoberSum = 0;
        let totalNovemberSum = 0;
        let totalDecemberSum = 0;
        let totalJanSum = 0;
        let totalFebSum = 0;
        let totalMarSum = 0;

        recordsInOctober.forEach(data => {
            if (data !== undefined) {
                totalOctoberSum += data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost
            }
        });

        let octoberData: number[] = [];
        let novemberData: number[] = [];
        let decemberData: number[] = [];
        let janData: number[] = [];
        let febData: number[] = [];
        let marData: number[] = [];

        const daysInMonth = 31;
        let startNumber = 1;

        while (startNumber <= daysInMonth) {
            recordsInOctober.push(this.state.october[startNumber]);
            recordsInNovember.push(this.state.november[startNumber]);
            recordsInDecember.push(this.state.december[startNumber]);
            recordsInJan.push(this.state.jan[startNumber]);
            recordsInFeb.push(this.state.feb[startNumber]);
            recordsInMar.push(this.state.mar[startNumber]);

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
        recordsInJan.forEach(data => {
            if (data !== undefined) {
                janData.push(data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost);
                totalJanSum += data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost
            }
        });
        recordsInFeb.forEach(data => {
            if (data !== undefined) {
                febData.push(data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost);
                totalFebSum += data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost
            }
        });
        recordsInMar.forEach(data => {
            if (data !== undefined) {
                marData.push(data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost);
                totalMarSum += data["1"].cost + data["2"].cost + data["3"].cost + data["4"].cost
            }
        });

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
                new NewStatisticGraphic(`Январь ${totalJanSum}`,
                    janData,
                    'rgba(99,206,255,0.98)',
                    'rgb(122,192,29)',
                    'rgb(107,192,61)',
                    'rgb(79,192,64)',
                    'rgba(220,220,220,1)'),
                new NewStatisticGraphic(`Февраль ${totalFebSum}`,
                    febData,
                    'rgba(99,206,255,0.98)',
                    'rgb(33,192,186)',
                    'rgb(53,192,129)',
                    'rgb(63,181,192)',
                    'rgba(220,220,220,1)'),
                new NewStatisticGraphic(`Март ${totalMarSum}`,
                    marData,
                    'rgba(99,206,255,0.98)',
                    'rgb(122,192,29)',
                    'rgb(107,192,61)',
                    'rgb(79,192,64)',
                    'rgba(220,220,220,1)'),
            ]
        };
        if (!this.state.loading) {
            return (
                    <Line data={data} height={350}/>
            )
        } else return <CircularProgress/>
    }
}
