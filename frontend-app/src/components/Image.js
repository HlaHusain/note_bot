import {Box} from '@mui/material'
import React from "react";

export const Image = ({width,height , src , ...rest}) => {

return <Box component="img" {...rest} width={width} height={height} src={src}></Box>
};
// export default React.forwardRef(Image);
