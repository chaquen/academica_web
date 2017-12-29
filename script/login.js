$(document).ready(function(){
    //Aparecer el formulario de recuparacion de contraseña
    $('#olvidoContra').click(function(){
        $('#formLogin').fadeOut('fast');
        $('#recuperaContra').fadeIn('slow');
    });
    
    //Aparece el mensaje que confirma la recuperacion en el correo
    $('#btnRecuperar').click(function(){
        $('#recuperaContra').fadeOut('fast');
        $('#mensajeRec').fadeIn('slow');
    });
    
    //Aparece el formulario de Login
    $('#btnCancelaRec, .btnAceptar').click(function(){
        $('#recuperaContra, #mensajeRec, #mensajeBienvenida').fadeOut('fast');
        $('#formLogin').fadeIn('slow');
    });
    
    //Aparece el mensaje de ingreso
    $('#btnIngresar').click(function(){
        $('#formLogin').fadeOut('fast');
        $('#mensajeBienvenida').fadeIn('slow');
    });
    
        
    
});


