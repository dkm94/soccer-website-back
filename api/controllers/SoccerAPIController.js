const axios = require('axios');

const baseURL = 'https://api.football-data.org//v4';
const headers = { 
    'X-Unfold-Lineups': 'true', 
    'X-Unfold-Goals': 'true', 
    'X-Auth-Token': '9a56582ee8c04485a073a7ae417482f8'
  }

exports.getMatchesOfTheDay = async (req, res) => {
    try {
        const config = {
            method: 'get',
            url: `${baseURL}/matches/`,
            headers
          };
        const { data } = await axios(config);
        if (!data) {
            res.sendStatus(404);
            return;
          }
        res.status(200).send(data);
    } catch (error) {
        const { response } = error;
        if(response.data){
            res.status(response.data.errorCode).send(response.data.message);
        }
        return;
    }    
}

exports.getCompetitions = async (req, res) => {
    try {
        const config = {
            method: 'get',
            url: `${baseURL}/competitions`,
            headers
          };
        const { data } = await axios(config);
        if (!data) {
            res.sendStatus(404);
            return;
          }
        res.status(200).send(data);
    } catch (error) {
        const { response } = error;
        if(response.data){
            res.status(response.data.errorCode).send(response.data.message);
        }
        return;
    }
}

exports.getScoreBoard = async (req, res) => {
    try {
        const { code } = req.params;

        const config = {
            method: 'get',
            url: `${baseURL}/competitions/${code}/matches`,
            headers
          };

        const { data } = await axios(config);
        if (!data) {
            res.sendStatus(404);
            return;
          }
        res.status(200).send(data);
    } catch (error) {
        const { response } = error;
        if(response.data){
            res.status(response.data.errorCode).send(response.data.message);
            return;
        }
    }
}

exports.getHistoryMatches = async (req, res) => {
    try {
        const { dateFrom, dateTo } = req.params;
        const config = {
            method: 'get',
            url: `${baseURL}/matches`,
            headers,
            params: {
                dateFrom,
                dateTo
            },
        };

        const { data } = await axios(config);
        res.status(200).send(data);
    } catch (error) {
        const { response } = error;
        if(response.data){
            res.status(response.data.errorCode).send(response.data.message);
            return;
        }
    }
}