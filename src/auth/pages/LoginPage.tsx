import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { FormEvent, useMemo } from "react";
import AuthLayout from "../layout/AuthLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  startGoogleSignIn,
  startSignInWithEmail,
} from "../../store/auth/authThunk";
import { AuthStatusType } from "../types/auth.interface";

const formLogin = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const { email, password, onInputChange } = useForm(formLogin);

  const isAuthenticating = useMemo(
    () => status === AuthStatusType.authType3,
    [status]
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(startSignInWithEmail({ email, password }));
  };

  const onGoogleSignIn = (event: any) => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login!">
      <form
        action=""
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="email"
              type="email"
              placeholder="example@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="password"
              type="password"
              placeholder="******"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            ></TextField>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} display={error ? "" : "none"}>
              <Alert severity="error">{error?.errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google></Google>
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link
              component={ReactRouterLink}
              color="inherit"
              to="/auth/register"
              sx={{ mb: 1 }}
            >
              Don't have an account?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
