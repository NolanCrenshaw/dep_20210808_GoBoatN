import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import RiverCard from "../_cards/RiverCard";

const RiversPages = ({ rivers }) => {
  // const rivers = useSelector((state) => state.rivers);
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const perPage = 20;
  const [pageCount, setPageCount] = useState(0);

  const getData = () => {
    const offsetValue = offset * perPage;
    const slice = rivers.slice(offsetValue, offsetValue + perPage);
    const postData = slice.map((pd) => (
      <div key={pd[0].id}>
        <p>{pd[0].name}</p>
      </div>
    ));
    setData(postData);
    setPageCount(Math.ceil(rivers.length / perPage));
  };

  const handlePageClick = (e) => {
    const selected = e.selected;
    setOffset(selected);
  };

  useEffect(() => {
    if (rivers[0] !== undefined) {
      getData();
    }
  }, [offset, rivers]);

  return (
    <div className="riverspages-container">
      <h3>Pagination Component</h3>
      {data}
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default RiversPages;
