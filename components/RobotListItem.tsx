import { FC } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AndroidIcon from '@material-ui/icons/Android';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { Grid } from '@material-ui/core';
import { RobotItem } from '../lib/types';

interface RobotListItemProps {
    code: string;
    id: string;
    onClick: ({code: string}) => void;
}
export const RobotListItem: FC<RobotListItemProps> = ({ code, id, onClick }) => {
    return (
        <ListItem button onClick={() => onClick({ code })}>
            <ListItemIcon>
                <AndroidIcon />
            </ListItemIcon>
            <Grid>
                <ListItemText primary={`CODE: ${code}`} />
                <ListItemText primary={`ID: ${id}`} />
            </Grid>
        </ListItem>
    );
};
