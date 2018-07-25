import React, {Component} from 'react';
import {List, Card, Avatar, Icon} from 'antd';
import config from '../config'
import Header from "./Header";
import PlayBar from "./PlayBar";

class Player extends Component {
    chooseSound(index) {
        return () => this.props.updateState({currentSoundIndex: index, isPlaying: true, playTime: 0});
    }

    render() {
        const {
            updateState,
            savePlayingProgress,
            playTime,
            soundTime,
            playTimeProcess,
            isPlaying,
            circulationMode,
            currentSoundIndex,
            currentAlbumIndex,
            albumList,
        } = this.props;

        const soundList = albumList[currentAlbumIndex].list;

        const playBarProps = {
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
                updateState({currentSoundIndex: index, playTime: 0})
            },
            updatePlayTime(playTimeObj) {
                savePlayingProgress({currentAlbumIndex, currentSoundIndex, ...playTimeObj})
            },
        };

        const headerProps = {
            currentAlbumIndex,
            albumList,
            changeAlbum(albumIndex) {
                savePlayingProgress({
                    currentSoundIndex: 0,
                    currentAlbumIndex: albumIndex,
                    playTime: 0,
                    playTimeProcess: 0,
                    isPlaying: false,
                })
            }
        };

        return <Card title={<Header {...headerProps}/>}>
            <List bordered header={<PlayBar {...playBarProps}/>}
                  footer={<div>{`共${soundList.length}条`}</div>}
                  dataSource={soundList.map(list => list.name)}
                  renderItem={(item, index) => <List.Item>
                      <List.Item.Meta
                          avatar={<a
                              onClick={this.chooseSound(index)}><Avatar
                              src={index === currentSoundIndex && isPlaying ? config.CURRENT_PLAYING_SOUND_ICON : config.SOUND_ICON}/></a>}
                          description={<span
                              onClick={this.chooseSound(index)}>{index === currentSoundIndex ?
                              <strong><Icon type="play-circle"/> {item}
                              </strong> : item}</span>}
                      />
                  </List.Item>}
            /></Card>
    }
}

Player.propTypes = {};

export default Player;
