import { Box, Button } from "@mui/material"
import { LogsBar } from "../LogsBar"
import { PingsBar } from "../PingsBar"
import { useResourceContext } from "../../../contexts/ResourceContext/context"
import { useMemo } from "react"

export const Body = () => {

  const { view, setView } = useResourceContext();

  const widget = useMemo(() => {
    switch (view) {
      case 'info':
        return <>info</>
      case 'warnings':
        return <>wargnings</>
      case 'errors':
        return <>errors</>
      case 'pings':
        return <>pings</>
      case 'success':
        return <>success</>
      case 'index':
      default:
        return <><LogsBar /><PingsBar /></>
    }
  }, [view])

  return (
    <Box sx={{display: "flex", flexDirection: "column"}}>
      {view !== 'index' && 
        <Button
          variant="contained"
          sx={{ color: 'primary.main' }}
          onClick={() => setView('index')}
        >
          Назад
        </Button>
      }
      {widget}
    </Box>
  );
}