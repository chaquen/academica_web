
agregarEventoLoad(iniciar_app_alumno);

function iniciar_app_alumno(){
	var existe=obtener_session_storage("ssGlobales");
	if(existe._usuario==false){
		existe=obtener_local_storage("ssGlobales");
	}

	if(false!=existe && undefined!=existe._usuario && existe._cerrar_sesion==false){
		if(existe._usuario.nombre_rol=="alumno"){
			globales=existe;
		
			consulta_inicial_alumno();
			
			
			document.getElementById("h4NombreUsuario").innerHTML=globales._usuario.nombre_usuario;
			
			document.getElementById("tlAlumno").innerHTML="Bienvenido, "+globales._usuario.nombre_usuario;
			
			agregarEvento("liSalir","click",function(){
				salir();
			});


			iniciar_alumno();

		}else{
			location.href="index.html";			
		}

	}else{

		location.href="index.html";

	}
}

function consulta_inicial_alumno(){
	consultarDatos("consulta_inicial_alumno/"+globales._usuario.id,{},function(rs){
		 
		  console.log(rs.respuesta);
		  if(rs.respuesta==true){

			  	  	var server_eventos=rs.datos.eventos[0];	
			   	  	var eventos=[];
				  	dibujar_cursos_alumno(rs.datos.cursos);

				 	dibujar_actividades_alumno(rs.datos.eventos);

			  		//creo los eventos del alumno
			  		var date = new Date();
			   		var d = date.getDate();
	                var m = date.getMonth();
	                var y = date.getFullYear();

	                for(var f in server_eventos){
	                	console.log(server_eventos[f]);
	                 //AQUI CONSTRUYO EL OBJETO JS PARA AGREGARLO AL CALENDARIO
	                 	var fecha=server_eventos[f].activo_desde.split(" ");
	                 	var fecha2=server_eventos[f].activo_hasta.split(" ");
	                 	console.log(fecha);
	                 	console.log(fecha2);
	                	var ev={
	                		

	                            title: server_eventos[f].nombre_actividad,
	                            start: new Date(fecha[0].split("-")[0], Number(fecha[0].split("-")[1])-1, fecha[0].split("-")[2],fecha[1].split(":")[0],fecha[1].split(":")[1],fecha[1].split(":")[2]),
	                            end: new Date(fecha2[0].split("-")[0], Number(fecha2[0].split("-")[1])-1, fecha2[0].split("-")[2],fecha2[1].split(":")[0],fecha2[1].split(":")[1],fecha2[1].split(":")[2]),
	                            description:server_eventos[f].tipo_actividad,
	                            course:server_eventos[f].nombre_curso,
	                            
	                            
	                        
	                	};
	                	if(server_eventos[f].tipo_actividad=="evento"){
	                		//ev.url=server_eventos[f].actividad_recurso;
	                	}
	                	eventos.push(ev);
	                }


			  /*var eventos2=[
	                        {
	                            title: 'ª..ª METAL FOR EVER',
	                            start: new Date(y, m, 1,11.59,59),
	                            description:" |..| ",
	                        },
	                        {
	                            title: 'evento largo',
	                            start: new Date(y, m, d-7),
	                            //end: new Date(y, m, d+6),
	                            description:" |..| ",
	                            allDay:true,
	                        },
	                        {
	                            id: 999,
	                            title: 'Repeating Event',
	                            start: new Date(y, m, 23, 16, 10),
	                            allDay: false,
	                            description:"descripcion",
	                        },
	                        {
	                            id: 999,
	                            title: 'Repeating Event',
	                            start: new Date(y, m, d+4, 16, 0),
	                            allDay: false
	                        },
	                        {
	                            title: 'Meeting',
	                            start: new Date(y, m, d, 10, 30),
	                            allDay: false
	                        },
	                        {
	                            title: 'Lunch',
	                            start: new Date(y, m, d, 12, 0),
	                            end: new Date(y, m, d, 14, 0),
	                            allDay: false
	                        },
	                        {
	                            title: 'Birthday Party',
	                            start: new Date(y, m, d+1, 19, 0),
	                            end: new Date(y, m, d+1, 22, 30),
	                            allDay: false
	                        },
	                        {
	                            title: 'Click for Google',
	                            start: new Date(y, m, 28),
	                            end: new Date(y, m, 29),
	                            url: 'http://google.com/'
	                        }
	                    ];
	          console.log(eventos);
	          console.log(eventos2);*/
	          if(eventos==undefined){
	          	eventos=[
	                        {
	                            title: 'Bienvenido '+globales._usuario.nombre_usuario,
	                            start: new Date(),
	                            description:"Que HOY es tu mejor dia!",
	                        }]
	          }
			  iniciar_eventos(eventos);
		  }else{
		  	
	         	var eventos=[
	                        {
	                            title: 'Bienvenido '+globales._usuario.nombre_usuario,
	                            start: new Date(),
	                            description:"Que HOY es tu mejor dia!",
	                        }]
	          
			  iniciar_eventos(eventos);
		  	mostrarMensaje("Aun no tienes cursos pendientes");
		  }

	});
}


function dibujar_cursos_alumno(datos){
	console.log(datos);
	var div=document.getElementById("divListaCursosAlumnos");
	//div.innerHTML="";
	for(var d in datos){
		console.log(datos[d]);
		var div1=document.createElement("div");
		div1.className="descripcionCurso";

		
		var a =document.createElement("a");
		a.href="vistaAlumno.html?id="+datos[d].id;
		var h2 =document.createElement("h2");
		h2.innerHTML=datos[d].nombre_curso;
		a.appendChild(h2);
		div1.appendChild(a);


		var ul=document.createElement("ul");
		//lista contenido
		var li=document.createElement("li");
		
		var a =document.createElement("a");
		a.href="vistaAlumno.html?id="+datos[d].id;
		var img=document.createElement("img");
		img.src="Imagen/contenido.png";
		a.appendChild(img);
		li.appendChild(a);
		ul.appendChild(li);

		var a =document.createElement("a");
		
		var h4=document.createElement("h4");
		a.href="vistaAlumno.html?id="+datos[d].id;
		h4.innerHTML="contenido";
		a.appendChild(h4);
		li.appendChild(a);
		ul.appendChild(li);
		//FIN lista contenido
		//lista CALIFICACIONES
		var li=document.createElement("li");
		
		var a =document.createElement("a");
		a.href="#";
		var img=document.createElement("img");
		img.src="Imagen/actividad.png";
		a.appendChild(img);
		li.appendChild(a);
		ul.appendChild(li);

		var a =document.createElement("a");
		li.appendChild(a);
		var h4=document.createElement("h4");
		h4.innerHTML="Calificaciones";
		li.appendChild(h4);
		ul.appendChild(li);
		//FIN lista CALIFIICACIONES
		//lista PARTICIPANTES
		var li=document.createElement("li");
		
		var a =document.createElement("a");
		a.href="participantes.html?id="+datos[d].id;
		var img=document.createElement("img");
		img.src="Imagen/participantes.png";
		a.appendChild(img);
		li.appendChild(a);
		ul.appendChild(li);

		var a =document.createElement("a");
		
		var h4=document.createElement("h4");
		a.href="participantes.html?id="+datos[d].id;
		h4.innerHTML="participantes";
		a.appendChild(h4);
		li.appendChild(a);
		ul.appendChild(li);
		//FIN lista contenido
		//lista ACTIVIDADES
		var li=document.createElement("li");
		
		var a =document.createElement("a");
		a.href="#";
		var img=document.createElement("img");
		img.src="Imagen/calificacion.png";
		a.appendChild(img);
		li.appendChild(a);
		ul.appendChild(li);

		var a =document.createElement("a");
		li.appendChild(a);
		var h4=document.createElement("h4");
		h4.innerHTML="Actividades ";
		h4.setAttribute("onclick","mostrar_eventos_curso("+datos[d].id+")");
		li.appendChild(h4);
		ul.appendChild(li);
		//FIN lista actividades
		
		div1.appendChild(ul);
		
		var divli=document.createElement("div");
		divli.className="limpiar";
		div1.appendChild(divli);
		var h3=document.createElement("h3");
		//h3.innerHTML="Finaliza: "+horaClientePersonlizada(datos[d].fecha_fin_curso.split(" ")[0]);
		h3.innerHTML=horaClientePersonlizada(datos[d].fecha_fin_curso.split(" ")[0]);
		div1.appendChild(h3);
		div.appendChild(div1);





	}



}

function dibujar_actividades_alumno(cursos){
	var divActividades=document.getElementById("divActividades");
	divActividades.innerHTML="";

	for(var i in cursos){
			console.log(cursos[i]);	
			
				dibujar_div_actividad(cursos[i]);		
				
			
		
		
	}
}	

function dibujar_div_actividad(actividad){
	console.log(horaCliente());
	var hoy=horaCliente();
	var divActividades=document.getElementById("divActividades");
	
	//console.log(actividad);
	for(var f in actividad){
		console.log(actividad);
		
		var div=document.createElement("div");
		div.className="proxActividad";
		var hfechaI=document.createElement("h4");
		if(actividad[f].activo_desde!=undefined){
			hfechaI.innerHTML=actividad[f].activo_desde;
		}
		
		var hfechaF=document.createElement("h4");
		if(actividad[f].activo_hasta!=undefined){
			hfechaF.innerHTML=actividad[f].activo_hasta;	
		}
		
		var hCurso=document.createElement("h3");
		if(actividad[f].nombre_curso!=undefined){
			hCurso.innerHTML=actividad[f].nombre_curso;
			console.log(new Date(actividad[f].activo_desde).getTime());

			console.log(new Date(hoy).getTime());
			if(new Date(hoy).getTime()>=new Date(actividad[f].activo_desde).getTime() ){
				hCurso.setAttribute("onclick","abrir_ventana_evaluacion("+true+",'mi_evaluacion.html?id_eva="+actividad[f].id+"&id_us="+globales._usuario.id+"')");
			}else{
				hCurso.setAttribute("onclick","abrir_ventana_evaluacion("+false+",'"+0+"')");
			}
		}
		
		var hActividad=document.createElement("h3");
		if(actividad[f].nombre_actividad!=undefined){
			hActividad.innerHTML=actividad[f].nombre_actividad;
		}
		div.appendChild(hfechaI);
		div.appendChild(hfechaF);
		div.appendChild(hCurso);
		div.appendChild(hActividad);
		divActividades.appendChild(div);	
	}
	
}

function abrir_ventana_evaluacion(abrir,url){
	if(abrir){
		if(confirm("¿Deseas responder esta evaluación?")){
			var ie=url.split("&")[0].split("=")[1];
			var us=url.split("&")[1].split("=")[1];

			registrarDato("intento_evaluacion",{id_evaluacion:ie,id_usuario:us},function(rs){
				if(rs.respuesta){
					//abrir_ventana(abrir,url);
					window.open(url,"Evaluación","toolbar=yes");  
				}
			});	
		}
		
	}else{
		abrir_ventana(abrir,url);
	}
}

function mostrar_eventos_curso(id_curso){
	consultarDatos("eventos/"+id_curso,{},function(rs){
		console.log(rs);
		if(rs.respuesta){
			var divActividades=document.getElementById("divActividades");
			divActividades.innerHTML="";
			dibujar_div_actividad(rs.datos);		
		}
		
	}); 	
}

