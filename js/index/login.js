agregarEventoLoad(iniciar_login);
function iniciar_login(){

		agregarEvento("btnIngresar","click",function(){
			var datos = $("#formLogin").serializarFormulario();
			console.log(datos);
			registrarDato("login",datos,function(rs){

				mostrarMensaje(rs);
				if(rs.respuesta){
		             	
		              iniciar_panel(rs.datos);
		              globales._usuario=rs.datos;
    				  //document.getElementById('status').innerHTML ='Gracias por registrate, ' + globales._usuario.nombre_alumno + '! ';
    				  agregar_session_storage("ssGlobales",globales);
		              inicia_app();	

		         }
			});
		});

		agregarEvento("txt_usuario","keypress",function(e){
			if(e.key=="Enter"){
				if(this.value!=""){
					var datos = $("#formLogin").serializarFormulario();
					console.log(datos);
					registrarDato("login",datos,function(rs){

						mostrarMensaje(rs);
						if(rs.respuesta){
				             	
				              iniciar_panel(rs.datos);
				              globales._usuario=rs.datos;
		    				  //document.getElementById('status').innerHTML ='Gracias por registrate, ' + globales._usuario.nombre_alumno + '! ';
		    				  agregar_session_storage("ssGlobales",globales);
				              inicia_app();	

				         }
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

						mostrarMensaje(rs);
						if(rs.respuesta){
				             	
				              iniciar_panel(rs.datos);
				              globales._usuario=rs.datos;
		    				  //document.getElementById('status').innerHTML ='Gracias por registrate, ' + globales._usuario.nombre_alumno + '! ';
		    				  agregar_session_storage("ssGlobales",globales);
				              inicia_app();	

				         }
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
}

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