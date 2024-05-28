
'use client'
import { useState } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";

import Header from "./layout/TopBar";

import { Tabs } from "@/Datatypes/enums";
import MobileTabNavigation from "@/components/MobileTabNav/mobileVIew";

//redux
import StoreProvider from "./StoreProvider";

import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';

import "./globals.css";
import MiniDrawer from "./layout/Navigation";
import navConfig from "./layout/navConfig";

// home page tabs
import MetakulCollection from "@/tabs/Tab2/MetakulCollection";
import Tab3 from "@/tabs/Tab3";
import Tab4 from "@/tabs/Tab4/temp";

//provider:
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
//theme
import { ColorModeContext, useMode } from './layout/Theme/themes';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const smartWalletOptions = {
  factoryAddress: "0x2ace847964fe70d38ea6dad726e3a230dca244bd",
  gasless: true,
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, colorMode] = useMode();
  const isNonMobile = useMediaQuery("(min-width: 766px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showOutlet, setShowOutlet] = useState<boolean>(false);
  const APP_BAR = "64px"
  const handleSideBarState = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const tabs = [
    {
      value: <OtherHousesOutlinedIcon sx={{
        color:"white"
      }}/>,
      content: <div>{children}</div>,
      label: Tabs.tabTitle1
    },
    {
      value: <StoreOutlinedIcon sx={{
       color:"white"
      }}/>,
      content: <MetakulCollection />,
      label: Tabs.tabTitle2
    },
    // {
    //   value: <CategoryOutlinedIcon sx={{
    //   color:"white"
    //   }}/>,
    //   content: <Tab3 />,
    //   label: Tabs.tabTitle3
    // },
    {
      value: <ContactEmergencyOutlinedIcon sx={{
        color:"white"
      }}/>,
      content: <Tab4 />,
      label: Tabs.tabTitle4
    },
  ];

  return (
    <StoreProvider>

      <html lang="en">
        <body >
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ThirdwebProvider
                activeChain="polygon"
                clientId="ed7a4b64885c72be1dc347066f4e51ce"
                supportedWallets={[
                  smartWallet(metamaskWallet(), smartWalletOptions),
                  smartWallet(coinbaseWallet({ recommended: true }), smartWalletOptions),
                  smartWallet(walletConnect(), smartWalletOptions),
                  smartWallet(localWallet(), smartWalletOptions),
                  smartWallet(
                    embeddedWallet({
                      auth: {
                        options: ["email", "google", "apple", "facebook", "email", "phone"],
                      },
                    }),
                    smartWalletOptions
                  ),
                ]}
              >
                <Box>
                    <ToastContainer />
                  <Header APP_BAR={APP_BAR} setIsSidebarOpen={handleSideBarState} />
                  <MiniDrawer
                    APP_BAR={APP_BAR}
                    setShowOutlet={setShowOutlet}
                    isNonMobile={isNonMobile}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={handleSideBarState}
                    navConfig={navConfig}
                  />
                  <Container component="main" sx={{ flexGrow: 1, mt: 12, ml: "auto", mr: "auto" }}>
                    <MobileTabNavigation showOutlet={showOutlet} tabs={tabs} />
                  </Container>
                </Box>
              </ThirdwebProvider>
            </ThemeProvider>
            <Analytics />
            <SpeedInsights />
          </ColorModeContext.Provider>
        </body>

      </html>
    </StoreProvider>
  );
}
