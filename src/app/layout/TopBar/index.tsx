import { useContext, useState } from "react";

// @mui
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
// import app
import { ColorModeContext, getColors } from "../Theme/themes";
import { motion } from "framer-motion";
// const NAV_WIDTH = 280;
import "./style.css"
import Link from "next/link";
import {
  ConnectWallet,
} from "@thirdweb-dev/react";

interface HeaderProps {
  setIsSidebarOpen: () => void;
  APP_BAR: string
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, APP_BAR }) => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme()
  const [isOn, setIsOn] = useState(false);
  if (!colorMode) {
    // Handle the case where colorMode is undefined (e.g., context not yet initialized)
    return null; // or render a loading state or default content
  }
  const toggleSwitch = () => {
    colorMode.toggleColorMode()
    setIsOn(!isOn);
  }

  return (
    <AppBar sx={{
      backgroundColor: getColors().blueAccent[900],
      height: APP_BAR
    }} >
      <Toolbar>
        <IconButton
          onClick={() => setIsSidebarOpen()}
          sx={{
            color: getColors().blueAccent[100]
          }}
        >
          <MenuIcon />
        </IconButton>
        <Link
          href={"/"}>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/logo.svg`} alt="logo" className="w-8 h-8 ml-4" />
        </Link>

        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <ConnectWallet/>
          <div className="switch" data-ison={isOn} onClick={toggleSwitch} style={{
            background: theme.palette.grey[900],
            border: "2px solid",
            borderColor: theme.palette.grey[100],
          }}>
            <motion.div className="handle" layout transition={spring} style={{
              background: theme.palette.grey[100],
            }} />
          </div>

        </Stack>
      </Toolbar>
    </AppBar>
  );
}
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

export default Header;
