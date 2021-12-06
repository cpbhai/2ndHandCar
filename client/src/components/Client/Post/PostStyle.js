const PostStyle = (theme) => {
  return {
    desc: {
      width: 250, //phone
      [theme.breakpoints.up("sm")]: {
        //ipad
        width: 400,
      },
      [theme.breakpoints.up("md")]: {
        //ipad pro
        width: 400,
      },
      [theme.breakpoints.up("lg")]: {
        //desktop
        width: 400,
      },
      /*[theme.breakpoints.up("xl")]: {
        backgroundColor: "tomato",
      },*/
    },
  };
};
export default PostStyle;
