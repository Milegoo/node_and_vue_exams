import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3001;
const __dirname = path.resolve();
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

const bookBikeModule = function(){
  //optional
  let buildTimeOut = (bikeId)=>{
    return {
      state: 0, //0: off  1: on
      startTimeOut: function(){
        this.state = 1
        setTimeout(() => {
          bikePromises[bikeId - 1].lastResolve()
          this.state = 0
        }, 5000)
      }
    }
  }

  //optional
  let bikesTimeouts = [buildTimeOut(1), buildTimeOut(2), buildTimeOut(3), buildTimeOut(4), buildTimeOut(5)]
  const bikePromises = []

  const bookBike = (bikeId, slotId) => new Promise((resolve, reject) => {
    const index = bikeId - 1
    if(bikesTimeouts[index].state == 0 && (slotId != bikeId)) {
      //First to click
      bikesTimeouts[index].startTimeOut()
    }
    else {
      if(slotId != bikeId) {
        bikePromises[index].lastReject()
      }
      else {
        reject()
      }
    }

    //Save resolve and reject in both cases except if bikeId and slotId are the same
    if (slotId != bikeId) {
      bikePromises[index] = {lastReject: reject, lastResolve: resolve}
    }
    
  })
  //TODO
  return {
    bookBike: bookBike
  }

}() //function

app.get('/book', function(req, res) {
    
      //req.query.bikeId
      //req.query.slotId
      //res.write('booked');
      //res.write('rejected');
      //hint: promise.then((value)=>{}).catch((err)=>{}).finally(()=>res.end())
      bookBikeModule.bookBike(req.query.bikeId, req.query.slotId)
      .then(() => res.write('booked')) //podriem modificar la funcio i que tornes el valor i fer x => res.write(x)
      .catch(() => res.write('rejected'))
      .finally(()=> res.end())
      
   /*
        // hardcoded response for when bookBike function is not implemented
        const randomBoolean = Math.random() < 0.5;
        setTimeout(()=>{
          res.write(randomBoolean ? 'booked' : 'rejected');
          res.end();
        }, 1000)
        
    }*/
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
