import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import store from './App';
import * as serviceWorker from './serviceWorker';

import { addFn, minFn, todoFn } from './action'

const myrender = () => {
  class App extends React.Component {
    render () {
      
      const lists = store.getState().todoA.map((item, index) => {
        return <li key={index}>{item}--这是通过组件map渲染的</li>
      })

      return (
        <div>
          <h1>{store.getState().counter}</h1>
          <button onClick={() => store.dispatch(addFn)}>自增 </button>
          
          <button onClick={() => store.dispatch(minFn)}>自减 </button>

          <button onClick={() => store.dispatch(todoFn)}>add text </button>

          <ul>
            {lists}
          </ul>

        </div>
      )
    }
  }
  ReactDOM.render(<App />, document.getElementById('root'));
}


myrender()

//监听sotre
store.subscribe(() => {
  console.log(store.getState())
  myrender()
});




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
