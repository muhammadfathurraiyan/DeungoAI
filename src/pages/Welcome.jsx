import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex justify-center items-center ">
      <div className="grid grid-cols-1 max-sm:mx-2">
        <div className="flex justify-center">
          <svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg">
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
        <p className="text-[#e9f1df] text-center text-xl mt-[-1rem] max-sm:text-lg">
          Voice Assistant WebApp by:{" "}
          <a
            href="https://muhammadfathurraiyan.site"
            target="_blank"
            className="font-bold duration-300 text-[#f5a503] hover:text-[#f2385a]"
          >
            Raiyan.
          </a>
        </p>
        <Link to="/home" className="flex justify-center">
          <div className="group text-[#e9f1df] font-bold text-xl max-sm:text-lg inline-flex items-center duration-300 p-[1rem_2rem] max-sm:p-[.7rem_1.5rem] bg-[#3aa1bf] hover:bg-[#f2385a] rounded-lg mt-8 max-sm:mt-6">
            Get Started!
            <i className="uil uil-arrow-right text-2xl duration-300 group-hover:translate-x-2"></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
