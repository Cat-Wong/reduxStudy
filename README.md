### `npm start`
跑起来！

### `npm run build`
打包！

---

学习了阮一峰大神及一位网友的Redux 莞式教程, 总结了`redux`一些基本的用法

[Redux 入门教程_阮一峰](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

[Redux 莞式教程](https://github.com/kenberkeley/redux-simple-tutorial)

### Store
store 就是保存数据的容器，是整个应用唯一的，可以想象成项目中存在的唯一的公共变量

`redux`通过 `createStore`这个函数，来生成Store
```
import { createStore } from 'redux';
let store = createStore(myfunciton);
//myfunciton 是一个叫做reducer的函数，详细见后面
```

- `createStore` 通过接受另一个函数（reducer），返回新生成的Store对象

```
const store = createStore(reducer, initialState)   // store 是靠传入 reducer 生成的哦！
```
- `createStore` 方法还可以接受第二个参数 `initialState` ，表示 State 的最初状态。这通常是服务器给出的。

- 而 `initialState` 主要用于前后端同构的数据同步就是整个应用的状态初始值。注意，如果提供了这个参数，它会覆盖 ` Reducer`  函数的默认初始值。


`store` 有以下职责
- 维持应用的 `state`；
- 提供 `getState()` 方法获取 `state` (获取整个 `state`)
- 提供 `dispatch(action)` 触发`reducers`方法更新 `state` (※ 触发 state 改变的【唯一途径】※)
- 通过 `subscribe(listener)` 注册监听器 (可以理解成是 DOM 中的 addEventListener)
- 通过 `subscribe(listener)` 返回的函数注销监听器

### State
`Store` 包含所有的数据，想要得某个时间点的数据，就需要对`State`生成快照，得到这个这个时间点的数据集合，就叫做`State`

当前时刻的`State`，通过`store.getState()`获取
```
import { createStore } from 'redux';
let store = createStore(myfunciton);
cosnt state = store.getState()
```

### Action
`State` 变化会使 `View` 变化 。但是，用户接触不到 `State`，只能接触到 `View`。所以，`State`的变化必须是 `View` 导致的。`Action` 就是 `View` 发出的通知，表示 `State` 应该要发生变化了。

`Action` 是一个对象。其中的`type`属性是必须的，表示 `Action` 的名称。其他属性可以自由设置

```
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```
代码中 `action` 的名称是 `ADD_TODO`，携带的信息是`Learn Redux`

`Action` 描述当前发生的事情。改变 `State` 的唯一办法，就是使用 `Action`。它会运送数据到 `Store`。


```
可以理解为 action 只是一个包含 type 属性的普通对象即可
例如 { type: 'INCREMENT' }
```


### Action Creator
`Action Creator` 本质上是一个函数，返回值是一个`action`对象


```
const ADD_TODO = '添加 TODO';

function addTodoFn(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodoFn('Learn Redux');
```

代码中 `addTodoFn` 就是一个 `Action Creator`

### store.dispatch()
`store.dispatch()` 是改变 `state` 的唯一方法 

```
import { createStore } from 'redux';
const store = createStore(fn);

function addTodoFn(text){
    return{
        type:'ADD_TODO'
        text
    }    
} 

const myAction = addTodoFn('这是一个文本啊')  // 执行 Action Creator 获得 action

store.dispatch(myAction)  // 改变 state 的唯一方法：dispatch 一个 action！！！

```


### Reducer
`Reducer` 必须是一个同步的纯函数，每次 `dispatch(action)` 后都会被触发

`Reducer`的本质是一个函数，根据 `aciton.type` 来更新 `state` 并返回 `nextstate`

最后会用返回的这个 `nextstate` 完全替换 原来的 `state`

```
const defaultSate = 0   //默认值

function reducer(state = defaultSate,action){
  switch (action.type) {
    case ADD:
      return {
        count: state.count + 1
      };
    default:
      return state
  }
}
```

`reducer` 不用手动调用

只需要 在store 生成的时候，将reducer 传入 createStore 

在使用store.dispatch() 时，就会触发reducer的自动执行

```
import { createStore } from 'redux';
const store = createStore(reducer);
```

### store.subscribe()
- `Store` 允许使用`store.subscribe()`方法设置监听函数，一旦 `State` 发生变化，就自动执行这个函数。

```
import { createStore } from 'redux';
const store = createStore(reducer);
// store.subscribe(listener);
store.subscribe(()=>{
  console.log(store.getState())
});

```

- `store.subscribe`方法返回一个函数，调用这个函数就可以解除监听。

```
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```


### combineReducers(reducers)  `拆分reducer `
随着项目体积的增大，整个应用唯一的`state`也会逐渐增大，这也会导致`reducer`也会逐渐庞大

`Redux`提供一个 `combineReducers` 方法，用于拆分`reducer`，只需要定义各个子`reducer`函数，然后通过这个方法，就能集合为一个大的`reducer`

- `reducer 1`
```
//reducers/todos.js
export default function todos(state = [], action) {
  switch (action.type) {
    ...
  }
}
```

- `reducer 2`
```
//reducers/counter.js
export default function counter(state = 0, action) {
  switch (action.type) {
    ...
  }
}
```

- 通过`combineReducers` 合并 `reducer 1` 和 `reducer 2`
```
//reducers/index.js
import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
  todos,
  counter
})
```

- 通过 `combineReducers(reducers) ` 生成`store`
```
//store.js
import { createStore } from 'redux'
import reducer from './reducers/index'  //combineReducers(reducers) 合并后的reducers

let store = createStore(reducer)
console.log(store.getState())
// {
//   counter: 0,
//   todos: []
// }

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
})
console.log(store.getState())
// {
//   counter: 0,
//   todos: [ 'Use Redux' ]
// }
```




---

---


### react-redux 用法

### UI组件
- ui组件 就是纯组件，没有业务逻辑，只是在ui上呈现


### 容器组件
- 容器组件是通过数据管理和逻辑，使ui组件进行ui呈现
- 容器组件是通过 `connect` 方法，传入一个 ui组件 所生成的

### connect()
` connect()` 方法就是用 UI组件生成容器组件的方法

需要接收两个参数：

- mapStateToProps  输入逻辑 从外部数据变未ui组件的参数
- mapDispatchToProps   输出逻辑  发生的事件如何变为 `Aciton` 对象

```
//mapStateToProps 输入逻辑
//mapDispatchToProps 输出逻辑
//Counter UI组件

//MyApp 就是一个容器组件

const MyApp = connect(
  mapStateToProps,        
  mapDispatchToProps
)(Counter)    //connect 方法，通过connect 生成容器组件

```

### mapStateToProps()
- 负责输入逻辑, 把`redux`的`state` 映射到ui组件的`props`  
- 返回一个对象，这个对象的属性，组件的`props`就能通过同名参数获取
- 会订阅 `store`，当`state`更新时，会自动执行，重新计算组件参数，就能重新渲染组件
- 可接受两个参数，第二个参数是ui组件的`props`对象
```
function listArr (data) {
  return data.map((item, index) => {
    return <li key={index}>{item}--这是通过组件map渲染的</li>
  })
}

function mapStateToProps (state) {  
  return {                      
    stateTodata: state.counter,    
    liList: listArr(state.todoA)   
  }
}
```


### mapDispatchToProps()
- 负责输出逻辑   
- 把发射`actions`的方法，转为组件的`props`属性函数
```
function mapDispatchToProps (dispatch) { 
  return {
    clickAdd: () => dispatch(addFn),
    clickMin: () => { dispatch(minFn) },
    clickText: () => { dispatch(todoFn) }
  }
}
```


### `<Provider>` 组件
- 通过 `Provider` 组件，可以让容器组件拿到 `state`


```
ReactDOM.render(
  <Provider store={store}>
    <MyApp />
  </Provider>,
  document.getElementById('root')
);

```


