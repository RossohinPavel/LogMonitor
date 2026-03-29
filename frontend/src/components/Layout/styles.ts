import type { Theme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { Box } from "@mui/material";


const drawerWidth = 280;

export const PageWrapper = styled(Box)(() => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #6a85b6 0%, #bac8e0 100%)",
}));

export const LayoutWrapper = {
  display: "flex",
  height: "100vh",
  width: "100vw",
};

export const Drawer = {
  width: drawerWidth,
  minWidth: drawerWidth,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid",
  borderColor: "divider",
  flexShrink: 0,
};

export const Toolbar = {
  px: 2,
  display: "flex",
  justifyContent: "space-between",
  p: 2,
};

export const Title = {
  fontWeight: 700,
  color: "white",
};

export const AddIconButton = {
  backgroundColor: "common.white",
  color: "success.main",
  boxShadow: 2,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "common.white",
    boxShadow: 4,
    transform: "scale(1.05)",
  },
  "& .MuiSvgIcon-root": {
    stroke: (theme: Theme) => theme.palette.success.main,
    strokeWidth: 1.5,
  },
};

export const BoxStyle = {
  overflowY: "auto",
  flexGrow: 1, 
  py: 2,
};

export const Content = {
  flexGrow: 1,
  height: "100vh",
  p: 2,
  overflow: "auto",
  position: "relative",
};
