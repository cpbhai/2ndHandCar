const Pagination = (array, page_size, page_number) => {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  //https://stackoverflow.com/a/42761393
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};
module.exports = Pagination;
