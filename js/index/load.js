agregarEventoLoad(inicia_app);

function inicia_app(){
	
	var existe=obtener_session_storage("ssGlobales");
	
	if(!existe){

		existe=globales;

	}

	console.log(existe);
	if(false!=existe._usuario && undefined!=existe._usuario){
	
		globales=existe;
		document.getElementById("h2NombreDelUsuario").innerHTML=globales._usuario.nombre_usuario;
		consulta_inicial();	
		
		
		iniciar_curso();
		iniciar_index_alumno();
		iniciar_crear_cursos();
		iniciar_editar_cursos();
		iniciar_agenda();
		iniciar_profesores();

	}else{

		location.href="index.html";

		//$('#divMenuAdmin').fadeOut('fast');
    	//$('#divLogin').fadeIn('slow');

	}
	
	agregarEvento("menuSalir","click",function(){

		if(confirm("¿Desea salir de la aplicación?")){
			
			globales._usuario=false;
			globales._cerrar_sesion=true;
			
			agregar_session_storage("ssGlobales",globales);
			
			location.href="index.html";

        	
		}
		
	});
}

function consulta_inicial(){
	consultarDatos("consulta_inicial/"+globales._usuario.id,{},function(rs){
		 
		  console.log(rs.datos.categorias);
		  
		  crear_select("selCatCurso",rs.datos.categorias,"id","nombre_categoria");
		  crear_select("selCatCursoEdi",rs.datos.categorias,"id","nombre_categoria");
		  crear_select("selCurso",rs.datos.cursos,"id","nombre_curso");
		  
		  
     	  crear_select("selAgendaCurso",rs.datos.cursos,"id","nombre_curso");

	});
}


