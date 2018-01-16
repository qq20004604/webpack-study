import React from "react";

/**
 * Created by 王冬 on 2018/1/12.
 * QQ: 20004604
 * weChat: qq20004604
 */
class Leaner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: 90
        }
        this.less = this.less.bind(this)
    }

    render() {
        return <div>
            你的体重为 {this.state.weight} kg，点击一下减少 1kg
            <button onClick={this.less}>按钮</button>
        </div>
    }

    less() {
        this.setState({
            weight: this.state.weight - 1
        })
    }
}
export default Leaner