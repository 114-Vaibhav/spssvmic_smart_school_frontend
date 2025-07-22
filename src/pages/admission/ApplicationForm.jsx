import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    father_name: "",
    father_occupation: "",
    mother_name: "",
    mother_occupation: "",
    last_class: "",
    last_school: "",
    last_percentage: "",
    address: "",
    applying_for: "9th",
    subjects: [],
    photo: null,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("admissionToken");
        const response = await axios.get("/api/admission/application", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success && response.data.application) {
          setFormData({
            ...response.data.application,
            dob: response.data.application.dob.split("T")[0],
          });
          setIsEdit(true);
        }
      } catch (err) {
        console.error("Failed to fetch application:", err);
      }
    };

    fetchApplication();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("admissionToken");
      const formDataToSend = new FormData();

      // Append all form fields to FormData
      Object.keys(formData).forEach((key) => {
        if (key === "subjects") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key !== "photo") {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const endpoint = isEdit
        ? "/api/admission/application"
        : "/api/admission/application";
      const method = isEdit ? "put" : "post";

      const response = await axios[method](endpoint, formDataToSend, config);

      if (response.data.success) {
        navigate("/admission/dashboard/view");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
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
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        {isEdit ? "Update Application" : "Application Form"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

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
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-1">Father's Name*</label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
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
              name="father_occupation"
              value={formData.father_occupation}
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
              name="mother_name"
              value={formData.mother_name}
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
              name="mother_occupation"
              value={formData.mother_occupation}
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
              name="last_class"
              value={formData.last_class}
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
              name="last_school"
              value={formData.last_school}
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
              name="last_percentage"
              value={formData.last_percentage}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Applying For*</label>
            <select
              name="applying_for"
              value={formData.applying_for}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="9th">9th Class</option>
              <option value="11th">11th Class (Science Stream)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Subjects*</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {formData.applying_for === "9th"
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
            {formData.applying_for === "9th"
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

        <div>
          <label className="block text-gray-700 mb-1">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
          {formData.photo && typeof formData.photo === "string" && (
            <div className="mt-2">
              <img
                src={`/uploads/${formData.photo}`}
                alt="Current"
                className="h-24 w-24 object-cover rounded"
              />
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded font-semibold text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Submitting..."
              : isEdit
              ? "Update Application"
              : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ApplicationForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ApplicationForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     father_name: "",
//     father_occupation: "",
//     mother_name: "",
//     mother_occupation: "",
//     last_class: "",
//     last_school: "",
//     last_percentage: "",
//     address: "",
//     applying_for: "9th",
//     subjects: [],
//     photo: null,
//   });

//   const [isEdit, setIsEdit] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // ... (keep all existing useEffect, handleChange, handleSubjectChange, handleFileChange functions)

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // Validate subjects selection
//     const requiredSubjects = formData.applying_for === "9th" ? 6 : 5;
//     if (formData.subjects.length !== requiredSubjects) {
//       setError(`Please select exactly ${requiredSubjects} subjects`);
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("admissionToken");
//       const formDataToSend = new FormData();

//       // Append all form fields
//       Object.keys(formData).forEach((key) => {
//         if (key === "subjects") {
//           formDataToSend.append(key, JSON.stringify(formData[key]));
//         } else if (key !== "photo") {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       if (formData.photo instanceof File) {
//         formDataToSend.append("photo", formData.photo);
//       }

//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const endpoint = "/api/admission/application";
//       const method = isEdit ? "put" : "post";

//       const response = await axios[method](endpoint, formDataToSend, config);

//       if (response.data.success) {
//         toast.success(
//           isEdit ? "Application updated!" : "Application submitted!"
//         );
//         navigate("/admission/dashboard");
//       }
//     } catch (err) {
//       console.error("Submission error:", err);
//       setError(
//         err.response?.data?.message || "Submission failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-blue-800 mb-6">
//           {isEdit ? "Update Application" : "New Admission Application"}
//         </h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Personal Details Section */}
//           <div className="border-b pb-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Personal Details
//             </h3>
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Name, DOB, Father/Mother details inputs */}
//               {/* ... (keep all your existing input fields) */}
//             </div>
//           </div>

//           {/* Academic Details Section */}
//           <div className="border-b pb-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Academic Details
//             </h3>
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Last class, school, percentage inputs */}
//               {/* ... (keep all your existing academic fields) */}
//             </div>
//           </div>

//           {/* Application Details Section */}
//           <div className="border-b pb-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Application Details
//             </h3>
//             <div className="space-y-6">
//               {/* Applying for, Subjects, Address inputs */}
//               {/* ... (keep all your existing application fields) */}
//             </div>
//           </div>

//           {/* Photo Upload */}
//           <div className="pb-6">
//             <label className="block text-gray-700 mb-2">Student Photo</label>
//             <input
//               type="file"
//               name="photo"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//               accept="image/*"
//             />
//             {formData.photo && typeof formData.photo === "string" && (
//               <div className="mt-4">
//                 <p className="text-sm text-gray-500 mb-2">Current Photo:</p>
//                 <img
//                   src={`${process.env.REACT_APP_API_URL}/uploads/${formData.photo}`}
//                   alt="Student"
//                   className="h-32 w-32 object-cover rounded-md border"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`px-6 py-2 rounded-md text-white font-medium ${
//                 loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
//               }`}
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   {isEdit ? "Updating..." : "Submitting..."}
//                 </span>
//               ) : isEdit ? (
//                 "Update Application"
//               ) : (
//                 "Submit Application"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ApplicationForm;
