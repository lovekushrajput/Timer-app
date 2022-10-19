import React from 'react'

class CountDown extends React.Component {
    constructor() {
        super()
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            isClick: false,
            isStop: false,
            isResume: false
        }

        this.interval = ''
    }

    componentDidUpdate() {
        if (this.state.isClick === true) {
            let { minutes, seconds, hours } = this.state

            if (minutes === 0 && seconds === 0 && hours === 0) {
                this.setState({ isClick: false, isStop: false })
                clearInterval(this.interval)
                alert('count ended 💨💥')
                return;
            }


            if (seconds > 0) {
                if (this.interval) clearInterval(this.interval)
                this.interval = setInterval(() => {
                    this.setState((preState) => { return { seconds: preState.seconds - 1 } })
                }, 1000)


            } else {
                if (minutes > 0) {
                    this.setState((preState) => { return { minutes: preState.minutes - 1, seconds: 59 } })

                } else {
                    if (hours > 0) {
                        this.setState((preState) => { return { hours: preState.hours - 1, minutes: 59 } })

                    }
                }


            }

        }
    }

    handleStart = () => {
        let { minutes, seconds, hours } = this.state
        if (minutes === 0 && seconds === 0 && hours === 0) {
            this.setState({ isClick: true })
        } else {
            this.setState({ isClick: true, isStop: true })
        }
    }

    handleStop = () => {
        clearInterval(this.interval)
        this.setState({ isResume: true, isClick: false })
    }

    handleResume = () => {
        this.setState({ isClick: true, isResume: false })
    }

    handleReset = () => {
        this.setState({ hours: 0, minutes: 0, seconds: 0, isStop: false, isResume: false })
    }

    handleDec = (e) => {

        let { minutes, seconds, hours } = this.state

        switch (e.target.id) {

            case 'second':
                if (seconds > 0) {
                    this.setState((preState) => { return { seconds: preState.seconds - 1 } })
                }
                else {
                    if (minutes > 0) {
                        this.setState((preState) => { return { minutes: preState.minutes - 1, seconds: 59 } })
                    }
                }
                break;


            case 'minute':
                if (minutes > 0) {
                    this.setState((preState) => { return { minutes: preState.minutes - 1 } })
                } else {
                    if (hours > 0) {
                        this.setState((preState) => { return { hours: preState.hours - 1, minutes: 59 } })
                    }
                }
                break;

            case 'hour':
                if (hours > 0) {
                    this.setState((preState) => { return { hours: preState.hours - 1 } })
                }


        }
    }

    handleInc = (e) => {
        let { minutes, seconds } = this.state


        switch (e.target.id) {

            case 'second':
                if (seconds === 59) {
                    this.setState((preState) => { return { minutes: preState.minutes + 1, seconds: 0 } })
                }
                else {
                    this.setState((preState) => { return { seconds: preState.seconds + 1 } })
                }
                break;


            case 'minute':
                if (minutes === 59) {
                    this.setState((preState) => { return { hours: preState.hours + 1, seconds: 0, minutes: 0 } })
                } else {
                    this.setState((preState) => {
                        return { minutes: preState.minutes + 1 }
                    })
                }
                break;

            case 'hour':
                this.setState((preState) => {
                    return { hours: preState.hours + 1 }
                })

        }
    }


    render() {
        let { hours, minutes, seconds, isStop, isResume } = this.state
        let { handleClose } = this.props


        return (
            <>
                <div className='countDown'>
                    <h2 className='center'>Countdown</h2>

                    <div className='flex flex-column align-center'>
                        <div className='flex countDown-div'>
                            <p className='countDown--para'>Hours</p>
                            <p className='semi countDown--para'>:</p>
                            <p className='countDown--para'>Minutes</p>
                            <p className='semi countDown--para'>:</p>
                            <p className='countDown--para'>Seconds</p>
                        </div>

                        <ul className='flex justify-space width-30 '>
                            {/* hours */}
                            <CreateTimeUI name='hour' handleInc={this.handleInc} handleDec={this.handleDec} time={hours} />
                            <li className='flex justify-center align-center flex-column font-2'>:</li>


                            {/* minutes */}
                            <CreateTimeUI name='minute' handleInc={this.handleInc} handleDec={this.handleDec} time={minutes} />
                            <li className='flex justify-center align-center flex-column font-2'>:</li>


                            {/* seconds */}
                            <CreateTimeUI name='second' handleInc={this.handleInc} handleDec={this.handleDec} time={seconds} />
                        </ul>
                    </div>

                    <div className='flex justify-center'>
                        {isStop ?
                            isResume ?
                                <div className='flex justify-center gap'>
                                    <button onClick={this.handleResume} className='cursor countDown-btn'>Resume</button>
                                    <button onClick={this.handleReset} className='cursor countDown-btn'>Reset</button>
                                </div>
                                : <button onClick={this.handleStop} className='cursor countDown-btn'> Stop</button>
                            : <button onClick={this.handleStart} className='cursor countDown-btn'>Start</button>
                        }
                    </div>

                    <span id='countDown' onClick={handleClose} className='close-btn'>X</span>

                </div>

            </>
        )
    }
}

function CreateTimeUI({ name, handleInc, handleDec, time }) {
    return (
        <>
            <li className='flex flex-column align-center'>
                <i className="fa-solid fa-square-caret-up cursor" id={name} onClick={handleInc}></i>
                <p className='para'>{String(time).length === 1 ? `0${time}` : time}</p>
                <i className="fa-solid fa-square-caret-down cursor" id='second' onClick={handleDec}></i>
            </li>
        </>
    )
}

export default CountDown