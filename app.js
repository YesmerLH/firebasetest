//login
var provider = new firebase.auth.GoogleAuthProvider();

$('#login').click(function(){
    firebase.auth()
        .signInWithPopup(provider)
        .then(function(result) {
             console.log(result.user);
             guardaDatos(result.user);
             $('#login').hide();
             $('root').append("<img src='"+result.user.photoURL+"' />")
    
            });

});

// esta funcion guarda automaticamente
function guardaDatos(user){
    var usuario = {
        uid:user.uid,
        nombre:user.displayName,
        email:user.email,
        foto:user.photoURL
    }
    firebase.database().ref("appwebyes/" + user.uid)
    .set(usuario)
}

//escribir en la base de datos
$('#guardar').click(function(){
    firebase.database().ref("appwebyes")
    .set({
        nombre:"YesS",
        edad:"15",
        sexo:"mucho"
    })
});

//aqui estoy leyendo de la base de datos
firebase.databse().ref("appwebyes")
.on("child_added", function(s){
    var user = s.val();
    $('root').append("<img width='100px'src='"+user.foto+"' />")
})