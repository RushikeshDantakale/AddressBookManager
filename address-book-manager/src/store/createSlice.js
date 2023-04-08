import {createSlice} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const data = [];

const createContactSlice = createSlice({
    name : 'contact' ,
    initialState : data,
    reducers : {
        addContact(state , action){
        state.push(action.payload);
        },
        deleteContact(state,action){
            return state = state.filter((ele)=>{
                return ele.name !== action.payload;
            }) 
        },
        updateContact(state , action){

            console.log(action.payload);
            const index = state.findIndex(obj => obj.name ==action.payload.name);

         console.log(action.payload.updatedName , action.payload.updatedNumber , "cartslice 23 line");
            
            if(action.payload.updatedName !=='' && action.payload.updatedNumber !== '') {
                state[index].name = action.payload.updatedName;
                state[index].number = action.payload.updatedNumber;
            }else if(action.payload.updatedName !== '') {
                state[index].name = action.payload.updatedName;
                }else{
                    state[index].number = action.payload.updatedNumber;
                } 
        }
    }
})


export const {addContact ,deleteContact,updateContact} = createContactSlice.actions;

const rootReducer = combineReducers({
     addContact : createContactSlice.reducer,
    

   });
 
   export default rootReducer;