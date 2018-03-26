agregarEventoLoad(function(){
	var params=recibirValorGet();
	console.log(params);
	console.log(params[0].split("=")[1]);
	globales=obtener_session_storage("ssGlobales");
	if(globales._usuario==false){
		globales=obtener_local_storage("ssGlobales");
	}
	consultarDatos("ver_notas_actividades/"+params[0].split("=")[1],{},function(rs){

			dibujar_notas(rs.datos);
	});
	
});

function dibujar_notas(datos){
				document.getElementById("h1NombreEstudiante").innerHTML=globales._usuario.nombre_usuario+" "+globales._usuario.apellido_usuario;
				//document.getElementById("pTlDescCurso").innerHTML=rs.datos[0].descripcion_curso;
				var lista=document.getElementById("liCalificaciones");
				lista.innerHTML="";
				for(var d in datos){
					
					var li=document.createElement("li");
					var img=document.createElement("img");
					var h4=document.createElement("h4");
					h4.innerHTML=datos[d].nombre_actividad;
					var h5=document.createElement("h5");
					h5.innerHTML=datos[d].nota_evaluacion;
					li.appendChild(img);
					li.appendChild(h4);
					li.appendChild(h5);
					lista.appendChild(li);

						
				}
}
