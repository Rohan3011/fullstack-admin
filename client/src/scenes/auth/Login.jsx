import { Insights } from "@mui/icons-material";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "redux/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "redux/slices/user";

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("Enter your password")
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
});

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, isError, isSuccess, error, reset }] =
    useLoginMutation();

  const handleReset = () => {
    reset();
    formik.handleReset();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const user = await login(values);
        if (user?.data) {
          dispatch(setUser(user.data));
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const change = (name, e) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <Container maxWidth="xs">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {isError && (
        <Alert
          severity="error"
          action={
            <Button onClick={handleReset} color="inherit" size="small">
              RESET
            </Button>
          }
        >
          {error?.error?.message || "Something went wrong! please try again."}
        </Alert>
      )}
      {!isSuccess && (
        <Stack
          sx={{
            padding: "1rem",
          }}
          spacing={4}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: 6,
              marginBottom: 2,
            }}
          >
            <Insights
              sx={{
                backgroundColor: theme.palette.background.alt,
                padding: "4px",
                borderRadius: "100%",
                transform: "scale(3)",
              }}
            />
          </Box>

          <Stack spacing={1}>
            <Typography textAlign="center" variant="h1">
              Welcome back!
            </Typography>
            <Typography textAlign="center" variant="subtitle1">
              New user?{" "}
              <Link
                sx={{ color: theme.palette.secondary[100] }}
                href="/register"
              >
                register
              </Link>
            </Typography>
          </Stack>

          <FormControl
            component={"form"}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={change.bind(null, "email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={change.bind(null, "password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              disabled={!formik.isValid}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </FormControl>
        </Stack>
      )}
    </Container>
  );
}

export default Login;
