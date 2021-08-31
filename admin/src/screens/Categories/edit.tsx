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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import * as Yup from "yup";
import useCreateCategory from "../../hooks/category/useCreateCategory";
import { useQueryClient } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import useCategory from "../../hooks/category/useCategory";
import useEditCategory from "../../hooks/category/useEditCategory";
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

const CategoryEdit = () => {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: categoryId } = useParams<{ id: any }>();
  const {
    data: CategoryData,
    isLoading,
    isError,
    error,
  } = useCategory(categoryId);
  const mutation = useEditCategory();
  const queryClient = useQueryClient();
  const history = useHistory();
  return (
    <Paper>
      <Box p={4}>
        {CategoryData ? (
          <Formik
            initialValues={{
              categoryName: CategoryData.name,
              categoryDescription: CategoryData.description,
              categoryImage: CategoryData.image,
              categoryActive: CategoryData.active,
            }}
            validationSchema={Yup.object({
              categoryName: Yup.string()
                .max(30, "Must be 15 characters or less")
                .required("Name is required"),
              categoryDescription: Yup.string().required(
                "Description is required"
              ),
              categoryImage: Yup.string().required("Image url is required"),
              categoryActive: Yup.boolean(),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              mutation.mutate(
                {
                  id: categoryId,
                  categoryData: {
                    name: values.categoryName,
                    description: values.categoryDescription,
                    image: values.categoryImage,
                    active: values.categoryActive,
                  },
                },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries("categories");
                    history.push("/categories");
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
                      id="categoryName"
                      label="Category name"
                      {...getFieldProps("categoryName")}
                      fullWidth
                    />
                  </Grid>
                  {touched.categoryName && errors.categoryName ? (
                    <small className={classes.error}>
                      {errors.categoryName}
                    </small>
                  ) : null}
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={3}
                      required
                      id="categoryDescription"
                      label="Category description"
                      {...getFieldProps("categoryDescription")}
                      fullWidth
                    />
                  </Grid>
                  {touched.categoryDescription && errors.categoryDescription ? (
                    <small className={classes.error}>
                      {errors.categoryDescription}
                    </small>
                  ) : null}
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="categoryImage"
                      label="Category image url"
                      type="text"
                      {...getFieldProps("categoryImage")}
                      fullWidth
                    />
                  </Grid>
                  {touched.categoryImage && errors.categoryImage ? (
                    <small className={classes.error}>
                      {errors.categoryImage}
                    </small>
                  ) : null}
                  <Grid item xs={12}>
                    <FormControlLabel
                      id="categoryActive"
                      control={
                        <Switch
                          // value={values.categoryActive}
                          checked={values.categoryActive}
                          {...getFieldProps("categoryActive")}
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
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Paper>
  );
};

export default CategoryEdit;
