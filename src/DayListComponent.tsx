import React from 'react';
import {Divider, Grid, Typography} from "@material-ui/core";

interface DayListComponentProps {
    dayNumber: number
    selectedMonth: number
}

interface DayListComponentState {

}

export default class DayListComponent extends React.Component<DayListComponentProps, DayListComponentState> {

    public render() {
        return (
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="stretch"
                  key={this.props.dayNumber}
                  style={{marginTop: '1rem', marginLeft: '1rem'}}>
                <Typography style={{marginLeft: '2rem'}} variant={"h6"}>{this.props.dayNumber}.{this.props.selectedMonth}</Typography>

                <DayListItem time={'9:00'} comment={'Ксюшка пердюшка'} cost={500}/>
                <DayListItem time={'12:00'} comment={'Маша какаша'} cost={700}/>
                <DayListItem time={'15:00'} comment={'Вася хуяся'} cost={228}/>
                <DayListItem time={'19:00'} comment={'Рома секас'} cost={9999}/>


                <Divider/>
            </Grid>
        )
    }
}

interface DayListItemProps {
    time: string
    comment: string
    cost: number
}

interface DayListItemState {
    time: string
    comment: string
    cost: number
}

class DayListItem extends React.Component <DayListItemProps, DayListItemState> {

    constructor(props: DayListItemProps) {
        super(props);
        this.state = {
            time: props.time,
            comment: props.comment,
            cost: props.cost
        }
    }

    public render () {
        return (
            <Grid container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  style={{height: '2.5rem'}}
            >
                <Grid item xs={3} sm={1}>
                    <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>{this.state.time}</Typography>
                </Grid>
                <Grid item xs={7} sm={9}>
                    <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>{this.state.comment}</Typography>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Typography variant={"h6"} style={{fontSize: '1.2rem'}}>{this.state.cost}</Typography>
                </Grid>
            </Grid>
        )
    }
}