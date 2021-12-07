const DrawerStyle = (theme) => {
  return {
    listItem: {
      backgroundColor: "rgb(247,7,147)",
      "&:hover": {
        backgroundColor: "#000",
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
