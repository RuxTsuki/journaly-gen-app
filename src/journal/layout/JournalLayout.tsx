import { Box, Toolbar } from "@mui/material";
import NavBar from "../../ui/components/navbar/NavBar";
import SideBar from "../../ui/components/sidebar/SideBar";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const drawerWidth = 240;

const JournalLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn "
    >
      <NavBar drawerWidth={drawerWidth} />

      <SideBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default JournalLayout;
