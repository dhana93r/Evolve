import React from "react";
import PropTypes from "prop-types";

// Scalable Rupee symbol component
const Rupee = ({ className = "", style = {}, size = 16, ...props }) => (
  <span
    className={className}
    style={{ fontFamily: 'inherit', fontWeight: 600, fontSize: size, ...style }}
    aria-label="Indian Rupee"
    {...props}
  >
    ₹
  </span>
);

Rupee.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Rupee;
