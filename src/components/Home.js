import { render } from '@testing-library/react'
import React from 'react'
import '../style/Home.css'

class SAU extends React.Component {
    render() {
        if(this.props.repeat == 1) {
            return(
                <div>    
                    <h3>First SAU score:  <input onChange={event => this.props.setSau1Cur(event.target.value)} maxLength="2"/> / 
                    <input onChange={event => this.props.setSau1Max(event.target.value)} maxLength="2"/></h3>
                </div>
            )
        }
        else if(this.props.repeat == 2) {
            return(
                <div>    
                    <h3>First SAU score:  <input onChange={event => this.props.setSau1Cur(event.target.value)} maxLength="2"/> / 
                    <input onChange={event => this.props.setSau1Max(event.target.value)} maxLength="2"/></h3>
                    <h3>Second SAU score:  <input onChange={event => this.props.setSau2Cur(event.target.value)} maxLength="2"/> / 
                    <input onChange={event => this.props.setSau2Max(event.target.value)} maxLength="2"/></h3>
                </div>
            )
        }
        else if(this.props.repeat == 3) {
            return(
                <div>    
                    <h3>First SAU score:  <input onChange={event => this.props.setSau1Cur(event.target.value)} maxLength="2"/> / 
                    <input onChange={event => this.props.setSau1Max(event.target.value)} maxLength="2"/></h3>
                    <h3>Second SAU score:  <input onChange={event => this.props.setSau2Cur(event.target.value)} maxLength="2"/> / 
                    <input onChange={event => this.props.setSau2Max(event.target.value)} maxLength="2"/></h3>
                    <h3>Third SAU score:  <input onChange={event => this.props.setSau3Cur(event.target.value)} maxLength="2"/> / 
                    <input onChange={event => this.props.setSau3Max(event.target.value)} maxLength="2"/></h3>
                </div>
            )
        }
        else if(this.props.repeat == 0) {
            return(
                null
            )
        }
        else {
            return(
                <h3 className="red-text" key={10}>Error: please type proper value</h3>
            )
        }
    }
}

class SAT extends React.Component {
    render() {
        if(this.props.checked === true) {
            return(
                <h3>SAT score: <input onChange={event => this.props.set_sat_cur(event.target.value)} maxLength="2"/> / 
                <input onChange={event => this.props.set_sat_max(event.target.value)} maxLength="2"/></h3>
            )
        }
        else return(null)
    }
}

class Result extends React.Component {
    result = 0
    error = false
    render() {
        if(this.props.sau_sat.checked === true) {
            this.result = 
                ( ( ( ( (this.props.sau_sat.sau1cur / this.props.sau_sat.sau1max) + 
                (this.props.sau_sat.sau2cur / this.props.sau_sat.sau2max) + 
                (this.props.sau_sat.sau3cur / this.props.sau_sat.sau3max) ) / this.props.sau_sat.sauNum ) + (this.props.sau_sat.sat_cur / this.props.sau_sat.sat_max) ) / 2) * 100;
            this.error = false
        }
        else {
            this.result = 
                ( ( (this.props.sau_sat.sau1cur / this.props.sau_sat.sau1max) + 
                (this.props.sau_sat.sau2cur / this.props.sau_sat.sau2max) + 
                (this.props.sau_sat.sau3cur / this.props.sau_sat.sau3max) ) / this.props.sau_sat.sauNum )* 100;
            this.error = false    
        }

        if(this.result > 100) {
            this.error = true
            this.result = null
        }
        return(
            <h1>
                {this.error === true ? "" : "Result: "}{Math.round(this.result)}%
            </h1>
        )
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            sauNum: 0,
            sau1cur: 0,
            sau1max: 1,
            sau2cur: 0,
            sau2max: 1,
            sau3cur: 0,
            sau3max: 1,
            sat_cur: 0,
            sat_max: 1,
            checked: false,
        }
    }

    setSau1Cur = (value) => {
        this.setState({sau1cur: value})
    }
    setSau1Max = (value) => {
        this.setState({sau1max: value})
    }
    setSau2Cur = (value) => {
        this.setState({sau2cur: value})
    }
    setSau2Max = (value) => {
        this.setState({sau2max: value})
    }
    setSau3Cur = (value) => {
        this.setState({sau3cur: value})
    }
    setSau3Max = (value) => {
        this.setState({sau3max: value})
    }

    setSatCur = (value) => {
        this.setState({sat_cur: value})
    }
    setSatMax = (value) => {
        this.setState({sat_max: value})
    }

    setSauNum = (value) => {
        this.setState({sauNum: value})
    }

    Check = () => {
        if(this.state.checked === true) {
            this.setState({checked: false})
        }
        else if(this.state.checked === false) {
            this.setState({checked: true})
        }
    }
    render() {
        return(
            <div className="home">
                <div className="mini-navbar">
                    <h2>SAU SAT score calculator</h2>
                </div>
                <div className="content">
                    <div className="in">
                        <div className="SAU">
                            <h3>Number of SAUs that you passed:  <input onChange={event => this.setSauNum(event.target.value)} id="sau-num" maxLength="1"/></h3>
                            <SAU
                                repeat={this.state.sauNum} 
                                setSau1Cur={this.setSau1Cur} 
                                setSau2Cur={this.setSau2Cur} 
                                setSau3Cur={this.setSau3Cur}
                                setSau1Max={this.setSau1Max} 
                                setSau2Max={this.setSau2Max} 
                                setSau3Max={this.setSau3Max}
                            />
                        </div>
                        <div className="SAT">
                            <h3>Did you pass SAT: <a onClick={this.Check} className="checkbox" >{this.state.checked === true ? '✅' : '❎'}</a></h3>
                            <SAT checked={this.state.checked} set_sat_cur={this.setSatCur} set_sat_max={this.setSatMax} />
                        </div>
                    </div> 
                    <div className="result">
                        <Result sau_sat={this.state}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home