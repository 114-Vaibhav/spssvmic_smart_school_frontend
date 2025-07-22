import React from "react";

const NewsEvents = () => {
  const news = [
    {
      id: 1,
      title: "Annual Sports Day 2023",
      date: "15 Nov 2023",
      excerpt:
        "The school will be organizing its annual sports day on November 15th.",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: "20 Nov 2023",
      excerpt: "PTM scheduled for all classes from 10 AM to 1 PM.",
    },
    {
      id: 3,
      title: "Holiday Announcement",
      date: "12 Nov 2023",
      excerpt: "School will remain closed on account of Diwali celebrations.",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Science Exhibition",
      date: "25 Nov 2023",
      excerpt: "Inter-school science exhibition to be held in our campus.",
    },
    {
      id: 2,
      title: "Annual Day Celebration",
      date: "15 Dec 2023",
      excerpt: "Cultural programs and prize distribution ceremony.",
    },
    {
      id: 3,
      title: "Winter Break",
      date: "20 Dec 2023 - 5 Jan 2024",
      excerpt: "School will remain closed for winter vacations.",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200 mb-4">
        <button className="px-4 py-2 font-semibold text-blue-800 border-b-2 border-blue-800">
          News & Announcements
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <h3 className="font-semibold text-blue-700">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-1">{item.date}</p>
            <p className="text-gray-700">{item.excerpt}</p>
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Read more
            </a>
          </div>
        ))}
      </div>

      <div className="flex border-b border-gray-200 mb-4">
        <button className="px-4 py-2 font-semibold text-green-800 border-b-2 border-green-800">
          Upcoming Events
        </button>
      </div>

      <div className="space-y-4">
        {events.map((item) => (
          <div
            key={item.id}
            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <h3 className="font-semibold text-green-700">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-1">{item.date}</p>
            <p className="text-gray-700">{item.excerpt}</p>
            <a href="#" className="text-green-600 text-sm hover:underline">
              View details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsEvents;
