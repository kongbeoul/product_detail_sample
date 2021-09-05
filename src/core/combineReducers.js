export default function combineReducers(reduecers) {
    const finalReducers = Object.keys(reduecers).reduce((a, key) => {
        if(typeof reduecers[key] === "function") {
            a[key] = reduecers[key];
        }
        return a;
    }, {});

    const finalReducerKeys = Object.keys(finalReducers);

    return (state = {}, action) => {
        let hasChanged;
        const nextState = {};
        
        for(const key of finalReducerKeys) {
            const reducer = finalReducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);

            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }

        hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
        
        return hasChanged ? nextState : state;
    }
}