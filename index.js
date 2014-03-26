var fs = require('fs')
  , FB = require('firebase')
  , root = new FB('https://amislimyet.firebaseio.com/')


var creds = JSON.parse(fs.readFileSync('auth.json'))
  , d = new Date()
  , key = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())

root.auth(creds.secret, function(error) {
  if (error) {
    console.log('Login failed!', error)
  } else {
    if (process.argv[2] === 'weight') {
      var weight = parseInt(process.argv[3], 10)
        , weight_graph = root.child('graphs').child('weight')
      weight_graph.child(key).set(weight)
      weight_graph.once('value', function(data) {
        console.log(data.val())
        process.exit()
      })
    } else if (process.argv[2] === 'soda') {
      var type = process.argv[3]
        , count = parseInt(process.argv[4], 10) || 1
        , soda_graph = root.child('graphs').child('soda')
      soda_graph.child(key).child(type).transaction(function(current_value) {
        if (current_value) {
          return parseInt(current_value, 10) + count
        } else {
          return count
        }
      }, function(error) {
        soda_graph.once('value', function(data) {
          console.log(data.val())
          process.exit()
        })
      })
    }
  }
})

function pad(num) {
  return num<=9 ? '0' + num : num
}