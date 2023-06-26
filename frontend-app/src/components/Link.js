import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const LinkComponent = ({ href, ...rest }) => {
  return (
    <Link to={href} {...rest}>
      {/* <Button
        sx={{
          my: 2,
          mx: 2,
          display: "block",
          color: "#ED7D31",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      /> */}
    </Link>
  );
};
// export default React.forwardRef(Image);
