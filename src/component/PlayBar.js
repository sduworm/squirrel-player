import React, {Component, Fragment} from 'react';
import {Button, Slider} from 'antd';

function isRealNum(val) {
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if (val === "" || val == null) {
        return false;
    }
    return !isNaN(val);
}

/**
 * 转化歌曲时间
 *
 * @param {string} time 需要转化的时间.
 * @returns {String} 返回格式化之后的时间字符串.
 */
const formatSongTime = (time) => {
    if (!isRealNum(time)) {
        return '00:00';
    }
    let minute = Math.floor(time / 60);
    let second = Math.floor(time - (minute * 60));
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }
    time = minute + ':' + second;
    return time;
};

class PlayBar extends Component {
    componentDidUpdate() {
        if (this.player.paused && this.props.isPlaying) {
            this.play()
        }
    }

    componentDidMount() {
        this.player.ontimeupdate = (e) => {
            if (e.target.duration && isRealNum(e.target.duration)) {
                this.props.updatePlayTime({
                    playTime: e.target.currentTime,
                    playTimeProcess: (e.target.currentTime * 100) / e.target.duration,
                    soundTime: e.target.duration,
                });
            }
        };
        this.player.onended = () => {
            switch (this.props.circulationMode) {
                case 'one':
                    this.player.load();
                    break;
                default:
                    this.props.changeSound('next');
                    break;
            }
        };
        this.player.onloadeddata = () => {
            this.player.currentTime = this.props.playTime;
        };
    }

    handleSliderChange = (percentValue) => {
        this.player.currentTime = (this.player.duration * percentValue) / 100;
    };

    // 播放
    play = () => {
        if (this.player) {
            this.player.play();
            return true
        }
        return false
    };

    // 暂停
    pause = () => {
        if (this.player) {
            this.player.pause();
            return true
        }
        return false
    };

    handlePlayPauseClick = () => {
        if (this.props.isPlaying) {
            if (this.pause()) {
                this.props.updatePlayState("pause")
            }
        } else {
            if (this.play()) {
                this.props.updatePlayState("play")
            }
        }
    };

    changeSoundPrevious = () => {
        this.props.changeSound('previous')
    };

    changeSoundNext = () => {
        this.props.changeSound('next')
    };

    render() {
        const {playTime, soundTime, playTimeProcess, soundURL, isPlaying, circulationMode, updateCirculationMode} = this.props;
        let circulationIcon = 'retweet';
        switch (circulationMode) {
            case 'one':
                circulationIcon = 'sync';
                break;
            case 'list':
                circulationIcon = 'bars';
                break;
            case 'random':
                circulationIcon = 'question';
                break;
            default:
                break;
        }

        return <Fragment>
            <div>
                <Slider tipFormatter={null}
                        value={playTimeProcess ? Number(playTimeProcess) : 0}
                        onChange={this.handleSliderChange}/>
                <div><em>{formatSongTime(playTime)}</em> / {formatSongTime(soundTime)}</div>
                <br/>
            </div>
            <div style={{textAlign: "center"}}>
                <Button icon="step-backward" type="primary" shape="circle" size="large"
                        onClick={this.changeSoundPrevious}/>
                <Button icon={isPlaying ? 'pause' : 'caret-right'} type="primary" shape="circle"
                        size="large"
                        style={{marginLeft: 20, marginRight: 20}} onClick={this.handlePlayPauseClick}/>
                <Button icon="step-forward" type="primary" shape="circle" size="large" style={{marginRight: 20}}
                        onClick={this.changeSoundNext}/>
                <Button icon={circulationIcon} type="primary" shape="circle" size="large"
                        onClick={updateCirculationMode}/>
            </div>
            <audio ref={(audio) => {
                this.player = audio;
            }} src={soundURL}>浏览器不支持
            </audio>
        </Fragment>;
    };
}

export default PlayBar;