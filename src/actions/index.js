export const addBoxContent = (box) => dispatch => {
    dispatch ({
        type:'ADD_BOX',
        payload:box
    })
}

export const modBoxContent = (indexContent) => dispatch => {
    dispatch ({
        type:'MOD_TEXT_BOX',
        payload:indexContent
    })
}

export const delBoxContent = (indexOfBox) => dispatch => {
    dispatch({
        type:'DEL_BOX',
        payload:indexOfBox
    })
}