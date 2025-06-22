import { useSelector } from "react-redux";

const Notification = ({ type }) => {
  const content = useSelector((state) => state.notification.content);

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
  const style = type === "success" ? successStyle : errorStyle;

  if (content === "") return null;

  return <div style={style}>{content}</div>;
};

export default Notification;
