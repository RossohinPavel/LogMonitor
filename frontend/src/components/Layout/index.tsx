import { useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { List, Toolbar, Divider, Box, Typography, IconButton } from "@mui/material";
import { Outlet } from "react-router";
import { useAppContext } from "../../contexts/AppContext/context";
import * as style from "./styles";
import { AddResourceModal } from "../AddResourceModal";
import { ResourceCardMini } from "../ResourceCardMini";


export const Layout = () => {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const { resources } = useAppContext();
  const renderedResources = useMemo(() => {
    if (!resources) {
      return null;
    };
    const widgets = Object.values(resources).map((r) => (
      <ResourceCardMini key={r.id} slug={r.slug} />
    ));
    return <List>{widgets}</List>;
  }, [resources]);

  return (
    <style.PageWrapper>
      <Box sx={style.LayoutWrapper}>
        <Box sx={style.Drawer}>
          <Toolbar sx={style.Toolbar}>
            <Typography variant="h6" component="div" sx={style.Title}>
              LogMonitor
            </Typography>
            <IconButton edge="end" aria-label="add" onClick={handleOpen} sx={style.AddIconButton}>
              <AddIcon />
            </IconButton>
          </Toolbar>

          <Divider />

          <Box sx={style.BoxStyle}>{renderedResources}</Box>

        </Box>


        <Box component="main" sx={style.Content}>
          <Outlet />
        </Box>
      </Box>

      <AddResourceModal open={open} handleClose={handleClose} />
    </style.PageWrapper>
  );
};
