import React from "react";
import { Segment } from "semantic-ui-react";

const Header = () => {
  return (
    <Segment
      className="Header"
      textAlign="center"
      size="massive"
      inverted
      color="grey"
      raised
    >
      The most starred Github repos that were created in the last 30 days
      (Front-end Challenge)
    </Segment>
  );
};

export default Header;
