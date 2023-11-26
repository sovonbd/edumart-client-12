import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
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
import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = [
  { text: "Home", to: "/" },
  { text: "All Classes", to: "/allClasses" },
  { text: "Teach on Edumart", to: "/teachOnEdumart" },
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
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
          <Box sx={{ display: "flex" }}>
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
      <hr className="h-[1px] w-full mt-16 bg-black" />

      {/* <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus
          quibusdam, aliquam dolore excepturi quae. Distinctio enim at eligendi
          perferendis in cum quibusdam sed quae, accusantium et aperiam? Quod
          itaque exercitationem, at ab sequi qui modi delectus quia corrupti
          alias distinctio nostrum. Minima ex dolor modi inventore sapiente
        </Typography>
      </Box> */}
    </Box>
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
