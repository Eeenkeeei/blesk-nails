import {createMuiTheme} from "@material-ui/core";

export const theme = createMuiTheme({
    "palette": {
        "common": {
            "black": "#000",
            "white": "#fff"
        },
        "background": {
            "paper": "rgba(255, 255, 255, 1)",
            "default": "#fafafa"
        },
        "primary": {
            "light": "#40c4ff",
            "main": "rgb(122,117,160)",
            "dark": "rgba(74, 144, 226, 1)",
            "contrastText": "#fbfdff"
        },
        "secondary": {
            "light": "#4ffcff",
            "main": "#ba68c8",
            "dark": "#22c5bb",
            "contrastText": "#fff"
        },
        "error": {
            "light": "#e52519",
            "main": "#f42740",
            "dark": "#8d0600",
            "contrastText": "#fff"
        },
        "text": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.54)",
            "disabled": "rgba(0, 0, 0, 0.38)",
            "hint": "rgba(0, 0, 0, 0.38)"
        }
    }
});
