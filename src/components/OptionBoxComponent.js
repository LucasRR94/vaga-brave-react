import React, { Component } from 'react'
import './OptionBoxComponent.css';
import { connect } from 'react-redux';
import { delBoxContent } from '../actions/index';

class OptionBoxComponent extends Component {
    delBox(e,index){
        this.props.delBoxContent(index);
        return;
    }
    renderList = (e) =>{
        return this.props.boxes.boxes.map( (el, index) => {
            return <div className="wrapper-option-box-control-entries" key={index}>
                        <div className="wrapper-option-box-control-entries-content"> 
                            <span>{el.content}</span>
                        </div>
                        <div className="wrapper-option-box-control-entries-btn-del">
                            <button onClick ={this.delBox.bind(this,e,index)}>DEL</button>
                        </div> 
                    </div> ;
        });
    }
    render() {
        return (
            <div className="wrapper-option">
                <div className="wrapper-option-title">Entries</div>
                <section className="wrapper-option-box-control">
                    {this.renderList()}
                </section>
            </div>
        )
    }
}


const mapStateToProps = state =>({
    boxes:state
});

export default connect (mapStateToProps,{delBoxContent})(OptionBoxComponent) ;