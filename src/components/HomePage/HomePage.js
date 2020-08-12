import React, { Component } from 'react'
import './HomePage.css';
import OptionBoxComponent from '../OptionBoxComponent/OptionBoxComponent';
import ContainerBoxesText from '../ContainerBoxesText/ContainerBoxesText';


export default class HomePage extends Component {
    render() {
        return (
            <div className="wrapper">
                <main className="wrapper-main-area">
                    <section className="wrapper-main-area-section-box">
                        <ContainerBoxesText/>
                    </section>
                    <section className="wrapper-main-area-section-box">
                        <OptionBoxComponent/>
                    </section>
                </main>
            </div>
        )
    }
}
