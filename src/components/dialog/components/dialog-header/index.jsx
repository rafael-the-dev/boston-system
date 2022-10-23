import { DialogTitle, IconButton } from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialogTitle = (props) => {
    const { children, id, onClose, ...other } = props;
  
    return (
      <DialogTitle 
        id={id}
        className="border-b border-solid border-slate-200 pb-3 dark:text-slate-300 dark:border-slate-400" sx={{ m: 0, p: 2, paddingLeft: 0 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
};

const DialogHeader = ({ id, children, onClose }) => {
    return (
        <BootstrapDialogTitle id={id} onClose={onClose}>
            { children }
        </BootstrapDialogTitle>
    );
};

export default DialogHeader;