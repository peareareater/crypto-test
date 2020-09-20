import { makeStyles } from '@material-ui/core/styles';

const robotListStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 550,
        backgroundColor: theme.palette.background.paper,
        maxHeight: 500,
        minHeight: 500,
        overflow: 'auto',
    },
}));

const settingsFormStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: '35ch',
        },
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center'
    },
}));

export { robotListStyles, settingsFormStyles }