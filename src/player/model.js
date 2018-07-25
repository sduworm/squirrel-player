const model = {
    namespace:'player',
    initial: {
        currentSoundIndex: 0,
        playTime:0,
        soundTime: 0,
        playTimeProcess:0,
        isPlaying: false,
        circulationMode:'list',

    },
    reducers: {
        savePlayingProgressStatusAndUpdateState(state, action){
            const playingProgressStatus = action.payload;
            localStorage.setItem('playingProgressStatus',JSON.stringify(playingProgressStatus));
            return {
                ...state,
                ...playingProgressStatus,
            }
        },
        updateState(state, action){
            return {
                ...state,
                ...action.payload,
            }
        }
    },
    async setup(dispatch, getState, action) {
        dispatch({
            type:'updateState',
            payload:JSON.parse(localStorage.getItem('playingProgressStatus')),
        })
    }
};

export default model;
