import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { Loader2 } from "lucide-react"

const techRoles = ["Frontend Developer", "Backend Developer", "UI/UX Designer"];
const nonTechRoles = ["Video Editor", "Media", "Content Writer", "Marketing", "Events & Promotion","Graphic Designer"];
const years = ["1st Year", "2nd Year", "3rd Year"];
const depts = ["CSE","IT","AI DS","AI ML","Cyber Security","CSBS","ECE","MECH","CIVIL","EEE","VLSI","ACT","BME","MCT"];

const Recruitment = () => {
  const navigate = useNavigate();

  const [isLoading,setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    dept: "",
    year: "",
    role: "",
    github: "",
    resume: "",
    mode: "",
    description: "",
    category: "tech",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.contact || !formData.dept || !formData.year || !formData.role || !formData.description) {
        toast.error("Please fill all the fields!");
        setIsLoading(false);
        return;
      }

      const emailQuery = query(
        collection(db, "recruitment"),
        where("email", "==", formData.email)
      );
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        toast.error("This email is already registered!");
        setIsLoading(false);
        return;
      }

      const contactQuery = query(
        collection(db, "recruitment"),
        where("contact", "==", formData.contact)
      );
      const contactSnapshot = await getDocs(contactQuery);
      if (!contactSnapshot.empty) {
        toast.error("This contact number is already registered!");
        setIsLoading(false);
        return;
      }

      const sanitizedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value || ""])
      );

      await addDoc(collection(db, "recruitment"), sanitizedData);
      toast.success("Application submitted successfully!");
      navigate("/thank-you");
    } catch (err) {
      console.error(err);
      toast.error("Error submitting form");
    } finally {
      setIsLoading(false);
    }
  };

  const rolesToShow = formData.category === "tech" ? techRoles : nonTechRoles;
  const showGithubResume = formData.category === "tech";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-800 p-6 font-poppins">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-black/20 backdrop-blur-lg border border-yellow-600/30 rounded-3xl shadow-[0_0_30px_rgba(255,255,0,0.3)] p-8 text-white space-y-6"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">
          We are <span className="text-yellow-400 animate-bounce inline-block drop-shadow-[0_0_1px_rgba(255,255,0,0.7)]">Hiring!</span>
        </h1>

        {["name", "email",].map((field) => {
          const labels = { name: "Full Name", email: "Email Address", contact: "Contact Number" };
          const placeholders = { name: "Enter your full name", email: "Enter your email", contact: "Enter your contact number" };
          const types = { name: "text", email: "email", contact: "tel" };
          return (
            <div className="flex flex-col" key={field}>
              <label className="mb-2 text-yellow-300 font-bold text-lg drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">{labels[field]}</label>
              <input
                type={types[field]}
                name={field}
                placeholder={placeholders[field]}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-yellow-500/30 bg-black/30 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-black/40 transition-colors duration-200 shadow-[0_0_5px_rgba(255,255,0,0.4)]"
              />
            </div>
          );
        })}

        <div className="flex flex-col" >
              <label className="mb-2 text-yellow-300 font-bold text-lg drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">Contact</label>
              <input
                type="tel"
                name="contact"
                placeholder="Enter your contact number"
                value={formData.contact}
                onChange={handleChange}
                pattern="[0-9]{10}"
                minLength={10}
                maxLength={10}
                inputMode="numeric"
                className="w-full p-3 rounded-xl border border-yellow-500/30 bg-black/30 text-white placeholder-yellow-200 
                          focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-black/40 transition-colors duration-200 
                          shadow-[0_0_5px_rgba(255,255,0,0.4)]"
              />
            </div>

        

        <div className="flex flex-col space-y-3">
          <label className="text-yellow-300 font-bold text-lg mb-2 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">Year of Study</label>
          <div className="flex gap-4 flex-wrap">
            {years.map((yr) => (
              <label
                key={yr}
                className={`cursor-pointer px-4 py-2 rounded-full border border-yellow-500/50 transition-colors duration-200 ${
                  formData.year === yr ? "bg-yellow-500 border-yellow-200 text-black font-semibold" : "text-yellow-200 hover:bg-yellow-600/20"
                }`}
              >
                <input type="radio" name="year" value={yr} checked={formData.year === yr} onChange={handleChange} className="hidden" />
                {yr}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <label className="text-yellow-300 font-bold text-lg mb-2 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">Department</label>
          <div className="flex gap-4 flex-wrap">
            {depts.map((dept) => (
              <label
                key={dept}
                className={`cursor-pointer px-4 py-2 rounded-full border border-yellow-500/50 transition-colors duration-200 ${
                  formData.dept === dept ? "bg-yellow-500 border-yellow-200 text-black font-semibold" : "text-yellow-200 hover:bg-yellow-600/20"
                }`}
              >
                <input type="radio" name="dept" value={dept} checked={formData.dept === dept} onChange={handleChange} className="hidden" />
                {dept}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <label className="text-yellow-300 font-bold text-lg mb-2 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">Status</label>
          <div className="flex gap-4 flex-wrap">
            {["day-scholar","hosteller"].map((mode) => (
              <label
                key={mode}
                className={`cursor-pointer px-4 py-2 rounded-full border border-yellow-500/50 transition-colors duration-200 ${
                  formData.mode === mode ? "bg-yellow-500 border-yellow-200 text-black font-semibold" : "text-yellow-200 hover:bg-yellow-600/20"
                }`}
              >
                <input type="radio" name="mode" value={mode} checked={formData.mode === mode} onChange={handleChange} className="hidden" />
                {mode === "day-scholar" ? "Day-Scholar" : "Hosteller"}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <label className="text-yellow-300 font-bold text-lg mb-2 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">Category</label>
          <div className="flex gap-4 flex-wrap">
            {["tech","non-tech"].map((cat) => (
              <label
                key={cat}
                className={`cursor-pointer px-4 py-2 rounded-full border border-yellow-500/50 transition-colors duration-200 ${
                  formData.category === cat ? "bg-yellow-500 text-black font-semibold border-yellow-200" : "text-yellow-200 hover:bg-yellow-600/20"
                }`}
              >
                <input type="radio" name="category" value={cat} checked={formData.category === cat} onChange={handleChange} className="hidden" />
                {cat === "tech" ? "Tech" : "Non-Tech"}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <label className="text-yellow-300 font-bold text-lg mb-2 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
            {formData.category === "tech" ? "Tech Roles" : "Non-Tech Roles"}
          </label>
          <div className="flex gap-3 flex-wrap">
            {rolesToShow.map((role) => (
              <label
                key={role}
                className={`cursor-pointer px-4 py-2 rounded-full border border-yellow-500/50 transition-colors duration-200  ${
                  formData.role === role ? "bg-yellow-500 border-yellow-200 text-black font-semibold " : "text-yellow-200 hover:bg-yellow-600/20 font-semibold"
                }`}
              >
                <input type="radio" name="role" value={role} checked={formData.role === role} onChange={handleChange} className="hidden" />
                {role}
              </label>
            ))}
          </div>
        </div>

        {showGithubResume && (
          <>
            <div className="flex flex-col">
              <label className="mb-2 font-bold text-lg text-yellow-300 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">GitHub Profile</label>
              <input
                type="url"
                name="github"
                placeholder="Enter your GitHub profile link"
                value={formData.github}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-yellow-500/30 bg-black/30 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-black/40 transition-colors duration-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-bold text-lg text-yellow-300 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">Resume Link</label>
              <input
                type="url"
                name="resume"
                placeholder="Enter your Resume link"
                value={formData.resume}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-yellow-500/30 bg-black/30 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-black/40 transition-colors duration-200"
              />
            </div>
          </>
        )}

        <div className="flex flex-col">
          <label className="text-yellow-300 mb-2 font-bold text-lg drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">Why do you want to join our Tech Club?</label>
          <textarea
            name="description"
            placeholder="Write a short description..."
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 rounded-xl border border-yellow-500/30 bg-black/30 placeholder-yellow-200 text-amber-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-black/40 transition-colors duration-200"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors duration-200 shadow-[0_0_5px_rgba(255,255,0,0.5)] flex justify-center items-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Submit Application"}
        </button>

      </form>
    </div>
  );
};

export default Recruitment;
