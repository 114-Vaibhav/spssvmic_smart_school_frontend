import React, { useState, useEffect } from "react";

const ImageSlider = () => {
  const slides = [
    {
      id: 1,
      image: "/imageSlider/bg.jpg",
      title: "Our School Campus",
      description: "A modern infrastructure with state-of-the-art facilities",
    },
    {
      id: 2,
      image: "/imageSlider/bg1.jpg",
      title: "Smart Classrooms",
      description: "Technology-enabled learning spaces for better education",
    },
    {
      id: 3,
      // image: "/lab.jpg",
      image: "/imageSlider/bg2.jpg",
      title: "Science Laboratories",
      description: "Well-equipped labs for practical learning",
    },
    {
      id: 4,
      // image: "/sports.jpg",
      image: "/imageSlider/bg3.jpg",
      title: "Sports Facilities",
      description: "Encouraging physical development along with academics",
    },
    {
      id: 5,
      // image: "/sports.jpg",
      image: "/imageSlider/bg4.jpg",
      title: "Sports Facilities",
      description: "Encouraging physical development along with academics",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-64 md:h-96 overflow-hidden rounded-lg shadow-lg mb-8">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            // className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
