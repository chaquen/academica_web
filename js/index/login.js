agregarEventoLoad(iniciar_login);
function iniciar_login(){
		var existe=obtener_session_storage("ssGlobales");
		if(existe!=false){
			if(existe._usuario==false){
				existe=obtener_local_storage("ssGlobales");
			}
		}else{

				existe=obtener_local_storage("ssGlobales");
			
		}
			
		if(existe!=false && existe._cerrar_sesion==false){
			globales=existe;
			iniciar_panel(globales._usuario);		
		}else{
		
			agregarEvento("btnIngresar","click",function(){
				var datos = $("#formLogin").serializarFormulario();
				console.log(datos);
				registrarDato("login",datos,function(rs){
					validar_login(rs);			
				});
			});

			agregarEvento("txt_usuario","keypress",function(e){
				if(e.key=="Enter"){
					if(this.value!=""){
						var datos = $("#formLogin").serializarFormulario();
						console.log(datos);
						registrarDato("login",datos,function(rs){
							validar_login(rs);						
						});	
					}else{
						
						mostrarMensaje("Debes ingresar un usuario y contraseña");
						
					}
				}			
			});

			agregarEvento("txt_pass","keypress",function(e){
				if(e.key=="Enter"){
					if(this.value!=""){
						var datos = $("#formLogin").serializarFormulario();
						console.log(datos);
						registrarDato("login",datos,function(rs){
							validar_login(rs);					
						});	
					}else{
						
						mostrarMensaje("Debes ingresar un usuario y contraseña");
						
					}	
				}
				
			});

			agregarEvento("txt_pin","keypress",function(e){
				if(e.key=="Enter" && this.value.length==6){
					consultar_pin(this.value);
				}else{
					if(e.key=="Enter"){
						mostrarMensaje("Este codigo no es valido");	
					}
					
				}
			});
			agregarEvento("btn_pin","click",function(){
				if(document.getElementById("txt_pin").value.length==6){
					consultar_pin(document.getElementById("txt_pin").value);	
				}else{
					mostrarMensaje("Este codigo no es valido");
				}
			});

			agregarEvento("btnRecuperar","click",function(){
				var datos = $("#recuperaContra").serializarFormulario();
				console.log(datos);
				if(datos!=false){
					datos.url=location.origin;
					if(location.host=="localhost"){
						datos.url+="/academica_web/";
					}else{
						datos.url+="/";
					}
					registrarDato("recuperar_pass",datos,function(rs){
							if(rs.respuesta){
								//mostrarMensaje(rs);
								document.getElementById("correoRec").innerHTML=datos.email;
								$('#recuperaContra').fadeOut('fast');
		        				$('#mensajeRec').fadeIn('slow');
							}else{
								$('#recuperaContra').fadeOut('fast');

								document.getElementById("mensajeRec").innerHTML="";
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
					mostrarMensaje("Debes ingresar los campos requeridos");
				}							
			});
			agregarEvento("btnContinuarLogin","click",function(){
				if(globales._usuario!=false){
					 $('#mensajeRec, #mensajeBienvenida').fadeOut('fast');
						iniciar_panel(globales._usuario);						
				}
			});
			agregarEvento("chRecormarme","change",function(){
				if(this.checked){
					guardar();

				}
			});
		}	
}
/*Aqui creo mi local storage*/
function guardar(){
	
	agregar_local_storage("ssGlobales",globales);
}
/*CONSULTO EL PIN*/
function consultar_pin(pin){
	consultarDatos("consultar_pin/"+pin,{},function(rs){
		console.log(rs);
		if(rs.respuesta){
			 iniciar_panel(false,rs.curso,pin);
		}else{
			mostrarMensaje(rs);
		}
	});
}
/*PARA VOLVER AL FORMULARIO DE RECUPERAR CONTRASEÑA*/
function volver_recupera(){
	 $('#mensajeRec, #mensajeBienvenida').fadeOut('fast');
      $('#recuperaContra').fadeIn('slow');
}
/*FUNCION PARA VALIDAR*/
function validar_login(rs){
	if(rs.respuesta){
		
		document.getElementById("nombreLogin").innerHTML=rs.datos.nombre_usuario.toUpperCase()+" "+rs.datos.apellido_usuario.toUpperCase();

		$('#formLogin').fadeOut('fast');
        $('#mensajeBienvenida').fadeIn('slow');
		globales._usuario=rs.datos;
		globales._cerrar_sesion=false;


		
    }else{
    	globales._usuario=false;
    	$('#formLogin').fadeOut('fast');
        $('#mensajeErroIngreso').fadeIn('slow');
    }
}