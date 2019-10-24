import React from 'react';
import ReactDOM from 'react-dom';
import store from './App';   //引入store
import { Provider, connect } from 'react-redux'

import { addFn, minFn, todoFn } from './action'   //引入action

// ================
// const myrender = () => {
//   class App extends React.Component {
//     render () {
//       const lists = store.getState().todoA.map((item, index) => {
//         return <li key={index}>{item}--这是通过组件map渲染的</li>
//       })
//       return (
//         <div>
//           <h1>{store.getState().counter}</h1>
//           <button onClick={() => store.dispatch(addFn)}>自增 </button> {/*dispatch(action)修改state*/}
//           <button onClick={() => store.dispatch(minFn)}>自减 </button>
//           <button onClick={() => store.dispatch(todoFn)}>add text </button>
//           <ul>
//             {lists}
//           </ul>
//         </div>
//       )
//     }
//   }
//   ReactDOM.render(<App />, document.getElementById('root'));
// }

// myrender()

// //监听sotre
// store.subscribe(() => {
//   console.log(store.getState())
//   myrender()
// });


// =====使用react-redux=======
class Counter extends React.Component {
  render () {
    const { stateTodata, clickAdd, clickMin, liList, clickText } = this.props
    return (
      <div>
        <span>{stateTodata}</span><br />
        <span>这是span标签</span><br />
        <button onClick={clickAdd}>加1</button><br />
        <button onClick={clickMin}>减1</button><br />
        <button onClick={clickText}>add text</button>
        <ul>
          {liList}
        </ul>
      </div>
    )
  }
}

function listArr (data) {
  return data.map((item, index) => {
    return <li key={index}>{item}--这是通过组件map渲染的</li>
  })
}

function mapStateToProps (state) {  //负责输入逻辑 // 把redux的state 映射到ui组件的props   
  return {                           //返回一个对象，这个对象的属性，组件的props就能通过同名参数获取
    stateTodata: state.counter,     //会订阅 store，当state更新时，会自动执行，重新计算组件参数，就能重新渲染组件
    liList: listArr(state.todoA)   //可接受两个参数，第二个参数是ui组件的props对象
  }
}

function mapDispatchToProps (dispatch) { //负责输出逻辑   //把发射actions的方法，转为组件的 props 属性函数
  return {
    clickAdd: () => dispatch(addFn),
    clickMin: () => { dispatch(minFn) },
    clickText: () => { dispatch(todoFn) }
  }
}


const MyApp = connect(
  mapStateToProps,        
  mapDispatchToProps
)(Counter)    //connect 方法，通过connect 生成容器组件


ReactDOM.render(
  <Provider store={store}>
    <MyApp />
  </Provider>,
  document.getElementById('root')
);

