var http        = require('http'),
    request     = require('request'),
    querystring = require('querystring'),
    weather     = require('weather');


function createServer(port) {
  http.createServer(function (req, res) {
    var body = "";

    req.on('data', function (chunk) {
      body += chunk;
    })

    req.on('end', function () {
      res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
      res.end('OK!');

      var formData = JSON.parse(body);
      processCommand(formData)
    });

  }).listen(port)
}

function start() {
  createServer(8101)
}

start()

function processCommand(command) {
  console.log(command)
  
  weather({logging: true, appid:'Q2_Ky4zV34FoqoNxkluqSyzvnSWiyyZhc3v5EVRdqXdutumqGZbWdm_qcxFfcNnLmA--', location: 'Esher'}, function(data) {
    console.log(data);

      if (command.category == "weather") {
        var summary = "The weather is currently " + querystring.escape(data.text.toLowerCase())
        request.get("http://localhost:4000?say=" + summary)
      }

      if (command.category == "temperature") {
        var temperature = "The temperature is currently " + querystring.escape(data.temp) + " degrees C"    
        request.get("http://localhost:4000?say=" + temperature)
      }

  });
}
