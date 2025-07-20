import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({ children, buttonLabel }, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          className="btn btn-soft btn-accent"
          onClick={toggleVisibility}
          data-testid="createblog-button"
        >
          {" "}
          {buttonLabel}{" "}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div className="w-full grid grid-cols-1 gap-2">
          <div>{children}</div>
          <button
            className="btn btn-soft btn-neutral w-xs"
            onClick={toggleVisibility}
          >
            {" "}
            Cancel{" "}
          </button>
        </div>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
