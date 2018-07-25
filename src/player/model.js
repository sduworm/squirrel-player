const model = {
    namespace: 'player',
    initial: {
        currentSoundIndex: 0,
        playTime: 0,
        soundTime: 0,
        playTimeProcess: 0,
        isPlaying: false,
        circulationMode: 'list',
        currentAlbumIndex: 0,
    },
    reducers: {
        savePlayingProgressStatusAndUpdateState(state, action) {
            const playingProgressStatus = action.payload;
            localStorage.setItem('playingProgressStatus', JSON.stringify(playingProgressStatus));
            return {
                ...state,
                ...playingProgressStatus,
            }
        },
        updateState(state, action) {
            return {
                ...state,
                ...action.payload,
            }
        }
    },
    async setup(dispatch) {
        dispatch({
            type: 'updateState',
            payload: JSON.parse(localStorage.getItem('playingProgressStatus')),
        })
    }
};

export default model;
