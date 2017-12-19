function iniciar_alumno(){

	console.log("Alumno iniciado");
    cargar_datos_perfil(globales._usuario);
    agregarEvento("btn_editar_perfil","click",function(){
        var datos = $("#formUsuarioPerfil").serializarFormulario();
        if(datos.password[0]==datos.password[1]){
            datos.password=datos.password[0];
            if(datos.correo_usuario[0]==datos.correo_usuario[1]){
                    editarDato("usuarios/"+globales._usuario.id,datos,function(rs){
                        mostrarMensaje(rs);
                        if(rs.respuesta){
                            globales._usuario=rs.datos[0];
                            cargar_datos_perfil(globales._usuario);
                            agregar_session_storage("ssGlobales",globales);
                        }
                    });
            }
            
        }else{
            mostrarMensaje("Contraseñas no son iguales");
        }
        
    });
}

function iniciar_eventos(eventos){

				var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();
    
                /*var eventos_source={
                    url: globales._URL+"eventos_estudiante/"+globales._usuario.id
                };*/

                    /*var eventos=[
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
                    ];*/
 
                // nombre del DIV es calendar
                //console.log(eventos);
                $('#divCalendario').fullCalendar({
                    
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultDate: y+"-"+(m+1)+"-"+d,
                    defaultView: 'month',
                    editable: true,
                    locale: 'es',
                    events: eventos,
                    eventColor: '#378116',
                    eventRender: function(event, element) {

                        
                            element.qtip({
                            	
                                content: event.description,
                                hide: {
					                fixed: true,
					                delay: 300
					            }
                            });
                        },
                    
                    eventClick: function(calEvent, jsEvent, view) {
                        console.log(calEvent);
                        //alert('Event: ' + calEvent.title);
                        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                        //alert('View: ' + view.name);

                        // change the border color just for fun
                        console.log(calEvent);
                        $(this).css('border-color', 'red');
                        $('#divCalendario').fullCalendar('changeView', 'agendaDay',calEvent.start);
                        /*if(calEvent.start!=null){
                            document.getElementById("hFecha").innerHTML="Desde: "+formatoFechaFullCalendar(String(calEvent.start))+".";
                        }
                        
                        if(calEvent.end!=null){
                            document.getElementById("hFechaF").innerHTML="Hasta: "+formatoFechaFullCalendar(String(calEvent.end))+".";
                        }else{
                            document.getElementById("hFechaF").innerHTML="";
                        }
                        
                        document.getElementById("hCurso").innerHTML="Nombre del curso: "+calEvent.course;
                        document.getElementById("hActividad").innerHTML="Actividad: "+calEvent.title;
                         */   
                         var divActividades=document.getElementById("divActividades");
                         divActividades.innerHTML="";
                         dibujar_div_actividad([{
                            nombre_actividad:calEvent.title,
                            nombre_curso:calEvent.course,
                            activo_hasta:formatoFechaFullCalendar(String(calEvent.end)),
                            activo_desde:formatoFechaFullCalendar(String(calEvent.start))
                         }]);


                    },
                    dayClick: function(date, jsEvent, view) {

                        //alert('Clicked on: ' + date.format());

                        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

                        //alert('Current view: ' + view.name);

                        // change the day's background color just for fun

                        //$(this).css('background-color', 'red');

                    },

                });
}

function cargar_datos_perfil(us){
    document.getElementById("txt_nombre_alumno").value=us.nombre_usuario;
    document.getElementById("txt_apellido_alumno").value=us.apellido_usuario;
    document.getElementById("txt_doc_alumno").value=us.documento_usuario;
    document.getElementById("txt_tel_alumno").value=us.telefono_usuario;
    document.getElementById("txt_dir_alumno").value=us.direccion_usuario;
    document.getElementById("txt_mail_alumno").value=us.correo_usuario; 
    document.getElementById("txt_mail_alumno_2").value=us.correo_usuario; 
}   