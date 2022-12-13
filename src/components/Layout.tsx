import { Container, Grid } from "@mui/material";

import { ReactElement } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";

import { Sidebar } from "./Sidebar";

function Layout(): ReactElement {
  return (
    <>
      <Container maxWidth={false}>
        <Grid>
          <Header />
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={3} xs={5} lg={2}>
            <Sidebar />
          </Grid>
          <Grid item md={9} lg={10}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Layout;
