/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
        try {
          const res = await fetch("/api/schools");
          if (!res.ok) {
            const errorDetails = await res.json();
            throw new Error(`Failed to fetch schools: ${errorDetails.error}`);
          }
          const data = await res.json();
          setSchools(data);
        } catch (error) {
          console.error('Error fetching schools:', error);
        }
      };

    fetchSchools();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center mb-6">Schools List</h1>
      {schools.length === 0 ? (
        <p className="text-center text-gray-500">No schools found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div key={school.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={school.image ? school.image : "/uploads/default.jpg"}
                alt={school.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <h2 className="text-xl font-semibold mt-4">{school.name}</h2>
              <p className="text-gray-600">{school.address}</p>
              <p className="text-gray-600">{school.city}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
