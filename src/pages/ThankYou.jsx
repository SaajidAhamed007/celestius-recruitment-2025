import React from "react";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-800 p-6 font-poppins">
      <div className="text-center bg-black/20 backdrop-blur-lg border border-yellow-600/30 rounded-3xl shadow-[0_0_30px_rgba(255,255,0,0.3)] p-12 max-w-xl">
        <h1 className="text-5xl font-bold text-yellow-400 mb-6 flex justify-center">
          {/** Letter by letter bounce animation */}
          {"Thank You!".split("").map((char, index) => (
            <span
              key={index}
              className="inline-block"
              style={{ animation: `bounce 0.6s ease infinite`, animationDelay: `${index * 0.1}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p className="text-yellow-200 text-lg mb-6 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
          🎉 Your application has been successfully submitted.
        </p>
        <p className="text-yellow-300 mb-6">
          We will review your submission and get back to you soon.
        </p>
        
      </div>

      {/** Tailwind custom animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}
      </style>
    </div>
  );
};

export default ThankYou;
