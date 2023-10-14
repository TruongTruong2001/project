import React, { useEffect } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";
import ProductCard from "../Products/ProductCard";
import  {useDispatch, useSelector} from "react-redux"
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Header from "./Header";
import MetaData from "../../more/Metadata";
import Footer from "../../Footer";
import BottomTab from "../../more/BottomTab";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const dispatch = useDispatch();
  const { products,error } = useSelector(
    (state) => state.products
  );
   useEffect(() => {
    if(error){ 
      toast.error(error);
      dispatch(clearErrors());
 }
  dispatch(getProduct());
   }, [dispatch,error])
   
  return (
    <>
      <>
      <MetaData title="Trang chủ" />
      <Header activeHeading={1} />
        {/* Carousel */}
      <div className="flex justify-center "
      >
        <div className="banner">
                <Carousel>
                  <img src="https://theme.hstatic.net/200000348893/1000847181/14/collection_banner.jpg?
                  v=200 "         
                  className="bgImg"/>
                  <img src="https://s3.nucuoimekong.com/ncmk/wp-content/uploads/dac-san-dong-thap.jpg" 
                  className="bgImg"/>
                </Carousel>
    
          </div>
        
      </div>
      <div className="container">
      <h2 className="homeHeading ">Thực phẩm chế biến </h2>
        {products &&
            products
            .filter((product) => product.category === 'Thực phẩm chế biến' && product.status=="Chưa thanh lý")
            .map((product) =>(
              <ProductCard key={product._id} product={product} />
            ))}
      </div>

  
      <div className="container" id="container">
      <h2 className="homeHeading">Nông sản</h2>
        {products &&
        
        products
        .filter((product) => product.category === 'Nông sản' && product.status==="Chưa thanh lý")
        .map((product) =>(
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    
      <ToastContainer 
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <Footer />
      <BottomTab />
      </>    
  
    </>
  );
};

export default Home;
