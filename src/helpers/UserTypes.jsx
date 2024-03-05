import SettingsIcon from '@mui/icons-material/SettingsRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import ReportsIcon from '@mui/icons-material/DescriptionRounded';
import CorrectionsIcon from '@mui/icons-material/ReportRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import PersonIcon from '@mui/icons-material/PersonRounded';

export const UserTypes = ['administrador', 'industria', 'supervisor', 'gremio', 'control'];

export const UserItems = {
    administrador: ['Inicio', 'Usuarios', 'Configuraciones', 'Cerrar Sesión'],
    industria: ['Inicio', 'Reportes', 'Correcciones', 'Cerrar Sesión'],
    supervisor: ['Inicio', 'Reportes', 'Correcciones', 'Cerrar Sesión'],
    gremio: ['Inicio', 'Reportes', 'Cerrar Sesión'],
    control: ['Inicio', 'Reportes', 'Cerrar Sesión'],
  };
  
  export const UserIcons = {
    administrador: [<HomeIcon />, <PersonIcon />, <SettingsIcon />, <LogoutIcon />],
    industria: [<HomeIcon />, <ReportsIcon />, <CorrectionsIcon />, <LogoutIcon />],
    supervisor: [<HomeIcon />, <ReportsIcon />, <CorrectionsIcon />, <LogoutIcon />],
    gremio: [<HomeIcon />, <ReportsIcon />, <LogoutIcon />],
    control: [<HomeIcon />, <ReportsIcon />, <LogoutIcon />],
  };