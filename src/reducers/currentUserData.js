const initialState = {
    username: "",
    token: ""
}

const currentUser = (state = initialState, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...action.payload,
            }
        default:
            return state
    }
}

export default currentUser;