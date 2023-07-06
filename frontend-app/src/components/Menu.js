import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import AdbIcon from "@mui/icons-material/Adb";
import { Logo } from "./Logo";
import TextField from "@mui/material/TextField";
// import { LinkComponent as Link } from "./Link";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { AvatarComponent } from "./UserAvatar";

const pages = [
  { label: "notes", link: "/notes" },
  { label: "courses", link: "/courses" },
  { label: "saved notes", link: "/notes/saved" },
];

export const MenuComponent = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  //const { token ,isAuthorized, logout, user } = useAuth();
  const settings = ["Logout"];
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = (event) => {
    // Handle search logic here
    if (event.key === "Enter") {
      const searchTerm = event.target.value;
      console.log("Search term:", searchTerm);

      // Navigate to search page with the course title
      navigate(`/search/${searchTerm}`);
    }
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{ background: "#fff", textTransform: "uppercase" }}
      >
        <Container maxWidth="l">
          <Toolbar disableGutters>
            <Link to="/">
              <Logo width={180} height={50} src="/logo.png" />
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginLeft: 25,
              }}
            >
              {pages.map((page) => (
                <Link to={page.link} sx={{ margin: 4 }}>
                  <Button
                    sx={{
                      my: 2,
                      color: "#ED7D31",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: 16,
                      paddingLeft: 4,
                      paddingRight: 4,
                      mx: 1,
                    }}
                  >
                    {page.label}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                marginRight: 10,
                flexDirection: "row-reverse",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  type="text"
                  placeholder="Search By Course"
                  variant="standard"
                  onKeyDown={handleSearch}
                  sx={{ borderBottom: "1px solid #ED7D31" }}
                />
                <SearchIcon sx={{ ml: 1, color: "#ED7D31" }} />
              </div>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                  {/* <Avatar src="/static/images/avatar/2.jpg" /> */}
                  <AvatarComponent />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    //  onClick={logout}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
