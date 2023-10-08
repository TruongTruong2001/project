import React from "react";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from "react-router-dom";
import "../Home/Home.css";
import { Rating } from "@material-ui/lab";
const ProductCard = ({ product }) => {
  const options = {
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };
  
  return (
    <>
    
      <div className="ProductCard ">
        
            <img
              src={product.images[0].url}
              alt={product.name}
              className="ProductImg"
            />
            <p className="productName">{product.name}</p>
            <div>
            <Rating {...options} />
              <span>({product.numOfReviews} Đánh giá)</span>
            </div>
            <div
            
            >
              <div className="offerPriceBox flex  mb-3 w-[200px] ">
              <span className="p__Price">{`${ new Intl.NumberFormat('de-DE',{style: 'currency',currency: 
                'VND'}).format( product.price)}`}</span>
                <h1
                  className="discountPrice"
                  style={{
                    paddingLeft: "2.5vmax",
                    fontSize: ".9vmax",
                    paddingBottom: "0",
                 
                  }}
                >
                  {product.offerPrice > 0 ? `${ new Intl.NumberFormat('de-DE',{style: 'currency',currency: 
                'VND'}).format( product.offerPrice)}` : ""}
                </h1>
              
              </div>
            </div>
              <Link className="flex justify-center w-full hover:border-b-2 hover:border-orange-600 
              hover:scale-105 hover:text-white
                duration-200 ease"
                to= 
                  {`/product/${product._id}`}
                >
                  <button class="button-48 " role="button">
                  <span class="text mt-3 "> <LocalMallIcon id="icon-mall"
                  />  
                    Chọn mua 
                  </span>
                </button>
              </Link>
          </div>
    </>
  );
};

export default ProductCard;
