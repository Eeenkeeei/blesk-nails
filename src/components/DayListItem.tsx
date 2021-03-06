import React from "react";
import {Fab, Grid, IconButton, TextField} from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import {Cancel, Sync} from "@material-ui/icons";
import isMobile from "ismobilejs";
import Http from "../storage/http";
import {ReactComponent as VkIcon} from '../svg/vk.svg';

interface DayListItemProps {
    year: string
    time: string
    comment: string
    cost: number
    dayNumber: number
    number: number
    updateRecords: (items: any) => void
    month: string
}

interface DayListItemState {
    time: string
    comment: string
    cost: number
    inputTime: boolean
    inputComment: boolean
    inputCost: boolean
}

const http = new Http();

export class DayListItem extends React.Component <DayListItemProps, DayListItemState> {

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
        http.updateRecord(this.props.year, this.props.month, this.props.dayNumber, this.props.number, this.state.time, this.state.comment, this.state.cost)
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

        const timeForm = (<form onSubmit={(evt) => {
            evt.preventDefault();
            this.handleUpdateRecord()
        }}>
            <TextField autoFocus={true}
                       value={this.state.time}
                       onChange={(evt) => this.setState({time: evt.target.value})}
                       type={"time"}
                       style={{marginLeft: '1rem', width: '70%'}}
            />
        </form>);

        const handleChangeInputTime = () => this.handleChangeInputGrid('time');


        const commentForm = (
            <form onSubmit={(evt) => {
                evt.preventDefault();
                this.handleUpdateRecord()
            }}>
                <TextField autoFocus={true} value={this.state.comment}
                           onChange={(evt) => this.setState({comment: evt.target.value})}
                           fullWidth={true}/>
            </form>
        );

        const handleChangeInputComment = () => this.handleChangeInputGrid('comment');

        const inputCost = (
            <form onSubmit={(evt) => {
                evt.preventDefault();
                this.handleUpdateRecord()
            }}>
                <TextField autoFocus={true} value={this.state.cost}
                           onChange={(evt) => this.setState({cost: Number(evt.target.value)})}
                           fullWidth={true}/>
            </form>
        );

        const handleChangeInputCost = () => this.handleChangeInputGrid('cost');

        const GetIconByComment = () => {
            if (this.state.comment.includes('inst')) {
                return (<InstagramIcon className="icon instagramIcon"/>)
            } else if (this.state.comment.includes('whats')) {
                return (<WhatsAppIcon className="icon whatsAppIcon"/>)
            } else if (this.state.comment.includes('vk')) {
                return (<VkIcon className="icon vkIcon"/>)
            }
            return null
        };

        return (
            <Grid container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  style={{borderTop: '1px solid #e0e0e0'}}
                  className="border"
            >
                <Grid className="border itemGrid" item xs={3} sm={1} style={{paddingLeft: 5}}
                      onClick={handleChangeInputTime}>
                    {this.state.inputTime ? timeForm :
                        <div style={{display: 'flex'}}>
                            <span className="dayText" style={{marginTop: 5}}>{this.state.time}</span>
                            <GetIconByComment/>
                        </div>
                    }
                </Grid>

                <Grid className="border itemGrid" item xs={6} sm={8} onClick={handleChangeInputComment} style={{

                }}>
                    {this.state.inputComment ? commentForm :
                        <span className="dayText">
                        {this.state.comment.replace('inst', '').replace('vk', '').replace('whats', '')}
                    </span>
                    }
                </Grid>
                {this.state.cost === 0 ?
                    <Grid className="border itemGrid" item xs={1} sm={2} onClick={handleChangeInputCost}>
                        {this.state.inputCost ? inputCost : null}
                    </Grid> :
                    <Grid className="border itemGrid" item xs={1} sm={2} onClick={handleChangeInputCost}>
                        {this.state.inputCost ? inputCost : <span className="dayText">{this.state.cost}</span>}
                    </Grid>}

                <Grid item xs={1} sm={1} className="border" style={{width: 36, maxWidth: 36, marginLeft: 'auto'}}>
                    <IconButton style={{paddingLeft: 0}} onClick={() => this.handleUpdateRecord()}>
                        <Sync/>
                    </IconButton>
                </Grid>


                {/* кнопка очистки времени */}
                {this.state.inputTime ?
                    <Fab color="secondary" style={{
                        position: 'fixed',
                        bottom: `${isMobile() ? '300px' : '15px'}`,
                        right: 15,
                        zIndex: 1000
                    }}
                         onClick={() => {
                             this.setState({
                                 time: ''
                             }, () => {
                                 this.handleUpdateRecord()
                             });
                         }}>
                        <Cancel/>
                    </Fab> : null}
            </Grid>
        )
    }
}
