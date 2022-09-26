import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useMemo, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useForm } from "../../hooks/useForm";
import AuthLayout from "../layout/AuthLayout";
import { AuthStatusType } from "../types/auth.interface";
import { startSignUpWithEmail } from "./../../store/auth/authThunk";

type Props = {};
const initialFormData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value: string) => value.includes("@"), "El correo debe ser valido"],
  password: [
    (value: string) => value.length >= 5,
    "password must be at least 5 characters long",
  ],
  displayName: [
    (value: string) => value.length >= 2,
    "El nombre es obligatorio",
  ],
};

const RegisterPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    formValidation,
  } = useForm(initialFormData, formValidations);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;

    dispatch(startSignUpWithEmail(formState));
  };

  const isAuthenticating = useMemo(
    () => status === AuthStatusType.authType3,
    [status]
  );

  return (
    <AuthLayout title="Register!">
      <form
        action=""
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="username"
              type="text"
              placeholder="username"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={
                !!(formValidation as any).displayNameValid && formSubmitted
              }
              helperText={(formValidation as any).displayNameValid}
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="email"
              type="email"
              placeholder="example@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!(formValidation as any).emailValid && formSubmitted}
              helperText={(formValidation as any).emailValid}
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
              error={!!(formValidation as any).passwordValid && formSubmitted}
              helperText={(formValidation as any).passwordValid}
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
                Create account
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button disabled={isAuthenticating} variant="contained" fullWidth>
                <Google></Google>
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link
              component={ReactRouterLink}
              color="inherit"
              to="/auth/login"
              sx={{ mb: 1 }}
            >
              Already have an account?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
