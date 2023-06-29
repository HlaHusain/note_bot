import * as React from "react";
import { Label, Style } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Container, Stack, TextField } from "@mui/material";
import { Image } from "../../components/Image";
import { Link, useNavigate } from "react-router-dom";
import { login as loginApi } from "./api";
import { isEmail, isEmpty } from "../../utils/validators";
import { useAuth } from "../../contexts/AuthProvider";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { token, isAuthorized, logout, user, saveUser } = useAuth();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    study: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [redirect, doRedirect] = useState(false);

  useEffect(() => {
    if (redirect) {
      console.log("notes");
      navigate("/notes");
    }
  }, [redirect]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (isEmpty(data.email)) {
      errors.email = "Email is required";
    } else if (!isEmail(data.email)) {
      errors.email = "Email is not valid";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    setErrors({});
    try {
      setLoading(true);
      const res = await loginApi(data.email, data.password);

      saveUser(res); 

      doRedirect(true);
    } catch (error) {
      setResponse(error.data);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  return (
    <>
      <Container
        sx={{
          flexGrow: 1,
        }}
        component="form"
        onSubmit={onSubmit}
      >
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "center",
            // alignItems: "center",
            padding: 2,
            // marginTop: 4,
          }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image width="420px" src="../signup.png" />
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            sx={{
              background: "rgba(165, 165, 165, 0.1)",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.09)",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Stack spacing={3} margin={2}>
              <TextField
                // required
                type="email"
                label="Email"
                id="outlined-required"
                value={data.email}
                name="email"
                onChange={handleChange}
                error={errors.email}
                helpertext={errors.email}
                fullWidth
                sx={{
                  background: "#FEFEFE",
                  border: "0.5px solid #C2C2C2",
                  borderRadius: 2,
                }}
              />

              <TextField
                // required
                label="Password"
                id="outlined-required"
                value={data.password}
                name="password"
                type="password"
                onChange={handleChange}
                error={errors.password}
                helpertext={errors.password}
                fullWidth
                sx={{
                  background: "#FEFEFE",
                  border: "0.5px solid #C2C2C2",
                  borderRadius: 2,
                }}
              />

              <Button
                type="submit"
                disabled={loading}
                size="large"
                variant="outlined"
                fullWidth
                sx={{
                  background: "#ED7D31",
                  borderRadius: 2,
                  color: "#FFFFFF",
                  alignItems: "left",
                  padding: 1.5,
                  border: "0",
                  "&:hover": {
                    color: "#fff",
                    background: "#fed3cd",
                    border: "0",
                  },
                }}
              >
                Login
              </Button>

              {(response & (response["status"] === 400) ||
                response["status"] === 401) && (
                <Box
                  sx={{
                    background: "#fef2f2",
                    color: "#dc2626",
                    border: "solid 1px #fecaca",
                    marginBottom: 2,
                    fontSize: 14,
                  }}
                >
                  {response["error"]}
                </Box>
              )}
              <Box   sx={{
                    color: "#6FADE6",
                    // border: "solid 1px #fecaca",
                    marginBottom: 2,
                    fontSize: 14,
                    display:'flex',
                    justifyContent: "center",
                    padding:1,
                  }}>
              <Box>Dont have account ? </Box>
              <Link to='/signup' sx={{color: "#6FADE6",textDecoration: "none",}}> Signup</Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
  //   const [data, setData] = useState({
  //     username: "",
  //     email: "",
  //     password: "",
  //     study: "",
  //   });

  //   const [errors, setErrors] = useState({});
  //   const [loading, setLoading] = useState(false);
  //   const [response, setResponse] = useState({});

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     const errors = {};
  //     if (isEmpty(data.email)) {
  //       errors.email = "Email is required";
  //     } else if (!isEmail(data.email)) {
  //       errors.email = "Email is not valid";
  //     }

  //     if (Object.keys(errors).length) {
  //       setErrors(errors);
  //       return;
  //     }
  //     setErrors({});

  //     //Fetch POST request

  //     setLoading(true);
  //   };

  //   const handleChange = (e) => {
  //     e.preventDefault();
  //     const newData = { ...data };
  //     newData[e.target.name] = e.target.value;
  //     setData(newData);
  //   };
  //   return (
  //     <Box component="form" onSubmit={onSubmit}>
  //       <Grid container spacing={2}>
  //         <Grid xs={6} md={8}>
  //           <TextField
  //             required
  //             label="User Name"
  //             id="outlined-required"
  //             value={data.name}
  //             name="name"
  //             onChange={handleChange}
  //             size={"small"}
  //             error={errors.name}
  //             helpertext={errors.name}
  //           />
  //         </Grid>
  //         <Grid xs={6} md={8}>
  //           <TextField
  //             required
  //             type="email"
  //             label="Email"
  //             id="outlined-required"
  //             value={data.email}
  //             name="email"
  //             onChange={handleChange}
  //             size={"small"}
  //             error={errors.email}
  //             helpertext={errors.email}
  //           />
  //         </Grid>
  //         <Grid xs={6} md={8}>
  //           <TextField
  //             required
  //             label="Password"
  //             id="outlined-required"
  //             value={data.password}
  //             name="password"
  //             onChange={handleChange}
  //             size={"small"}
  //             error={errors.password}
  //             helpertext={errors.password}
  //           />
  //         </Grid>
  //         <Grid xs={6} md={8}>
  //           <TextField
  //             required
  //             label="Study Field"
  //             id="outlined-required"
  //             value={data.study}
  //             name="study"
  //             onChange={handleChange}
  //             size={"small"}
  //             error={errors.study}
  //             helpertext={errors.study}
  //           />
  //         </Grid>
  //         <Grid xs={6} md={8}>
  //           <Button type="submit" variant="outlined">
  //             Register
  //           </Button>
  //         </Grid>
  //         <Grid xs={6} md={8}>
  //           {(response["status"] === 400 || response["status"] === 401) && (
  //             <Box
  //               sx={{
  //                 background: "#fef2f2",
  //                 color: "#dc2626",
  //                 border: "solid 1px #fecaca",
  //                 marginBottom: 2,
  //                 fontSize: 14,
  //               }}
  //             >
  //               {response["error"]}
  //             </Box>
  //           )}
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   );
};
