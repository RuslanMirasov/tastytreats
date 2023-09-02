import Pagination from 'tui-pagination';

const paginationEl = document.querySelector('.pagination');
const catalogPagination = new Pagination(paginationEl, {
  totalItems: 50,
  itemsPerPage: 9,
  visiblePages: 5,
});
