import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import RiverCard from "../_cards/RiverCard";

const RiversPages = ({ rivers }) => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  // handlePageClick = (data) => {
  //   let selected = data.selected;
  //   let offset = Math.ceil(selected * perPage);
  // };

  useEffect(() => {
    setData(rivers);
  }, [rivers]);

  return (
    <div className="riverspages-container">
      <h3>Pagination Component</h3>
      {data[0] !== undefined ? (
        data.map((river) => <RiverCard river={river} />)
      ) : (
        <div>
          <p>No Rivers</p>
        </div>
      )}
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        // onPageChange={handlePageClick}
      />
    </div>
  );
};

export default RiversPages;
