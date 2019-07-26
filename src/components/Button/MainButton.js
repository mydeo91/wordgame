import React from "react";

const MainButton = ({ fnc, title }) => {
  return (
    <div style={styles.button} onClick={fnc}>
      {title}
    </div>
  );
};

export default MainButton;

const styles = {
  button: {
    backgroundColor: "rgba( 255, 255, 255, 0.5 )",
    paddingLeft: 10,
    paddingRight: 10,
    width: 200,
    height: 30,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit"
  }
};
