import React from 'react'

class StopWatch extends React.Component {
  constructor() {
    super()
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      miliSec: 0,
      isClick: false,
      isStop: false,
      isResume: false
    }
    this.interval = ''
  }

  componentDidUpdate() {
    let { minutes, seconds, miliSec, isClick } = this.state

    if (isClick === true) {

      if (miliSec === 100) {


        if (seconds === 59) {
          this.setState((preState) => {
            return {
              seconds: 0,
              minutes: preState.minutes + 1
            }
          })
        } else if (minutes === 59) {
          this.setState((preState) => {
            return {
              minutes: 0,
              hours: preState.hours + 1
            }
          })
        }

        this.setState((preState) => {
          return {
            seconds: preState.seconds + 1,
            miliSec: 0
          }
        })

      } else {
        if (this.interval) clearInterval(this.interval)
        this.interval = setInterval(() => {
          this.setState((preState) => {
            return {
              miliSec: preState.miliSec + 1
            }
          })

        }, 10)
      }
    }

  }

  handleClick = () => {
    this.setState({
      isClick: true,
      isStop: true
    })

  }

  handleStop = () => {
    this.setState({
      isResume: true,
      isClick: false,

    })
    clearInterval(this.interval)

  }

  handleResume = () => {
    this.setState({
      isClick: true,
      isStop: true,
      isResume: false,
    })

  }

  handleReset = () => {
    this.setState({
      isStop: false,
      isClick: false,
      isResume: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      miliSec: 0,
    })

  }

  render() {
    let { handleClose } = this.props
    let { hours, minutes, seconds, miliSec, isStop, isResume } = this.state
    return (
      <>
        <div className='stopWatch'>
          <h2 className='center'>Stopwatch</h2>

          <div className='flex margin-3 justify-center justify-evenly font-3'>
            <p>{String(hours).length === 1 ? `0${hours}` : hours} </p>
            <p className='letter-spacing'>:</p>
            <p>{String(minutes).length === 1 ? `0${minutes}` : minutes} </p>
            <p className='letter-spacing'>:</p>
            <p>{String(seconds).length === 1 ? `0${seconds}` : seconds} </p>
            <p className='letter-spacing'>:</p>
            <p>{String(miliSec).length === 1 ? `0${miliSec}` : miliSec} </p>
          </div>

          <div className='flex justify-center'>
            {

              isStop ?
                isResume ?
                  <div className='flex justify-center gap'>
                    <button onClick={this.handleResume} className='stopWatch-btn cursor'>Resume</button>
                    <button onClick={this.handleReset} className='stopWatch-btn cursor'>Reset</button>
                  </div>
                  : <button onClick={this.handleStop} className='stopWatch-btn cursor'>Stop</button>
                : <button onClick={this.handleClick} className='stopWatch-btn cursor'>Start</button>
            }
          </div>

          <span id='stopWatch' onClick={handleClose} className='close-btn'>X</span>
        </div>
      </>
    )
  }
}

export default StopWatch