export interface RobotItem {
    code: string;
    id: string;
    settings: SettingsType
}

export type DataType = {
    robots: Array<RobotItem>;
};

type ActionParams = {
    type: string;
    payload?: any;
};

export interface ReducerProps {
    state?: any;
    dispatch?: (params: ActionParams) => void;
}

export type SettingsType = {
    [key: string]: any;
};

export enum NoticiationTypes {
    Error = "error",
    Warning = 'warning',
    Info = 'info',
    Success = 'success'
}
export type NotificationType = {
    message: string;
    type: NoticiationTypes;
};

export interface SnackBarPropsType extends ReducerProps {
    notifications: NotificationType[];
}