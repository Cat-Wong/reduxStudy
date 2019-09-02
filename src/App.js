// import React from 'react';
// import './App.css';

import { createStore ,combineReducers} from 'redux';

// // 初始化state
var initState = {
  counter:0,
  todos: []
}

//reducer
const counter = (state = initState.counter, action) => {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'MIN':
      return state - 1
    default:
      return state
  }
}

const todoA = (state = initState.todos, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

//将拆分后的reducer，合并成一个大的reducer集合
let reducers = combineReducers({
  counter,
  todoA
})

//生成store
const store = createStore(reducers)

console.log(store.getState())

export default store;
