import { useEffect, useRef } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppContext } from "../../contexts/AppContext/context";
import { routes } from "../routes";


export const MainPage = () => {
  const isFirstRun = useRef(true);
  const { resources } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (resources && isFirstRun.current) {
      const slugs = Object.keys(resources);
      if (slugs.length !== 0) {
        isFirstRun.current = false;
        void navigate(routes.getAppPage(slugs[0]));
      }
    }
  }, [resources, navigate]);

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700, color: "white", pb: 2 }}>
        Похоже, что ресура нет. Добавить?
      </Typography>

      <Divider sx={{ mb: 3 }}/>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="success">
          Добавить
        </Button>
      </Box>

    </>
  );
};