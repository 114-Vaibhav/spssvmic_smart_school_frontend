import React from "react";

const AboutCollege = () => {
  return (
    <div className="prose max-w-none">
      <p className="text-gray-700 mb-4">
        Shri Pal Singh Saraswati Vidya Mandir Inter College (SPSSVMIC) was
        established in 1985 with the vision to provide quality education to the
        youth of the region. Over the years, we have grown into one of the most
        prestigious educational institutions in the area, known for our academic
        excellence and value-based education.
      </p>

      <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-3">
        Our Affiliation
      </h2>
      <p className="text-gray-700 mb-4">
        The college is affiliated to the Uttar Pradesh Board of High School and
        Intermediate Education (UP Board). Our affiliation number is UP123456,
        and we follow the curriculum prescribed by the board while incorporating
        innovative teaching methodologies.
      </p>

      <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-3">
        Infrastructure
      </h2>
      <p className="text-gray-700 mb-4">
        Spread over 5 acres of land, our campus includes:
      </p>
      <ul className="list-disc pl-5 mb-4 text-gray-700">
        <li>30 well-ventilated classrooms</li>
        <li>
          Fully equipped science laboratories (Physics, Chemistry, Biology)
        </li>
        <li>Computer lab with 40 systems</li>
        <li>Library with over 10,000 books</li>
        <li>
          Sports facilities including playground, basketball court, and indoor
          games
        </li>
        <li>Auditorium with 500 seating capacity</li>
      </ul>
    </div>
  );
};

export default AboutCollege;
