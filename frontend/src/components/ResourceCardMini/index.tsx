import React, { useMemo } from "react";
import { ListItem, ListItemButton, ListItemText, ListItemIcon, Box } from "@mui/material";
import { NavLink, useParams } from "react-router";
import { routes } from "../../pages";
import * as styles from "./styles";
import { useResource } from "../../hooks/useResource";


export const ResourceCardMini = React.memo(({ slug }: { slug: string }) => {

  const { slug: slugFromPath } = useParams() as { slug: string };

  const {resource} = useResource(slug);

  const isSelected = useMemo(() => slug === slugFromPath, [slug, slugFromPath])

  return (
    <ListItem disablePadding sx={{ mb: 1, px: 1 }}>
      <ListItemButton
        component={NavLink}
        to={routes.getAppPage((resource!.slug))}
        sx={styles.ListItemButton}
        selected={isSelected}
      >
        <ListItemText
          primary={resource!.name}
          slotProps={{ primary: { fontSize: "0.9rem", fontWeight: 500 } }}
        />
        1.5
        <ListItemIcon sx={{ minWidth: "auto", ml: 1.5 }}>
          
          {/* Статусы с твоими цветами */}
          <Box sx={{ ...styles.StatusCircle, bgcolor: "#4caf50" }} /> {/* Доступен */}
          <Box sx={{ ...styles.StatusCircle, bgcolor: "#f44336" }} /> {/* Не доступен */}
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
});
