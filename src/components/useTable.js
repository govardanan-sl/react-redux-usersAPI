import { Table, TableCell, TableRow,TableHead } from '@material-ui/core'
import React from 'react'

export function useTable(headCells) {

    const TableContainer = props =>(
            <Table>
                {props.children}
            </Table>
    )
    const TbleHead = props =>{
        return(
            <TableHead>
                <TableRow>
                    {
                       headCells.map(cell=>(
                            <TableCell key={cell.id}>
                                {cell.label}
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }

    return {
        TableContainer,
        TbleHead,
    }
}
