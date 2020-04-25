// filter
export const searchBtn = document.querySelector('.btn-search');
export const searchInput = document.querySelector('.search-input');
export const ENTER_KEYCODE = 13;


export function filterTable($table) {
  var $filters = $table.find('.table-filters-search');
  var $rows = $table.find('.row-tabel');
  $rows.each(function (rowIndex) {
      var valid = true;
      $(this).find('td').each(function (colIndex) {
          if ($filters.eq(colIndex).find('.search-input').val()) {
              if ($(this).html().toLowerCase().indexOf(
              $filters.eq(colIndex).find('.search-input').val().toLowerCase()) == -1) {
                  valid = valid && false;
              }
          }
      });
      if (valid === true) {
          $(this).css('display', '');
      } else {
          $(this).css('display', 'none');
      }
  });
}

$('.btn-search').on('click', function (evt) {
  filterTable($(this).parents('table'));
});

$('.search-input').keydown(function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    filterTable($(this).parents('table'));
  }
 
});

$('.search-input').on('input', function () {
  // console.log('val', $(this).val().length)
  if($(this).val().length == 0) {
    var $rows = $('table').find('.row-tabel');
    $rows.each(function (rowIndex) { 
      $(this).css('display', '');
    });
  }
});