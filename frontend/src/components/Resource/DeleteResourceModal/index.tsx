import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { create, findAll, remove as removeResource } from "../../../api/functional/res";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../../../contexts/AppContext/context";

interface props {
  open: boolean;
  handleClose: () => void;
  resource: create.Output;
}

export const DeleteResourceModal = ({ open, handleClose, resource }: props) => {

  const { connection } = useAppContext();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => removeResource(connection.current, resource.slug),
    onSuccess: () => {
      console.info("Ресурс успешно удален. Данные ответа:");
      handleClose();
      queryClient.setQueryData(["resources"], (old: findAll.Output) => old.filter(r => r.slug !== resource.slug));
    },
    onError: (e) => {
      console.error("Ошибка при удалении ресурса:", e);
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 600 }}>Удаление ресурса</DialogTitle>
      <Divider />

      <DialogContent sx={{ py: 3 }}>
        <Typography>
          Вы уверены, что хотите удалить <strong>{resource.name}</strong>?
        </Typography>
      </DialogContent>

      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Button 
          onClick={handleClose} 
          color="inherit" 
          disabled={mutation.isPending}
        >
          Отмена
        </Button>
        <Button
          disabled={mutation.isPending}
          onClick={() => mutation.mutate()}
          variant="contained"
          color="error"
          disableElevation
        >
          {mutation.isPending ? "Удаление..." : "Удалить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
