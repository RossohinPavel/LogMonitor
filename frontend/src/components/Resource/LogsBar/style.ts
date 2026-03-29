import type { SxProps, Theme } from '@mui/material';

export const container: SxProps<Theme> = {
  width: '100%',
  p: 2,
  mt: 2,
  backgroundColor: 'white',
  borderRadius: 2,
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.12)',
};

export const title: SxProps<Theme> = {
  userSelect: 'none',
  color: 'text.primary',
  fontWeight: 600,
};

export const divider: SxProps<Theme> = {
  my: 2,
  borderColor: 'rgba(0, 0, 0, 0.15)',
};

export const tooltipBox: SxProps<Theme> = {
  p: 2,
  bgcolor: '#f0f7ff',
  borderRadius: 2,
  mb: 3,
  border: '1px solid rgba(2, 136, 209, 0.2)',
};

export const chartPaper: SxProps<Theme> = {
  p: 2,
  mb: 3,
  backgroundColor: '#fafafa',
  borderRadius: 2,
  border: '1px solid rgba(0, 0, 0, 0.15)', 
  boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
};

export const chartHeader: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 1,
};

// ... (остальное без изменений)

export const chartContainer: SxProps<Theme> = {
  width: '100%',
  display: "flex",
  height: 270, // Соответствует высоте LineChart
  '& .MuiChartsGrid-line': {
    strokeDasharray: '4 4',
    stroke: 'rgba(0, 0, 0, 0.1)',
  },
};

// ...


export const button: SxProps<Theme> = {
  backgroundColor: 'white',
  boxShadow: 2,
  textTransform: 'none',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  '&:hover': {
    backgroundColor: '#f8f8f8',
    boxShadow: 4,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
};
