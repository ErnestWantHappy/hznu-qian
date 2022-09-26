import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'component/Loadable'
import { inject, observer } from 'mobx-react'
import NavWrapper from 'component/NavWrapper'
import {isN,msg} from 'util/fn'
import {loadUser} from 'util/token'

//　引入store
@inject('mainStore')
//@observer来监听组件里面的变化
@observer
class App extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.mainStore
  }
  //生命周期函数在组件挂载后（插入 DOM 树中）立即调用。
  componentDidMount() {
    let user = loadUser()
    if (!isN(user)) {
      this.store.saveUser(user)
    }
  }
  //render() 方法是 class 组件中唯一必须实现的方法。 
  //react的路由匹配默认是模糊的，包容的，如果想使用严格匹配，那么，把Route组件的exact属性设置为true
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Loadable({ loader: () => import('./app/login') })}   />
          
          <Route path='/' render={() => (
            <div className='app-root'>
              <NavWrapper>
                <Switch>
                <Route exact path='/jiao' component={Loadable({ loader: () => import('./app/jiao') })}   />
                  <Route exact path='/' component={Loadable({loader:()=>import('./app/tech')})}/>
                  <Route exact path='/tech' component={Loadable({loader:()=>import('./app/tech')})}/>
                  <Route exact path='/help' component={Loadable({loader:()=>import('./app/help')})}/>
                </Switch>
              </NavWrapper>
            </div>
          )}/>
        </Switch>
      </Router>
    )
  }
}

export default App
