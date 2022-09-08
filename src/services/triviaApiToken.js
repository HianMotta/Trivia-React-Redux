const API_URL = 'https://opentdb.com/api_token.php?command=request';

const triviaApiToken = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  // console.log(data, 'data');
  return data.token;
};

export default triviaApiToken;
