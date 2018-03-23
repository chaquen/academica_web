agregarEventoLoad(iniciar_recuperar_clave);
function iniciar_recuperar_clave(){

		var val=recibirValorGet();	
		console.log(val);
		consultar_usuario(val[0].split("=")[1],val[1].split("=")[1]);


		agregarEvento("btnCambioClave","click",function(){
			var datos = $("#formCambioClave").serializarFormulario();
			console.log(datos);
			if(datos!=false){
				if(datos.clave[0]==datos.clave[1]){
					datos.clave=datos.clave[0];
					datos.id=val[0].split("=")[1];
					datos.pin_clave=val[1].split("=")[1];
					registrarDato("cambiar_pass_recuparada",datos,function(rs){
							if(rs.respuesta){
								
								
								$('#recuperaContra, #formCambioClave').fadeOut('fast');
		        				$('#mensajeRec').fadeIn('slow');

					              globales._usuario=rs.datos;
			    				  agregar_session_storage("ssGlobales",globales);


							}else{
								 globales._usuario=false;
								$('#recuperaContra').fadeOut('fast');

								//document.getElementById("mensajeRec").innerHTML="";
								document.getElementById("mensajeRec").innerHTML=rs.mensaje;
								var inpu=document.createElement("input");
								inpu.setAttribute("type","button");
								inpu.setAttribute("value","Aceptar");
								inpu.setAttribute("id","btnAceptarRec");
								inpu.setAttribute("class","btnAceptar");
								inpu.setAttribute("onclick","volver_recupera()");
								var br=document.createElement("br");
								document.getElementById("mensajeRec").appendChild(br);
								document.getElementById("mensajeRec").appendChild(inpu);

								$('#mensajeRec').fadeIn('slow');
							}
							
							
					});	
				}else{
					mostrarMensaje("Contraseñas no coinciden")
				}
				
				
			}else{
				mostrarMensaje("Debes ingresar los campos requeridos");
			}
						
		});

		agregarEvento("btnLoginRecuperado","click",function(){
			if(globales._usuario!=false){
				globales._cerrar_sesion=false;
				iniciar_panel(globales._usuario);
		    	//inicia_app();		
			}else{
				mostrarMensaje("Por favor inicia sesion nuevamente");
			}
			
		});
}

function consultar_usuario(id,pin){

	consultarDatos("validar_cambio_pass/"+id+"/"+pin,{},function(rs){
		if(rs.respuesta){
			document.getElementById("msnUsuario").innerHTML=rs.datos.nombre_usuario.toUpperCase().trim()+", por favor ingresa tu nueva clave"	
		}else{
			mostrarMensaje("Lo sentimos pero esta no es una direccion valida para recuparar tu contraseña");
			location.href="/";
		}
	});
}
