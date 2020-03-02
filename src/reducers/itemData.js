const initialState = {
   trigger: false
}

const currentItem = (state = initialState, action) => {
    switch(action.type){
        case "SET_TRIGGER":
            return {
                trigger: !state.trigger
            }
        default:
            return state
    }
}

export default currentItem;