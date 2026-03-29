import { useState } from 'react';
import { Typography, Divider, Box, Button, Paper, Stack } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import RefreshIcon from '@mui/icons-material/Refresh'; // Импорт иконки
import * as style from './style';
import { Tooltip } from './Tooltip';
import { useResourceContext } from '../../../contexts/ResourceContext/context';
import { useQuery } from '@tanstack/react-query';
import { getLogsStat } from '../../../api/functional/res/stat/logs';
import { useAppContext } from '../../../contexts/AppContext/context';

// const chartData = [
//   { time: 1, success: 40, errors: 5, rps: 45, info: 20, warnings: 10 },
//   { time: 2, success: 30, errors: 15, rps: 45, info: 25, warnings: 12 },
//   { time: 3, success: 60, errors: 8, rps: 68, info: 15, warnings: 5 },
//   { time: 4, success: 50, errors: 3, rps: 53, info: 30, warnings: 8 },
//   { time: 5, success: 75, errors: 10, rps: 85, info: 22, warnings: 15 },
// ];

export const LogsBar = () => {
  const { setView } = useResourceContext();
  const [hiddenSeries, setHiddenSeries] = useState<string[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleSeries = (id: string) => {
    setHiddenSeries((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const { resource } = useResourceContext();
  const { connection } = useAppContext();

  const { data: chartData } = useQuery({
    queryKey: ['logStat', resource.slug],
    queryFn: () => getLogsStat(connection.current, resource.slug),
    select: r => {
      return r.result.slice(-24).map(v => ({...v, hour: new Date(v.hour * 1000 )}))
    }
  });

  const loadSeries = [
    // { 
    //   id: 'rps', 
    //   dataKey: 'rps', 
    //   label: 'RPS', 
    //   color: '#0288d1', 
    //   lineStyle: { strokeDasharray: '5 5' } 
    // },
    { id: 'success', dataKey: 'success', label: 'Success', color: '#2e7d32' },
    // { id: 'error', dataKey: 'error', label: 'Errors', color: '#d32f2f' },
  ].filter((s) => !hiddenSeries.includes(s.id));

  const infoSeries = [
    { id: 'info', dataKey: 'info', label: 'Info', color: '#1976d2' },
    { id: 'warning', dataKey: 'warning', label: 'Warnings', color: '#ed6c02' },
  ].filter((s) => !hiddenSeries.includes(s.id));

  return (
    <Box sx={style.container}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h5" sx={style.title}>Логи</Typography>
        
        <Stack direction="row" spacing={1}>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<RefreshIcon />} // Иконка добавлена
            onClick={() => {}}
            sx={{ textTransform: 'none', borderRadius: 1.5, fontWeight: 500 }}
          >
            Обновить
          </Button>

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

      <Divider sx={style.divider} />
      
      <Tooltip isOpen={showTooltip} />

      {/* Карточка Нагрузка */}
      <Paper sx={style.chartPaper}>
        <Box sx={style.chartHeader}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Нагрузка</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained" size="small"
              sx={{ ...style.button, color: 'success.main', minWidth: '90px', opacity: hiddenSeries.includes('success') ? 0.5 : 1 }}
              onClick={() => { setView('success'); toggleSeries('success'); }}
            >Success</Button>
            <Button
              variant="contained" size="small"
              sx={{ ...style.button, color: 'error.main', minWidth: '90px', opacity: hiddenSeries.includes('error') ? 0.5 : 1 }}
              onClick={() => { setView('errors'); toggleSeries('error'); }}
            >Errors</Button>
          </Stack>
        </Box>

        <Box sx={style.chartContainer}>
          {chartData && 
            <>  
              <Box sx={{width: "50%"}}>
                <LineChart 
                  title='test'
                  dataset={chartData}
                  key={chartData?.length}
                  xAxis={[{ dataKey: 'hour', scaleType: 'time', reverse: true }]} 
                  yAxis={[{ tickNumber: 10 }]} 
                  series={loadSeries}
                  height={270} 
                  grid={{ horizontal: true }} 
                  slotProps={{ tooltip: {trigger: 'axis'} }} 
                  margin={{ left: 30, right: 10, top: 10, bottom: 20 }} 
                />
              </Box>
              <Box sx={{width: "50%"}}>
                <LineChart 
                  dataset={chartData}
                  key={chartData?.length}
                  xAxis={[{ dataKey: 'hour', scaleType: 'time', reverse: true }]} 
                  yAxis={[{ tickNumber: 10 }]} 
                  series={loadSeries} 
                  height={270} 
                  grid={{ horizontal: true }} 
                  slotProps={{ tooltip: {trigger: 'axis'} }} 
                  margin={{ left: 30, right: 10, top: 10, bottom: 20 }} 
                />
              </Box>
            </>
          }
        </Box>
      </Paper>

      {/* Карточка Информация */}
      <Paper sx={{ ...style.chartPaper, my: 3 }}>
        <Box sx={style.chartHeader}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Информация</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained" size="small"
              sx={{ ...style.button, color: 'primary.main', minWidth: '90px', opacity: hiddenSeries.includes('info') ? 0.5 : 1 }}
              onClick={() => { setView('info'); toggleSeries('info'); }}
            >Info</Button>
            <Button
              variant="contained" size="small"
              sx={{ ...style.button, color: 'warning.main', minWidth: '90px', opacity: hiddenSeries.includes('warning') ? 0.5 : 1 }}
              onClick={() => { setView('warnings'); toggleSeries('warning'); }}
            >Warnings</Button>
          </Stack>
        </Box>
        <Box sx={style.chartContainer}>
          <Box sx={{width: "50%"}}>
            <LineChart 
              dataset={chartData || []} 
              xAxis={[{ dataKey: 'hour' }]} 
              yAxis={[{ tickNumber: 10 }]} 
              series={infoSeries} 
              height={270} 
              grid={{ horizontal: true }} 
              slotProps={{}} 
              margin={{ left: 30, right: 10, top: 10, bottom: 20 }} 
            />
          </Box>
          <Box sx={{width: "50%"}}>
            <LineChart 
              dataset={chartData || []} 
              xAxis={[{ dataKey: 'hour' }]} 
              yAxis={[{ tickNumber: 10 }]} 
              series={infoSeries} 
              height={270} 
              grid={{ horizontal: true }} 
              slotProps={{}} 
              margin={{ left: 30, right: 10, top: 10, bottom: 20 }} 
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
