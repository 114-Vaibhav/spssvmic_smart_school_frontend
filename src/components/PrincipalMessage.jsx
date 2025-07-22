import React from "react";

const PrincipalMessage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center">
          <img
            src="/principal.jpg"
            alt="Principal"
            className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md"
          />
        </div>
        <div className="md:w-3/4 md:pl-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">
            Message from Principal
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              "Dear Students, Parents, and Well-wishers,
            </p>
            <p className="text-gray-700 mb-4">
              It is with great pride and joy that I welcome you to Shri Pal
              Singh Saraswati Vidya Mandir Inter College, a beacon of learning
              and character building since 2004. Our steadfast commitment is to
              nurture not only academic excellence but also creativity, critical
              thinking, and strong ethical values in every student.
            </p>
            <p className="text-gray-700 mb-4">
              In partnership with dedicated faculty and a supportive community,
              we strive to cultivate an environment where each child can
              flourish, empowered to contribute meaningfully to society.
              Education, for us, extends beyond the classroom—it is about
              shaping families and communities to build a cultured, prosperous
              nation whose dignity shines brightly on the world stage.
            </p>
            <p className="text-gray-700">
              Let us together keep the torch of knowledge burning, dispelling
              the darkness of ignorance, and lighting the way for generations to
              come. I invite you to explore our programs and achievements and
              join us in this noble mission of building a brighter future.
            </p>
            <p className="text-gray-700 mt-4 font-semibold">
              - Uttam Kumar Mishra (Principal)"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalMessage;
