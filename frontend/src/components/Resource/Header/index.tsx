import { Typography, Box, IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useResourceContext } from "../../../contexts/ResourceContext/context";
import { DeleteResourceModal } from "../DeleteResourceModal";
import { useState } from "react";

export const Header = () => {
  const { resource } = useResourceContext();

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const chipSx = {
    height: 32,
    fontWeight: 600,
    border: "2px solid white",
    color: "white",
    "& .MuiChip-label": { px: 1.5 }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pb: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "white" }}>
          {resource.name}
        </Typography>
        
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip label="Доступен" sx={{ ...chipSx, bgcolor: "#4caf50" }} />
          <Chip label="Не доступен" sx={{ ...chipSx, bgcolor: "#f44336" }} />
        </Box>
      </Box>

      <IconButton 
        aria-label="delete" 
        onClick={handleOpenModal}
        sx={{ 
          color: "white",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            color: "#f44336",
            backgroundColor: "rgba(244, 67, 54, 0.1)",
            transform: "scale(1.1)"
          }
        }}
      >
        <DeleteIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <DeleteResourceModal open={showModal} handleClose={handleCloseModal} resource={resource}/>
    </Box>
  );
};
