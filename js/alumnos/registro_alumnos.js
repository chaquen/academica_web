var id_curso;
var pin;
agregarEventoLoad(function(){
	var params=recibirValorGet();	
	console.log(params);
	id_curso=params[0].split("=")[1];
	pin=params[1].split("=")[1];
	agregarEvento("btn_editar_perfil","click",function(){
		 var datos = $("#formUsuarioPerfil").serializarFormulario();
         if(datos!=false){
               if(datos.password[0]==datos.password[1]){
                    datos.password=datos.password[0];
                    if(datos.correo_usuario[0]==datos.correo_usuario[1]){
                           datos.curso=id_curso;
                           datos.correo_usuario=datos.correo_usuario[0];
                           datos.rol="1";
                           datos.pin=pin;
                           registrarDato("usuarios",datos,function(rs){
                                mostrarMensaje(rs);
                                if(rs.respuesta){
                                   globales._usuario=rs.datos;
                                   globales._cerrar_sesion=false;
                                   iniciar_panel(rs.datos);
                                   
                                }
                            });
                    }else{
                        mostrarMensaje("Los correos no corresponden");
                    }
                }else{
                    mostrarMensaje("Las contraseñas no corresponden");
                }     
         }else{
            mostrarMensaje("por favor ingresa los campos obligatorios");
         }
        
	});
});