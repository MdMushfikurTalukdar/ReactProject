import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Url } from "../components/BaseUrl";
import NavbarNew from "../components/NavbarNew";
import Footer from "../components/Home/Footer";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { enqueueSnackbar } from "notistack";

export const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [college, setCollege] = useState("");
  const [edit, setEdit] = useState(false);
  const [hide, setHide] = useState(false);
  const [delete1, setDelete1] = useState(false);
  const [load,setLoad]=useState(false);
  const [editInfo, setEditInfo] = useState({
    registration_number: "",
    role: "",
    id: "",
  });
  const [deleteInfo, setDeleteInfo] = useState({
    id: "",
  });

  const regenerateToken = () => {
    if (sessionStorage?.getItem("accesstoken")) {
      const response = jwtDecode(sessionStorage?.getItem("accesstoken"));
      const response1 = jwtDecode(sessionStorage?.getItem("refreshtoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        response1.exp < Math.floor(Date.now() / 1000)
      ) {
        navigate("/login");
      } else {
        if (
          sessionStorage.getItem("refreshtoken") &&
          sessionStorage.getItem("accesstoken")
        ) {
          let data = {
            refresh: sessionStorage?.getItem("refreshtoken"),
          };

          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url:
              "https://amarnath013.pythonanywhere.com/api/user/token/refresh/",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage?.getItem("accesstoken")}`,
            },
            data: data,
          };

          axios
            .request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              sessionStorage.setItem("accesstoken", response.data.access);
            })
            .catch((error) => {
              if (error?.message === "Request failed with status code 500") {
                navigate("/login");
              }
              if (
                error?.response?.data?.errors?.detail ===
                "Given token not valid for any token type"
              ) {
                enqueueSnackbar("Logging out", {
                  variant: "error",
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                  autoHideDuration: 3000,
                });
                navigate("/login");
              }
              console.log(error);
            });
        } else {
          navigate("/login");
        }
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Url}/colleges-slugs/?search=${
        jwtDecode(sessionStorage.getItem("accesstoken")).college
      }`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
      },
    };

    axios
      .request(config)
      .then((response1) => {
        setCollege(response1.data[0].slug);
        axios
          .get(`${Url}/${response1.data[0].slug}/user-management/`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
            },
          })
          .then((response) => {
            setUsers(response.data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (sessionStorage?.getItem("accesstoken")) {
      const response = jwtDecode(sessionStorage?.getItem("accesstoken"));
      if (
        response.exp < Math.floor(Date.now() / 1000) ||
        response.role !== "office"
      ) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const handleEdit = (registration_number, role, id) => {
    setEdit(true);
    setEditInfo({ registration_number, role, id });
  };

  const handleDelete1 = (id) => {
    setDelete1(true);
    setDeleteInfo({ id });
  };
  const handleDelete = () => {

    setLoad(true);
    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");

    if (token && token1) {
      let currentDate = new Date();
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 - currentDate.getTime() < 59 * 60 * 1000) {
        try {
          regenerateToken(); // Wait for the token regeneration to complete
        } catch (error) {
          console.error(
            "Error in request interceptor while regenerating token:",
            error
          );
        }
      }

      axios
        .delete(`${Url}/${college}/user-management/${deleteInfo.id}/`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
          },
        })
        .then((res) => {
          setLoad(false);
          setDelete1(false);
          setUsers(users.filter((prev) => prev.id !== deleteInfo.id));
        })
        .catch((error) => {
          console.log(error);
          setLoad(false);
          if (
            error?.response?.data?.errors?.detail ===
            "Given token not valid for any token type"
          ) {
            enqueueSnackbar("Logging out", {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              autoHideDuration: 3000,
            });
            navigate("/login");
          }
        });
    } else {
      navigate("/login");
    }
  };

  const handleUpdate = (id) => {
    const token = sessionStorage.getItem("accesstoken");
    const token1 = sessionStorage.getItem("refreshtoken");

    if (token && token1) {
      let currentDate = new Date();
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 - currentDate.getTime() < 59 * 60 * 1000) {
        try {
          regenerateToken(); // Wait for the token regeneration to complete
        } catch (error) {
          console.error(
            "Error in request interceptor while regenerating token:",
            error
          );
        }
      }
      if (
        editInfo.role !== "office" &&
        editInfo.role !== "caretaker" &&
        editInfo.role !== "student" &&
        editInfo.role !== "hod"
      ) {
        setHide(true);
        return;
      } else {
        setHide(false);
      }
      axios
        .patch(
          `${Url}/${college}/user-management/${id}/`,
          {
            role: editInfo.role,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accesstoken")}`,
            },
          }
        )
        .then((res) => {
          setUsers((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, role: editInfo.role } : item
            )
          );

          enqueueSnackbar("Successfully updated.", {
            variant: "success",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            autoHideDuration: 3000,
          });
          setEdit(false);
        })
        .catch((error) => {
          if (
            error?.response?.data?.errors?.detail ===
            "Given token not valid for any token type"
          ) {
            enqueueSnackbar("Logging out", {
              variant: "error",
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              autoHideDuration: 3000,
            });
            navigate("/login");
          }
        });
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <NavbarNew />
      <Box sx={{ minHeight: "80vh", padding: "5px" }}>
        {edit && (
          <center>
            <Box
              sx={{
                padding: "20px",
                width: "300px",
                position: "fixed",
                top: "15vh",
                zIndex: "100",
                left: { xs: "5vw", md: "40vw", lg: "45vw", sm: "25vw" },
                backgroundColor: "white", // Optional: to make it visible on the page
                boxShadow: 7, // Optional: adds shadow
                borderRadius: "8px", // Optional: rounded corners
              }}
            >
              <center
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h3 style={{ position: "relative", left: "90px" }}>
                  Edit Info
                </h3>
                <RxCross1
                  style={{ cursor: "pointer" }}
                  onClick={(e) => setEdit(false)}
                />
              </center>

              <TextField
                type="text"
                defaultValue={editInfo.registration_number}
                label="Registration no."
                disabled
                margin="normal"
                fullWidth
              />

              <TextField
                type="text"
                label="Role"
                defaultValue={editInfo.role}
                margin="normal"
                fullWidth
                onChange={(e) =>
                  setEditInfo({
                    ...editInfo,
                    role: e.target.value,
                  })
                }
              />
              {hide && (
                <p style={{ color: "red", fontSize: "0.67rem" }}>
                  * Role must be between office,caretaker,student,hod.{" "}
                </p>
              )}
              <Button
                variant="contained"
                sx={{ width: "70%", marginTop: "15px" }}
                onClick={(e) => handleUpdate(editInfo.id)}
              >
                Edit
              </Button>
            </Box>
          </center>
        )}

        {delete1 && (
          <center>
            <Box
              sx={{
                padding: "20px",
                width: "300px",
                position: "fixed",
                top: "15vh",
                zIndex: "100",
                left: { xs: "5vw", md: "40vw", lg: "45vw", sm: "25vw" },
                backgroundColor: "white", // Optional: to make it visible on the page
                boxShadow: 7, // Optional: adds shadow
                borderRadius: "8px", // Optional: rounded corners
              }}
            >
              <center
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h3 style={{ position: "relative", left: "90px" }}>Alert!!</h3>
                <RxCross1
                  style={{ cursor: "pointer" }}
                  onClick={(e) => setDelete1(false)}
                />
              </center>
              <center>
                <img src="../images/warning.jpg" alt="" style={{width:"100px"}}/>
              </center>
              <h3>Do you want to delete this record??</h3>
              <Box sx={{display:"flex",gap:"5px"}}>
              <Button
                variant="contained"
                sx={{ width: "70%", marginTop: "15px" }}
                onClick={handleDelete}
              >
                 {!load && <p>Yes</p>}
                  {load && (
                    <CircularProgress
                      style={{ color: "white", width: "20px", height: "22px" }}
                    />
                  )}
              </Button>
              <Button
                variant="contained"
                sx={{ width: "70%", marginTop: "15px" }}
                onClick={(e)=>setDelete1(false)}
              >
                No
              </Button>
              </Box>
            </Box>
          </center>
        )}
        <center>
          <h2 style={{ marginTop: "20px" }}>User Management</h2>
        </center>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 900, margin: "auto", marginTop: 5, minWidth: 200 }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "rgb(107, 169, 169)" }}>
              <TableRow>
                <TableCell align="center">Role</TableCell>

                <TableCell align="center">Registration Number</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{user.role}</TableCell>

                  <TableCell align="center">
                    {user.registration_number}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={(e) =>
                        handleEdit(user.registration_number, user.role, user.id)
                      }
                    >
                      <FaEdit style={{ fontSize: "1.2rem" }} />
                    </Button>
                    <Button onClick={(e) => handleDelete1(user.id)}>
                      <MdDelete style={{ fontSize: "1.2rem" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </TableContainer>
        {users.length===0 ?<p style={{textAlign:"center",marginTop:"100px",fontSize:"1.5rem"}}>No records available</p>:null}
      </Box>
      <Footer />
    </Box>
  );
};
