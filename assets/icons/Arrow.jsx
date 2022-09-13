import * as React from 'react';

const SvgArrow = (props) => (
  <svg width={16} height={10} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 5c0-.147.06-.289.167-.393a.58.58 0 0 1 .404-.162h13.477L10.452.949a.548.548 0 0 1 0-.786.58.58 0 0 1 .809 0l4.571 4.444A.555.555 0 0 1 16 5a.542.542 0 0 1-.168.393l-4.571 4.444a.58.58 0 0 1-.81 0 .548.548 0 0 1 0-.786l3.597-3.496H.571a.58.58 0 0 1-.404-.162A.548.548 0 0 1 0 5Z"
    />
  </svg>
);

export default SvgArrow;
