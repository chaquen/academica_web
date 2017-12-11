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
}