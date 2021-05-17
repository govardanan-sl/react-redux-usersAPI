import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(theme=>({
    root:{
        '& .MuiFormControl-root':{
            width:'80%',
            margin:theme.spacing(1)
        }
    }
}))

export default useStyle;