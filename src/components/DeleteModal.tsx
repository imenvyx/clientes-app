import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useCallback } from 'react';
import { Stack } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteClient } from 'services/api';
import { useMySnackbar } from 'contexts/MySnackbarProvider';
import { ReactQueryKeys } from 'lib/reactQuery/reactQueryKeys';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface MyModalProps {
  open: boolean;
  clientId: string;
  closeModal: () => void;
}

/**
 * DeleteModal component renders a modal to confirm the deletion of a client.
 *
 * @param {MyModalProps} props - The properties for the DeleteModal component.
 * @param {boolean} props.open - Indicates if the modal is open.
 * @param {string} props.clientId - The ID of the client to be deleted.
 * @param {() => void} props.closeModal - Function to close the modal.
 * @returns The rendered DeleteModal component.
 */
export const DeleteModal = (props: MyModalProps) => {
  const { open, clientId, closeModal } = props;
  const mySnackbar = useMySnackbar();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: (clientId: string) => {
      return deleteClient(clientId);
    },
    onSuccess: async () => {
      mySnackbar.showWithMessage({
        message: 'Cliente ha sido eliminado exitosamente',
        type: 'success',
      });
      await queryClient.invalidateQueries([
        ReactQueryKeys.ClientList,
        clientId,
      ]);
      closeModal();
    },
    onError: (error: any) => {
      mySnackbar.showWithMessage({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        message: error?.message as string,
        type: 'error',
      });
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t('deleteModal.title')}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {t('deleteModal.titldescriptione')}
          </Typography>
          <Stack
            direction={'row'}
            spacing={2}
            sx={{ justifyContent: 'flex-end', mt: 3 }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                mutation.mutate(clientId); // Pass the client ID here
              }}
            >
              {t('buttons.delete')}
              Borrar
            </Button>
            <Button variant="outlined" onClick={closeModal}>
              {t('buttons.cancel')}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

/**
 * Custom hook to manage the state and behavior of the DeleteModal component.
 * Provides methods to open and close the modal, as well as manage the client ID.
 *
 * @returns  An object containing modal state and methods: open, clientId, setClientId, openModal, and closeModal.
 */
export function useMyModal() {
  const [open, setOpen] = React.useState(false);
  const [clientId, setClientId] = useState<string>('');

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    clientId,
    setClientId,
    openModal,
    closeModal,
  };
}
