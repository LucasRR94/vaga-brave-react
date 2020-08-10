import React, {Component} from 'react';
import './BoxTextComponent.css';

class BoxTextComponent extends Component {
    // state = {
    //     contentBox:''
    // }
    // changeContent = (e) => {
    //     this.setState ({
    //         contentBox : e.target.value 
    //     });
    // }
    // scuna = () => {
    //     console.log(this.props.lol);
    // }
    changeContent = (e) => {
        return this.props.content.bind(this,e.target.value);
    }
    render() {
        return (
            <div className='wrapper-box-text-content'>
                <textarea type="text" value={this.props.content} onChange={this.changeContent}/>
            </div>
        );
    }
}


export default BoxTextComponent;