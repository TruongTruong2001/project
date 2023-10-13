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
    <div className="pb-4 pl-4 w-[230px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div 
            key={index}
            className={`${styles.noramlFlex} `}
            style={{display:"flex"}}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: "20px",
                height: "auto",
                userSelect: "none",
                display:"flex"
              }}
              alt=""
            />
           
            <h5 className="text-sm cursor-pointer select-none">{i.title}</h5>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
