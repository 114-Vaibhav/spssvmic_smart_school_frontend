import React, { useState } from "react";
import axios from "axios";

const AdmissionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    lastClass: "",
    lastSchool: "",
    lastClassPercentage: "",
    address: "",
    applyFor: "9th",
    subjects: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let newSubjects = [...prev.subjects];
      if (checked) {
        newSubjects.push(value);
      } else {
        newSubjects = newSubjects.filter((sub) => sub !== value);
      }
      return { ...prev, subjects: newSubjects };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate subject selection
    const requiredSubjects = formData.applyFor === "9th" ? 6 : 5;
    if (formData.subjects.length < requiredSubjects) {
      alert(`Please select ${requiredSubjects} subjects`);
      return;
    }
    e.preventDefault();

    try {
      console.log("data sent");
      const response = await axios.post("api/admission/submit", formData);
      alert(response.data.message);
      // setFormData({
      //   state: "",
      //   district: "",
      //   city: "",
      //   name: "",
      //   category: "Park",
      //   chargesAdults: "",
      //   chargesChildren: "",
      //   // paymentQR: "",
      //   email: "",
      // });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data");
    }
    onSubmit(formData);
    console.log("data collected");
  };

  const highSchoolSubjects = [
    "Hindi",
    "English",
    "Mathematics",
    "Science",
    "Social Science",
    "Drawing",
    "Computer",
  ];

  const interScienceSubjects = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "English",
    "General Hindi",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-1">Full Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-1">Mobile Number*</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-1">Date of Birth*</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Applying For*</label>
          <select
            name="applyFor"
            value={formData.applyFor}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="9th">9th Class</option>
            <option value="11th">11th Class (Science Stream)</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-1">Father's Name*</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">
            Father's Occupation*
          </label>
          <input
            type="text"
            name="fatherOccupation"
            value={formData.fatherOccupation}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-1">Mother's Name*</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">
            Mother's Occupation*
          </label>
          <input
            type="text"
            name="motherOccupation"
            value={formData.motherOccupation}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-1">
            Last Attended Class*
          </label>
          <select
            name="lastClass"
            value={formData.lastClass}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Class</option>
            <option value="8th">8th Class</option>
            <option value="10th">10th Class</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">
            Last School Attended*
          </label>
          <input
            type="text"
            name="lastSchool"
            value={formData.lastSchool}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-1">
            Percentage in Last Class*
          </label>
          <input
            type="number"
            name="lastClassPercentage"
            value={formData.lastClassPercentage}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Subjects*</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {formData.applyFor === "9th"
            ? highSchoolSubjects.map((subject, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="subjects"
                    value={subject}
                    checked={formData.subjects.includes(subject)}
                    onChange={handleSubjectChange}
                    className="rounded text-blue-600"
                  />
                  <span>{subject}</span>
                </label>
              ))
            : interScienceSubjects.map((subject, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="subjects"
                    value={subject}
                    checked={formData.subjects.includes(subject)}
                    onChange={handleSubjectChange}
                    className="rounded text-blue-600"
                  />
                  <span>{subject}</span>
                </label>
              ))}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {formData.applyFor === "9th"
            ? "Select 6 subjects"
            : "Select 5 subjects"}
          {formData.subjects.length > 0 &&
            ` (Selected: ${formData.subjects.length})`}
        </p>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Address*</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition font-semibold"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
};

export default AdmissionForm;
