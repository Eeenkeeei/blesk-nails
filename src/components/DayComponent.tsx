import React from 'react';
import {Chip, Typography} from "@material-ui/core";
import {RecordItemData, RecordsInDay} from "../common/interfaces";
import {DayListItem} from "./DayListItem";

interface DayListComponentProps {
    recordsInDay: RecordsInDay
    selectedDate: string
    dayNumber: number
    updateRecords: (items: any) => void
}

const getWeekDay = (date: Date) => {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const day = date.getDay();
    return days[day];
};

export const DayComponent = (props: DayListComponentProps) => {
    const dayListItemData: RecordItemData[] = [];
    if (props.recordsInDay !== undefined) {
        dayListItemData.push(props.recordsInDay["1"], props.recordsInDay["2"], props.recordsInDay["3"], props.recordsInDay["4"])
    }
    const date = new Date(
        props.selectedDate.split('-')[0]
        + '-' +
        `${props.selectedDate.split('-')[1].length === 1 ? '0' + props.selectedDate.split('-')[1] : props.selectedDate.split('-')[1]}` +
        '-' +
        `${props.dayNumber.toString().length === 1 ? '0' + props.dayNumber.toString() : props.dayNumber}`
    );

    let dayMoneySum = 0; // сумма заработанного за день

    dayListItemData.forEach(item => {
        dayMoneySum += Number(item.cost)
    });

    return (
        <div className="DayComponentContainer" key={props.dayNumber}>
            <Chip style={{width: '90%', margin: 'auto', marginTop: 20, marginBottom: 20}} variant="outlined" color="primary" label={
                <Typography variant={"h6"}>
                    {props.dayNumber}.{props.selectedDate.split('-')[1]}, {getWeekDay(date)}.
                     &nbsp; {dayMoneySum > 0 ? `Всего: ${dayMoneySum}` : null}
                </Typography>}
            />
            {dayListItemData.map((data) => {
                return (
                    <DayListItem
                        year={props.selectedDate.split('-')[0]}
                        updateRecords={props.updateRecords}
                        month={props.selectedDate.split('-')[1]}
                        dayNumber={props.dayNumber}
                        number={dayListItemData.indexOf(data) + 1}
                        key={Math.random()}
                        time={data.time}
                        comment={data.comment}
                        cost={data.cost}
                    />
                )
            })}
        </div>
    )
};
