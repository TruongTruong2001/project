import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import { useHistory } from "react-router-dom";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Pagination from "react-js-pagination";
import "./Product.css";
import MetaData from "../../more/Metadata";
import Typography from"@material-ui/core/Typography"
// import { useAlert } from "react-alert";
import BottomTab from "../../more/BottomTab";
import DropDown from "./DropDown";
import { categoriesData } from "../Admin/Product/sidebarData";
import Sidebar from "../Admin/Product/Sidebar";
import ListIcon from '@mui/icons-material/List';
const Agriculture = ({ match }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [category,setCategory] = useState("");
  const [childrens,setChildrens] = useState("");
  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) =>  {
    setCurrentPage(e);
  };
  
  const [product, setProduct] = useState([]);
  const {products,loading, error} = useSelector((state) => state.products);
  
  useEffect(() => {
    if(error){
        alert(error);
        dispatch(clearErrors())
    }
  dispatch(getProduct(keyword,category,childrens));
}, [dispatch, keyword,category,alert,error,childrens]); 
      const [filteredProducts, setFilteredProducts] = useState([]);
      useEffect(() => {
     
         products.filter((product) => product.subcategory === "Nông sản");

        setFilteredProducts(filteredProducts);
      }, [products]);
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Products" />
          <Header className="relative" activeHeading={3}/>
          <div className="z-30 absolute ml-[1em] mt-[-6rem] z-5" 
          >
               <Sidebar 
                categoriesData={categoriesData}
             
               />
            
            </div>


          <div>
            <div className="z-20 flex justify-center">
                <div className=" grid grid-cols-1 first-line: gap-[20px] md:grid-cols-2 
                                md:gap-[20px] lg:grid-cols-4 lg:gap-[20px] 
                                  mb-1 " >
                                
                                {filteredProducts.map((product, index) => (
                                    <ProductCard product={product} key={index} />
                                  ))}
                             </div>
                                  {filteredProducts && filteredProducts.length === 0 ? (
                                  <div className="container" id="container">
                                    
                                        {products &&
                                        
                                        products
                                        .filter((product) => product.subcategory === "Thực phẩm chế biến"
                                     )
                                        .map((product) =>(
                                          <ProductCard key={product._id} product={product} />
                                        ))}
                                </div>
                                
                                  ) : null}
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

              
          </div>
          
          <Footer />
          <BottomTab />

          
        
        </>
      )}
    </>
  );
};

export default Agriculture;
