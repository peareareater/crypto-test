import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_ROBOTS } from '../api/queries';
import List from '@material-ui/core/List';
import { RobotListItem } from './RobotListItem';
import { LinearProgress } from '@material-ui/core';
import { scrolledToBottom } from '../helpers';
import { RobotItem, DataType } from '../lib/types';
import { useRouter } from 'next/router';
import { robotListStyles } from '../styles/MaterialStyles';
import { ReducerProps } from '../lib/types';
import { actionTypes } from '../reducer/actionTypes';

interface RobotsListPropsType extends ReducerProps {}

export const RobotsList: FC<RobotsListPropsType> = ({ dispatch, state }) => {
    const { robots } = state;
    const router = useRouter();
    const classes = robotListStyles();
    const [loading, setLoading] = useState(false);
    const { loading: gqlLoading, data, fetchMore } = useQuery(GET_ROBOTS, {
        variables: { limit: 10, offset: 0 },
    });

    useEffect(() => {
        if (data && data.robots && !robots.length) {
            console.log('setting new robots')
            dispatch({ type: actionTypes.SET_ROBOTS, payload: data.robots });
        }
        return () => {};
    }, [data]);

    const handleScroll = async (e: SyntheticEvent) => {
        const { target } = e;
        if (scrolledToBottom(target as HTMLInputElement)) {
            if (!loading) {
                setLoading(true);
                console.log('loading more...');
                await fetchMore({
                    variables: {
                        offset: robots.length,
                    },
                    updateQuery: (prev: DataType, { fetchMoreResult }) => {
                        dispatch({ type: actionTypes.SET_ROBOTS, payload: [...robots, ...fetchMoreResult.robots] });
                        return prev;
                    },
                });
                setLoading(false);
            }
        }
    };

    const handleClick = ({ code }) => {
        const robot = robots.find((robot) => robot.code === code);
        dispatch({ type: actionTypes.SET_CURRENT_ROBOT, payload: robot });
        router.push(`/robots/robot/${robot.id}`);
    };

    return (
        <div className={classes.root} onScroll={handleScroll}>
            <List component="nav">
                {robots &&
                    robots.map((item, idx) => (
                        <RobotListItem onClick={handleClick} key={`robot-${item.id}-${idx}`} {...item} />
                    ))}
                {(loading || gqlLoading) && <LinearProgress />}
            </List>
        </div>
    );
};
