import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native';
//import Environment from '../common/Environment';

const FETCH_TIMEOUT = 60000;

export const getFunction = (urlStr) => {
  console.log("Url+++++++++", urlStr);

  const timeoutFunction = () => new Promise((resolve, reject) =>
    setTimeout(reject, FETCH_TIMEOUT, 'Timeout')
  )

  const fetchFunction = () => new Promise((resolve, reject) => {
    fetch(urlStr,
        {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
      .then(response => {
        // console.log("response = ",response);
        return resolve(response.json())
      })
      .catch(error => {
        console.log("Error++++++++==+", error);
        reject(error)
      });
  })

  return Promise.race([timeoutFunction(), fetchFunction()])
    .then(response => {
      console.log("Response+++++++++", response);
      if (response && response.error) {
        if (response.error === 'Invalid authentication token.') {
     
          console.log("Invalid authentication token");
        }
        return { success: false, error: response.error };
      } else if (response) {
        console.log("Response********");
        return { success: true, item: response };
      }
    })
    .catch(error => ({ success: false, error: error }));

}

export const getFunctionForServerLess = (urlStr, navigation) => {
  console.warn("Url+++++++++", urlStr);

  const timeoutFunction = () => new Promise((resolve, reject) =>
    setTimeout(reject, FETCH_TIMEOUT, 'Timeout')
  )

  const fetchFunction = () => new Promise((resolve, reject) => {
    fetch(urlStr, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.warn("response = ", response);
        return resolve(response.json())
      })
      .catch(error => {
        console.warn("Error++++++++==+", error);
        reject(error)
      });
  })

  return Promise.race([timeoutFunction(), fetchFunction()])
    .then(response => {
      console.log("Response+++++++++", response);
      if (response && response.error) {
        if (response.error === 'Invalid authentication token.') {
          AsyncStorage.setItem('loggedIn', 'false');
          AsyncStorage.clear();
          navigation.navigate('SignedOut');
        }
        return { success: false, error: response.error };
      } else if (response) {
        console.log("Response********");
        return { success: true, item: response };
      }
    })
    .catch(error => ({ success: false, error: error }));

}

export const postFunction = (urlStr, formData, methodType = 'POST') => {
  console.log("URL post+++++++++", urlStr, formData);
  const timeoutFunction = () => new Promise((resolve, reject) =>
    setTimeout(reject, FETCH_TIMEOUT, 'Timeout')
  )

  const fetchFunction = () => new Promise((resolve, reject) => {
    fetch(urlStr, {
      method: methodType,
      body: formData,
      headers: {
        "Content-Type": "application/json",
      }

    })
      .then(response => {
        console.log("response post +++++++++", response);
        resolve(response.json())
      })
      .catch(error => {
        console.log("Error post +++++++++", error);
        reject(error)
      });
  })

  return Promise.race([timeoutFunction(), fetchFunction()])
    .then(response => {

      if (response && response.error) {
        // if (response.error === 'Invalid authentication token.') {
        //   AsyncStorage.setItem('loggedIn', 'false');
        //   AsyncStorage.clear();
        //   navigation.navigate('SignedOut');
        // }
        console.log(response.error)
        return { success: false, error: response.error };
      } else if (response) {
        return { success: true, item: response };
      }
    })
    .catch(error => ({ success: false, error: error }));

}






export const getHTMLText = (urlStr, navigation) => {
  console.log('------------- getHTMLText----------', urlStr);
  const timeoutFunction = () => new Promise((resolve, reject) =>
    setTimeout(reject, FETCH_TIMEOUT, 'Timeout')
  )

  const fetchFunction = () => new Promise((resolve, reject) => {
    fetch(urlStr)
      .then(response => resolve(response.text()))
      .catch(error => reject(error));
  })

  return Promise.race([timeoutFunction(), fetchFunction()])
    .then(response => {
      if (response && response.error) {
        if (response.error === 'Invalid authentication token.') {
          AsyncStorage.setItem('loggedIn', 'false');
          AsyncStorage.clear();
          navigation.navigate('SignedOut');
        }
        return { success: false, error: response.error };
      } else if (response) {
        return { success: true, item: response };
      }
    })
    .catch(error => ({ success: false, error: error }));

}
