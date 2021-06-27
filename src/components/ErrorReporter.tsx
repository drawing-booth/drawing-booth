import * as React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export const ErrorReporter = () => (
  <Box p={1}>
    <Typography variant="h4">It looks like app was crashed :-(</Typography>
  </Box>
);

export default ErrorReporter;
