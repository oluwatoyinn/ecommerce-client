import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import {  makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
      btnDelete:{
        backgroundColor:'#BC1F27',
        color:"#fff",
      },
      btnEdit:{
        backgroundColor:'#2886C8',
        color:'#fff',
        marginRight:'9px'
      }
    }));

const Categorytable = ({toggleUpdate, deleteCategoryById, categories}) =>{
    const classes = useStyles()

    const columns = [
        {
          dataField: 'id',
          text: '#',
          hidden:true
        }, 
        {
          dataField: '#',
          text: '#',
          headerStyle: (colum, colIndex) =>{
            return { width: '80px' };
          },
          formatter: (amb, row, rowIndex, extraData) => (
            <div>
                {rowIndex+1}
            </div>
          ),
        }, 
        {
          dataField: 'name',
          text: 'Category Name'
        }, 
        {
          dataField: 'description',
          text: 'Category Description'
        }, 
        {
          dataField: 'link',
          text: 'Action',
          formatter: (rowContent, row) => {
            // console.log(row)
            return ( 
              <div className="d-flex">
                <button onClick={()=>toggleUpdate(row._id)} className={classes.btnEdit}>EDIT</button>
                <button  onClick={()=>deleteCategoryById(row._id)} className={classes.btnDelete} >DELETE</button> 
              </div>  
            )
            }
        },
      ];
          
      const rowStyle = { 
        cursor:'pointer',
      };
      // custom pagination here
      const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
          Showing results { from } - { to } of { size }
        </span>
      );
      
      const options = {
        paginationSize: 6,
        pageStartIndex: 1,
        alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText:<SkipNextIcon style={{fontSize:14}}/>,
        prePageText: <PlayArrowIcon style={{fontSize:14}} />,
        nextPageText: <PlayArrowIcon style={{fontSize:14}} />,
        lastPageText: <SkipNextIcon style={{fontSize:14}}  />,
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
          text: '8', value: 8
        }, {
          text: '16', value: 16
        }, {
          text: 'All', value: categories.length
        }] // A numeric array is also available. the purpose of above example is custom the text
      };
        // react-bootstrap-table and pagination ends here
      
    return (
        <React.Fragment>
          <BootstrapTable 
            // {...props.baseProps }
            keyField='name' 
            data={categories} 
            columns={columns} 
            rowStyle={rowStyle}
            bordered={false}
            // rowEvents={rowEvents}
            pagination={paginationFactory(options)}
            hover
          />
        </React.Fragment>
    )
}
export default Categorytable