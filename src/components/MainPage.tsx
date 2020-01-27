import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import React, {useState} from 'react'
import {
    AppBar,
    Container,
    createStyles, Divider, Drawer,
    Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles,
    Theme,
    Toolbar,
    Typography,
} from "@material-ui/core";
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "../common/Theme";
import Timetable from "./Timetable";
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Statistic from "./Statistic";
import {LoginPage} from "./LoginPage";
import {ChangePassPage} from "./ChangePassPage";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: 0,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }),
);

export const MainPage = () => {
    const [open, setOpen] = useState(false);
    const [confirmed, setConfirmed] = useState(true);
    const handleDrawerChange = () => {
        setOpen(!open);
    };

    const classes = useStyles();

    return (
        <>
            {confirmed ? (<Switch>
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root}>
                            <AppBar
                                position="fixed"
                                className={clsx(classes.appBar, {
                                    [classes.appBarShift]: open,
                                })}
                            >
                                <Toolbar>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerChange}
                                        edge="start"
                                        className={clsx(classes.menuButton, open && classes.hide)}
                                    >
                                        <Icon>menu</Icon>
                                    </IconButton>
                                    <Typography variant="h6" noWrap style={{fontSize: '1.2rem'}}>
                                        Ноготочки
                                    </Typography>
                                    <Typography variant="h6" noWrap
                                                style={{marginLeft: 'auto', fontSize: '1.2rem'}}>
                                        {new Date().toLocaleDateString('ru')}
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <Drawer
                                className={classes.drawer}
                                variant="persistent"
                                anchor="left"
                                open={open}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                <div className={classes.drawerHeader}>
                                    <IconButton onClick={handleDrawerChange}>
                                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                                    </IconButton>
                                </div>
                                <Divider/>
                                <List>
                                    <NavLink to={'/blesk-nails'} style={{color: "black"}}
                                             activeStyle={{color: "black", fontWeight: "bold"}}>
                                        <ListItem button>
                                            <ListItemIcon><Icon>event</Icon></ListItemIcon>
                                            <ListItemText primary={"Расписание"}/>
                                        </ListItem>
                                    </NavLink>
                                    <NavLink to={'/statistic'} style={{color: "black"}}
                                             activeStyle={{color: "black", fontWeight: "bold"}}>
                                        <ListItem button>
                                            <ListItemIcon><Icon>trending_up</Icon></ListItemIcon>
                                            <ListItemText primary={"Статистика"}/>
                                        </ListItem>
                                    </NavLink>
                                    <NavLink to={'/change-password'} style={{color: "black"}}
                                             activeStyle={{color: "black", fontWeight: "bold"}}>
                                        <ListItem button>
                                            <ListItemIcon><Icon>fingerprint</Icon></ListItemIcon>
                                            <ListItemText primary={"Изменить пароль"}/>
                                        </ListItem>
                                    </NavLink>
                                </List>
                            </Drawer>

                            {/*{ ТЕЛО ВСЕЙ СТРАНИЦЫ }*/}
                            <main
                                className={clsx(classes.content, {
                                    [classes.contentShift]: open,
                                })}
                            >
                                <div className={classes.drawerHeader}/>
                                <Container>
                                    <div style={{marginTop: '2rem'}}>
                                        <div>
                                            <Route exact path={'/blesk-nails'} component={() => <Timetable setConfirmed={setConfirmed}/>}/>
                                        </div>
                                        <div>
                                            <Route exact path={'/statistic'} component={Statistic}/>
                                        </div>
                                        <div>
                                            <Route exact path={'/change-password'} component={ChangePassPage}/>
                                        </div>
                                        <Redirect to="/blesk-nails"/>
                                    </div>
                                </Container>
                            </main>
                        </div>
                    </MuiThemeProvider>
                </Switch>
            ) : <LoginPage setConfirmed={setConfirmed}/>}
        </>
    )
};

