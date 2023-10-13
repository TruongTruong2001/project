import React, { useEffect, useState } from "react";
import Footer from "../../Footer.jsx";
import Header from "../Home/Header.jsx";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader.jsx";
import BlogCard from "./BlogCard.jsx";
import { clearErrors, getBlog } from "../../actions/BlogActions";
import Pagination from "react-js-pagination";
import MetaData from "../../more/Metadata.jsx";
import Typography from"@material-ui/core/Typography"
// import { useAlert } from "react-alert";
import BottomTab from "../../more/BottomTab.jsx";

const Blogs = ({ match }) => {
  const dispatch = useDispatch();
 
  const [currentPage, setCurrentPage] = useState(1);
  
  const [category,setCategory] = useState("");

  const {
    blogs,
    loading,
    error,
    blogsCount,
    resultPerPage,
  } = useSelector((state) => state.blogs);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };


  useEffect(() => {
      if(error){
          alert(error);
          dispatch(clearErrors())
      }
    dispatch(getBlog());
  }, [dispatch,alert,error]); 



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Blogs" />
          <Header activeHeading={4}/>

        <div>
             {blogs.length === 0 ?
             <span style={{
               display:"block",
               padding:"30px 0",
               fontSize:"1.5rem",
               flex:".9",
               textAlign:"center"
             }}>Không có bài blog nào hết!</span>
             : 
             <div
             className="products"
             style={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "center",
               flex:".9"
             }}
           >
             {blogs &&
               blogs.map((blog) => (
                 <BlogCard key={blog.id} blog={blog} />
               ))}
           </div>
              }
             
             </div>
            
              <div
                className="pagination__box"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "6vmax",
                }}
              >
                {/* <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                /> */}
              </div>
        
          <Footer />
          <BottomTab />
        
        </>
      )}
    </>
  );
};

export default Blogs;
