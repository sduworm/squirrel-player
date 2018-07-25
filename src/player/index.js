import React from 'react';
import kos from 'kos-core';
import model from './model';
import Player from '../component/Player'

const PlayerContainer = ({dispatch, ...props}) => {
    const playerProps = {
        ...props,
        updateState(obj) {
            dispatch({
                type: 'updateState',
                payload: obj,
            });
        }
    };
    return <Player {...playerProps} />
};

export default kos.Wrapper({model})(PlayerContainer)
