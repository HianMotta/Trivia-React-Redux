import triviaApiToken from '../../services/triviaApiToken';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_INFOS = 'INFOS';
export const INCREASE_SCORE = 'INCREASE_SCORE';
export const INCREASE_POINTS = 'INCREASE_POINTS';
export const RESET_PLAYER_INFO = 'RESET_PLAYER_INFO';

export const getInfos = (name, gravatarEmail) => ({
  type: GET_INFOS,
  payload: {
    name,
    gravatarEmail,
  },
});

const getTokenSuccess = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  const data = await triviaApiToken();
  try {
    dispatch(getTokenSuccess(data));
  } catch (e) {
    console.log(e);
  }
};

export const increasePoints = (payload) => ({
  type: INCREASE_POINTS,
  payload,
});

export const resetPlayerInfo = () => ({
  type: RESET_PLAYER_INFO,
});
