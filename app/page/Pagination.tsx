import { PAGINATION_RANGE, POSTS_PER_PAGE } from "const/const";
import Link from "next/link";
import React from "react";

interface PaginationProps {
  current: number;
  total: number;
}

const Pagination = ({ current, total }: PaginationProps) => {
  const lastPageNumber = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <div className="flex gap-1">
      <PaginationButton to={current - 1} disabled={current === 1}>
        &lt;
      </PaginationButton>

      {Array.from(Array(PAGINATION_RANGE), (_, index) => current - index - 1)
        .reverse()
        .map((pageIndex) =>
          pageIndex > 0 ? (
            <PaginationButton key={pageIndex} to={pageIndex}>
              {pageIndex}
            </PaginationButton>
          ) : null
        )}

      <button className="rounded-lg px-4 py-2 bg-gray-100">{current}</button>

      {Array.from(
        Array(PAGINATION_RANGE),
        (_, index) => current + index + 1
      ).map((pageIndex) =>
        pageIndex <= lastPageNumber ? (
          <PaginationButton key={pageIndex} to={pageIndex}>
            {pageIndex}
          </PaginationButton>
        ) : null
      )}

      <PaginationButton to={current + 1} disabled={current === lastPageNumber}>
        &gt;
      </PaginationButton>
    </div>
  );
};

export default Pagination;

interface PaginationButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  to: number;
}

const PaginationButton = ({
  children,
  to,
  disabled = false,
}: PaginationButtonProps) => {
  return (
    <Link
      href={{
        pathname: `/page/${to}`,
      }}
    >
      <button
        disabled={disabled}
        className="rounded-lg px-4 py-2 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        {children}
      </button>
    </Link>
  );
};
