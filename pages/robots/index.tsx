import { FC } from 'react';
import styles from '../../styles/Home.module.css';
import { DefaultHeader } from '../../components/DefaultHeader';
import { RobotsList } from '../../components/RobotsList';
import Typography from '@material-ui/core/Typography';
import { ReducerProps } from '../../lib/types';

interface RobotsPagePropsType extends ReducerProps {}

const RobotsPage: FC<RobotsPagePropsType> = ({ dispatch, state }) => {
    return (
        <div className={styles.container}>
            <DefaultHeader />
            <Typography variant="h4" gutterBottom>
                Robots
            </Typography>
            <RobotsList dispatch={dispatch} state={state} />
        </div>
    );
};

export default RobotsPage;
