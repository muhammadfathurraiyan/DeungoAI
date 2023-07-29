import React, { useState } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const ApiLink = "https://free.churchless.tech/v1/chat/completions";
const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const Home = () => {
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [result, setResult] = useState([]);

  const command = () => {
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
  };

  const handleStartListening = (data) => {
    const message = new SpeechSynthesisUtterance(data);
    message.volume = 1;
    message.rate = 1.1;
    message.lang = "id-ID";
    message.onstart = () => {
      setInterval(command, 14000);
    };
    message.onend = () => {
      clearInterval();
    };
    window.speechSynthesis.speak(message);
  };

  const handleStopListening = () => {
    window.speechSynthesis.cancel();
  };

  const handleStartRecording = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "id",
    });
  };

  const handleStopRecording = async () => {
    await SpeechRecognition.stopListening();
    const updatedResult = { role: "user", content: transcript };
    setResult((prevResult) => [...prevResult, updatedResult]);
    resetTranscript();
    apiCall(transcript);
  };

  const apiCall = async (promptText) => {
    try {
      const apiBody = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `ini adalah prompt tambahan "nama kamu adalah deungo", jawab pertanyan ini: ${promptText}` }],
      };
      const response = await apiClient.post(ApiLink, apiBody);
      const data = response.data?.choices[0]?.message?.content;
      const updatedResult = { role: "assistant", content: data };
      setResult((prevResult) => [...prevResult, updatedResult]);
      // implement tts
      handleStartListening(data);
      // console.log(data);
    } catch (error) {
      console.error("An error occurred during API call:", error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen bg-neutral-900 flex justify-center items-center ">
        <div className="grid grid-cols-1 max-sm:mx-2">
          <p className="text-[#e9f1df] text-center text-xl mt-[-1rem] max-sm:text-lg">
            Sorry Your browser not support speech recognition by:{" "}
            <a
              href="https://muhammadfathurraiyan.site"
              target="_blank"
              className="font-bold duration-300 text-[#f5a503] hover:text-[#f2385a]"
            >
              Raiyan.
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center ">
      <div className="grid grid-cols-1 max-sm:mx-2">
        {/* LOGO */}
        <div className="flex justify-center">
          <svg
            viewBox="0 0 600 250"
            className="w-[180px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <symbol id="s-txt">
              <text
                className="text-9xl font-semibold"
                textAnchor="middle"
                x="50%"
                y="50%"
                dy=".35em"
              >
                Deungo.
              </text>
            </symbol>
            <use className="txt" xlinkHref="#s-txt"></use>
            <use className="txt" xlinkHref="#s-txt"></use>
            <use className="txt" xlinkHref="#s-txt"></use>
            <use className="txt" xlinkHref="#s-txt"></use>
            <use className="txt" xlinkHref="#s-txt"></use>
          </svg>
        </div>
        {/* CHATBOX */}
        <div className="mx-auto grid gap-6 grid-cols-[repeat(1,700px)] justify-center max-md:grid-cols-1 max-md:mx-4">
          <div
            key={212339795}
            className="message-box h-[460px] max-sm:h-[500px] overflow-auto outline outline-[rgba(10,10,10,0.46)] bg-neutral-800 relative rounded-2xl px-8 py-8 max-sm:py-3 max-sm:px-3"
          >
            {result.map((message, index) => {
              if (message.role === "assistant") {
                return (
                  <div key={index++}>
                    <div className="w-[70%] relative mb-2 bg-[#3aa0bfc7] p-2 rounded-xl rounded-tl-sm">
                      <p className="absolute font-bold text-base top-1 text-[#e9f1df]">
                        Bang Deungo
                      </p>
                      <p className="mt-6 text-[#e9f1df]">{message.content}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  message.content !== "" && (
                    <div className="flex justify-end">
                      <div
                        key={index}
                        className="w-[70%] mb-2 bg-neutral-600 p-2 rounded-xl rounded-tr-sm"
                      >
                        <p className=" text-[#e9f1df]">{message.content}</p>
                      </div>
                    </div>
                  )
                );
              }
            })}
            {transcript !== "" && (
              <div className="flex justify-end">
                <div className="w-[70%] mb-2 bg-neutral-600 p-2 rounded-xl rounded-tr-sm">
                  <p className="text-[#e9f1df]">{transcript}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* BUTTONS */}
        <div
          onClick={handleStopListening}
          className="mx-auto mt-3 grid grid-cols-3 justify-center items-center gap-x-7 max-md:mx-4 max-md:gap-x-4"
        >
          <div className="cursor-pointer">
            <div className="group py-3 px-4 rounded-xl hover:bg-[rgb(242,56,90,0.1)] duration-75 hover:outline hover:outline-[#f2385a] bg-[rgb(233,241,223,0.1)] ">
              <p className="text-[#e9f1df]  group-hover:text-[#f2385a]  text-center">
                Stop Listening
              </p>
            </div>
          </div>
          {/* record button */}
          <div className="flex items-center justify-center">
            {listening ? (
              <div
                onClick={handleStopRecording}
                className="p-10 cursor-pointer rounded-full bg-[rgb(58,161,191,.1)] duration-100 outline outline-[#3aa1bf] w-1 h-1 flex items-center justify-center"
              >
                <i className="uil uil-microphone text-3xl text-[#3aa1bf]"></i>
              </div>
            ) : (
              <div
                onClick={handleStartRecording}
                className="group cursor-pointer p-10 rounded-full bg-[rgb(233,241,223,0.1)] duration-75 hover:bg-[rgb(58,161,191,.1)] hover:outline hover:outline-[#3aa1bf]  w-1 h-1 flex items-center justify-center"
              >
                <i className="uil uil-microphone text-2xl group-hover:text-3xl group-hover:text-[#3aa1bf] text-[#e9f1df]"></i>
              </div>
            )}
          </div>
          <div onClick={resetTranscript} className="cursor-pointer">
            <div className="group py-3 px-4 rounded-xl hover:bg-[rgb(245,165,3,.1)] duration-75 hover:outline hover:outline-[#f5a503] bg-[rgb(233,241,223,0.1)] ">
              <p className="text-[#e9f1df] group-hover:text-[#f5a503] text-center">
                Reset Transcript
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
