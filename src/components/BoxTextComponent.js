import React, {Component} from 'react';
import './BoxTextComponent.css';

class BoxTextComponent extends Component {
    state = {
        contentBox:''
    }
    changeContent = (e) => {
        this.setState ({
            contentBox : e.target.value 
        });
    }
    render() {
        return (
            <div className='wrapper-box-text-content'>
                <textarea type="text" value={this.state.contentBox} onChange={this.changeContent} />
            </div>
        );
    }
}


export default BoxTextComponent;