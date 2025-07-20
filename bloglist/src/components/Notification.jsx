import { useSelector } from "react-redux";

const Notification = ({ type }) => {
  const content = useSelector((state) => state.notification.content);

  const successStyle = "alert alert-success";
  const errorStyle = "alert alert-error";
  const style = type === "success" ? successStyle : errorStyle;

  if (content === "") return null;

  /*
   * DaisyUI's `toast` component is already `position: fixed` with a high z-index.
   * Adding `toast-center` keeps it horizontally centred while sticking to the bottom of the screen.
   */
  return (
    <div className="toast toast-center z-50">
      <div className={style}>
        {type === "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span>{content}</span>
      </div>
    </div>
  );
};

export default Notification;
