import React, {Component} from 'react';
import {List, Card, Avatar, Icon} from 'antd';
import soundList from '../player/soundList'
import config from '../config'
import PlayBar from "./PlayBar";

class Player extends Component {
    chooseSound(index) {
        return () => this.props.updateState({currentSoundIndex: index, isPlaying: true});
    }

    render() {
        const {
            updateState,
            playTime,
            soundTime,
            playTimeProcess,
            isPlaying,
            circulationMode,
            currentSoundIndex,
        } = this.props;

        const playbarProps = {
            playTime,
            soundTime,
            playTimeProcess,
            isPlaying,
            circulationMode,
            soundURL: soundList[currentSoundIndex].url,
            updatePlayState(playingState) {
                updateState({isPlaying: playingState === 'play'})
            },
            updateCirculationMode() {
                const modeArray = ['one', 'list', 'random'];
                const currentModeIndex = modeArray.indexOf(circulationMode);
                const nextIndex = currentModeIndex + 1 >= modeArray.length ? 0 : currentModeIndex + 1;
                updateState({circulationMode: modeArray[nextIndex]})
            },
            changeSound(commad) {
                let randomIndex = Math.floor(Math.random() * soundList.length);
                if (currentSoundIndex === randomIndex) {
                    randomIndex++;
                }
                let index = currentSoundIndex;
                switch (commad) {
                    case 'previous':
                        index = currentSoundIndex === 0 ? soundList.length - 1 : currentSoundIndex - 1;
                        break;
                    case 'next':
                        index = currentSoundIndex === soundList.length - 1 ? 0 : currentSoundIndex + 1;
                        break;
                    default:
                        break;
                }
                index = circulationMode === 'random' ? randomIndex : index;
                updateState({currentSoundIndex: index})
            },
            updatePlayTime(playTimeObj) {
                updateState(playTimeObj)
            },
        };

        return <Card><List bordered header={<PlayBar {...playbarProps}/>}
                           footer={<div>{`共${soundList.length}条`}</div>}
                           dataSource={soundList.map(list => list.name)}
                           renderItem={(item, index) => <List.Item>
                               <List.Item.Meta
                                   avatar={<a onClick={this.chooseSound(index)}><Avatar
                                       src={index === currentSoundIndex && isPlaying ? config.CURRENT_PLAYING_SOUND_ICON : config.SOUND_ICON}/></a>}
                                   description={<span onClick={this.chooseSound(index)}>{index === currentSoundIndex ?
                                       <strong><Icon type="play-circle"/> {item}</strong> : item}</span>}
                               />
                           </List.Item>}
        /></Card>
    }
}

Player.propTypes = {};

export default Player;
