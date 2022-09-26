import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Form,notification,Drawer,Spin,Switch,Tooltip,Input,InputNumber,Modal,TimePicker,DatePicker,Select,Tabs,Button,Table,message } from 'antd'
import { API_SERVER } from 'constant/apis'
import moment from 'moment'
import style from './style.less';
import * as urls from 'constant/urls'
import {debug,isN} from 'util/fn'
import {saveUser} from 'util/token'
let path = require("path");//工具模块，处理文件路径的小工具



//创建JSZip实例对象







@inject('mainStore')
class Jiao extends React.Component {
  constructor(props) {
    super(props)
		this.store = this.props.mainStore
		this.state = {
			loading: false,
      		clsDetail:[],
      		partList: [1,1,1],
      		selMenu: 0,
      		tecList: [],//教学进度
      		expList: [],//实验进度
      		showDlgT: false,
      		showDlgE: false,
      		batchT: {week:16},
      		batchE: {week:16,gnum:1,type:'验证',prop:'必做'},
      		week:16,
		}
    }

	//生命周期函数，组件加载完成时候立刻调用
	async componentDidMount() {
		
		  this.setState({ loading: true })
		  let r = await this.props.mainStore.post(urls.API_QRY_CLS, null)
		  this.setState({ loading: false, clsList:r.data})
		
	  }

	//导出全部docx
	doExportAll=async()=>{
		let r0 = await this.props.mainStore.post(urls.API_OUTPUT, null)
		// window.open("http://localhost:80/hznu.zip")
		window.open("http://43.143.111.217:8080/hznu.zip")
		message.info("保存数据成功！")
	}
  
  //在 React 中，只要执行了 setState 方法，就一定会触发 render 函数执行；
  //当this.state或者this.props发生改变的时候render函数执行
  render() {
	let {clsList,clsDetail,funList,partList,selMenu,tecList,expList} = this.state
    let cls = clsDetail[0]
    // console.log(cls);//存储class里面的内容
    //isNaN() 数字值返回 false，其他返回 true。
    //isNaN(cls)前面四次是false，最后一次变成true，应该是因为刚开始cls是undefined,后面获取到课程信息了
    if (!isN(cls)) {
      cls.w_hour = parseInt(cls?.t_hour) + parseInt(cls?.e_hour)
      cls.a_hour = cls.w_hour*16
    }
    //获取属性对象，帮助我们表单封装
    const {getFieldDecorator} = this.props.form
    return (
			<Spin spinning={this.state.loading}>
				<button onClick={this.doExportAll}>导出docx</button>
			</Spin>
		)
  }
}

export default Form.create()(Jiao)