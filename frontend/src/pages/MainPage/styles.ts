import { Card, Box, styled } from "@mui/material";


export const LogoIconBox = styled(Box)({
  width: 56,
  height: 56,
  borderRadius: 12,
  background: "rgba(255, 255, 255, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(10px)",
});

export const StyledMainCard = styled(Card)({
  borderRadius: 16,
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  overflow: "hidden",
});

export const PageBox = { maxWidth: 1600, mx: "auto" };

export const HeaderBox = { 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  mb: 2, 
};

export const LogoBox = { display: "flex", alignItems: "center", gap: 2 };

export const TitleTypography = { fontWeight: 700, color: "white" };

export const Fab = { boxShadow: 4 };

export const CardHeader = { bgcolor: "grey.50", borderBottom: "1px solid", borderColor: "divider" };

export const CardContent = { p: 0, minHeight: 400, bgcolor: "common.white" };
