import React from 'react';

import { observer } from 'mobx-react';

// import indexState from './index.state';
import './index.scss';

import axios from 'axios';

@observer
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                    name: 'net',
                    title: '发布管理',
                    info: '重构视频长传体系 降低发布成本 提高推荐效率'
                },
                {
                    name: 'laptop',
                    title: '流量倾斜',
                    info: '秒拍+微博双平台流量扶持 优质内容瞬间引爆'
                },
                {
                    name: 'mbag',
                    title: '商业支持',
                    info: '广告分成内容植入 流量变现 秒拍营销团队帮你赚钱'
                },
                {
                    name: 'present',
                    title: '数据管理 ',
                    info: '及时复盘数据 优化运营策略'
                }
            ]
        };
    }
    componentWillMount(){
        // axios.get('/loca/jj').then(function (data) {
        //     console.log(data)
        // })
    }
    render(){
        return (
            <div className="mp-wrapper">
                <h1 className='mp-logo'>
                    <img src={require('../assets/logo.svg')}/>
                </h1>
                <section className="mp-pic">
                    <img src={require("../assets/group-9.svg")}/>
                </section>
                <section className="mp-subtitle">
                    <span>欢迎光临，秒拍移动插件小屋，PC端插件访问</span>
                    <p className='subdet'><strong>https://github.com/dynicyan/mpaiment</strong></p>
                </section>
                <section className='mp-info'>
                    <ul>
                        {
                            this.state.list.map((item, index) =>
                                <li key={index}>
                                    <i className={'icon-' + item.name}></i>
                                    <div className="mp-Cnt">
                                        <p className="mp-infoTitle"> {item.title} </p>
                                        <p className="mp-infoS"> {item.info} </p>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </section>
            </div>
        )
    }
}

export default Index