import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme=>({
    root:{
        backgroundColor:'#fff'
    },
    searchInput:{
        opacity:'0.6',
        padding:`${theme.spacing(1)}px ${theme.spacing(1)}px`,
        fontSize:'0.8rem',
        '&:hover':{
            backgroundColor:'#e3e2e2'
        },
        '& .MuiSvgIcon-root':{
            marginRight:theme.spacing(1)
        }
    }
}));

export default useStyles;