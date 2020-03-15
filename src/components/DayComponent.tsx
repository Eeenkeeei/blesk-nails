import React from 'react';
import {Chip, Grid, Typography} from "@material-ui/core";
import {RecordItemData, RecordsInDay} from "../common/interfaces";
import {DayListItem} from "./DayListItem";

interface DayListComponentProps {
    recordsInDay: RecordsInDay
    selectedDate: string
    dayNumber: number
    updateRecords: (items: any) => void
}

interface DayListComponentState {
}

const getWeekDay = (date: Date) => {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const day = date.getDay();
    return days[day];
};

export default class DayComponent extends React.Component<DayListComponentProps, DayListComponentState> {

    public render() {
        const dayListItemData: RecordItemData[] = [];
        if (this.props.recordsInDay !== undefined) {
            dayListItemData.push(this.props.recordsInDay["1"], this.props.recordsInDay["2"], this.props.recordsInDay["3"], this.props.recordsInDay["4"])
        }
        const date = new Date(
            this.props.selectedDate.split('-')[0]
            + '-' +
            `${this.props.selectedDate.split('-')[1].length === 1 ? '0' + this.props.selectedDate.split('-')[1] : this.props.selectedDate.split('-')[1]}` +
            '-' +
            `${this.props.dayNumber.toString().length === 1 ? '0' + this.props.dayNumber.toString() : this.props.dayNumber}`
        );

        return (
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="stretch"
                  key={this.props.dayNumber}
                  style={{marginTop: '1rem'}}>
                <Chip style={{marginLeft: '2rem', width: '200px'}} variant="outlined" color="primary" label={
                    <Typography variant={"h6"}>
                        {this.props.dayNumber}.{this.props.selectedDate.split('-')[1]} {getWeekDay(date)}
                    </Typography>}
                />
                {dayListItemData.map(data => {
                    return (
                        <DayListItem
                            year={this.props.selectedDate.split('-')[0]}
                            updateRecords={this.props.updateRecords}
                            month={this.props.selectedDate.split('-')[1]}
                            dayNumber={this.props.dayNumber}
                            number={dayListItemData.indexOf(data) + 1}
                            key={Math.random()}
                            time={data.time}
                            comment={data.comment}
                            cost={data.cost}
                        />
                    )
                })}
            </Grid>
        )
    }
}
