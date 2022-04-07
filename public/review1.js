const firebaseConfig = {
    apiKey: "AIzaSyCncj54pJbgodv7hKBH6b1OJarF9GzQD7U",
    authDomain: "reviewnew-907a7.firebaseapp.com",
    projectId: "reviewnew-907a7",
    databaseURL:  "https://reviewnew-907a7-default-rtdb.firebaseio.com/",
    storageBucket: "reviewnew-907a7.appspot.com",
    messagingSenderId: "174386317320",
    appId: "1:174386317320:web:5a2f921945ac84db1569bd"
  };

  firebase.initializeApp(firebaseConfig);

  var contactFormDB = firebase.database().ref("reviewnew");
  document.getElementById('cnctform').addEventListener('submit', submitForm);

  function submitForm(e){
    e.preventDefault();
  
    var name = getElementVal("name");
    var email = getElementVal("mail");
    var msg = getElementVal("review");
     
    saveMessage(name,email,msg);
    var success = document.getElementById('success');
    success.style.display = "block";
    document.getElementById('cnctform').reset();
    setTimeout(() => {
      success.style.display = "none";
    },7000 );
    
  
    }
    const saveMessage = (name,email,msg ) => {

        var newContactForm = contactFormDB.push();
        
        newContactForm.set({
            name : name,
            emailid : email,
            review : msg,
        
        })
        }

    const getElementVal = (id) => {
        return document.getElementById(id).value;
        
          };
  