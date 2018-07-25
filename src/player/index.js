import React from 'react';
import kos from 'kos-core';
import model from './model';
import Player from '../component/Player'
import albumList from '../albumList'

const PlayerContainer = ({dispatch, ...props}) => {
    const playerProps = {
        ...props,
        albumList,
        updateState(obj) {
            dispatch({
                type: 'updateState',
                payload: obj,
            });
        },
        savePlayingProgress(obj) {
            dispatch({
                type: 'savePlayingProgressStatusAndUpdateState',
                payload: obj,
            });
        },
    };
    return <Player {...playerProps} />
};

export default kos.Wrapper({model})(PlayerContainer)
