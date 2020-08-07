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
        let actualX = 0;
        let actualY = 0;
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
            actualX = this.state.startX;
            actualY = this.state.startY;
            drag = true;
        });
        containerBox.addEventListener('mousemove' , (e) => {
            if(drag){
                const boxTestContainer = document.getElementById('boxTest');
                const rectBox = boxTestContainer.getBoundingClientRect();
                if(e.clientX > this.state.startX){
                    boxTestContainer.style.width = rectBox.width - (actualX - e.clientX) + 'px';
                    actualX = e.clientX;
                }
                if(e.clientY > this.state.startY){
                    boxTestContainer.style.height = rectBox.height - (actualY - e.clientY) + 'px';
                    actualY = e.clientY;
                }
                if(e.clientX < this.state.startX){
                    boxTestContainer.style.width = rectBox.width + (e.clientX -actualX) + 'px';
                    actualX = e.clientX;
                    this.setState({startX:e.clientX});
                    boxTestContainer.style.left = this.state.startX + 'px'; // starting positions

                }
                if(e.clientY < this.state.startY){
                    boxTestContainer.style.height = rectBox.height + (e.clientY -actualY) + 'px';
                    actualY = e.clientY;
                    this.setState({startY:e.clientY});
                    boxTestContainer.style.top = this.state.startY + 'px'; // starting positions
                }
                
                console.log(rectBox);
            }
        });
        containerBox.addEventListener('mouseup' , (e) => {
            drag = false;
            const box = document.getElementById('boxTest');
            box.style.height='0px';
            box.style.width='0px';   
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
