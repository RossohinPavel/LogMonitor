import React, { useState, useMemo } from 'react';
import { 
  Typography, 
  Divider, 
  Collapse, 
  Box, 
  Switch, 
  TextField, 
  Button, 
  Paper, 
  Stack 
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';

export const PingsBar = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMonitorActive, setIsMonitorActive] = useState(true);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMonitorActive(event.target.checked);
  };

  // Генерация данных
  const rawData = useMemo(() => {
    const points = [];
    const now = new Date();
    const currentHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
    const totalHours = 24 * 5;

    for (let i = 0; i < totalHours; i++) {
      const date = new Date(currentHour.getTime() - i * 60 * 60 * 1000);
      const isError = Math.random() > 0.92;
      const formattedDate = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
      const formattedTime = date.getHours().toString().padStart(2, '0') + ':00';
      const fullLabel = `${formattedDate} ${formattedTime}`;

      points.push({
        fullLabel,
        dateStr: formattedDate,
        hour: date.getHours(),
        value: isError ? Math.floor(Math.random() * 40) + 110 : Math.floor(Math.random() * 30) + 15,
        status: isError ? 'error' : 'success',
        isEndOfDay: date.getHours() === 0
      });
    }
    return points;
  }, []);

  const chartData = rawData.map(d => d.value);
  const xLabels = rawData.map(d => d.fullLabel);
  const dayBoundaries = rawData
    .filter((d, index) => d.isEndOfDay && index !== rawData.length - 1)
    .map(d => d.fullLabel);

  const styles = {
    container: {
      width: '100%',
      p: 2,
      mt: 2,
      backgroundColor: 'white',
      borderRadius: 2,
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.12)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 1,
    },
    title: {
      userSelect: 'none',
      color: 'text.primary',
      fontWeight: 600,
    },
    divider: {
      my: 2,
      borderColor: 'rgba(0, 0, 0, 0.15)',
    },
    tooltipBox: {
      p: 2,
      bgcolor: '#f0f7ff',
      borderRadius: 2,
      mb: 3,
      border: '1px solid rgba(2, 136, 209, 0.2)',
    },
    chartPaper: {
      p: 2,
      backgroundColor: '#fafafa',
      borderRadius: 2,
      border: '1px solid rgba(0, 0, 0, 0.15)',
      boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="h5" sx={styles.title}>
          Монитор
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch checked={isMonitorActive} onChange={handleSwitchChange} size="small" />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Адрес мониторинга..."
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 1.5, 
                width: '220px',
                '& .MuiOutlinedInput-root': { borderRadius: 1.5 }
              }}
            />
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setShowTooltip(!showTooltip)}
            sx={{ 
              textTransform: 'none', 
              borderRadius: 1.5, 
              fontWeight: 500,
              width: '100px'
            }}
          >
            {showTooltip ? 'Скрыть' : 'Подробнее'}
          </Button>
        </Stack>
      </Box>

      <Divider sx={styles.divider} />

      <Collapse in={showTooltip}>
        <Box sx={styles.tooltipBox}>
          <Typography variant="body2" color="textPrimary">подсказка</Typography>
        </Box>
      </Collapse>

      <Collapse in={isMonitorActive}>
        <Paper sx={styles.chartPaper}>
          <BarChart
            height={300}
            grid={{ horizontal: true }}
            xAxis={[{
              scaleType: 'band',
              data: xLabels,
              valueFormatter: (value) => {
                const item = rawData.find(d => d.fullLabel === value);
                return item?.hour === 12 ? item.dateStr : '';
              },
              colorMap: {
                type: 'ordinal',
                values: xLabels,
                colors: rawData.map(d => d.status === 'error' ? '#d32f2f' : '#1976d2'),
              },
            }]}
            series={[{ data: chartData, label: 'Ping (ms)' }]}
            margin={{ left: 40, right: 20, top: 20, bottom: 40 }}
            // slotProps={{ legend: { hidden: true } }}
          >
            {dayBoundaries.map((boundary) => (
              <ChartsReferenceLine
                key={boundary}
                x={boundary}
                lineStyle={{ stroke: '#e0e0e0', strokeWidth: 2, strokeDasharray: '5 5' }}
              />
            ))}
          </BarChart>
        </Paper>
      </Collapse>
    </Box>
  );
};
