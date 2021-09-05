export const ADD_OPTION = 'product/ADD_OPTION';
export const UPDATE_SELECTED_OPTION = 'product/UPDATE_SELECTED_OPTION';
export const UPDATE_TOTAL_PRICE = 'product/UPDATE_TOTAL_PRICE';

export const addOption = payload => ({ type: ADD_OPTION, payload })

export const updateSelectedOptions = payload => ({ type: UPDATE_SELECTED_OPTION, payload });
export const updateTotalPrice = () => ({ type: UPDATE_TOTAL_PRICE });

const initialState = {
    price: 1000,
    totalPrice: 1000,
    selectedOptions: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_OPTION:
            return {
                ...state,
                selectedOptions: [
                    ...state.selectedOptions,
                    action.payload
                ]
            }
        case UPDATE_SELECTED_OPTION: 
            return {
                ...state,
                selectedOptions: state.selectedOptions.map(option => {
                    if(option.id === action.payload.id) {
                        return {
                            ...option,
                            value: action.payload.value
                        }
                    } else {
                        return option
                    }
                })   
            }
        case UPDATE_TOTAL_PRICE:
            return {
                ...state,
                totalPrice: state.price + state.selectedOptions.reduce((a, c) => {
                    const { price, value } = c;
                    return a += price * value
                }, 0)
            }
        default:
            return state;
    }
}