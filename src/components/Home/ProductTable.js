import React from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';
import {  makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    btnDelete:{
        backgroundColor:'red',
        color:"#fff",
    },
    btnEdit:{
        backgroundColor:'#00CCFF',
        color:'#fff',
        marginRight:'9px'
    }, 
  }));


const  ProductTable = ({products,updateToggle,allProducts}) => {
    const classes = useStyles()
    
    // console.log(products);
  
    const columns = [
        {
          dataField: 'id',
          text: '#',
          hidden:true
        }, 
        {
          dataField: '#',
          text: '#',
          headerStyle: (colum, colIndex) => {
              return { width: '80px' };
            },
          formatter: (amb, row, rowIndex, extraData) => (
                  <div>
                      {rowIndex+1}
                  </div>
            ),
        }, 
        {
          dataField: 'productName',
          text: 'Product Name'
        }, 
        {
          dataField: 'productImageUrl',
          text: 'Product Image Url'
        }, 
        {
          dataField: 'productDescription',
          text: 'Product Description'
        },
        {
          dataField: 'category',
          text: 'Category'
        },
        {
          dataField: 'price',
          text: 'Price'
        },
        {
            dataField: 'link',
            text: 'Action',
            formatter: (rowContent, row) => {
                // console.log(row)
                return ( 
                    <div className="d-flex">
                        <button  onClick={()=>updateToggle(row.id)} className={classes.btnEdit}  >EDIT</button>
                        <button  className={classes.btnDelete} >DELETE</button> 
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
        alwaysShowAllBtns: true, 
        hideSizePerPage: true, 
        firstPageText:<SkipNextIcon style={{fontSize:14}}  />,
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
          text: 'All', value: products.length
        }] 
      };
    return (
        <React.Fragment>
            <BootstrapTable 
            keyField='dataField' 
            // data={Object.keys(products)} 
            data={products}
            columns={columns} 
            pagination={paginationFactory(options)}
            rowStyle={rowStyle}
            hover
            />
        </React.Fragment>
    )
}

export default ProductTable