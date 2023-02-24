import {
  Button,
  Container,
  FormControl,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Backdrop,
  CircularProgress,
  Alert,
  FormHelperText,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Box,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from "redux/api";
import { Done as DoneIcon, Insights } from "@mui/icons-material";

const validationSchema = Yup.object({
  name: Yup.string("Enter your name")
    .min(4, "Name should be of minimum 4 characters length")
    .required("Name is required"),
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  role: Yup.string("Select the role").default("user"),
  password: Yup.string("Enter your password")
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
  confirmPassword: Yup.string("Re-type your password").oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

function Register() {
  const theme = useTheme();
  const [register, { isLoading, isError, isSuccess, error, reset }] =
    useRegisterMutation();

  const handleReset = () => {
    reset();
    formik.handleReset();
  };
  const change = (name, e) => {
    if (typeof e.persist !== "undefined") {
      e.persist();
    }
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  const handleSelect = (e) => {
    formik.setFieldValue("role", e.target.value);
    formik.setFieldTouched("role", true, false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const user = await register({
          user: {
            name: values.name,
            email: values.email,
            password: values.password,
            role: values.role,
          },
        });
        console.log("User registered successfully!");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Container maxWidth="md">
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
          {JSON.stringify(error)}
        </Alert>
      )}

      {isSuccess && <SuccessCard theme={theme} />}

      {!isSuccess && (
        <Grid
          component={"form"}
          onSubmit={formik.handleSubmit}
          container
          mt={4}
          spacing={4}
        >
          <Grid item xs={12} mb={2}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
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
          </Grid>
          <Grid item xs={12} mb={4}>
            <Stack spacing={1}>
              <Typography textAlign="center" variant="h1">
                Sales Management System
              </Typography>
              <Typography textAlign="center" variant="subtitle1">
                already registered?{" "}
                <Link
                  sx={{ color: theme.palette.secondary[100] }}
                  href="/login"
                >
                  login
                </Link>
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              variant="outlined"
              required
              value={formik.values.name}
              onChange={change.bind(null, "name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              required
              value={formik.values.email}
              onChange={change.bind(null, "email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Select Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role"
                label="User Role"
                name="role"
                value={formik.values.role}
                onChange={handleSelect}
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <MenuItem value={"sales"}>Sales</MenuItem>
                <MenuItem value={"product"}>Product</MenuItem>
                <MenuItem value={"admin"}>Manager</MenuItem>
                <MenuItem value={"user"}>User (default Role)</MenuItem>
              </Select>
              <FormHelperText>
                {formik.touched.role && formik.errors.role}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              required
              value={formik.values.password}
              onChange={change.bind(null, "password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="password"
              id="confirmPassword"
              label="confirm Password"
              variant="outlined"
              required
              value={formik.values.confirmPassword}
              onChange={change.bind(null, "confirmPassword")}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
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
              Register
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

function SuccessCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 500,
        maxHeight: 380,
        backgroundColor: theme.palette.background.alt,
        padding: 2,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        <DoneIcon
          sx={{
            backgroundColor: "green",
            padding: "4px",
            borderRadius: "100%",
            fontSize: "20px",
            transform: "scale(2.5)",
          }}
        />
      </Box>
      .
      <CardContent>
        <Typography
          textAlign="center"
          gutterBottom
          variant="h2"
          component="div"
        >
          User created Successfully!
        </Typography>
        <Typography textAlign="center" variant="body2" color="text.secondary">
          User will be able to login, and will have access to system according
          to his/her permission level.
        </Typography>
      </CardContent>
      <Box sx={{ marginTop: "auto", marginBottom: "8px" }}>
        <CardActions>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            LinkComponent={"a"}
            href={"/login"}
            fullWidth
            variant="contained"
          >
            Go to Login
          </Button>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            LinkComponent={"a"}
            href={"/dashboard"}
            fullWidth
            variant="contained"
          >
            Back to Dashboard
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default Register;
