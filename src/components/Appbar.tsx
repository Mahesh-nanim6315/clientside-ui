import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { settings } from "../constant";
import { AppBar, Drawer } from "../styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {clearUser} from '../store/userSlice';


export default function Appbar(props: { appBarTitle: string }) {
  const [open, setOpen] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const dispatch = useDispatch()

  const user = useSelector((state:RootState)=> state.user.user)

  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/auth/logout", 
      {}, 
      { withCredentials: true } 
    );
    navigate("/login");
     dispatch(clearUser()); 
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px" // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {props.appBarTitle}
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenUserMenu}
              >
                {/* <Avatar alt="Elisa Perry" src="/static/images/avatar/2.jpg" /> */}
                <Avatar alt={user?.first_name} src={"/static/images/avatar/2.jpg"} />

              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
      
              {settings.map((setting, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting.text === "Logout") {
                      handleLogout();
                    } else {
                      navigate(setting.url);
                    }
                  }}
                >
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1]
          }}
        >
          <Typography variant="h4" align="center">
            <img src="hospital.svg" height="40px" />
            <span style={{ color: "#005B93" }}>EALTHY</span>
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
     <List component="nav">
      {mainListItems()}
      <Divider sx={{ my: 1 }} />
      {secondaryListItems()}
    </List>

      </Drawer>
    </Box>
  );
}
