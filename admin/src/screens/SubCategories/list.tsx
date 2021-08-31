import React from "react";
import MaterialTable from "material-table";
import Switch from "@material-ui/core/Switch";
import { Link, useHistory } from "react-router-dom";
import useRemoveCategory from "../../hooks/category/useRemoveCategory";
import { useQueryClient } from "react-query";
import useSubCategories from "../../hooks/subCategories/useSubCategories";

const SubCategoryList = () => {
  const { data, isLoading, isError, error } = useSubCategories();
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
          { title: "Category", field: "category.name" },

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
        title="Sub Categories"
        actions={[
          (rowData) => ({
            icon: "edit",
            iconProps: {
              color: "primary",
            },
            tooltip: `Edit  Sub category ${rowData.name}`,
            onClick: (event, rowData) =>
              history.push("/sub-categories/" + rowData.id),
          }),

          (rowData) => ({
            icon: "delete",
            iconProps: {
              color: "secondary",
            },
            tooltip: `Delete Sub category ${rowData.name}`,
            onClick: (event, rowData) => {
              window.confirm("You want to delete " + rowData.name);
              removeMutation.mutate(rowData.id, {
                onSuccess: () => {
                  queryClient.invalidateQueries("sub-categories");
                  history.push("/sub-categories");
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

export default SubCategoryList;