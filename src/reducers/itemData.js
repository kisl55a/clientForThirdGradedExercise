const initialState = {
    trigger: false,
    visible: false
}

const currentItem = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TRIGGER":
            return {
                trigger: !state.trigger
            }
        case "SET_VISIBLE_TO_FALSE":
            return {
                visible: false
            }
        case "SET_VISIBLE_TO_TRUE":
            return {
                visible: true
            }
        default:
            return state
    }
}

export default currentItem;