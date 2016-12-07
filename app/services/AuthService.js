import {Buffer} from 'buffer';
import {AsyncStorage, AlertIOS} from 'react-native';
import {_} from 'lodash';

const authKey = 'auth';
const userKey = 'user';

class AuthService {

  getAuthInfo(cb){

    AsyncStorage.multiGet([authKey,userKey], (err,stores)=> {
      if(err){
        return cb(err);
      }

      if(!stores){
        return cb();
      }

      let storedKey = '';
      let storedUser = '';

      stores.map((result, i, store) => {
        let key = store[i][0];
        let value = store[i][1];

        if(key == authKey){
          storedKey = value;
        }

        if(key == userKey){
          storedUser = value;
        }
       });

       if(!storedKey){
         return cb();
       }

       var authInfo = {
         header: {
           Authorization: 'Basic ' + storedKey
         },
         user: JSON.parse(storedUser)
       }

       return cb(null, authInfo);
    });
  }

  async _userLogout() {
    try {
      await AsyncStorage.multiRemove([authKey,userKey], (err) => {
        AlertIOS.alert("Logout Success!");
      });
    } catch (error) {
      throw error;
    }
  }

  login(creds,cb){
    var b = new Buffer(creds.username +
      ':' + creds.password);
    var encodedAuth = b.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': 'Basic ' + encodedAuth
      }
    })

    .then((response)=> {
      if (response.status >= 200 && response.status < 300){
        return response;
      }
      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })

    .then((response)=> {
      return response.json();
    })

    .then((results)=> {
      AsyncStorage.multiSet([
        [authKey, encodedAuth],
        [userKey, JSON.stringify(results)]
      ], (err)=> {
        if(err){
          throw err;
        }
        return cb({success: true});
      })
    })

    .catch((err)=> {
      return cb(err);
    })

    .finally(()=> {
      return cb({showProgress: false});
    })
  }
}


module.exports = new AuthService();
