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
import { useAddProductMutation, useRegisterMutation } from "redux/api";
import {
  AddShoppingCart,
  Done as DoneIcon,
  Insights,
} from "@mui/icons-material";

const validationSchema = Yup.object({
  name: Yup.string("Enter product name")
    .min(4, "Name should be of minimum 4 characters length")
    .required("Name is required"),
  price: Yup.number("Enter product's price")
    .min(10, "Price should be min of ₹10")
    .max(100000, "Price should be max of ₹100000")
    .required("Price is required"),
  rating: Yup.number("Enter product's rating")
    .min(1, "Rating should be min of 1")
    .max(5, "Rating should be max of 5")
    .required("Rating is required"),
  supply: Yup.number("Enter product's supply")
    .min(10, "Price should be min of 10")
    .max(100000, "Supply should be max of 100000")
    .required("Supply is required"),
  description: Yup.string("Describe the product")
    .max(500, "Description should be max of of 500 letters")
    .optional(),
  category: Yup.string("Select the category").default("misc"),
});

function AddProduct() {
  const theme = useTheme();
  const [addProduct, { isLoading, isError, isSuccess, error, reset }] =
    useAddProductMutation();

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
    formik.setFieldValue("category", e.target.value);
    formik.setFieldTouched("category", true, false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      category: "",
      rating: "",
      supply: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const product = await addProduct(values);
        console.log(product);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Container
      id="add-product-container"
      maxWidth="md"
      sx={{
        marginBottom: "20px",
      }}
    >
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
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <AddShoppingCart
                sx={{
                  backgroundColor: theme.palette.background.alt,
                  padding: "4px",
                  borderRadius: "100%",
                  transform: "scale(3)",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign="center" variant="h4">
              Add New Product
            </Typography>
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
              type="number"
              id="price"
              label="Price"
              variant="outlined"
              required
              value={formik.values.price}
              onChange={change.bind(null, "price")}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              multiline
              rows={3}
              fullWidth
              id="description"
              label="Description"
              variant="outlined"
              value={formik.values.description}
              onChange={change.bind(null, "description")}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="category-select-label"
                id="category"
                label="Product category"
                name="category"
                value={formik.values.category}
                onChange={handleSelect}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              >
                <MenuItem value={"clothing"}>Clothing</MenuItem>
                <MenuItem value={"accessories"}>Accessories</MenuItem>
                <MenuItem value={"shoes"}>Shoes</MenuItem>
                <MenuItem value={"misc"}>Misc (default)</MenuItem>
              </Select>
              <FormHelperText>
                {formik.touched.category && formik.errors.category}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="rating"
              type="number"
              label="rating"
              variant="outlined"
              required
              value={formik.values.rating}
              onChange={change.bind(null, "rating")}
              error={formik.touched.rating && Boolean(formik.errors.rating)}
              helperText={formik.touched.rating && formik.errors.rating}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              id="supply"
              label="Supply"
              variant="outlined"
              required
              value={formik.values.supply}
              onChange={change.bind(null, "supply")}
              error={formik.touched.supply && Boolean(formik.errors.supply)}
              helperText={formik.touched.supply && formik.errors.supply}
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
              Add
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
          Product added Successfully!
        </Typography>
        <Typography textAlign="center" variant="body2" color="text.secondary">
          New Product will be display on Products page
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
            href={"/products"}
            fullWidth
            variant="contained"
          >
            Go to Products
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default AddProduct;
