//import SettingsIcon from "@mui/icons-material/SettingsRounded";
//import ReportsIcon from "@mui/icons-material/DescriptionRounded";
//import CorrectionsIcon from "@mui/icons-material/ReportRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
//import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
//import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
//import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
//import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
//import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

export const UserTypes = [
  "administrador",
  "industria",
  "supervisor",
  "gremio",
  "control",
];

export const UserItems = {
  administrador: ["Inicio", "Usuarios", "Configuraciones", "Cerrar Sesión"],
  industria: ["Inicio", "Reportes", "Correcciones", "Cerrar Sesión"],
  supervisor: ["Inicio", "Reportes", "Correcciones", "Cerrar Sesión"],
  gremio: ["Inicio", "Reportes", "Cerrar Sesión"],
  control: ["Inicio", "Reportes", "Cerrar Sesión"],
};

export const userMenuItems = {
  administrador: [
    {
      title: "Inicio",
      to: "/home",
      icon: <HomeOutlinedIcon />,
    },
    {
      title: "Contacts Information",
      to: "/contacts",
      icon: <ContactsOutlinedIcon />,
    },
    {
      title: "Profile Form",
      to: "/form",
      icon: <PersonOutlinedIcon />,
    },
  ],
  industria: [
    {
      title: "Inicio",
      to: "/home",
      icon: <HomeOutlinedIcon />,
    },
    {
      title: "Manage Team",
      to: "/team",
      icon: <PeopleOutlinedIcon />,
    },
  ],
  supervisor: [
    {
      title: "Inicio",
      to: "/home",
      icon: <HomeOutlinedIcon />,
    },
    {
      title: "Geography Chart",
      to: "/geography",
      icon: <MapOutlinedIcon />,
    },
  ],
  gremio: [
    {
      title: "Inicio",
      to: "/home",
      icon: <HomeOutlinedIcon />,
    },
    {
      title: "Bar Chart",
      to: "/bar",
      icon: <BarChartOutlinedIcon />,
    },
  ],
  control: [
    {
      title: "Inicio",
      to: "/home",
      icon: <HomeOutlinedIcon />,
    },
    {
      title: "Pie Chart",
      to: "/pie",
      icon: <PieChartOutlineOutlinedIcon />,
    },
  ],
};

/* Original template routes, pages and titles

title: "Dashboard", to: "/home", icon: <HomeOutlinedIcon />,
title: "Logout", to: "/", icon: <LogoutOutlinedIcon />,
title: "Manage Team", to: "/team", icon: <PeopleOutlinedIcon />
title: "Contacts Information", to: "/contacts", icon: <ContactsOutlinedIcon />,
title: "Invoices Balances", to: "/invoices", icon: <ReceiptOutlinedIcon />,
title: "Profile Form", to: "/form", icon: <PersonOutlinedIcon />,
title: "Calendar", to: "/calendar", icon: <CalendarTodayOutlinedIcon />,
title: "FAQ Page", to: "/faq", icon: <HelpOutlineOutlinedIcon />,
title: "Bar Chart", to: "/bar", icon: <BarChartOutlinedIcon />,
title: "Pie Chart", to: "/pie", icon: <PieChartOutlineOutlinedIcon />,
title: "Line Chart", to: "/line", icon: <TimelineOutlinedIcon />,
title: "Geography Chart", to: "/geography", icon: <MapOutlinedIcon />,

*/