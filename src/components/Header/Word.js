import React from "react";

const Word = ({ value }) => {
  return (
    <div style={styles.container}>
      <span style={styles.item}>{value}</span>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "rgba( 255, 255, 255, 0.5 )",
    width: 75,
    height: 75,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    fontSize: 40
  }
};

export default Word;
