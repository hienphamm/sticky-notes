import { Box } from "@mui/system";
import { ReactNode, useState } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props): JSX.Element {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Box sx={{ mt: 10, ml: open ? 32 : 10 }}>{children}</Box>
      <Footer />
    </>
  );
}

export default Layout;
