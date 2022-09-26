import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { configure } from 'mobx'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'

import injects from './store'
import App     from './App'

import './less/global.less'
import './less/var.less';
//强制改动 mobx 中变量使用 mobx 中的 @action 方式，避免在其他地方改动
configure({enforceActions: 'observed'})

ReactDOM.render(
	<Provider {...injects}>
		<ConfigProvider locale={zhCN}>
			<App/>
		</ConfigProvider>
	</Provider>,
	document.getElementById('root')
)
