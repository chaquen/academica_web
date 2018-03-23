agregarEventoLoad(inicia_app);

function inicia_app(){
	
	

	var existe=obtener_session_storage("ssGlobales");
	if(existe._usuario==false){
		existe=obtener_local_storage("ssGlobales");
	}
	if(false!=existe && undefined!=existe._usuario){
	
		globales=existe;
		document.getElementById("h2NombreDelUsuario").innerHTML=globales._usuario.nombre_usuario;
		consulta_inicial();	
		
		
		iniciar_curso();
		iniciar_index_alumno();
		iniciar_crear_cursos();
		iniciar_editar_cursos();
		iniciar_agenda();
		iniciar_profesores();

		agregarEvento("menuSalir","click",function(){
			salir();
		});
	}else{

		//location.href="index.html";

		//$('#divMenuAdmin').fadeOut('fast');
    	//$('#divLogin').fadeIn('slow');

	}
	
	
}

function consulta_inicial(){
	consultarDatos("consulta_inicial/"+globales._usuario.id,{},function(rs){
		 
		  console.log(rs.datos.categorias);
		  
		  crear_select("selCatCurso",rs.datos.categorias,"id","nombre_categoria");
		  crear_select("selCatCursoEdi",rs.datos.categorias,"id","nombre_categoria");
		  crear_select("selCurso",rs.datos.cursos,"id","nombre_curso");
		  crear_select("selBuscarCursoEva",rs.datos.cursos,"id","nombre_curso");
		  
		  crear_select("selCursosConsultaAgenda",rs.datos.cursos,"id","nombre_curso");
     	  crear_select("selAgendaCurso",rs.datos.cursos,"id","nombre_curso");
     	  crear_select("selAgendaCursoEdi",rs.datos.cursos,"id","nombre_curso");
     	  crear_select("selCursosPines",rs.datos.cursos,"id","nombre_curso");
     	  crear_select("selBusCurPines",rs.datos.cursos,"id","nombre_curso");
     	  crear_select("selEliPinCur",rs.datos.cursos,"id","nombre_curso");
     	  crear_select("selCursoActivo",rs.datos.cursos,"id","nombre_curso");

     	  
     	  
	});
}


