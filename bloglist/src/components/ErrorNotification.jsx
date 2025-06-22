const ErrorNotification = ({ message }) => {
  const errorStyle = {
    width: "800px",
    color: "red",
    fontWeight: "bold",
    backgroundColor: "silver",
    border: "5px solid red",
    borderRadius: "5px",
    padding: "15px",
    margin: "15px 15px 15px 0px",
  };

  if (message === null) {
    return null;
  }

  return <div style={errorStyle}>{message}</div>;
};

export default ErrorNotification;
