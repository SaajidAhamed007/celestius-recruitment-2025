import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const techRoles = ["Frontend Developer", "Backend Developer" , "AI Developer", "UI/UX Designer"];
const nonTechRoles = ["Video Editor", "Content Writer", "Marketing", "Media",];
const years = ["1st Year", "2nd Year", "3rd Year"];
const depts = ["CSE","IT","AI DS","AI ML","Cyber Security", "ECE","MECH", "CIVIL", "EEE","VLSI","ACT"];

const Recruitment = () => {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    dept: "",
    year: "",
    role: "",
    github: "",
    resume: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(formData)
  
  try {
    // Add document to "recruitment" collection
    const sanitizedData = Object.fromEntries(
  Object.entries(formData).map(([key, value]) => [key, value || ""])
);
await addDoc(collection(db, "recruitment"), sanitizedData);
alert("dkfjwf")
navigate("/thank-you");

  } catch (err) {
    console.error(err);
    toast.error("Error submitting form");
  }
};



  const isTechRole = techRoles.includes(formData.role);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-800 p-6 font-poppins">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-black/20 backdrop-blur-lg border border-yellow-600/30 rounded-3xl shadow-[0_0_30px_rgba(255,255,0,0.3)] p-8 text-white space-y-6"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">
          We are <span className="text-yellow-400 animate-bounce inline-block drop-shadow-[0_0_1px_rgba(255,255,0,0.7)]">Hiring!</span>
        </h1>

        {[
          { name: "name", label: "Full Name", placeholder: "Enter your full name", type: "text" },
          { name: "email", label: "Email Address", placeholder: "Enter your email", type: "email" },
          { name: "contact", label: "Contact Number", placeholder: "Enter your contact number", type: "tel" },
          
        ].map((field) => (
          <div className="flex flex-col" key={field.name}>
            <label className="mb-2 text-yellow-300 font-bold text-lg drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-yellow-500/30 bg-black/30 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-black/40 focus:text-yellow-200 transition-colors duration-200 shadow-[0_0_5px_rgba(255,255,0,0.4)]"
              required
            />
          </div>
        ))}

        <div className="flex flex-col space-y-3">
  <label className="text-yellow-300 font-bold text-lg mb-2 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
    Year of Study
  </label>
  <div className="flex gap-4 flex-wrap">
    {years.map((yr) => (
      <label
        key={yr}
        className={`cursor-pointer px-4 py-2 rounded-full border border-yellow-500/50 transition-colors duration-200 shadow-[0_0_5px_rgba(255,255,0,0.3)]
          ${formData.year === yr 
            ? "bg-yellow-500 border-yellow-200 shadow-[0_0_5px_rgba(255,255,0,0.6)] text-black font-semibold" 
            : "text-yellow-200 hover:bg-yellow-600/20"}`}
      >
        <input
          type="radio"
          name="year"
          value={yr}
          checked={formData.year === yr}
          onChange={handleChange}
          className="hidden"
          required
        />
        {yr}
      </label>
    ))}
  </div>
</div>

<div className="flex flex-col space-y-3">
  <label className="text-yellow-300 font-bold text-lg mb-2 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
    Department
  </label>
  <div className="flex gap-4 flex-wrap">
    {depts.map((dept) => (
      <label
        key={dept}
        className={`cursor-pointer px-4 py-2 rounded-full border border-yellow-500/50 transition-colors duration-200 shadow-[0_0_5px_rgba(255,255,0,0.3)]
          ${formData.dept === dept 
            ? "bg-yellow-500 border-yellow-200 shadow-[0_0_5px_rgba(255,255,0,0.6)] text-black font-semibold" 
            : "text-yellow-200 hover:bg-yellow-600/20"}`}
      >
        <input
          type="radio"
          name="dept"
          value={dept}
          checked={formData.dept === dept}
          onChange={handleChange}
          className="hidden"
          required
        />
        {dept}
      </label>
    ))}
  </div>
</div>


        <div className="flex flex-col md:flex-row justify-between gap-6">
  {/* Tech Roles */}
  <div className="flex flex-col space-y-3 flex-1">
    <label className="text-yellow-300 font-bold text-lg mb-2 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
      Tech Roles
    </label>
    {techRoles.map((role) => (
      <label
        key={role}
        className={`cursor-pointer px-4 py-2 rounded-full border border-yellow-500/50 transition-colors duration-200 shadow-[0_0_5px_rgba(255,255,0,0.3)]
          ${formData.role === role 
            ? "bg-yellow-500 border-yellow-200 shadow-[0_0_5px_rgba(255,255,0,0.6)] text-black font-semibold" 
            : "text-yellow-200 hover:bg-yellow-600/20"}`}
      >
        <input
          type="radio"
          name="role"
          value={role}
          checked={formData.role === role}
          onChange={handleChange}
          className="hidden"
          required
        />
        {role}
      </label>
    ))}
  </div>

  {/* Non-Tech Roles */}
  <div className="flex flex-col space-y-3 flex-1">
    <label className="text-yellow-300 font-bold text-lg mb-2 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
      Non-Tech Roles
    </label>
    {nonTechRoles.map((role) => (
      <label
        key={role}
        className={`cursor-pointer px-4 py-2 rounded-full border border-yellow-500/50 transition-colors duration-200 shadow-[0_0_5px_rgba(255,255,0,0.3)]
          ${formData.role === role 
            ? "bg-yellow-700 border-yellow-400 shadow-[0_0_5px_rgba(255,255,0,0.6)] text-white font-semibold" 
            : "text-yellow-200 hover:bg-yellow-600/20"}`}
      >
        <input
          type="radio"
          name="role"
          value={role}
          checked={formData.role === role}
          onChange={handleChange}
          className="hidden"
          required
        />
        {role}
      </label>
    ))}
  </div>
</div>


        {/* GitHub & Resume for Tech Roles */}
        {isTechRole && (
          <>
            <div className="flex flex-col">
              <label className="mb-2 font-bold text-lg text-yellow-300 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
                GitHub Profile
              </label>
              <input
                type="url"
                name="github"
                placeholder="Enter your GitHub profile link"
                value={formData.github}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-yellow-500/30 focus:text-yellow-200 bg-black/30 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-black/40 transition-colors duration-200 shadow-[0_0_5px_rgba(255,255,0,0.4)]"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-bold text-lg text-yellow-300 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
                Resume Link
              </label>
              <input
                type="url"
                name="resume"
                placeholder="Enter your Resume link"
                value={formData.resume}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-yellow-500/30 focus:text-yellow-200 bg-black/30 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-black/40 transition-colors duration-200 shadow-[0_0_5px_rgba(255,255,0,0.4)]"
                required
              />
            </div>
          </>
        )}

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-yellow-300 mb-2 font-bold text-lg drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
            Why do you want to join our Tech Club?
          </label>
          <textarea
            name="description"
            placeholder="Write a short description..."
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 rounded-xl border border-yellow-500/30 bg-black/30 placeholder-yellow-200 text-amber-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-black/40 transition-colors duration-200 shadow-[0_0_5px_rgba(255,255,0,0.4)]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors duration-200 shadow-[0_0_5px_rgba(255,255,0,0.5)]"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};




export default Recruitment;
