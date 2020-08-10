import React, { Component } from 'react'
import './ContainerBoxesText.css'
import BoxTextComponent from './BoxTextComponent.js';

export default class ContainerBoxesText extends Component {
    constructor(props){
        super(props);
        this.state = {
            boxes:[
                
            ],
            content:[

            ]
        };
    }
    renderizeList = () => {
        const finalBoxes = this.state.boxes.map( (el,index) => {
            const copyState =  {};
            Object.assign(copyState,this.state.boxes[index].style);
            this.state.content.push('');
            return <div className='wrapper-box-text' key={index} id={`Box:${index}`} style={copyState}> 
                <BoxTextComponent content={this.state.content[index]}/>
                   </div> ;
        });
        return finalBoxes;
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
        window.addEventListener('resize',(e) => {
            let adjustementHeight = e.target.innerHeight-stateWindow.oldHeight;
            let adjustementWidth = e.target.innerWidth-stateWindow.oldWidth;
            if(adjustementHeight!==0 || adjustementWidth!==0){    
                let copyBoxes = this.state.boxes.slice();
                copyBoxes = copyBoxes.map( (el) => {
                    el.style.top += adjustementHeight;
                    el.style.left += adjustementWidth;
                    return el;
                });
                stateWindow.oldHeight = e.target.innerHeight;
                stateWindow.oldWidth = e.target.innerWidth;
                this.setState({boxes:copyBoxes});
                console.log(copyBoxes);
            }   
        });
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
            const finalMeasures = boxTestContainer.getBoundingClientRect();
            if(moved){
                let textBoxCopy = {};
                textBoxCopy['width'] = finalMeasures.width+'px';
                textBoxCopy['height'] = finalMeasures.height+'px';
                textBoxCopy['x'] = finalMeasures.x;
                textBoxCopy['y'] = finalMeasures.y;
                textBoxCopy['top'] = finalMeasures.top;
                textBoxCopy['left'] = finalMeasures.left;
                let style = {style:{}};
                Object.assign(style.style,textBoxCopy);
                let boxCopy = this.state.boxes;
                boxCopy.push(style);
                this.setState({boxes:boxCopy});
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
