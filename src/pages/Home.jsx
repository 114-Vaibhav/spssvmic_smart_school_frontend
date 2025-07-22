import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";
import NewsEvents from "../components/NewsEvents";
import PrincipalMessage from "../components/PrincipalMessage";
import Faculty from "./Faculty";
import FacultyDashboard from "./faculty/Dashboard";
import StudentDashboard from "./student/Dashboard";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* <StudentProfile /> */}
        {/* <StudentDashboard /> */}
        {/* <FacultyDashboard /> */}
        <ImageSlider />

        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <NewsEvents />
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                Vision & Mission
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded">
                  {/* <h3 className="font-semibold text-blue-700">
                    {/* सरस्वती विद्या मन्दिर योजनाः एक संक्षिप्त परिचय */}

                  <h3 className="font-semibold text-blue-700">Our Vision</h3>
                  <p>
                    Shripal Singh Saraswati Vidya Mandir Inter College,
                    Chaukharia Magalganj (Kheri) is affiliated to "Vidya Bharti"
                    Akhil Bharatiya Shiksha Sansthan, under whose direction
                    about 30 thousand schools from primary education to higher
                    education are run in the entire country. The institution
                    also has its own Acharya Training Center, Research Institute
                    College, Technical College and Sports College etc. After
                    studying from Arun to fifth class in Saraswati Shishu
                    Mandirs across the state, the brothers and sisters always
                    felt the lack of further education. To fulfil this need,
                    Bhartiya Shiksha Samiti, Uttar Pradesh, Lucknow was
                    established under whose guidance, education from class five
                    onwards was arranged as per Saraswati Vidya Mandir system,
                    in which schools recognized by Uttar Pradesh Secondary
                    Education Council, Allahabad were planned. In Uttar Pradesh,
                    many such schools are running successfully in the name of
                    Saraswati Vidya Mandir at senior secondary level, which are
                    praised by the society for being the leader in culture and
                    exam results through their innovative teaching system. Their
                    impact is reflected in the society. This innovative teaching
                    system has been praised everywhere. Such schools are running
                    in the state in the name of Saraswati Vidya Mandir.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <h3 className="font-semibold text-green-700">Our Mission</h3>
                  <p>
                    Such a national education system has to be developed through
                    which such a young generation can be created which is imbued
                    with Hindutva and patriotism, is fully developed physically,
                    mentally, intellectually and spiritually and can
                    successfully face the present challenges of life and its
                    life should be dedicated to making the national life equal,
                    prosperous and cultured, free from the social evils,
                    exploitation and injustice of the poor and destitute who
                    live in mountain caves and huts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <PrincipalMessage />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
