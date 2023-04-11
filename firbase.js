const firebaseConfig = {
  apiKey: "AIzaSyCk-Ie6d5KzmhwWIV5xzTbuXsbpE6jjC0E",
  authDomain: "influence-of-business.firebaseapp.com",
  databaseURL: "https://influence-of-business-default-rtdb.firebaseio.com",
  projectId: "influence-of-business",
  storageBucket: "influence-of-business.appspot.com",
  messagingSenderId: "386045502023",
  appId: "1:386045502023:web:25f5708dbe6163f3998762",
  measurementId: "G-Z7Z7TSKQRX"
};

  firebase.initializeApp(firebaseConfig);
  
  function randomID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0;
      let v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  
  function generateFirebaseItem(ID, value) {
    return {
      userid: ID,
      data: value,
    };
  }
  
  function addElementInFirebase(REF, data) {
    firebase
      .database()
      .ref(REF + randomID())
      .set(data);
  }
  
  function getArrayFromFirebase(REF) {
    let tempArray = [];
    firebase
      .database()
      .ref(REF)
      .on("value", (response) => {
        response.forEach((element) => {
          tempArray.push(generateFirebaseItem(element.key, element.val()));
        });
      });
    return tempArray;
  }
  
  function removeRefFromFirebase(REF) {
    firebase.database().ref(`${REF}`).remove();
  }
  
  function removeElementFromFirebase(REF, id) {
    firebase.database().ref(`${REF}/${id}`).remove();
  }
  
  function getElementFromFirebaseByID(REF, id) {
    const tempArray = getArrayFromFirebase(REF);
    let temp = {};
    tempArray.forEach((element) => {
      if (element.userid === id) {
        temp = element;
      }
    });
    return temp;
  }
  
  function changeDataOnFirebaseByID(REF, ID, data) {
    firebase
      .database()
      .ref(REF + "/" + ID)
      .set(data);
  }