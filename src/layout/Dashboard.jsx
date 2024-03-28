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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HouseIcon from "@mui/icons-material/House";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useAuth from "../hooks/useAuth";
import useSwal from "../hooks/useSwal";
import useAdmin from "../hooks/useAdmin";
import EmailIcon from "@mui/icons-material/Email";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BookmarksIcon from "@mui/icons-material/Bookmarks"; // Corrected import statement
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading/Loading";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ReturnPortfolio from "../components/ReturnPortfolio/ReturnPortfolio";

// Rest of your component code...

const drawerWidth = 240;

const Dashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  // console.log(isAdmin);

  const { data: teacher, isLoading } = useQuery({
    queryKey: ["teacher"],
    queryFn: async () => {
      const res = axiosSecure.get(`/users/${user.email}`);
      return (await res).data;
    },
  });

  // console.log(teacher?.role);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleLogout = () => {
    logOut()
      .then(() => {
        useSwal("logout completed", "success");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const drawer = (
    <div>
      <Typography color="primary" variant="h6" sx={{ m: 2, width: 180 }}>
        <img
          src="https://i.ibb.co/qpSr2vd/edumart-high-resolution-logo-transparent-1.png"
          className=""
          alt=""
        />
      </Typography>
      <Divider />
      <List>
        {isAdmin
          ? [
              {
                info: "Teacher Request",
                to: "/dashboard/teacherRequest",
                icon: <EmailIcon />,
              },
              {
                info: "Users",
                to: "/dashboard/users",
                icon: <PeopleAltIcon />,
              },
              {
                info: "All Classes",
                to: "/dashboard/allClasses",
                icon: <BookmarksIcon />,
              },
              {
                info: "My Profile",
                to: "/dashboard/myProfile",
                icon: <AccountBoxIcon />,
              },
            ].map((text, index) => (
              <Link key={index} to={text.to}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{text.icon}</ListItemIcon>
                    <ListItemText primary={text.info} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          : teacher?.role === "Teacher"
          ? [
              {
                info: "Add Course",
                to: "/dashboard/addClass",
                icon: <EditCalendarIcon />,
              },
              {
                info: "My Courses",
                to: "/dashboard/myCourses",
                icon: <CollectionsBookmarkIcon />,
              },
              {
                info: "My Profile",
                to: "/dashboard/myProfile",
                icon: <AccountBoxIcon />,
              },
            ].map((text, index) => (
              <Link key={index} to={text.to}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{text.icon}</ListItemIcon>
                    <ListItemText primary={text.info} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          : [
              {
                info: "My Enroll courses",
                to: "/dashboard/myEnrollCourses",
                icon: <LibraryBooksIcon />,
              },
              {
                info: "My Profile",
                to: "/dashboard/myProfile",
                icon: <AccountBoxIcon />,
              },
            ].map((text, index) => (
              <Link key={index} to={text.to}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{text.icon}</ListItemIcon>
                    <ListItemText primary={text.info} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
      </List>

      <Divider />
      <List>
        {[
          {
            info: "Home",
            to: "/",
            icon: <HouseIcon />,
          },
          { info: "All Classes", to: "/allClasses", icon: <ListAltIcon /> },
          { info: "Logout", to: "", icon: <LogoutIcon /> },
        ].map((text, index) => (
          <Link key={index} to={text.to}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    text.info === "Logout" ? (
                      <Typography onClick={handleLogout}>
                        {text.info}
                      </Typography>
                    ) : (
                      <Typography>{text.info}</Typography>
                    )
                  }
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="relative">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "white",
            boxShadow: "none",
          }}>
          <ReturnPortfolio />
          <Toolbar>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open>
            {drawer}
          </Drawer>
        </Box>
        <div className="px-4 py-16 md:px-16 w-full">
          <Outlet></Outlet>
        </div>
      </Box>
    </div>
  );
};

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
