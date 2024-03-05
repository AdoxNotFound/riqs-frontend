import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useApiContext } from "../../context/ApiContext";
import { userMenuItems } from "../../helpers/UserTypes";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LogoutHandler from "../../helpers/LogoutHandler";
//import useToken from "../../services/useToken";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        padding: "5px 35px 5px 20px",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography variant="body2">{title}</Typography>
    </MenuItem>
  );
};

const ProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { generalSettings } = useApiContext();
  //const [sTokens, clearTokens] = useToken();
  const navigate = useNavigate(); // Obtiene la función navigate
  const handleLogout = LogoutHandler(generalSettings.token, navigate);

  return (
    <Box
      sx={{
        "& .ps-menu-button": {
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        display: "flex",
        height: "140vh",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={colors.primary[400]}
        width="210px"
      >
        <Menu iconShape="square">
          {/* logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.grey[100]}>
                  RIQS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* user */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/iol_logo.jpeg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {generalSettings.username}
                </Typography>
                <Typography variant="body2" color={colors.greenAccent[500]}>
                  {generalSettings.role}
                </Typography>
              </Box>
            </Box>
          )}
          {/* Menu items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {userMenuItems[generalSettings.role].map((menuItem) => (
              <Item
                key={menuItem.title}
                title={menuItem.title}
                to={menuItem.to}
                icon={menuItem.icon}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
            <MenuItem
              style={{
                color: colors.grey[100],
                padding: "5px 35px 5px 20px",
              }}
              icon={<LogoutOutlinedIcon />}
              onClick={handleLogout}
            >
              <Typography variant="body2">Cerrar Sesión</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default ProSidebar;
