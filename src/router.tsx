import * as React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import SignUp from "./pages/Auth/SignUp";
import SignInSide from "./pages/Auth/SignInSide";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllOrders from "./pages/Orders/AllOrders";
import Profile from "./pages/Profile/Profile";
import DoctorList from "./pages/Profile/DoctorList";
import PatientInfo from "./pages/PatientInfo/PatientInfo";
import PatientList from "./pages/PatientInfo/PatientList";
import Appointments from "./pages/Appointments/Appointments";
import Calender from "./pages/Calender/Calender";
import Kanban from "./pages/Kanban/Kanban";
import Account from "./pages/Account/Account";
import Settings from "./pages/Settings/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import { ReactElement } from "react";
import LabResult from "./pages/LabResult";
import MedicalRecords from "./pages/MedicalRecords";
import PrescriptionPage from "./pages/PrescriptionPage";
import CarePlans from "./pages/CarePlanses/CarePlans";
import Forms from "./pages/Forms/FormPage";
import GetHelpPage from "./pages/GetHelp/GetHelpPage";
import ResetPassword from "./pages/Auth/ResetPassword";


  //Helper function
function withRoleProtection(
   path: string,
   element: ReactElement,
   role: string[]
   ) {
  return {
    path,
    element: <ProtectedRoute allowedRoles={role} />,
    children: [{ path: "", element }],
  };
}

// 🚀 Router setup
export const router = createBrowserRouter([
  { path: "/", element: <SignInSide />, errorElement: <ErrorPage /> },
  { path: "/login", element: <SignInSide /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/forgot", element: <ForgotPassword /> },
  {path:"/reset-password/:token", element:<ResetPassword />},

  // 🔐 Admin-only routes
  withRoleProtection("/dashboard", <Dashboard />, ["Admin"]),
  withRoleProtection("/orders", <AllOrders />, ["Admin"]),
  withRoleProtection("/patient-info/:id", <PatientInfo/>, ["Admin"]),
  withRoleProtection("/calender", <Calender />, ["Admin"]),
  withRoleProtection("/kanban", <Kanban />, ["Admin"]),
  withRoleProtection("/account", <Account />, ["Admin"]),
  withRoleProtection("/settings", <Settings />, ["Admin"]),
  withRoleProtection("/lab-results", <LabResult/>, ["Admin"]),
  withRoleProtection("/medical-records",<MedicalRecords/>,["Admin"]),
  withRoleProtection("/prescriptions", <PrescriptionPage/>, ["Admin"]),
  withRoleProtection("/plans", <CarePlans />, ["Admin"]),
  withRoleProtection("/forms", <Forms/>, ["Admin"]),
  withRoleProtection("/help", <GetHelpPage/>, ["Admin"]),
  // 👨‍⚕️ Admin + Doctor
  withRoleProtection("/profile", <Profile />, ["Admin", "Doctor", "Patient"]),
  withRoleProtection("/patient-list", <PatientList />, ["Admin", "Doctor"]),

  // 🧑‍⚕️ Admin + Patient
  withRoleProtection("/appointments", <Appointments />, ["Admin", "Patient"]),
  withRoleProtection("/doctor-list", <DoctorList />, ["Admin", "Patient"]),

]);

