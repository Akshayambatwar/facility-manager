import ReactPaginate from 'react-paginate';

type Props = {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: Props) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      previousLabel="Prev"
      nextLabel="Next"
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={(e) => onPageChange(e.selected)}
      containerClassName="mt-4 flex gap-2 text-sm"
      pageClassName="px-2 py-1 border"
      previousClassName="px-2 py-1 border"
      nextClassName="px-2 py-1 border"
      activeClassName="font-bold bg-gray-100"
      disabledClassName="opacity-50"
    />
  );
}
