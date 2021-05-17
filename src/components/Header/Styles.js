import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme=>({
    root:{
        backgroundColor:'#fff',
        transform:'translateZ(0)'
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