import React, { Component } from 'react'
import './ContainerBoxesText.css'
import BoxTextComponent from './BoxTextComponent.js';

export default class ContainerBoxesText extends Component {
    state = {
        boxes:[
            {}
        ],
        textBox:[
            {
                startX:0,
                startY:0
            }
        ]
    };
    renderizeList = () => {
        const finalBoxes = this.state.boxes.map( (el,index) => {
            return <div className='wrapper-box-text' key={index}> 
                   <BoxTextComponent/>
                   </div> ;
        });
        return finalBoxes;
    }
    componentDidMount  = (e) => {
        let drag = false;
        // let actualX = 10000;
        // let actualY = 10000;
        const containerBox = document.getElementById('containerBox');
        containerBox.addEventListener('mousedown', (e) => {
            this.setState({startX:e.clientX});
            this.setState({startY:e.clientY});
            const test = document.createElement('div');
            test.setAttribute('id','test');    
            const testBox = document.createElement('div');
            testBox.setAttribute('class','box-in-test');
            testBox.setAttribute('id','boxTest');    
            containerBox.appendChild(testBox);
            containerBox.appendChild(test);
            const containerTest = document.getElementById('boxTest');
            containerTest.style.left = this.state.startX + 'px'; // starting positions
            containerTest.style.top = this.state.startY + 'px'; // starting positions
            containerTest.style.width = '0.01px';
            containerTest.style.height = '0.01px';
            drag = true;
        });
        containerBox.addEventListener('mousemove' , (e) => {
            if(!drag) return ;
            const boxTestContainer = document.getElementById('boxTest');
            if(e.clientX > this.state.startX){
                boxTestContainer.style.width = (e.clientX - this.state.startX) + 'px';
            }

            if(e.clientY > this.state.startY){
                boxTestContainer.style.height = (e.clientY - this.state.startY) + 'px';
                
            }
            if(e.clientX === this.state.startX){
                boxTestContainer.style.width ='0.01px';
            }
            if(e.clientY === this.state.startY){
                boxTestContainer.style.height ='0.01px';
            }
            if(e.clientX < this.state.startX){
                boxTestContainer.style.width = (this.state.startX - e.clientX) + 'px';
                boxTestContainer.style.left = (e.clientX) + 'px'; // starting positions
            }

            if(e.clientY < this.state.startY){
                boxTestContainer.style.height = (this.state.startY - e.clientY)+ 'px';
                boxTestContainer.style.top = (e.clientY) + 'px'; // starting positions
            }
            
        });
        containerBox.addEventListener('mouseup' , (e) => {
            drag = false; 
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
