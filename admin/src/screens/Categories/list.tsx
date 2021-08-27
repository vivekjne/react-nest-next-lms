import React from "react";
import MaterialTable from "material-table";
import Switch from "@material-ui/core/Switch";
import useCategories from "../../hooks/useCategories";

const CategoryList = () => {
  const { data, isLoading, isError, error } = useCategories();
  const columns = Array.isArray(data);
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        isLoading={isLoading}
        columns={[
          { title: "Name", field: "name" },
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
        title="Demo Title"
        actions={[
          {
            icon: "edit",
            iconProps: {
              color: "primary",
            },
            tooltip: "Edit Category",
            onClick: (event, rowData) => alert("You saved " + rowData.name),
          },
          (rowData) => ({
            icon: "delete",
            iconProps: {
              color: "secondary",
            },
            tooltip: "Delete Category",
            onClick: (event, rowData) =>
              alert("You want to delete " + rowData.name),
            disabled: rowData.birthYear < 2000,
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
