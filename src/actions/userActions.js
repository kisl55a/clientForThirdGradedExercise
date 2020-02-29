
const setUser = (userObj) => {
    return {
        type: "SET_USER",
        payload: userObj
    }
}

export default {
    setUser,
}