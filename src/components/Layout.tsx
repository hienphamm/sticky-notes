import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CodeIcon from "@mui/icons-material/Code";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import DataObjectIcon from "@mui/icons-material/DataObject";
import {
  Box,
  Button,
  Container,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  TextField,
} from "@mui/material";
import { ReactElement, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CommonModal from "./Modal";

interface Props {
  children: ReactElement;
}

const links = [
  {
    title: "Javascript",
    url: "/app/javascript",
    icon: <DataObjectIcon />,
  },
  {
    title: "Reactjs",
    url: "/app/reactjs",
    icon: <CodeIcon />,
  },
  {
    title: "Nextjs",
    url: "/app/nextjs",
    icon: <CodeOffIcon />,
  },
];

const Header = (): ReactElement => (
  <Box my={4} textAlign={"center"}>
    <TextField
      id="elastic-search"
      label="Search ..."
      variant="outlined"
      sx={{
        width: {
          xs: "100%",
          md: "400px",
        },
      }}
    />
  </Box>
);

const Sidebar = (): ReactElement => {
  const { pathname } = useLocation();
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const onOpenModal = (): void => {
    setIsVisibleModal(true);
  };

  const onCloseModal = (): void => {
    setIsVisibleModal(false);
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          height: "calc(100vh - 120px)",
          position: "relative",
        }}
      >
        <MenuList>
          {links.map((link, index) => (
            <Link
              to={link.url}
              key={index}
              style={{
                color: "black",
                textDecoration: "unset",
              }}
            >
              <MenuItem selected={pathname === link.url}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText>{link.title}</ListItemText>
              </MenuItem>
            </Link>
          ))}
        </MenuList>
        <Box position={"absolute"} bottom={0} width={"100%"}>
          <Button
            onClick={onOpenModal}
            fullWidth
            startIcon={<AddCircleOutlineIcon />}
            style={{
              height: "70px",
            }}
          >
            New Category
          </Button>
        </Box>
      </Paper>
      <CommonModal
        open={isVisibleModal}
        handleClose={onCloseModal}
        title={"New Category"}
      >
        <>hello world</>
      </CommonModal>
    </>
  );
};

function Layout({ children }: Props): ReactElement {
  return (
    <>
      <Container>
        <Grid>
          <Header />
        </Grid>
        <Grid container spacing={3}>
          <Grid item md={3} xs={5}>
            <Sidebar />
          </Grid>
          <Grid item md={9}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Layout;
