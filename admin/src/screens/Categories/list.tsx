import React from "react";
import MaterialTable from "material-table";
import Switch from "@material-ui/core/Switch";
import { Link, useHistory } from "react-router-dom";

import useCategories from "../../hooks/category/useCategories";
import useRemoveCategory from "../../hooks/category/useRemoveCategory";
import { useQueryClient } from "react-query";

const CategoryList = () => {
  const { data, isLoading, isError, error } = useCategories();
  const columns = Array.isArray(data);
  const removeMutation = useRemoveCategory();
  const queryClient = useQueryClient();
  const history = useHistory();
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        isLoading={isLoading}
        columns={[
          {
            title: "Name",
            field: "name",
            render: (rowData: any) => (
              <Link to={`/categories/${rowData.id}`}>{rowData.name}</Link>
            ),
          },
          {
            field: "image",
            title: "Image",
            render: (rowData: any) => (
              <img
                src={rowData.image}
                style={{ width: 120, height: "auto" }}
                alt={rowData.name}
              />
            ),
          },
          { title: "Description", field: "description" },

          {
            field: "active",
            title: "Active",
            render: (rowData: any) => (
              <Switch
                checked={rowData.active}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            ),
          },
        ]}
        data={data}
        title="Categories"
        actions={[
          (rowData) => ({
            icon: "edit",
            iconProps: {
              color: "primary",
            },
            tooltip: `Edit  Category ${rowData.name}`,
            onClick: (event, rowData) =>
              history.push("/categories/" + rowData.id),
          }),

          (rowData) => ({
            icon: "delete",
            iconProps: {
              color: "secondary",
            },
            tooltip: "Delete Category",
            onClick: (event, rowData) => {
              window.confirm("You want to delete " + rowData.name);
              removeMutation.mutate(rowData.id, {
                onSuccess: () => {
                  queryClient.invalidateQueries("categories");
                  history.push("/categories");
                },
              });
            },
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </div>
  );
};

export default CategoryList;
