function iniciar_curso(){
	//BUSCAR CURSOS
	agregarEvento("txtBuscarCurso","keypress",function(){
		if(this.value!=""){
			consultarDatos("cursos/nombre_curso&LIKE&"+this.value,{},function(rs){
				console.log(rs);
				if(rs.respuesta){
					crear_data_list("dtCursos",rs.datos,"id","nombre_curso");
				}
				
			});
		}
		
	});
	//BUSCAR CURSOS
	agregarEvento("txtBuscarCurso","change",function(){
		consultarDatos("cursos/nombre_curso&LIKE&"+this.value,{},function(rs){
			console.log(rs);
			if(rs.respuesta){
					dibujar_cursos_consultados(rs.datos);
			}
		});
	});
	//BUSCAR CURSOS
	agregarEvento("btnBuscarCurso","click",function(){
		if(document.getElementById("txtBuscarCurso").value!="" || document.getElementById("txtBuscarCurso").value!=" "){
			consultarDatos("cursos/nombre_curso&LIKE&"+document.getElementById("txtBuscarCurso").value,{},function(rs){
				console.log(rs);
				if(rs.respuesta){
					dibujar_cursos_consultados(rs.datos);
				}
			});	
		}else{
			mostrarMensaje("Por favor ingresa datos para buscar");
		}
		
	});
	

}

function dibujar_cursos_consultados(cursos){
	$('#crearCurso, #formBuscarCurso').fadeOut('fast');
    $('#resultadoCur, #tblCursos').fadeIn('slow');
	var tblCursos=document.getElementById("tblCursos");
	tblCursos.innerHTML="";
		var tr=document.createElement("tr");

		var td=document.createElement("td");
		td.innerHTML="CODIGO CURSO";
		tr.appendChild(td);
		var td=document.createElement("td");
		td.innerHTML="NOMBRE DEL CURSO";
		tr.appendChild(td);
		var td=document.createElement("td");
		td.innerHTML="ESTADO";
		tr.appendChild(td);
		var td=document.createElement("td");
		td.innerHTML="EDITAR";
		tr.appendChild(td);
		var td=document.createElement("td");
		td.innerHTML="CAMBIAR ESTADO";
		tr.appendChild(td);
		var td=document.createElement("td");
		td.innerHTML="ELIMINAR";
		tr.appendChild(td);
		tblCursos.appendChild(tr);
	for(var c in cursos){
		console.log(cursos[c]);
		var tr=document.createElement("tr");

		var td=document.createElement("td");
		td.innerHTML=cursos[c].id;
		tr.appendChild(td);
		var td=document.createElement("td");
		td.innerHTML=cursos[c].nombre_curso;
		tr.appendChild(td);
		var td=document.createElement("td");
		td.innerHTML=cursos[c].estado_curso;
		tr.appendChild(td);

		var td=document.createElement("td");
		var inp=document.createElement("input");
		inp.setAttribute("type","button");
		inp.setAttribute("value","EDITAR");
		inp.setAttribute("onclick","mostrar_editar_curso("+cursos[c].id+")");
		td.appendChild(inp);
		tr.appendChild(td);
		var td=document.createElement("td");
		var inp=document.createElement("input");
		inp.setAttribute("type","button");
		inp.setAttribute("value","CAMBIAR ESTADO");
		inp.setAttribute("onclick","cambiar_estado("+cursos[c].id+")");
		td.appendChild(inp);
		tr.appendChild(td);
		var td=document.createElement("td");
		var inp=document.createElement("input");
		inp.setAttribute("type","button");
		inp.setAttribute("value","ELIMINAR");
		inp.setAttribute("onclick","eliminar_curso("+cursos[c].id+")");
		td.appendChild(inp);
		tr.appendChild(td);
		tblCursos.appendChild(tr);


	}
}



function cambiar_estado(id){
	if(confirm("¿Desea cambiar el estado este curso?")){

	}
}
function eliminar_curso(id){
	if(confirm("¿Desea eliminar este curso?")){

	}
}