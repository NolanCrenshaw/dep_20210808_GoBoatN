import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import UserCard from "../_cards/UserCard";

const FriendsPages = ({ friends }) => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const perPage = 10;
  const [pageCount, setPageCount] = useState(0);

  const getData = () => {
    const offsetValue = offset * perPage;
    const slice = friends.slice(offsetValue, offsetValue + perPage);
    const postData = slice.map((friend, i) => (
      <div key={i}>
        <UserCard user={friend} />
      </div>
    ));
    setData(postData);
    setPageCount(Math.ceil(friends.length / perPage));
  };

  const handlePageClick = (e) => {
    const selected = e.selected;
    setOffset(selected);
  };

  useEffect(() => {
    if (friends[0] !== undefined) {
      getData();
    }
  }, [offset, friends]);

  return (
    <div className="friendspagination-container">
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

export default FriendsPages;
