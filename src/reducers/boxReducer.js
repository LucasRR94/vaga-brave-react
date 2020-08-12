const initialState = [];
export default function (state = initialState,action){
    switch(action.type){
        case 'ADD_BOX':
            return [...state,
                action.payload];
       case 'MOD_TEXT_BOX':
            return state.map((el,index) => {
                if(index === action.payload[0]){
                    return Object.assign({},el,{content:action.payload[1]}); 
                }
                return el;
            });            
        case 'DEL_BOX':
            return state.filter((el,index) => {
                return index !== action.payload;
            });
        default:
            return state;// return boxes... 
    }
}