import React from 'react';
import { Helmet } from 'react-helmet';

import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Helmet>
        <title>Audio500: Ops</title>
        <meta name="description" content="Not found." />
      </Helmet>
      <Grid container>
        <Grid item xs={12} display="flex" justifyContent={"center"} marginTop="250px">
          <Typography
            component="h2"
            variant="h5"
            fontStyle="italic"
          >
            404 Page not found
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent={"center"} marginTop="50px">
          <Button
            variant="outlined"
            aria-label="Back"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}