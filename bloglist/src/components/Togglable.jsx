import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({ children, buttonLabel }, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const buttonStyle = {
    marginTop: "10px",
    marginBottom: "10px",
  };

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
          style={buttonStyle}
          onClick={toggleVisibility}
          data-testid="createblog-button"
        >
          {" "}
          {buttonLabel}{" "}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}> cancel </button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
