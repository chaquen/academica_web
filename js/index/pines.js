var accion_pin;
agregarEventoLoad(function(){
	agregarEvento("btnCrearPines","click",function(){
		var datos = $("#formCrearPines").serializarFormulario();
		consultarDatos("crear_pines/"+datos.curso+"/"+datos.numero_pines,{},function(rs){
			console.log(rs);
			dibujar_tabla_pines(rs.datos);
		});
	});

	agregarEvento("btnBuscarPin","click",function(){
		var datos = $("#formBuscaPin").serializarFormulario();
		if(datos!=false){
			consultarDatos("consultar_pin_admin/"+datos.curso+"/"+datos.pin,{},function(rs){
				console.log(rs);
				accion_pin="consultar";
				dibujar_tabla_pines(rs.datos);

			});
		}
		
	});

	agregarEvento("btnRliminarPin","click",function(){
		var datos = $("#formEliPins").serializarFormulario();
		if(datos!=false){
			if(datos.pin!=""){
				datos.curso="0";	
			}else{
				datos.pin="*";
			}
			consultarDatos("consultar_pin_admin/"+datos.curso+"/"+datos.pin,{},function(rs){
				console.log(rs);
				accion_pin="eliminar";
				dibujar_tabla_pines(rs.datos);

			});
		}	
	});

	agregarEvento("btnEliminarPines","click",function(){
		var datos = $("#formEliPins").serializarFormulario();
		if(datos!=false){
			
				datos.pin="*";
			
			consultarDatos("consultar_pin_admin/"+datos.curso+"/"+datos.pin,{},function(rs){
				console.log(rs);
				accion_pin="eliminar";
				dibujar_tabla_pines(rs.datos);

			});
		}	
	});
	agregarEvento("btnExportar","click",function(){
		var datos = $("#formEliPins").serializarFormulario();
		if(datos!=false){
			
				datos.pin="*";
			
			consultarDatos("exportar_pines/"+datos.curso+"/"+datos.pin,{},function(rs){
				console.log(rs);
				accion_pin="eliminar";
				document.getElementById("aExportado").href=globales._URL+"/recursos/exportacion/"+rs.archivo;
				document.getElementById("aExportado").innerHTML="DESCARGAR";

			});
		}	
	});
});

function dibujar_tabla_pines(datos){
	$('#crearPin, #consultaPin').fadeOut('fast');
	$('#respuestaPin').fadeIn('slow');
	document.getElementById("aExportado").href="";
	document.getElementById("aExportado").innerHTML="";
	var tabl=document.getElementById("tbConsultalPines");
	tabl.innerHTML="";
	for(var f in datos){
		console.log(datos);
		var tr=document.createElement("tr");
		
		var td=document.createElement("td");
		td.innerHTML=(Number(f)+1);
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].nombre_curso;
		tr.appendChild(td);

		var td=document.createElement("td");
		td.innerHTML=datos[f].pin;
		tr.appendChild(td);
		
		var td=document.createElement("td");
		td.innerHTML=datos[f].estado;
		tr.appendChild(td);	
		
		switch(accion_pin){
			
			case "eliminar":
				var td=document.createElement("td");
				var ip=document.createElement("input");
				ip.setAttribute("type","button");
				ip.setAttribute("value","eliminar");
				ip.setAttribute("onclick","eliminar_pin("+datos[f].id+")");
				td.appendChild(ip);
				tr.appendChild(td);	
				break;	
			case "consultar":
			  //nada para hacer
				break;	
		}


		tabl.appendChild(tr);

	}
}

function eliminar_pin(id){
	eliminarDato("eliminar_pin/"+id,{},function(rs){
		console.log(rs);
		if(rs.respuesta){
			var tabl=document.getElementById("tbConsultalPines");
			tabl.innerHTML="";
		}
	});
}