import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useCategoryContext } from "../contexts/CategoryContext";

function Index(): JSX.Element {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { categories } = useCategoryContext();

  useEffect(() => {
    if (categories.length > 0) {
      navigate(categories[0].attributes.link);
    }
  }, [categories, navigate]);

  return (
    <>
      {!isAuthenticated && (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography mr={1}>You need login to continue</Typography>
          <Typography
            sx={{
              color: "primary.main",
              cursor: "pointer",
              textAlign: "center",
              textDecoration: "underline",
              width: "fit-content",
            }}
          >
            <Link to={"/login"}>Login</Link>
          </Typography>
        </Box>
      )}
    </>
  );
}

export default Index;
