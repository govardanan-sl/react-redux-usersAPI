import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles(theme=>({
    root:{
        minWidth:0,
        margin:theme.spacing(0.5)
    }
}))

export default function ActionButton(props) {
    const {color,children,onClick,style} = props
    const classes = useStyle();
    return (
        <Button onClick={onClick} className={classes.root} color={color} style={style}>
            {children}
        </Button>
    )
}


