import { FC } from 'react';
import { ReducerProps, NoticiationTypes } from '../../../lib/types';
import TextField from '@material-ui/core/TextField';
import { settingsFormStyles } from '../../../styles/MaterialStyles';
import { getFields, getNestedValue } from '../../../helpers';
import styles from '../../../styles/Home.module.css';
import { actionTypes } from '../../../reducer/actionTypes';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface RobotDetailsPropsType extends ReducerProps {}

const RobotDetails: FC<RobotDetailsPropsType> = ({ state, dispatch }) => {
    const classes = settingsFormStyles();
    const { settings } = state.currentRobot || {};
    const fields = getFields(settings);

    const handleChange: ({ target: HTMLTextAreaElement }) => void = ({ target }) => {
        const { name, value } = target;
        dispatch({ type: actionTypes.EDIT_SETTINGS, payload: { name, value } });
    };

    const applyChanges = () => {
        dispatch({ type: actionTypes.APPLY_CHANGES });
        dispatch({
            type: actionTypes.PUSH_NOTIFICATION,
            payload: { message: 'Success!', type: NoticiationTypes.Success },
        });
        console.log('changes applied...');
    };

    return (
        <div className={styles.container}>
            <Typography variant="h4" gutterBottom>
                Robot Details
            </Typography>
            <div>
                {JSON.stringify(settings, null, 2)}
            </div>
            <form className={classes.root}>
                {fields.map((field, id) => {
                    const value = getNestedValue(settings, field.value);
                    return (
                        <TextField
                            key={`field-${field.name}-${id}`}
                            label={field.name}
                            value={value}
                            name={field.value}
                            onChange={handleChange}
                            type="number"
                            InputLabelProps={{
                                style: {
                                    fontSize: '1rem',
                                },
                            }}
                            inputProps={{
                                style: {
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                },
                            }}
                        />
                    );
                })}
                <Button variant="contained" color="primary" onClick={applyChanges}>
                    Save
                </Button>
            </form>
        </div>
    );
};

export default RobotDetails;
