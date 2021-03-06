var axios = require('axios');
var ApiCreds = require('./secret');
var id = ApiCreds.id;
var sec = ApiCreds.sec;
var params = "?client_id=" + id + "&client_secret=" + sec;


function getProfile (username) {
    return axios.get('https://api.github.com/users/' + username + params)
        .then(function (user){
            return user.data;
        });
}

function getRepos (username) {
    return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

function getStarCount(repos) {
    return repos.data.reduce(function (count, repo) {
        return count + repo.stargazers_count;
    }, 0);
}

function calculateScore(profile, repos){
    var followers = profile.followers;
    var totalStars = getStarCount(repos);

    var score = (followers * 3) + totalStars;
    return score;
    console.log(score);
}

function handleError (error) {
    console.warn(error);
    return null;
}

function getUserData (player) {
    return axios.all([
        getProfile(player), //returns user.data
        getRepos(player) // returns repos @ 100 per page

    ]).then(function(data){
        var profile = data[0];
        var repos = data[1];
        console.log(repos);

        return {
            profile: profile, //stores the response from the getProfile call
            score: calculateScore(profile, repos)
        }
    });
}

function sortPlayers (players){
    return players.sort(function (a,b){
        return b.score - a.score;
    })
}

module.exports = {
    battle: function(players){
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },
    fetchPopularRepos: function(language){
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

        return axios.get(encodedURI)
            .then(function(response){
                return response.data.items;
            });
    }
}
