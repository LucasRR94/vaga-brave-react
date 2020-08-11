import React, {Component} from 'react';
import './BoxTextComponent.css';

class BoxTextComponent extends Component {
    state ={
        copyContent:''
    }
    render() {
        return (
            <div className='wrapper-box-text-content'>
                <textarea type="text" 
                value={this.props.content} 
                onChange={this.props.callContentchange.bind(this,this.props.index)}/>
            </div>
        );
    }
}


export default BoxTextComponent;