// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
    apiKey: "AIzaSyCoe6PqP_dr6WS_Yw299AMDBCUpV64Zfpo",
    authDomain: "l9-website.firebaseapp.com",
    databaseURL: "https://l9-website.firebaseio.com",
    projectId: "l9-website",
    storageBucket: "l9-website.appspot.com",
    messagingSenderId: "724130384587",
    appId: "1:724130384587:web:8fae8411091ac257"
  };


  firebase.initializeApp(config);
  
  
  var db = firebase.firestore();
  // Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    var first_name = getInputVal('first_name');
    var last_name = getInputVal('last_name');
    var email = getInputVal('email');
    var mobile_number = getInputVal('mobile_number');
    var whitepaper = getInputVal('whitepaper_title');
  
    // Save message to firebase
    db.collection("whitepapers").add({
      first_name: first_name,
      last_name:last_name,
      email:email,
      mobile_number:mobile_number,
      whitepaper:whitepaper
    })
    .then(function(docRef) {
      // document.getElementById("hideDiv").style.display = "block";
      window.open("img/whitepapers/"+whitepaper+".pdf");
      $(function() {
        setTimeout(function() { $("#hideDiv").fadeOut(1500); }, 5000)
        
        })
      $('#addBookDialog').modal('hide');
      // Clear form
      document.getElementById('contactForm').reset();
      // console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      alert("Please Enter Your Details Again!!!")
    });
  

  }


  
  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  //Model 
  $(document).on("click", ".open-AddBookDialog", function (e) {

	e.preventDefault();

	var _self = $(this);

	var whitepaper_title = _self.data('id');
	$("#whitepaper_title").val(whitepaper_title);

	$(_self.attr('href')).modal('show');
});

function closemodal(){
    document.getElementById('contactForm').reset();
    $('#addBookDialog').modal('hide');
}

function isNumberKey(txt, evt) {

    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46) {
        if (txt.value.indexOf('.') === -1) {
            return true;
        } else {
            return false;
        }
    } else {
        if (charCode > 31
             && (charCode < 48 || charCode > 57))
            return false;
    }
    return true;
}
