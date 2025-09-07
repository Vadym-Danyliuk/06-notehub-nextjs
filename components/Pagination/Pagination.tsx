import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';
import { BsSkipEnd } from 'react-icons/bs';
import { BsSkipStart } from 'react-icons/bs';

interface PaginationProps {
  totalPages: number;
  onChange: (page: number) => void;
  page: number;
}

const Pagination = ({ totalPages, onChange, page }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      renderOnZeroPageCount={null}
      nextLabel={<BsSkipEnd />}
      previousLabel={<BsSkipStart />}
    />
  );
};

export default Pagination;
