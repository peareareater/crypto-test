import { FC } from 'react';
import { SnackBarPropsType } from '../lib/types';
import { actionTypes } from '../reducer/actionTypes';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export const SnackbarComponent: FC<SnackBarPropsType> = ({ notifications, dispatch }) => {
    const handleClose = (i: number) => {
        dispatch({ type: actionTypes.CLOSE_NOTIFICATION, payload: i });
    };
    const closeWithDelay = (i: number) => {
        setTimeout(() => {
            handleClose(i);
        }, 1000)
    }
    return (
        <>
            {notifications &&
                notifications.map((notification, i) => (
                    <Snackbar
                        key={`snackbar-${i}`}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={true}
                        autoHideDuration={1000}
                        style={{ top: 60 * (i + 1) }}
                        onClose={() => closeWithDelay(i)}
                    >
                        <Alert onClose={() => handleClose(i)} severity={notification.type}>
                            {notification.message}
                        </Alert>
                    </Snackbar>
                ))}
        </>
    );
};

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
