const DrawerStyle = (theme) => {
  return {
    listItem: {
      backgroundColor: "#000",
      "&:hover": {
        backgroundColor: "rgb(247,7,147)",
      },
      "&:active": {
        backgroundColor: "gold",
      },
    },
    text: {
      color: "#fff",
    },
    icon: {
      color: "#fff",
    },
  };
};
export default DrawerStyle;
