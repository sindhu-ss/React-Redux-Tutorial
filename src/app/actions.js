//set up all needed action types
import fetch from 'isomorphic-fetch';
import { uuId, apiToken } from './config';

export const ADD_TASK = 'ADD_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';

// set up a placeholder for the data from the server using middleware

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function getAuth() {
    let authentication = JSON.parse(localStorage.getItem('authentication')) || { apiToken: '', uuId: ''};
    return {
        type: LOGIN,
        payload: {
            authentication
        }
    };
}

// set up async-action creators
export function fetchTasks() {
    return function(dispatch, getState) {
        let state = getState();

        if(! state.authentication || state.authentication.uuId.length === 0 || state.authentication.apiToken.length === 0) {
            return function () { };
        }

        return fetch('https://habitica.com/api/v3/tasks/user', {
            headers: {
                'Accept': 'application/json',
                'X-api-user': state.authentication.uuId,
                'X-api-key': state.authentication.apiToken
            }
        })
        .then((response) => response.json())
        .then((json) => {
            dispatch(receiveTasks(json.data));
         })
    };
}
export function receiveTasks(tasks) {
    return {
        type: RECEIVE_TASKS,
        payload:  {
            tasks
        }
    };
}
export function login(uuId, apiToken) {
    return {
        type: LOGIN,
        payload: {
            authentication: {
             uuId,
             apiToken   
            }
        }
    };
}
export function logout() {
    return {
        type: LOGOUT,
        payload: {
            tasks: [],
            authentication: {
                uuId: '',
                apiToken: ''
            }            
        }
    };
}
//set up a placeholder for the data using an array

// const tasks = [
//     {
//         id: 1,
//         type: 'daily',
//         text: 'check facebook',
//         completed: false
//     },
//     {
//         id: 2,
//         type: 'habit',
//         text: 'Walk up the stairs'
//     },
//     {
//         id: 3,
//         type: 'todo',
//         text: 'Finish Redux Tutorials',
//         completed: false
//     },
//     {
//         id: 4,
//         type: 'todo',
//         text: 'Finish Redux Slides',
//         completed: true  
//     }
// ];

//set up action creators

// export function getTasks () {
//     return {
//         type: GET_TASKS,
//         payload: {
//             tasks
//         }
//     };
// }

export function addTask (text, type) {
    return {
        type: ADD_TASK,
        payload: {
            text,
            type
        }
    };
}

export function completeTask (id) {
    return {
        type: COMPLETE_TASK,
        payload: {
            id
        }
    };
}