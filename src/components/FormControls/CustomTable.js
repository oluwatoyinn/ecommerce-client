import React, {useState, useEffect} from 'react'
import { Table,TablePagination , TableHead,makeStyles, TableRow,StyledTableCell, TableCell, TableBody, Tab } from '@material-ui/core'

const useStyles = makeStyles(theme=>({
    table:{
        marginTop:theme.spacing(3),
        '& thead th':{
            fontWeight:'600',
            color:'black',
            backgroundColor:'#F8F8F8'
        },
        '& tbody td':{
            fontWeight:'300'
        },
        '& tbody tr:hover':{
            backgroundColor:'#fffbf2',
            cursor:'pointer'
        }
    },
    secondary:{
        backgroundColor:theme.palette.secondary.light,
        '& .MuiButton-label':{
            color:theme.palette.secondary.main
        }
    },
    primary:{
        backgroundColor:theme.palette.primary.light,
        '& .MuiButton-label': {
            color:theme.palette.primary.main
        }
    }
})) 

export default function CustomTable(TableHeadCells,TableDetails){
    
    const classes = useStyles()
    const pages = [5,10,25]
    const [page, setPage] =  useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(pages[page])
    // const [order, setOrder] = useState()

    const TableContainer = props =>(
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TableHeaders  =  props =>{
            return(
                    <TableHead>
                            <TableRow>
                                {
                                    TableHeadCells.map((header)=>( 
                                        <TableCell key={header.id} >
                                            {header.label}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                    </TableHead>
                )
            }

    const handlePageChange =(event, newPage) =>{
        setPage(newPage)
    }
    const handleChangeRowsPerPage= event =>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }

    const TblPagination = () =>(
        <TablePagination 
            component="div"
            page ={page}
            rowsPerPageOptions ={pages}
            rowsPerPage = {rowsPerPage}
            // count={employee.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage ={handleChangeRowsPerPage}
        />
    )

    // const recordsAfterPaginationAndSorting =()=>{
        // return TableDetails.slice(page*rowsPerPage,(page+1)*rowsPerPage )
        // return filterFn.fn(TableDetails).slice(page*rowsPerPage,(page+1)*rowsPerPage )
        
    // }

    return{
       TableContainer,
       TableHeaders,
       TblPagination,
    //    recordsAfterPaginationAndSorting
    }
}

// const mapStateToProps=state=>({
//     employees:state.EmployeeReducer.employees
// })

