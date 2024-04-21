import React from "react";

const Card = ({ quote }) => {
  return (
    <div className="mx-96 text-white bg-blue-950 text-center p-2 mb-2">
      <div className="flex flex-col">
        <div className="flex flex-row items-start">
          <div className="mr-2">{quote.id})</div>
          <div className="text-left">{quote.quote}</div>
          <div className="ml-auto text-5xl">''</div>
        </div>
        <div className="flex justify-end text-xs font-thin">
          -{quote.author}
        </div>
      </div>
    </div>
  );
};

export default Card;
