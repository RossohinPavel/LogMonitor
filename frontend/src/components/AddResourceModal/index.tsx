import { useState } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Divider, 
  Stack, 
  TextField, 
} from "@mui/material";
import { create as createResource } from "../../api/functional/res";
import type { ResourceDto } from "../../api/structures/ResourceDto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAppContext } from "../../contexts/AppContext/context";
import { routes } from "../../pages";


interface props {
  open: boolean,
  handleClose: () => void,
}

export const AddResourceModal = ({ open, handleClose }: props) => {
  const { connection } = useAppContext();

  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const onClose = () => {
    handleClose();
    setName("");
  };

  const mutation = useMutation({
    mutationFn: (body: createResource.Body) => createResource(connection.current, body),
    onSuccess: resource => {
      console.info("Success", resource);
      queryClient.setQueryData(["resources"], (old: ResourceDto[]) => [...old, resource]);
      onClose();
      void navigate(routes.getAppPage(resource.slug));
    },
    onError: e => console.error(e),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600 }}>Добавить новый ресурс</DialogTitle>
      <Divider />
      
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Введите название ресурса"
            name="name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Например, Auth-Service"
          />
        </Stack>
      </DialogContent>

      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} color="inherit">
          Отмена
        </Button>
        <Button
          disabled={!name || mutation.isPending}
          onClick={() => mutation.mutate({ name: name })} 
          variant="contained" 
          color="success"
          disableElevation
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
