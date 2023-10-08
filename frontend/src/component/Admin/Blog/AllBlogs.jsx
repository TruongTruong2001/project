import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid"
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteBlog,
  getAdminBlog,
} from "../../../actions/BlogActions";

import MetaData from "../../../more/Metadata";
import Sidebar from "../Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_BLOG_RESET } from "../../../constans/BlogConstans";

const AllBlogs = ({history}) => {
    const dispatch = useDispatch();
    const { error, blogs } = useSelector((state) => state.blogs);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.deleteBlog
      );
      const deleteBlogHandler = (id) => {
        dispatch(deleteBlog(id));
      };
    useEffect(() => {
        if (error) {
          alert(error);
          dispatch(clearErrors());
        }
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
          }
      
          if (isDeleted) {
            toast.success("Product Deleted Successfully");
            history.push("/dashboard");
            dispatch({ type: DELETE_BLOG_RESET });
          }
        dispatch(getAdminBlog());
      }, [dispatch, alert, error, history]);

  const customRowClass = {
    root: {
      '&.highlighted': {
        backgroundColor: 'yellow',
      },
    },
  };
  const row = [];
  blogs &&
    blogs.forEach((item) => {
      row.push({
        id: item._id,
        title: item.title,
        images: item.images,
        description: item.description
      });
    });

const columns = [
    { field: "id", headerName: "Id sản phẩm", minWidth: 100, flex: 0.3 },
  
    {
      field: "name",
      headerName: "Tên sản phẩm",
      Width: 150,
      flex: 0.4,
      renderCell: (params) => {

        return (
         <frameElement className=" flex">
         
               <img
                  style={{width:"38px"}}
                  src={params.row.images[0].url}
                  className="ProductImg"
                />
                <span> {params.row.title}</span>
             </frameElement>
           
        );
    },
  },
    


    // {
    //   field: "actions",
    //   flex: 0.2,
    //   headerName: "Chức năng",
    //   minWidth: 150,
    //   type: "number",
    //   sortable: false,
    //   renderCell: (params) => {
       
    //     return (
    //       <Fragment>
           
    //         <Link to={`/edit/product/${params.getValue(params.id, "id")}`}>
    //         <i class="fa-regular fa-pen-to-square" style={{color: "#0c121d"}} ></i>
    //         </Link> 

    //         <Button
    //         onClick={() =>
    //             deleteProductHandler(params.getValue(params.id, "id"))
    //           }
    //         >
    //          <i class="fa-solid fa-trash"></i>
    //         </Button>
           
    //       </Fragment>
          
    //     );
    //   },
    // },
  ];


    return (
       <Fragment>
      <MetaData title={`Danh sách sản phẩm - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">Danh sách blog</h1>
      
          <DataGrid
           className="data"
            rows={row}
            columns={columns}
            pageSize={9}
            disableSelectionOnClick
            autoHeight
          />
         
    
        </div>
      </div>
      <ToastContainer 
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Fragment>
    )
}

export default AllBlogs
