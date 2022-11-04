const twit = require('twit')
var config = require('./config.js')
var http = require('http')

var {scrapeData} = require('./app.js')

const pretty = require('pretty')

var Twitter = new twit(config)

const getData = async () => {
  return await scrapeData();
}

async function tweet(type) {
  var x = await scrapeData();

  if(x){

    //console.log(x[10])
    //console.log(index)
    let text = '';
    //return false
    if(type == 1){
      text = ''
      text += 'UCI Teams in danger of obtaining the WT license in 2023: \n' 
      text += '⚠️ ' + x[19].Team + ' - Points: ' + x[19].Points + '\n'
      text += '⚠️ ' + x[20].Team + ' - Points: ' + x[20].Points + '\n'
      text += '📛' + x[21].Team + ' - Points: ' + x[21].Points + '\n'
      text += '📛' + x[22].Team + ' - Points: ' + x[22].Points + '\n'
      text += '#UCITeams #ranking #UCI #cycling #LaVuelta22 '
    }else{
      text = ''
      text += 'UCI teams ranking leaders: \n' 
      text += '🥇' + x[1].Team + ' - Points: ' + x[1].Points + '\n'
      text += '🥈' + x[2].Team + ' - Points: ' + x[2].Points + '\n'
      text += '🥉' + x[3].Team + ' - Points: ' + x[3].Points + '\n'
      text += '#UCITeams #ranking #UCI #cycling'
      //console.log(text)
    }
    
    //console.log(text)
    //return false
    Twitter.post('statuses/update', {
      status: text
    }, function(err, response) {
        if (response) {
            console.log('Retweeted!!!');
        }
        // if there was an error while tweeting
        if (err) {
            console.log('Something went wrong while RETWEETING... Duplication maybe...');
            console.log(err)
        }
    });
  }
  console.log(x[1])
  
}

//tweet(1);
//setInterval( function() { funca(10,3); }, 500 );

// 'tweet' a tweet in every 60 minutes
//setInterval(tweet, 3600000);
// setInterval( function() { tweet(1); }, 86400000 );
// setInterval( function() { tweet(2); }, 90000000 );

//tweet(2);
setInterval( function() { tweet(2); }, 60000 );
setInterval( function() { tweet(1); }, 30000 );


//http.createServer().listen(5000);

const PORT = process.env.PORT || 3000;
http.createServer().listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});