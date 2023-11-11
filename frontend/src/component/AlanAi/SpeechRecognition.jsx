import alanBtn from "@alan-ai/alan-sdk-web";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/CartAction";
import ModalView from "../ModalView/ModalView";
const SpeechRecognition = () => {
  const alanBtnRef = useRef({}).current;
  const [transcript, setTranscript] = useState("");
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);
  let history = useHistory();
  const handleConvertTextToSpeech = (text) => {
    fetch("https://api.fpt.ai/hmi/tts/v5", {
      method: "POST",
      headers: {
        "api-key": "4Vjej9D5ONIlxbm6m7GwFu9UK2SMaypw", // Thay YOUR_API_KEY bằng API Key của bạn từ FPT.AI
        "Content-Type": "application/json",
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
    recognition.onresult = (e) => {
      const transcriptWithoutDiacritics1 = e.results[0][0].transcript;
      const transcriptWithoutDiacritics = e.results[0][0].transcript
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/\./g, "") // Loại bỏ dấu chấm
        .replace(/,/g, "_"); // Thay thế dấu phẩy thành gạch dưới

      alanBtnRef.btnInstance.sendText(transcriptWithoutDiacritics);
      setTranscript(transcriptWithoutDiacritics);
    };
    recognition.start();
  };

  const handleCommand = (command) => {
    console.log("command:", command);
    if (command.COMMAND === "OPEN_CART") {
      // Gửi yêu cầu đến API Text to Speech của FPT.AI
      setIsCartOpen(true);
      handleConvertTextToSpeech("Đã mở");
    } else if (command.COMMAND === "ORDER") {
      // Gửi yêu cầu đến API Text to Speech của FPT.AI
      history.push("/shipping");
      handleConvertTextToSpeech("Mời điền thông tin giao hàng");
    } else if (command.COMMAND === "THEM_GIO_HANG") {
      handleConvertTextToSpeech("Thêm sản phẩm thành công");
      // Gọi hàm thêm sản phẩm vào giỏ hàng
      dispatch(addItemsToCart("63d37d5f9f45061750a9ef17", 1));
    } else if (command.COMMAND === "CLOSED_CART") {
    } else {
      handleConvertTextToSpeech("Không hiểu");
    }
  };

  useEffect(() => {
    alanBtnRef.btnInstance = alanBtn({
      key: "cd7ae87743f65f9aece47c502042ff062e956eca572e1d8b807a3e2338fdd0dc/stage", //key lấy khi đăng kí trên ALAN Studio
      onCommand: function ({ command, payload }) {
        handleCommand(command); // Command trả về từ kịch bản trên studio
        console.log(command, payload);
      },
    });
  }, []);

  return (
    <>
      <button className="" onClick={handleRecognition}>
        <img
          style={{ margin: "0 120px", width: "100px" }}
          src="https://cdn-icons-png.flaticon.com/128/3128/3128290.png"
          alt=""
        />
        <p>{transcript}</p>
      </button>
    </>
  );
};

export default SpeechRecognition;
