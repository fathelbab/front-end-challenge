import React from "react";
import { Button, GridRow, PaginationItem } from "semantic-ui-react";

const Pagination = ({ postsPerPage, totalPosts, paginate, fetchNextPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <footer style={{ display: "flex", flexDirection: "row", margin: "20px" }}>
      {pageNumbers.map((number) => (
        <div key={number}>
          <Button onClick={() => paginate(number)}>{number}</Button>
        </div>
      ))}
      <Button onClick={() => fetchNextPage(pageNumbers)}>Next Page</Button>
    </footer>
  );
};

export default Pagination;
