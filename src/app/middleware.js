import { LOGIN, LOGOUT } from './actions';

export function authenticationMiddleware() {
    return next => action => {
        

        if(action.type === LOGIN || action.type === LOGOUT) {
            localStorage.setItem('authentication', JSON.stringify(action.payload.authentication));
        }
        next(action);
    };
}