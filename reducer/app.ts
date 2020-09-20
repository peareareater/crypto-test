import { setNestedValue } from '../helpers';
import { actionTypes } from './actionTypes';
import { RobotItem, NotificationType } from '../lib/types';

export const initialState = { currentRobot: {}, robots: [], notifications: [] };

type AppState = {
    currentRobot: RobotItem;
    robots: RobotItem[];
    notifications: NotificationType[];
};

const reducer = (state: AppState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_CURRENT_ROBOT:
            return { ...state, currentRobot: payload };
        case actionTypes.SET_ROBOTS:
            return { ...state, robots: payload };
        case actionTypes.EDIT_SETTINGS:
            const { name, value } = payload;
            const currentRobot = { ...state.currentRobot };
            const settings = { ...currentRobot.settings };
            setNestedValue(settings, name, value);
            console.log(settings, 'settings')
            return { ...state, currentRobot: { ...currentRobot, settings: { ...currentRobot.settings, ...settings } } };
        case actionTypes.APPLY_CHANGES:
            const robots = [...state.robots];
            const newRobots = robots.map((robot) => (robot.id === state.currentRobot.id ? state.currentRobot : robot));
            return { ...state, robots: newRobots };
        case actionTypes.CLOSE_NOTIFICATION:
            const newNotifications = state.notifications.slice();
            newNotifications.splice(payload, 1);
            return { ...state, notifications: newNotifications };
        case actionTypes.PUSH_NOTIFICATION:
            return { ...state, notifications: state.notifications.concat(payload) };
    }
};

export default reducer;
