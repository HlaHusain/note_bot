// import * as React from "react";
// import { Style } from "@mui/icons-material";
// import { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Unstable_Grid2";
// import { Button, TextField } from "@mui/material";
// import { isEmpty, isEmail } from "../../../utils/validators";

import { useAuth } from "../../contexts/AuthProvider";

export const LoginForm = () => {

  const {login ,isAuthorized ,token ,user} = useAuth();

  return(
    <>
    </>
  )
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
