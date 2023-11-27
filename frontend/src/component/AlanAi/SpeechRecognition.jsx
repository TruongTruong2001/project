import alanBtn from "@alan-ai/alan-sdk-web";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/CartAction";
import { setHoten } from "../../actions/AlanActions";
import { setAddress } from "../../actions/AlanActions";
import { setPhone } from "../../actions/AlanActions";
import { setCity } from "../../actions/AlanActions";
import { setProvince } from "../../actions/AlanActions";
import ModalCard from "../cart/Payment/ModalCard";
import ModalPlaceOrder from "../cart/Payment/ModalPlaceOrder";
import Shippingcard from "../cart/Payment/Shippingcard";
const SpeechRecognition = () => {
  const alanBtnRef = useRef({}).current;
  const [transcript, setTranscript] = useState("");
  const dispatch = useDispatch();
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionTimeout, setRecognitionTimeout] = useState(null);
  const [isDivOpen, setIsDivOpen] = useState(false);
  let history = useHistory();
  const currentUrl = window.location.pathname;
  const hotenFromRedux = useSelector((state) => state.alan.hoten);
  const addressFromRedux = useSelector((state) => state.alan.address);
  const phoneFromRedux = useSelector((state) => state.alan.phone);
  const cityFromRedux = useSelector((state) => state.alan.city);
  const provinceFromRedux = useSelector((state) => state.alan.province);
  const handleConvertTextToSpeech = (text) => {
    fetch("https://api.fpt.ai/hmi/tts/v5", {
      method: "POST",
      headers: {
        "api-key": "4Vjej9D5ONIlxbm6m7GwFu9UK2SMaypw", // Thay YOUR_API_KEY bằng API Key của bạn từ FPT.AI
        "Content-Type": "application/json",
        voice: "thuminh",
      },
      body: JSON.stringify({
        text: text, // Nội dung bạn muốn chuyển đổi thành âm thanh
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Sau khi nhận được URL âm thanh từ API, bạn có thể sử dụng nó hoặc chơi trực tiếp
        const audio = new Audio(data.async);
        audio.play();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleRecognition = () => {
    let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.lang = "vi-VI";
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (e) => {
      const transcriptWithoutDiacritics1 = e.results[0][0].transcript;
      const transcriptWithoutDiacritics = e.results[0][0].transcript
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/\./g, "")
        .replace(/,/g, "_");

      alanBtnRef.btnInstance.sendText(transcriptWithoutDiacritics);
      setTranscript(transcriptWithoutDiacritics1);
    };
    recognition.onend = () => {
      // Thay đổi trạng thái khi kết thúc ghi âm
      setIsRecording(false);

      // Kiểm tra nếu thời gian ghi âm đã hết
      if (recognitionTimeout) {
        // Thực hiện các hành động khi hết thời gian ghi âm
        console.log("Hết thời gian ghi âm.");

        // Cập nhật state hoặc thực hiện các hành động khác tùy vào yêu cầu của bạn
      }

      // Clear the previous timeout to avoid multiple restarts
      clearTimeout(recognitionTimeout);

      // Set a new timeout for restarting recognition every 4 seconds
    };

    recognition.start();

    // Save the recognition instance to use it later for stopping
    alanBtnRef.recognitionInstance = recognition;

    setRecognitionTimeout(setTimeout(restartRecognition, 3000));
  };

  // Function to restart recognition
  const restartRecognition = () => {
    // Abort the recognition instead of stopping it
    alanBtnRef.recognitionInstance.abort();
    // Start the recognition again
    alanBtnRef.recognitionInstance.start();
  };

  const handleCommand = (command) => {
    console.log("command:", command);
    if (command.COMMAND === "OPEN_CART") {
      // Gửi yêu cầu đến API Text to Speech của FPT.AI
      history.push("/cart");
      handleConvertTextToSpeech("Đã mở");
    } else if (command.COMMAND === "ORDER") {
      // Gửi yêu cầu đến API Text to Speech của FPT.AI
      history.push("/shippingcard");
      handleConvertTextToSpeech("Mời điền thông tin giao hàng");
    } else if (command.COMMAND === "THONG_TIN") {
      dispatch(setHoten(command.payload.name));
      console.log(command.payload.name);
      handleConvertTextToSpeech("Vui lòng cho biết địa chỉ liên lạc");
    } else if (command.COMMAND === "THONG_TIN_ADDRESS") {
      dispatch(setAddress(command.payload.address));
      handleConvertTextToSpeech("Vui lòng cho biết số điện thoại liên lạc");
    } else if (command.COMMAND === "THONG_TIN_PHONE") {
      dispatch(setPhone(command.payload.phone));
      handleConvertTextToSpeech("Vui lòng cho biết tên thành phố ");
    } else if (command.COMMAND === "THONG_TIN_CITY") {
      dispatch(setCity(command.payload.city));
      handleConvertTextToSpeech("Vui lòng cho biết tên tỉnh ");
    } else if (command.COMMAND === "THONG_TIN_PROVINCE") {
      console.log(command.COMMAND);
      dispatch(setProvince(command.payload.province));
      history.push("/modalplaceorder");
      handleConvertTextToSpeech(
        "Vui lòng chọn phương thức thanh toán và nhấn đặt hàng"
      );
    } else if (command.COMMAND === "THEM_GIO_HANG") {
      handleConvertTextToSpeech("Thêm sản phẩm thành công");
      // Gọi hàm thêm sản phẩm vào giỏ hàng
      dispatch(addItemsToCart("6536208398f35a26590df0ab", 1));
    } else if (command.COMMAND === "NAME_PRODUCT_DETAILS") {
      handleConvertTextToSpeech("Thông tin chi tiết đã mở");
      // Gọi hàm thêm sản phẩm vào giỏ hàng
      history.push(`/product/6536208398f35a26590df0ab`);
    } else {
      handleConvertTextToSpeech("Alan Không hiểu! Mời hỏi câu khác");
    }
  };

  useEffect(() => {
    alanBtnRef.btnInstance = alanBtn({
      key: "92e7a6e021d4f594c64c431cfac0539b2e956eca572e1d8b807a3e2338fdd0dc/stage", //key lấy khi đăng kí trên ALAN Studio
      onCommand: function ({ command }) {
        handleCommand(command); // Command trả về từ kịch bản trên studio
        console.log(command);
      },
    });
  }, []);

  return (
    <>
      <div className="mt-[-50px]">
        <div className="">
          {currentUrl === "/shippingcard" ? (
            <>
              <ModalCard
                hoten={hotenFromRedux}
                address={addressFromRedux}
                phone={phoneFromRedux}
                city={cityFromRedux}
                province={provinceFromRedux}
              />
              <div className=" mt-[10px]  mx-[15rem]">
                <button className="w-[10rem] " onClick={handleRecognition}>
                  <img
                    className="w-[5rem]"
                    src="https://cdn-icons-png.flaticon.com/128/3128/3128290.png"
                    alt=""
                  />
                  <div>
                    {isRecording ? (
                      <div>Đang lắng nghe...</div>
                    ) : (
                      <p>{transcript}</p>
                    )}
                  </div>
                </button>
              </div>
            </>
          ) : currentUrl === "/modalplaceorder" ? (
            <ModalPlaceOrder
              hoten={hotenFromRedux}
              address={addressFromRedux}
              phone={phoneFromRedux}
              city={cityFromRedux}
              province={provinceFromRedux}
            />
          ) : (
            // Trường hợp mặc định hoặc xử lý khác nếu cần

            <div className="mt-[8vmax] mx-[8rem] ">
              <button
                className="w-[20rem] border mx-[15px] "
                onClick={handleRecognition}
              >
                <img
                  className="mx-[6rem] "
                  src="https://cdn-icons-png.flaticon.com/128/3128/3128290.png"
                  alt=""
                />
                <div>
                  {isRecording ? (
                    <div>Đang lắng nghe...</div>
                  ) : (
                    <p>{transcript}</p>
                  )}
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SpeechRecognition;
