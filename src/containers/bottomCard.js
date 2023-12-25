import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai"; // Importing close icon from react-icons

const Card = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [links, setLinks] = useState([
    {
      name: "Mary Checkman",
      description: "Just copied a",
      percentage: "+500%",
      trade: "trade on coin-base",
      visits: (
        <span>
          Visits -{" "}
          <img
            src="./USA.png"
            alt="US flag"
            className="inline h-4 w- object-cover mr-1"
          />{" "}
          United States
        </span>
      ),
    },
    {
      name: "Mary Checkman",
      description: "Just copied a",
      percentage: "+500%",
      trade: "trade on coin-base",
      visits: (
        <span>
          Visits -{" "}
          <img
            src="./USA.png"
            alt="US flag"
            className="inline h-4 w-4 object-cover mr-1"
          />{" "}
          United States
        </span>
      ),
    },
    {
      name: "Mary Checkman",
      description: "Just copied a",
      percentage: "+500%",
      trade: "trade on coin-base",
      visits: (
        <span>
          Visits -{" "}
          <img
            src="./USA.png"
            alt="US flag"
            className="inline h-4 w-4 object-cover mr-1"
          />{" "}
          United States
        </span>
      ),
    },
    // ...other link objects
  ]);

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
  }, []);

  if (!isOpen) {
    return null;
  }

  const linkItems = links.map((link, index) => (
    <div key={index} className="flex items-center mb-4 px-2">
      <img className="w-18 h-14 mr-4" src="./oldman.jpg" alt="Link logo" />
      <div>
        <a className="text-gray-700 text-base font-semibold text-sm">
          {link.name}
        </a>
        <p
          className="text-gray-700 text-base font-light text-xs grey-100 mt-1 mb-2 "
          style={{ fontSize: "14px" }}
        >
          {link.description}{" "}
          <span style={{ fontWeight: "bold" }}>{link.percentage}</span>{" "}
          {link.trade}
        </p>
        <p className="text-gray-700 text-base font-light text-xs grey-100 mt-1">
          {link.visits}
        </p>
      </div>
    </div>
  ));

  return (
    <div className="max-w-sm w-80 rounded overflow-hidden shadow-lg ml-5">
      <div className="px-6 py-4 flex justify-between items-start">
        <div
          className="text-md mb-2 font-medium"
          style={{
            color: "#667085",
            fontFamily: "Inter",
          }}
        >
          Links you may like
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-lg font-bold p-1 rounded"
          aria-label="Close"
          style={{
            color: "#667085",
          }}
        >
          <AiOutlineClose />
        </button>
      </div>
      {linkItems}
    </div>
  );
};

export default Card;
