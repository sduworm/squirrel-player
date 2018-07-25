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
        addStepCount(state, action) {
            const { count } = state;
            const { step } = action.payload;
            // count += 10;
            return {
                ...state,
                count: count + step
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
            type: 'setState',
            payload: {
                count: 10
            }
        });
    }
};

export default model;
