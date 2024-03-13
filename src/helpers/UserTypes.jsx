//import ReportsIcon from "@mui/icons-material/DescriptionRounded";
//import CorrectionsIcon from "@mui/icons-material/ReportRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
//import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

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
      title: "Contacts",
      to: "/contacts",
      icon: <ContactsOutlinedIcon />,
    },
    {
      title: "Profile Form",
      to: "/form",
      icon: <PersonOutlinedIcon />,
    },
    {
      title: "Invoices Balances",
      to: "/invoices",
      icon: <ReceiptOutlinedIcon />,
    },
    {
      title: "Configuración",
      to: "/profile",
      icon: <SettingsOutlinedIcon />,
    },
  ],
  industria: [
    {
      title: "Inicio",
      to: "/home",
      icon: <HomeOutlinedIcon />,
    },
    {
      title: "Line Chart",
      to: "/line",
      icon: <TimelineOutlinedIcon />,
    },
  ],
  supervisor: [
    {
      title: "Inicio",
      to: "/home",
      icon: <HomeOutlinedIcon />,
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
title: "Manage Team", to: "/team", icon: <PeopleOutlinedIcon />
title: "Contacts Information", to: "/contacts", icon: <ContactsOutlinedIcon />,
title: "Invoices Balances", to: "/invoices", icon: <ReceiptOutlinedIcon />,
title: "Profile Form", to: "/form", icon: <PersonOutlinedIcon />,
title: "Calendar", to: "/calendar", icon: <CalendarTodayOutlinedIcon />,
title: "Bar Chart", to: "/bar", icon: <BarChartOutlinedIcon />,
title: "Pie Chart", to: "/pie", icon: <PieChartOutlineOutlinedIcon />,
title: "Line Chart", to: "/line", icon: <TimelineOutlinedIcon />,

*/
