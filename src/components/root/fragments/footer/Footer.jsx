import React from "react";


const Footer = (props) => {
  const style = {
    bottom: 0,
    left: 0,
    width: "100%",
    padding: "10px",
    textAlign: "center",
  }
  return (
    <footer className={props.class} style={style}>
      &copy; Warehouse 2023. All rights reserved.
    </footer>
  );
};

export default Footer;
