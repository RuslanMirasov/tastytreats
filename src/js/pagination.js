import Pagination from 'tui-pagination';

const paginationEl = document.querySelector('.pagination');
const catalogPagination = new Pagination(paginationEl, {
  totalItems: 50,
  itemsPerPage: 9,
  visiblePages: 5,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton: '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' + 'huy' + '</a>',
    disabledMoveButton: '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' + 'pizda' + '</span>',
    moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' + '...' + '</a>',
  },
});
