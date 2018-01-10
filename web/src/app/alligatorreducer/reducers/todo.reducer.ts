import { Action } from '@ngrx/store';

import { AlligatorTodo } from './';


export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_DONE = 'TOGGLE_DONE';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

	//export const initialTodo: TodoPayload[]=[
export const initialTodo: AlligatorTodo[]=[
	{index: 1, done: false, value: 'Pourquoi pas'},
	{index: 2, done: false, value: 'Non'},
	{index: 3, done: false, value: 'Oui, peut-etre'},
	] ;


//export interface TodoPayload {
export interface AlligatorTodo {
  index?: number;
  done?: boolean;
  value?: string;
  newValue?: string;
}

export function todoReducer(state: AlligatorTodo[]= initialTodo, action: ActionWithPayload<AlligatorTodo>) {
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];
    case DELETE_TODO:
      return state.filter((item, index) => index !== action.payload.index);
    case UPDATE_TODO:
      return state.map((item, index) => {
        return index === action.payload.index
          ? Object.assign({}, item, { value: action.payload.newValue })
          : item;
      });
    case TOGGLE_DONE:
      return state.map((item, index) => {
        return index === action.payload.index
          ? Object.assign({}, item, { done: !action.payload.done })
          : item;
      });
    default:
      return state;
  }
}