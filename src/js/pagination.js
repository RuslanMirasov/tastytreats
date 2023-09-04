import Pagination from 'tui-pagination';

const catalogPagination = paginationInit(100, 10);

export function paginationInit(total, perpage) {
  const paginationEl = document.querySelector('.pagination');
  const visible = window.screen.width < 768 ? 2 : 3;

  const newPagination = new Pagination(paginationEl, {
    totalItems: total,
    itemsPerPage: perpage,
    visiblePages: visible,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton: '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}"></a>',
      disabledMoveButton: `<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}"></span>`,
      moreButton: '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">...</a>',
    },
  });

  return newPagination;
}

export function paginationReset(number) {
  catalogPagination.reset(number);
}
