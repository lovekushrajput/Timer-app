import React, { Component } from 'react'
import StopWatch from './StopWatch'
import CountDown from './CountDown'
import '../style/index.css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            isOpenstopWatch: false,
            isOpencountDown: false,
        }
    }

    handleOpen = ({ target }) => {
        if (target.innerText === 'Show Stopwatch') {
            this.setState({ isOpenstopWatch: true })
        }

        if (target.innerText === 'Show Countdown') {
            this.setState({ isOpencountDown: true })
        }
    }

    handleClose = ({ target }) => {
        if (target.id === 'countDown') {
            this.setState({ isOpencountDown: false })
        }

        if (target.id === 'stopWatch') {
            this.setState({ isOpenstopWatch: false })
        }
    }

    render() {
        let { isOpenstopWatch, isOpencountDown } = this.state
        return (
            <>
                <h1 className='center'>🚀 Timers 🚀</h1>
                <div className='flex justify-center gap'>
                    {isOpenstopWatch ? <StopWatch handleClose={this.handleClose} /> : <div className='timer flex justify-center align-center cursor' onClick={this.handleOpen}>Show Stopwatch </div>}
                    {isOpencountDown ? <CountDown handleClose={this.handleClose} /> : <div className='timer flex justify-center align-center cursor' onClick={this.handleOpen}>Show Countdown </div>}
                </div>
            </>
        )
    }
}

export default App
