import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  CircularProgress,
  Paper,
  Box,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import * as Yup from "yup";
import useCreateCategory from "../../hooks/category/useCreateCategory";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import useCategories from "../../hooks/category/useCategories";
import useCreateSubCategory from "../../hooks/subCategories/useCreateSubCategory";
// import { TextField } from "formik-material-ui";

interface Values {
  email: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "100%",
  },
  error: {
    marginLeft: 16,
    color: "red",
  },
  progress: {
    color: "#fff",
    marginLeft: 4,
  },
}));

const SubCategoryCreate = () => {
  const classes = useStyles();
  const { data: categoryData, isLoading, isError, error } = useCategories();
  const mutation = useCreateSubCategory();
  const queryClient = useQueryClient();
  const history = useHistory();
  return (
    <Paper>
      <Box p={4}>
        <Formik
          initialValues={{
            subCategoryName: "",
            subCategoryDescription: "",
            subCategoryImage: "",
            subCategoryCategory: 1,
            subCategoryActive: true,
          }}
          validationSchema={Yup.object({
            subCategoryName: Yup.string()
              .max(30, "Must be 15 characters or less")
              .required("Name is required"),
            subCategoryDescription: Yup.string().required(
              "Description is required"
            ),
            subCategoryImage: Yup.string().required("Image url is required"),
            subCategoryCategory: Yup.number(),
            subCategoryActive: Yup.boolean(),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            mutation.mutate(
              {
                name: values.subCategoryName,
                description: values.subCategoryDescription,
                image: values.subCategoryImage,
                categoryId: values.subCategoryCategory,
                active: values.subCategoryActive,
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries("sub-categories");
                  history.push("/sub-categories");
                },
              }
            );
          }}
        >
          {({
            submitForm,
            isSubmitting,
            handleSubmit,
            getFieldProps,
            values,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit} className={classes.form}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="subCategoryName"
                    label="Sub Category name"
                    {...getFieldProps("subCategoryName")}
                    fullWidth
                  />
                </Grid>
                {touched.subCategoryName && errors.subCategoryName ? (
                  <small className={classes.error}>
                    {errors.subCategoryName}
                  </small>
                ) : null}
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={3}
                    required
                    id="subCategoryDescription"
                    label="Category description"
                    {...getFieldProps("subCategoryDescription")}
                    fullWidth
                  />
                </Grid>
                {touched.subCategoryDescription &&
                errors.subCategoryDescription ? (
                  <small className={classes.error}>
                    {errors.subCategoryDescription}
                  </small>
                ) : null}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="subCategoryImage"
                    label="Category image url"
                    type="text"
                    {...getFieldProps("subCategoryImage")}
                    fullWidth
                  />
                </Grid>
                {touched.subCategoryImage && errors.subCategoryImage ? (
                  <small className={classes.error}>
                    {errors.subCategoryImage}
                  </small>
                ) : null}

                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel id="category-select-label">
                      Categories
                    </InputLabel>
                    <Select
                      labelId="category-selectlabel"
                      id="category-select"
                      {...getFieldProps("subCategoryCategory")}
                    >
                      {categoryData &&
                        categoryData.map((category: any) => (
                          <MenuItem value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    id="subCategoryActive"
                    control={
                      <Switch
                        // value={values.categoryActive}
                        checked={values.subCategoryActive}
                        {...getFieldProps("subCategoryActive")}
                        color="primary"
                      />
                    }
                    label="Active"
                    labelPlacement="top"
                  />
                </Grid>

                <Grid item xs={12}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      color="primary"
                      size="large"
                      variant="contained"
                    >
                      Submit
                      {isSubmitting && (
                        <CircularProgress
                          size={20}
                          className={classes.progress}
                        />
                      )}
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Paper>
  );
};

export default SubCategoryCreate;
