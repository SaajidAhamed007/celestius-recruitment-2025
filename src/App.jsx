import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Recruitment from "./pages/Recruitment";
import ThankYou from "./pages/ThankYou";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Recruitment />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </>
  );
};

export default App;




