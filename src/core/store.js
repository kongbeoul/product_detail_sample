export const createStore = (reducer, preloadedState) => {
    let state = preloadedState;
    const listener = new Set();

    const getState = () => ({ ...state });

    const subscribe = fn => {
        listener.add(fn);
        return () => listener.delete(fn);
    }

    const dispatch = action => {
        state = reducer(state, action);
        for(const fn of listener) {
            fn();
        }
    }

    dispatch({
        type: 'INIT'
    })

    return {
        getState,
        subscribe,
        dispatch
    }

}