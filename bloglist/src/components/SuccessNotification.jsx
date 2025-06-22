const SuccessNotification = ({ message }) => {
  const successStyle = {
    width: "800px",
    color: "green",
    fontWeight: "bold",
    backgroundColor: "silver",
    border: "3px solid green",
    borderRadius: "5px",
    padding: "15px",
    margin: "15px 15px 15px 0px",
  };

  if (message === null) {
    return null;
  }

  return <div style={successStyle}>{message}</div>;
};

export default SuccessNotification;
