const CardStyle = (theme) => {
  return {
    card: {
      width: 140, //phone
      [theme.breakpoints.up("sm")]: {
        //ipad
        width: 150,
      },
      [theme.breakpoints.up("md")]: {
        //ipad pro
        width: 150,
      },
      [theme.breakpoints.up("lg")]: {
        //desktop
        width: 280,
      },
      /*[theme.breakpoints.up("xl")]: {
          backgroundColor: "tomato",
        },*/
    },
  };
};
export default CardStyle;
