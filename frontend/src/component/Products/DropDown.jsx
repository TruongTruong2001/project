import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useHistory();
  const submitHandle = (i) => {
    navigate.push(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
  <>  
    <div className="px-[1rem] py-[1rem] w-[230px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div 
            key={index}
            className={`w-[29vh] mb-[10px] flex`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: "25px",
                height: "35px",
                userSelect: "none",
              }}
              alt=""
            />
           
            <h5 className="w-full mx-[20px]   text-[14px] cursor-pointer select-none">{i.title}</h5>
         
          </div>
        ))}
    </div>

    
  
    </>
    
  );
};

export default DropDown;
