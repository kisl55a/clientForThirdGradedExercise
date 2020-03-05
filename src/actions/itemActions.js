
const setTrigger = (userObj) => {
    return {
        type: "SET_TRIGGER",
    }
}
const setVisibleToFalse = (userObj) => {
    return {
        type: "SET_VISIBLE_TO_FALSE",
    }
}
const setVisibleToTrue = (userObj) => {
    return {
        type: "SET_VISIBLE_TO_TRUE",
    }
}

export default {
    setTrigger,
    setVisibleToFalse,
    setVisibleToTrue
}