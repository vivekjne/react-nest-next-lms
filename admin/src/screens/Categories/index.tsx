import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import CategoryList from "./list";

const useStyles = makeStyles((theme) => ({
  createBtnContainer: {
    justifyContent: "flex-end",
    display: "flex",
  },
  content: {
    padding: theme.spacing(4),
  },
}));

const CategoryIndex = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h5" component="h2">
            Categories List
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.createBtnContainer}>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              to="/categories/new"
            >
              Create Category
            </Button>
          </div>
        </Grid>
      </Grid>
      <Box mt={4} />
      <CategoryList />
    </>
  );
};

export default CategoryIndex;