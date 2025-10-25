import * as React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import SickIcon from "@mui/icons-material/Sick";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";  

const primarynavList = [
  {
    link: "/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
    role: ["Admin"]
  },
  {
    link: "/profile",
    label: "Doctor Profile",
    icon: <AccountCircleIcon />,
    role: ["Admin", "Doctor", "Patient"]
  },
  {
    link: "/doctor-list",
    label: "Doctor List",
    icon: <PeopleIcon />,
    role: ["Admin", "Patient"]
  },
  {
    link: "/patient-list",
    label: "Patient List",
    icon: <SickIcon />,
    role: ["Admin", "Doctor"]
  },
  {
    link: "/appointments",
    label: "Appointments",
    icon: <BookOnlineIcon />,
    role: ["Admin", "Patient"]
  },
  {
    link: "/calender",
    label: "Calender",
    icon: <CalendarMonthIcon />,
    role: ["Admin"]
  },
  {
    link: "/kanban",
    label: "Kanban",
    icon: <ViewKanbanIcon />,
    role: ["Admin"]
  },
  {
    link: "/account",
    label: "Account",
    icon: <ManageAccountsIcon />,
    role: ["Admin"]
  },
];

const secondaryNavList = [
  {
    link: "/lab-results",
    label: "Lab Results",
    icon: <ReceiptLongIcon />,
    role: ["Admin"]
  },
  {
    link: "/medical-records",
    label: "Medical Records",
    icon: <DescriptionIcon />,
    role: ["Admin"]
  },
  {
    link: "/prescriptions",
    label: "Prescriptions",
    icon: <AssignmentTurnedInIcon />,
    role: ["Admin"]
  },
  {
    link: "/plans",
    label: "Care Plans",
    icon: <AssignmentIcon />,
    role: ["Admin"]
  },
  {
    link: "/forms",
    label: "Forms",
    icon: <DescriptionIcon />,
    role: ["Admin"]
  },
  {
    link: "/help",
    label: "Get Help",
    icon: <HelpIcon />,
    role: ["Admin"]
  },
  {
    link: "/settings",
    label: "Settings",
    icon: <SettingsIcon />,
    role: ["Admin"]
  },
  {
    link: "/login",
    label: "Logout",
    icon: <LogoutIcon />,
  },
];

export const mainListItems = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <React.Fragment>
      {primarynavList
        .filter(item => !item.role || (user?.role && item.role.includes(user.role)))
        .map((data, index) => (
          <Link
            key={index}
            to={data.link}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton>
              <ListItemIcon>{data.icon}</ListItemIcon>
              <ListItemText primary={data.label} />
            </ListItemButton>
          </Link>
        ))}
    </React.Fragment>
  );
};

export const secondaryListItems = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
      {secondaryNavList
        .filter(item => !item.role || (user?.role && item.role.includes(user.role)))
        .map((data, index) => (
          <Link
            key={index}
            to={data.link}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton>
              <ListItemIcon>{data.icon}</ListItemIcon>
              <ListItemText primary={data.label} />
            </ListItemButton>
          </Link>
        ))}
    </React.Fragment>
  );
};
