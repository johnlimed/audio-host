import { useState } from "react";
import { useActionData, Form } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import LinkText from "../Component/LinkText";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  
  const actionData = useActionData() as { error: string } | undefined;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid container display="flex" justifyContent={"center"}>
        <Grid item marginTop="200px">
          <Typography component="h1" variant="h3">Login</Typography>
        </Grid>
        <Grid item>
          <Form method="post">
            <Box sx={{ mt: 1 }}>
              <Grid container>
                <Grid item xs={12}>
                  <InputLabel required htmlFor="username">Username</InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>                
                  <InputLabel required htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    required
                    name="password"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth={true}
                  sx={{ mt: 3, mb: 2 }}
                  type="submit"
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item display="flex" justifyContent={"right"}>
                <LinkText to="/signup" key="no-account-link" text="Don't have an account? Sign Up" />
              </Grid>
            </Box>
          </Form>
          {actionData && actionData.error ? (
            <p style={{ color: "red" }}>{actionData.error}</p>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  )
}