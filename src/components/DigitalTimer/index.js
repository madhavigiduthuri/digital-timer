// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    elapsedTime: 0,
    isTimerRunning: false,
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  onDecreaseTimerLimit = () => {
    const {timerLimit} = this.state
    this.setState({
      timerLimit: timerLimit > 1 ? timerLimit - 1 : 1,
    })
  }

  onIncreaseTimerLimit = () => {
    const {timerLimit} = this.state
    this.setState({
      timerLimit: timerLimit + 1,
    })
  }

  onResetTimer = () => {
    clearInterval(this.timerID)
    this.setState({
      timerLimit: 25,
      elapsedTime: 0,
      isTimerRunning: false,
    })
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimit, elapsedTime} = this.state
    const isTimerCompleted = elapsedTime === timerLimit * 60

    if (isTimerCompleted) {
      clearInterval(this.timerID)
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        elapsedTime: prevState.elapsedTime + 1,
        isTimerRunning: true,
      }))
    }
  }

  onStartTimer = () => {
    this.timerID = setInterval(this.incrementTimeElapsedInSeconds, 1000)
  }

  onPauseTimer = () => {
    clearInterval(this.timerID)
    this.setState({
      isTimerRunning: false,
    })
  }

  getTimer = () => {
    const {timerLimit, elapsedTime} = this.state
    // timerlimit ante enni minutes manaki timout avvali ani chepthadi
    // elapsedtime ante enni seconds start chesi ippatiki ayyayi ani chepthadi
    // ee renduti batti manaki inka entha tym undi ani choopinchali
    // eg., timelimit = 25, elapsedTime = 50, 
    //       remaining time choopinchalisindi = 24min 10sec
            //  timelimit in sec = 25 * 60 = 1500 sec
            //  elapsedTime = 50 sec
            //  remaining time in sec = 1500 - 50 = 1450 sec
            //  1450 sec lo enni min unnay
            //  time in min rem = Math.floor (1450 / 60 ) = 24
            //  time in sec rem = 1450 - (24*60) = 10 
            //  return  time in min rem :  time in sec rem
    // eg., timelimit = 10, elapsedTime = 130, 
    //       remaining time choopinchalisindi = 7 min 50 sec
    const timeLimitInSec = timerLimit * 60 // 25 * 60 = 1500
    const remTimeInSec = timeLimitInSec - elapsedTime // 1500 - 50 = 1450
    const timeInMinRem = Math.floor(remTimeInSec / 60) // 1450 / 60 = 24
    const timeInSecRem = remTimeInSec - (timeInMinRem * 60) // 1450 - (24* 60) = 10
    // if (timeInMinRem === 0 && timeInSecRem === 0) {
    //   this.onPauseTimer()
    // } 
    return `${timeInMinRem < 10 ? "0" : ""}${timeInMinRem}:${timeInSecRem < 10 ? "0" : ""}${timeInSecRem}` 
  }

  render() {
    const {timerLimit, isTimerRunning} = this.state
    // console.log(elapsedTime)

    return (
      <div className="digital-timer-app">
        <h1 className="digital-timer-title">Digital Timer</h1>
        <div className="digital-timer-app-container">
          <div className="digital-timer-app-left">
              <div className="digital-timer-image">
                <p className="timer">{this.getTimer()}</p>
                <p className="timer-status">{isTimerRunning ? 'Running' : 'Paused'}</p>
              </div>
          </div>
          <div className="digital-timer-app-right">
            <div className="digital-timer-top">
              <div className="digital-timer-app-start-pause">
                <button type="button" className="btn btn1" onClick={isTimerRunning ? this.onPauseTimer : this.onStartTimer} >
                  <img
                    src={isTimerRunning 
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isTimerRunning ? 'pause icon' : 'play icon'}
                    className="icon-image"
                  />
                 <h1 className="header">{isTimerRunning ? 'Pause' : 'Start'}</h1>
                </button>
              </div>
              <div className="digital-timer-app-reset">
                <button type="button" className="btn btn1" onClick={this.onResetTimer} >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon-image"
                  />
                  <h1 className="header"> Reset</h1>
                </button>
              </div>
            </div>
            <div className="digital-timer-bottom">
              <h1 className="digital-timer-header">Set Timer limit</h1>
              <div className="set-timer-block">
                <button type="button" className="btn" onClick={this.onDecreaseTimerLimit} >
                  -
                </button>
                <p className="count-box">{timerLimit}</p>
                <button type="button" className="btn" onClick={this.onIncreaseTimerLimit} >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
