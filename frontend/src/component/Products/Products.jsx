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
import { categoriesData, productData } from "../../static/data";

import ListIcon from '@mui/icons-material/List';
const Products = ({ match }) => {
  const dispatch = useDispatch();
  const [dropDown, setDropDown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [category,setCategory] = useState("");

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  
  const history = useHistory();
  const queryParams = new URLSearchParams(history.location.search);
  const categoryData = queryParams.get('category');

  const [product, setProduct] = useState([]);
  const {products,loading, error} = useSelector((state) => state.products);
  

  useEffect(() => {
    if (categoryData === null) {
      const d = products
      setProduct(d);
    } else {
      const d =
      products && products.filter((i) => i.category === categoryData);
      setProduct(d);
    }
  }, [products]);

  useEffect(() => {
      if(error){
          alert(error);
          dispatch(clearErrors())
      }
    dispatch(getProduct(keyword,category));
  }, [dispatch, keyword,category,alert,error]); 

  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Products" />
          <Header className="relative" activeHeading={2}/>
          <div className=" absolute h-[50px]  ml-[30px] w-[230px]  1000px:block"
          style={{top:"7rem"}}
          >
              {/* <BiMenuAltLeft size={30} className="absolute top-3 left-2" /> */}
              <button  onClick={() => setDropDown(!dropDown)}
                className={`h-[100%] w-[230px]  flex justify-center items-center pl-2 bg-[#4ac68cc4] font-sans 
                text-white  font-[400] select-none rounded-t-md`}
              >
                <ListIcon   onClick={() => setDropDown(!dropDown)} 
                style={{height:"1.5em"}}
                />
               <h5 className="px-[20px] text-[20px]"> Sản phẩm</h5>
              </button>
             
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>

          <div>
            <div className="flex justify-center ">
                <div className=" grid grid-cols-1 first-line: gap-[20px] md:grid-cols-2 
                                md:gap-[20px] lg:grid-cols-4 lg:gap-[20px] 
                                  mb-1 " >
                                
                      {product && product.map((i, index) => <ProductCard product={i} key={index} />)}
                    </div>
                    {product && product.length === 0 ? (
                      <h1 className="text-center w-full pb-[100px] text-[20px]">
                          Không tìm thấy sản phẩm nào hết!
                      </h1>
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

export default Products;
