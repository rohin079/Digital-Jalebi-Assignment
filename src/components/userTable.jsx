import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchUsers } from "../api/userService";

const renderProfileImage = (value) => (
  <img
    src={value}
    alt="Profile Pic"
    className="w-12 h-12 rounded-full p-3 bg-slate-700"
  />
);

const renderGenderBadge = (value) => (
  <p
    className={`capitalize px-3 py-1 inline-block rounded-full ${
      value === "male" ? "bg-blue-500" : "bg-pink-500"
    }`}
  >
    {value}
  </p>
);

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const options = {
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  };

  const getMuiTheme = () =>
    createTheme({
      typography: { fontFamily: "Poppins" },
      palette: {
        background: { paper: "#1E293B", default: "#0F172A" },
        mode: "dark",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: { padding: "10px 4px" },
            body: { padding: "3px 15px", color: "#E2E8F0" },
          },
        },
        MuiTablePagination: {
          styleOverrides: {
            toolbar: {
              "& .MuiToolbar-root": {
                display: "flex",
                justifyContent: "space-between",
              },
            },
          },
        },
      },
    });

  return (
    <div className="bg-slate-700 py-10 min-h-screen">
      <div className="w-10/12 max-w-10xl mx-auto">
        <div className="mb-4 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Digital Jalebi</h1>
          <p className="text-lg">Rohin Mehrotra : 500095605</p>
        </div>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"User's List"}
            data={users}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

const columns = [
  { name: "id", label: "S.No" },
  {
    name: "image",
    label: "Profile",
    options: { customBodyRender: renderProfileImage, filter: false },
  },
  { name: "username" },
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone" },
  { name: "age", label: "Age" },
  {
    name: "gender",
    label: "Gender",
    options: { customBodyRender: renderGenderBadge },
  },
];

export default UserTable;
