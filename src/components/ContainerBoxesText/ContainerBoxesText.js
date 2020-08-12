import React, {Component } from 'react'
import './ContainerBoxesText.css'
import BoxTextComponent from '../BoxTextComponent/BoxTextComponent.js';
import { addBoxContent,modBoxContent } from '../../actions/index';
import { connect } from 'react-redux';

class ContainerBoxesText extends Component {
    constructor(props){
        super(props);
        this.state = {
            boxes:[
                
            ]
        };
    }
    changeContent = (index,e) => {
        const value = e.target['value'];
        const arr = [index,value];
        this.props.modBoxContent(arr);
    }
    renderizeList = () => {
            const copyObj = this.props.boxes.boxes;
            const finalBoxes = this.props.boxes.boxes.map( (el,index) => {
            const copyState =  {};
            Object.assign(copyState,this.props.boxes.boxes[index].style);
            return <div className='wrapper-box-text' 
                key={index} 
                id={`Box:${index}`} 
                style={copyState}> 
                
                <BoxTextComponent 
                index={index}
                content={copyObj[index].content} 
                callContentchange={this.changeContent}
                />
                
                </div> ;
        });
        return finalBoxes; // boxes are being add to the dom 
    }
     
    componentDidMount  = (e) => {
        let drag = false;
        let moved = false;
        let stateWindow = { 
            oldHeight:0,
            oldWidth:0,
        };
        //Initializing ... 
        stateWindow.oldHeight = window.innerHeight;
        stateWindow.oldwidth = window.innerWidth;
        const containerBox = document.getElementById('containerBox');

        containerBox.addEventListener('mousedown', (e) => {
            this.setState({startX:e.clientX});
            this.setState({startY:e.clientY});
            const testBox = document.createElement('div');
            testBox.setAttribute('class','box-in-test');
            testBox.setAttribute('id','boxTest');    
            containerBox.appendChild(testBox);
            const containerTest = document.getElementById('boxTest');
            containerTest.style.left = this.state.startX + 'px'; // starting positions
            containerTest.style.top = this.state.startY + 'px'; // starting positions
            containerTest.style.width = '0.01px';
            containerTest.style.height = '0.01px';
            drag = true;
        });
        containerBox.addEventListener('mousemove' , (e) => {
            e.preventDefault();
            if(drag){
                moved = true;
                const boxTestContainer = document.getElementById('boxTest');
                if(e.clientX > this.state.startX){
                    boxTestContainer.style.width = (e.clientX - this.state.startX) + 'px';
                }

                if(e.clientY > this.state.startY){
                    boxTestContainer.style.height = (e.clientY - this.state.startY) + 'px';
                }

                if(e.clientX === this.state.startX){
                    boxTestContainer.style.width ='0.0001px';
                }
                if(e.clientY === this.state.startY){
                    boxTestContainer.style.height ='0.0001px';
                }
                if(e.clientX < this.state.startX){
                    boxTestContainer.style.width = (this.state.startX - e.clientX) + 'px';
                    boxTestContainer.style.left = (e.clientX) + 'px'; // starting positions
                }

                if(e.clientY < this.state.startY){
                    boxTestContainer.style.height = (this.state.startY - e.clientY)+ 'px';
                    boxTestContainer.style.top = (e.clientY) + 'px'; // starting positions
                }
            }
            
            
        });
        containerBox.addEventListener('mouseup' , (e) => {
            e.preventDefault();
            drag = false; 
            const boxTestContainer = document.getElementById('boxTest');
            if(boxTestContainer ===null){
                moved = false;
                return ;
            }
            const finalMeasures = boxTestContainer.getBoundingClientRect();
            if(moved){
                // creation of an new Box of text ...
                let textBoxCopy = {};
                textBoxCopy['width'] = finalMeasures.width+'px';
                textBoxCopy['height'] = finalMeasures.height+'px';
                textBoxCopy['x'] = finalMeasures.x;
                textBoxCopy['y'] = finalMeasures.y;
                textBoxCopy['top'] = finalMeasures.top;
                textBoxCopy['left'] = finalMeasures.left;
                let box = {style:{},content:''};
                Object.assign(box.style,textBoxCopy);
                this.props.addBoxContent(box);  // added box to array
                moved = false;
            }
            // delete element of id = boxTest ...
            const parent = document.getElementById('containerBox');
            parent.removeChild(boxTestContainer);
        });
    }
    
    render() {
        return (
            <div className="wrapper-container-box" id='containerBox'>
                {this.renderizeList()}
            </div>
        )
    }
}

const mapStateToProps = state =>({
    boxes:state
});

export default connect (mapStateToProps,{addBoxContent,modBoxContent})(ContainerBoxesText) ;