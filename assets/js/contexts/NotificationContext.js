import React, {createContext, useReducer, useContext} from "react";
import {createPortal} from "react-dom";
import Notifier from "../components/Notifier/Notifier";

export const NotificationContext = createContext();

const initialState = [];

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const CLEAR = 'CLEAR';
export const REPLACE = 'REPLACE';

export const notificationReducer = (state, action) => {
    switch (action.type) {
        case ADD:
            return [...state, {
                id: +new Date(),
                title: action.payload.title,
                description: action.payload.description,
                type: action.payload.type
            }];
        case REMOVE:
            return state.filter(notification => notification.id !== action.payload.id);
        case REPLACE:
            return state.map(notification => {
                if (notification.id === action.payload.id) {
                    return {
                        ...notification,
                        title: action.payload.title,
                        description: action.payload.description,
                        type: action.payload.type
                    }
                }
                return notification;
            });
        case CLEAR:
            return initialState;
        default:
            return state;
    }
};

export const NotificationProvider = props => {
    const [notifications, dispatch] = useReducer(notificationReducer, initialState);
    const notificationData = {notifications, dispatch};

    return (
        <NotificationContext.Provider value={notificationData}>
            {props.children}
            {createPortal(<Notifier notifications={notifications}/>, document.body)}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    return useContext(NotificationContext);
};