import React, { useState, useEffect } from "react";
import axios from "axios";

const Card = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get("links");
        console.log(response.data);
        setLinks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLinks();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  if (!isOpen) {
    return null;
  }

  return (
    <div className="max-w-sm w-80 rounded overflow-hidden shadow-lg ml-5">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="text-md mb-2 text-grey-500 font-light">
          Links you may like
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className=" font-bold py-1 px-2 rounded"
        >
          X
        </button>
      </div>

      <div className="flex items-center mb-4 px-2">
        <img className="w-18 h-14 mr-4" src="./logo512.png" alt="Link logo" />
        <div>
          <a className="text-gray-700 text-base font-semibold text-sm">
            Mary Checkman
          </a>
          <p className="text-gray-700 text-base font-light text-xs grey-100">
            Just copied a +500% trade on coin-base{" "}
          </p>
          <p className="text-gray-700 text-base font-light text-xs grey-100 mt-1">
            Visits - 🇺🇸 United states{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
