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
                
            ],
            moved:false,
            drag:false,
            startX:false,
            startY:false 
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
    mouseDown = (e) => {
        const testBox = document.createElement('div');
        testBox.setAttribute('class','box-in-test');
        testBox.setAttribute('id','boxTest');

        this.setState({startX:e.clientX});
        this.setState({startY:e.clientY});
            
        e.target.appendChild(testBox);
        const containerTest = document.getElementById('boxTest');
        containerTest.style.left = e.clientX + 'px'; // starting positions
        containerTest.style.top = e.clientY + 'px'; // starting positions
        containerTest.style.width = '0.01px';
        containerTest.style.height = '0.01px';
        this.setState({drag:true});
    }
    mouseMove = (e) =>{
        e.preventDefault();
        if(this.state.drag){
            this.setState({moved:true});
            const boxTestContainer = document.getElementById('boxTest');
            if(e.clientX > this.state.startX){
                boxTestContainer.style.width = (e.clientX - this.state.startX) + 'px';
                console.log('Here');
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
    }
    mouseUp = (e) => {
            e.preventDefault();
            this.setState({drag:false}); 
            const boxTestContainer = document.getElementById('boxTest');
            if(boxTestContainer === null){
                this.setState({moved : false});
                return ;
            }
            const finalMeasures = boxTestContainer.getBoundingClientRect();
            if(this.state.moved){
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
                this.setState({moved : false});
            }
            // delete element of id = boxTest ...
            const parent = document.getElementById('containerBox');
            try{
                if(document.getElementById('boxTest') !== undefined){
                    parent.removeChild(boxTestContainer);
                }
            }
            catch(err){

            }
            
            
    }
    render() {
        return(
            <div className="wrapper-container-box" 
            id='containerBox'
            onMouseMove={this.mouseMove}
            onMouseUp={this.mouseUp}
            onMouseDown={this.mouseDown}
            >
                {this.renderizeList()}
            </div>
        )
    }
}

const mapStateToProps = state =>({
    boxes:state
});

export default connect (mapStateToProps,{addBoxContent,modBoxContent})(ContainerBoxesText) ;