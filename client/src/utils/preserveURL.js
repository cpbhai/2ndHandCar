const preserveURL = () => {
  let keyword = window.localStorage.getItem("keywordHead"),
    category = window.localStorage.getItem("category"),
    page = window.localStorage.getItem("page"),
    cost = JSON.parse(window.localStorage.getItem("cost")),
    low = cost ? cost[0] : 0,
    high = cost ? cost[1] : 5000000;

  //const params = new URLSearchParams(queryurl);
  let finalString = "?";
  if (keyword) finalString += "keyword=" + keyword + "&";
  if (category) finalString += "category=" + category + "&";
  if (page) finalString += "page=" + page + "&";
  if (low) finalString += "low=" + low + "&";
  if (high) finalString += "high=" + high + "&";
  return finalString;
};
export default preserveURL;
