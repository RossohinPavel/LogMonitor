export const ListItemButton = {
  borderRadius: "8px",
  border: "1px solid",
  borderColor: "divider",
  transition: "0.2s",
  backgroundColor: "white",
  "&:hover": {
    borderColor: "primary.main",
    backgroundColor: "#d4e2fb",
  },
  "&.Mui-selected": {
    borderColor: "black",
    backgroundColor: "#e3f2fd", 
    boxShadow: "0px 2px 4px rgba(25, 118, 210, 0.1)",
    "&:hover": {
      backgroundColor: "#e3efff",
    }
  },
};

export const StatusCircle = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  display: "inline-block",
  mr: 0.5, // небольшой отступ между кружками, пока они в ряд
};
