import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import useSwal from "../../../hooks/useSwal";

const drawerWidth = 240;
const navItems = [
  { text: "Home", to: "/" },
  { text: "All Classes", to: "/allClasses" },
  { text: "Teach on Edumart", to: "/teachOnEdumart" },
];

const settings = [
  { text: "Username", to: "" },
  { text: "Dashboard", to: "/dashboard" },
  { text: "Logout", to: "" },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const { user, logOut } = useAuth();

  // console.log(user);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        useSwal("logout completed", "success");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography color="primary" variant="h6" sx={{ m: 2, width: 180 }}>
        <img
          src="https://i.ibb.co/qpSr2vd/edumart-high-resolution-logo-transparent-1.png"
          className=""
          alt=""
        />
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}></Box>
      <Divider />
      <List>
        {navItems.map((item, idx) => (
          <ListItem key={idx} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link to={item.to}>
                <Typography
                  color="black"
                  sx={{
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}>
                  {item.text}
                </Typography>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="">
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <AppBar
          className="mt-10"
          component="nav"
          sx={{
            backgroundColor: "white",
            boxShadow: "none",
            position: "fixed",
          }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}>
                <MenuIcon />
              </IconButton>
              <Link to="/">
                <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
                  <img
                    src="https://i.ibb.co/qpSr2vd/edumart-high-resolution-logo-transparent-1.png"
                    className="w-48"
                    alt=""
                  />
                </Box>
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item, idx) => (
                  <Button
                    key={idx}
                    variant={item.text === "Teach on Edumart" ? "outlined" : ""}
                    size="large"
                    sx={{ ml: 1 }}>
                    <Link to={item.to}>
                      <Typography
                        color="black"
                        sx={{
                          fontSize: "14px",
                          textTransform: "capitalize",
                        }}>
                        {item.text}
                      </Typography>
                    </Link>
                  </Button>
                ))}
              </Box>
              <Box>
                {user ? (
                  <Toolbar disableGutters sx={{ ml: 3 }}>
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="" src={user?.photoURL} />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "48px" }}
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
                        onClose={handleCloseUserMenu}>
                        {settings.map((setting, idx) => (
                          <MenuItem
                            key={idx}
                            onClick={
                              setting.text === "Username"
                                ? null
                                : handleCloseUserMenu
                            }
                            sx={{
                              "&:hover": {
                                backgroundColor:
                                  setting.text === "Username"
                                    ? "transparent"
                                    : "",
                              },
                            }}
                            disableRipple={setting.text === "Username"}>
                            {setting.text === "Username" ? (
                              <Box>
                                <Typography textAlign="center">
                                  {user.displayName}
                                </Typography>
                                <hr className="h-[1px] w-[120px] bg-black" />{" "}
                              </Box>
                            ) : setting.text === "Logout" ? (
                              <Typography
                                textAlign="center"
                                onClick={handleLogout}>
                                {setting.text}
                              </Typography>
                            ) : (
                              <Link to={setting.to}>
                                <Typography textAlign="center">
                                  {setting.text}
                                </Typography>
                              </Link>
                            )}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  </Toolbar>
                ) : (
                  <Button variant="contained" sx={{ ml: 3 }}>
                    <Link to="/login">
                      <Typography
                        color="primary"
                        sx={{
                          fontSize: "14px",
                          textTransform: "capitalize",
                          color: "white",
                        }}>
                        Login
                      </Typography>
                    </Link>
                  </Button>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}>
            {drawer}
          </Drawer>
        </nav>
        <hr className="h-[1px] w-full mt-20 bg-black" />
      </Box>
    </div>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
