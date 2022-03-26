import { combineReducers } from 'redux';


const initialState = {
    events: [],
    loading: false,
    error: null,
    next_page_token: []
}

export const getEvents = ( initialState ) => initialState.rootReducer.events;
export const getAccessToken = (initialState) => initialState.rootReducer.next_page_token;
export const getErrorMessage = (initialState) => initialState.rootReducer.error;

export const FETCH_TODOS_BEGIN = 'FETCH_TODOS_BEGIN';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

export const fetchTodosBegin = () => ({
    type: FETCH_TODOS_BEGIN
});

export const fetchTodosSuccess = data => ({
    type: FETCH_TODOS_SUCCESS,
    payload: data
})

export const fetchTodosFailure = error => ({
    type: FETCH_TODOS_FAILURE,
    payload: error
})

// export const fetchTodosFailure = error => ({
//     type: FETCH_TODOS_FAILURE,
//     error
// })

export const rootReducer = (state = initialState, action) => {
    console.log('action in reducer',action)
    switch(action.type) {
        case FETCH_TODOS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload.events,
                next_page_token: action.payload.next_page_token,
            }
        
        case FETCH_TODOS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                // error: action.error,
                events: []
            };
        case ADD_TODO:
            return {
                ...state,
                events: [...state.events, action.payload]
            }

        default:
            return state;
    }

}

//why we pass dispatch here as a param?
export const fetchTodos = async (dispatch) =>{
    try{
        dispatch(fetchTodosBegin())
        await fetch('https://mobile-app-interview.awair.is/events')
        .then(async (res) => {
            if (res.status === 200) {
              const data = await res.json();
              dispatch(fetchTodosSuccess(data))
            } 
            else {
              dispatch(fetchTodosFailure({error:'error'}))
            }
          })
    }
    catch(error){
        dispatch(fetchTodosFailure( 'in catch', error))
    }
}



export const ADD_TODO = "ADD_TODO"

export const addTodoSuccess = todo => ({
    type: ADD_TODO,
    payload: todo
})


// export const addTodoReducer = (state =initialState, action ) => {
//     console.log('inisde red', action,state)
//     switch(action.type) {
//         case ADD_TODO:
//             return {
//                 ...state,
//                 // title: action.title,
//                 // start: action.startDate,
//                 // end: action.endDate,
//                 events: [action.payload]
//             }
//         default: 
//             return state;
//     }
// }

export const addTodo = (todo) => {
    console.log('cjekck', todo)
    return dispatch => {
        dispatch(addTodoSuccess(todo))
    }

}

const reducers = {
    rootReducer,
    // addTodoReducer
}

export default combineReducers(reducers);