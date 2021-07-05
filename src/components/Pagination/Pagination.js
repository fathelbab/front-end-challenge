import React from "react";
import { Button, GridRow, PaginationItem } from "semantic-ui-react";
import style from "./style.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, fetchNextPage }) => {
  const pageNumber = [];

  /* Calculating page Numbers in order to render the correct number of buttons */
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <footer className="Pagination" >
      {pageNumber.map((number) => (
        <div className="Rendered-buttons" key={number}>
          <Button onClick={() => paginate(number)}>{number}</Button>
        </div>
      ))}
      <Button onClick={() => fetchNextPage(pageNumber)}>Next Page</Button>
    </footer>
  );
};

export default Pagination;
