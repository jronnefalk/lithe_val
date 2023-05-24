import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  border: none;
  background-color: ${({ active }) => (active ? "#333" : "#ccc")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
`;

const Ellipsis = styled.span`
  margin: 0 5px;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const MAX_VISIBLE_PAGES = 5; // Maximum number of page buttons to display
  const HALF_VISIBLE_PAGES = Math.floor(MAX_VISIBLE_PAGES / 2);

  let visiblePages = pageNumbers;
  if (totalPages > MAX_VISIBLE_PAGES) {
    const startPage = Math.max(currentPage - HALF_VISIBLE_PAGES, 1);
    const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

    visiblePages = pageNumbers.slice(startPage - 1, endPage);
  }

  return (
    <PaginationWrapper>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Föregående
      </PageButton>

      {visiblePages.map((pageNumber, index) => (
        <React.Fragment key={pageNumber}>
          {index > 0 && pageNumber - visiblePages[index - 1] > 1 && (
            <Ellipsis>...</Ellipsis>
          )}
          <PageButton
            onClick={() => onPageChange(pageNumber)}
            active={currentPage === pageNumber}
          >
            {pageNumber}
          </PageButton>
        </React.Fragment>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Nästa
      </PageButton>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
