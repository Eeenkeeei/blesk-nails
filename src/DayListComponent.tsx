import React from 'react';
import {Chip, Grid, IconButton, TextField, Typography} from "@material-ui/core";
import {RecordItemData, RecordsInDay} from "./interfaces";
import Http from "./http";
import {Sync} from "@material-ui/icons";
import isMobile from 'ismobilejs';

const http = new Http();

interface DayListComponentProps {
    recordsInDay: RecordsInDay
    selectedMonth: number
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

export default class DayListComponent extends React.Component<DayListComponentProps, DayListComponentState> {

    public render() {
        const dayListItemData: RecordItemData[] = [];
        if (this.props.recordsInDay !== undefined) {
            dayListItemData.push(this.props.recordsInDay["1"], this.props.recordsInDay["2"], this.props.recordsInDay["3"], this.props.recordsInDay["4"])
        }
        const date = new Date(
            new Date().getFullYear()
            + '-' +
            `${this.props.selectedMonth.toString().length === 1 ? '0' + this.props.selectedMonth.toString() : this.props.selectedMonth}` +
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
                        {this.props.dayNumber}.{this.props.selectedMonth} {getWeekDay(date)}
                    </Typography>}
                />
                {dayListItemData.map(data => {
                    return (
                        <DayListItem
                            updateRecords={this.props.updateRecords}
                            month={this.props.selectedMonth}
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

interface DayListItemProps {
    time: string
    comment: string
    cost: number
    dayNumber: number
    number: number
    updateRecords: (items: any) => void
    month: number
}

interface DayListItemState {
    time: string
    comment: string
    cost: number
    inputTime: boolean
    inputComment: boolean
    inputCost: boolean
}

class DayListItem extends React.Component <DayListItemProps, DayListItemState> {

    constructor(props: DayListItemProps) {
        super(props);
        this.state = {
            time: props.time,
            comment: props.comment,
            cost: props.cost,
            inputTime: false,
            inputComment: false,
            inputCost: false
        }
    }

    public handleUpdateRecord = () => {
        http.updateRecord(new Date().getFullYear().toString(), this.props.month, this.props.dayNumber, this.props.number, this.state.time, this.state.comment, this.state.cost)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.updateRecords(result);
                    this.setState({
                        inputTime: false,
                        inputComment: false,
                        inputCost: false
                    });
                }
            )
    };

    public handleChangeInputGrid = (gridName: 'time' | 'comment' | 'cost') => {
        if (gridName === 'time') {
            this.setState({
                inputTime: true
            })
        } else if (gridName === 'comment') {
            this.setState({
                inputComment: true
            })
        } else if (gridName === 'cost') {
            this.setState({
                inputCost: true
            })
        }
    };

    public render() {
        const fontSize = isMobile().any ? '1rem' : '1.3rem';

        return (
            <Grid container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  style={{height: '3.5rem', borderBottom: '1px solid #e0e0e0'}}
            >
                <Grid item xs={3} sm={1} onClick={() => {
                    this.handleChangeInputGrid('time')
                }} style={{height: '100%'}}>
                    {this.state.inputTime ?
                        <form onSubmit={(evt) => {
                            evt.preventDefault();
                            this.handleUpdateRecord()
                        }}>
                            <TextField autoFocus={true}
                                       value={this.state.time}
                                       onChange={(evt) => this.setState({time: evt.target.value})}
                                       type={"time"}
                                       style={{marginLeft: '1rem', width: '100%'}}
                            />
                        </form> :
                        <Typography variant={"h6"}
                                    style={{fontSize: fontSize, marginLeft: '1rem'}}>
                            {this.state.time}
                        </Typography>
                    }
                </Grid>

                <Grid item xs={6} sm={8} onClick={() => {
                    this.handleChangeInputGrid('comment')
                }} style={{height: '100%'}}>
                    {this.state.inputComment ?
                        <form onSubmit={(evt) => {
                            evt.preventDefault();
                            this.handleUpdateRecord()
                        }}>
                            <TextField autoFocus={true} value={this.state.comment}
                                       onChange={(evt) => this.setState({comment: evt.target.value})}
                                       fullWidth={true}/>
                        </form> :
                        <Typography variant={"h6"} style={{fontSize: fontSize}}>{this.state.comment}</Typography>
                    }
                </Grid>

                <Grid item xs={1} sm={2} onClick={() => {
                    this.handleChangeInputGrid('cost')
                }} style={{height: '100%'}}>
                    {this.state.inputCost ?
                        <form onSubmit={(evt) => {
                            evt.preventDefault();
                            this.handleUpdateRecord()
                        }}>
                            <TextField autoFocus={true} value={this.state.cost}
                                       onChange={(evt) => this.setState({cost: Number(evt.target.value)})}
                                       fullWidth={true}/>
                        </form> :
                        <Typography variant={"h6"}
                                    style={{fontSize: fontSize}}>{this.state.cost === 0 ? null : this.state.cost}</Typography>
                    }
                </Grid>

                <Grid item xs={1} sm={1}>
                    <IconButton onClick={() => this.handleUpdateRecord()}>
                        <Sync/>
                    </IconButton>
                </Grid>
            </Grid>
        )
    }
}