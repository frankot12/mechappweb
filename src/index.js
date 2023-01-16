// datos de firebase conecta a firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7QHyYy2zZoILX5wqNwvPEw69531TdlV0",
  authDomain: "mechapp2-8f75e.firebaseapp.com",
  databaseURL: "https://mechapp2-8f75e-default-rtdb.firebaseio.com",
  projectId: "mechapp2-8f75e",
  storageBucket: "mechapp2-8f75e.appspot.com",
  messagingSenderId: "244192689698",
  appId: "1:244192689698:web:3cda47cb3a9eb90663947b",
  measurementId: "G-G6RBD840M4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  
  // funcion registro
  function register () {
    var provincia = document.getElementById('provincia');
   provincia.addEventListener('change',
   function(){
    var selectedOption =this.options[provincia.selectedIndex];
    console.log(selectedOption.value + ': ' + selectedOption.text);
  });
   ciudad =    document.getElementById('ciudad').value
    direccion = document.getElementById('direccion').value
    distancia = document.getElementById('distancia').value
    full_name = document.getElementById('full_name').value  
    email = document.getElementById('email').value
    password = document.getElementById('password').value
     
    
    

   
  
    // Validar input fields

    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password vacios!!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false || validate_field(provincia) == false || validate_field(ciudad) == false || validate_field(direccion) == false || validate_field(distancia) == false) {
      alert('Uno o mas campos estan vacios!!')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        provincia : "Chimborazo",
        ciudad : ciudad,
        direccion : direccion,
        distancia : distancia,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('Usuario Creado Exitosamente!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Correo o Contraseña Incorrectos!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('Usuario Logeado Exitosamente!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }