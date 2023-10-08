import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getBlogDetails,
  newReview,
} from "../../actions/BlogActions";
import Footer from "../../Footer";
import MetaData from "../../more/Metadata";
import Header from "../Home/Header";
import { Rating } from "@material-ui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NEW_REVIEW_RESET } from "../../constans/BlogConstans";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";

const BlogDetails = ({ match, history }) => {

  const dispatch = useDispatch();
  
  const { blog, loading, error } = useSelector(
    (state) => state.blogDetails
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("blogId", match.params.id);

    {
      isAuthenticated !== true ? history.push(`/login?redirect=/`) : <></>;
    }

    dispatch(newReview(myForm));

    {
      comment.length === 0
        ? toast.error("Please fill the comment box")
        : toast.success("Review done successfully reload for watch it");
    }
    dispatch({ type: NEW_REVIEW_RESET });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBlogDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  const options = {
    value: blog.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${blog.name}`} />
          <Header />
          <div>
          {blog.title}

          
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
          <Footer />
          <BottomTab />


         
        </>
      )}
    </>
  );
};

export default BlogDetails;