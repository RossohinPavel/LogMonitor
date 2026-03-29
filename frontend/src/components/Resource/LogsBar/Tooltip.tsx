import { Collapse, Box, Typography, IconButton } from '@mui/material';
import * as style from './style';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface TooltipProps {
  isOpen: boolean;
}

export const Tooltip = ({ isOpen }: TooltipProps) => {
  const serverUrl = 'https://api.logs-collector.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverUrl);
    // Здесь можно добавить уведомление (Snackbar), что адрес скопирован
    console.log('Адрес скопирован:', serverUrl);
  };

  return (
    <Collapse in={isOpen}>
      <Box sx={style.tooltipBox}>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#333' }}>
          <li>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              <Typography variant="body2">
                Для записи лога отправьте POST-запрос на <code>{serverUrl}</code>
              </Typography>
              <IconButton
                // variant="outlined"
                size="small"
                onClick={copyToClipboard}
                sx={{ textTransform: 'none', py: 0 }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Тело запроса должно соответствовать структуре
              <br />
              <code>
                {`{`} <br />
                {'\u00A0\u00A0'}type: "info" | "warning" | "error" | "success", <br />
                {'\u00A0\u00A0'}content: {"<Произвольный JSON сериализуемый объект>"} <br />
                {`}`}
              </code>
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Типы логов:</strong>
              <br />
              • <strong>success</strong> — успешная обработка запроса <br />
              • <strong>error</strong> — неотловленная ошибка при обработке запроса <br />
              • <strong>info</strong> — любой информационный лог <br />
              • <strong>warning</strong> — любой информационный лог, который стоит отделить от общего количества (например, обработанное исключение, подключение к базе и т.д.)
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Статистика по логам выводится за неделю.
            </Typography>
          </li>
        </ul>
      </Box>
    </Collapse>
  );
};
