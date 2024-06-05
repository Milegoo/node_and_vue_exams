
//== Backend =================================================================

// Airlines

const AirEuropa = {
  getFlights: function() {
    return new Promise(function(resolve, reject) {
      resolve([
        { from: 'Barcelona', to: 'Paris', price: 100 },
        { from: 'Berlin', to: 'Rome', price: 200 },
      ])
    });
  }
}

const Delta = {
  getFlights: function() {
    return new Promise(function(resolve, reject) {
      setTimeout(() =>
        resolve([
          { from: 'New York', to: 'Barcelona', price: 700 },
        ])
      , 30);
    });
  }
}

let ryanairWillTimeout = false;

const Ryanair = {       // this airline sometimes timeouts
  getFlights: function() {
    return new Promise(function(resolve, reject) {
      if (! ryanairWillTimeout) {
        resolve([
          { from: 'Budapest', to: 'Berlin', price: 55 },
        ])
      }
      ryanairWillTimeout = ! ryanairWillTimeout;
    });
  }
}

const Vueling = {
  getFlights: function() {
    return new Promise(function(resolve, reject) {
      resolve([
        { from: 'London', to: 'Luxemburg', price: 150 },
        { from: 'New York', to: 'Barcelona', price: 300 },
      ])
    });
  }
}

// TODO

const flightsServer = {
  getFilteredFlights: function(min, max) {
    return new Promise((resolve, reject) => {

      let flightsReturned = []
      let flightsCounter = 0
      let finishedAirEuropa = false
      let finishedDelta = false
      let finishedRyanair = false
      let finishedVueling = false

      setTimeout(() => {
        resolve(flightsReturned)
      }, 500)

      AirEuropa.getFlights()
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          if ((res[i].price >= min) && (res[i].price <= max)) {
            flightsReturned[flightsCounter] = res[i]
            flightsCounter++
            finishedAirEuropa = true
          }
        }
      })
      .catch(console.log)
      .finally(() => {
        if (finishedAirEuropa && finishedDelta && finishedRyanair && finishedVueling) {
          resolve(flightsReturned)
        }
      })

      Delta.getFlights()
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          if ((res[i].price >= min) && (res[i].price <= max)) {
            flightsReturned[flightsCounter] = res[i]
            flightsCounter++
            finishedDelta = true
          }
        }
      })
      .catch(console.log)
      .finally(() => {
        if (finishedAirEuropa && finishedDelta && finishedRyanair && finishedVueling) {
          resolve(flightsReturned)
        }
      })

      Ryanair.getFlights()
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          if ((res[i].price >= min) && (res[i].price <= max)) {
            flightsReturned[flightsCounter] = res[i]
            flightsCounter++
            finishedRyanair = true
          }
        }
      })
      .catch(console.log)
      .finally(() => {
        if (finishedAirEuropa && finishedDelta && finishedRyanair && finishedVueling) {
          resolve(flightsReturned)
        }
      })

      Vueling.getFlights()
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          if ((res[i].price >= min) && (res[i].price <= max)) {
            flightsReturned[flightsCounter] = res[i]
            flightsCounter++
            finishedVueling = true
          }
        }
      })
      .catch(console.log)
      .finally(() => {
        if (finishedAirEuropa && finishedDelta && finishedRyanair && finishedVueling) {
          resolve(flightsReturned)
        }
      })

    })

  }
  
}

/*
TESTS
let p = flightsServer.getFilteredFlights(50, 60)
let p1 = flightsServer.getFilteredFlights(50, 60)
setTimeout(() => {
  console.log(p);
  console.log(p1);
}, 1000)
*/


//== Web Server ==============================================================

import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3001;
const __dirname = path.resolve();
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))


app.get('/flights/:min?/:max?', (req, res) => {
  //if (typeof flightsServer != "undefined") {
    flightsServer.getFilteredFlights(req.params.min, req.params.max)
    .then(data => res.json(data))
    .catch(error => res.status(500).json({error}));
  /*} else {
    // hardcoded response for when flightsServer is not implemented
    res.json(
    [{"from":"Barcelona","to":"Paris","price":100},
    {"from":"Berlin","to":"Rome","price":200},
    {"from":"Budapest","to":"Berlin","price":55},
    {"from":"London","to":"Luxemburg","price":150},
    {"from":"New York","to":"Barcelona","price":300}]);
  }*/
});

app.listen(port, () => console.log(`Server listening on port ${port}!`))
