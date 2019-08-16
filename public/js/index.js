$(document).ready(function(){ 
    $("#Grabar").click(function(){

            $("#Grabar").html("...Grabando");
            setTimeout(function(){
                $("#Grabar").html("Grabar");
            },1500)      

    });
   
    $("#btnAgregaCalificacion").click(function(){
        var obj=MapperCalificacion();
        var {Estado,Tipo,Valor,Observacion} = MapperCalificacion();
        if(!Estado || !Tipo ||   !Valor || !Observacion){
            alert("Validar campos.")
            return
        }

        let ListCalificacion = [];
        if ('ListCalificacion' in localStorage) {
           
            obj.Index= ListCalificacion.length;
            ListCalificacion[ListCalificacion.length] = obj;
            localStorage.setItem('ListCalificacion', JSON.stringify(ListCalificacion));
        }else{
            obj.Index= 0;
            ListCalificacion[0] = obj;
            localStorage.setItem('ListCalificacion', JSON.stringify(ListCalificacion));
        }
        dibujartableCalificacion();
        LimpiarCalificacion();
    });

    
    $("#btnAgregaIdioma").click(function(){
        var obj=MapperIdioma();
        var {Idioma,Nivel,Fecha,Entrevistador} = obj;
        if(!Idioma || !Nivel ||   !Fecha || !Entrevistador){
            alert("Validar campos.")
            return
        }
        let ListIdioma = [];
        
        if ('listIdioma' in localStorage) {
            obj.Index= ListIdioma.length;
            ListIdioma[ListIdioma.length] = obj;
            localStorage.setItem('listIdioma', JSON.stringify(ListIdioma));
        }else{
            obj.Index= 0;
            ListIdioma[0] = obj;
            localStorage.setItem('listIdioma', JSON.stringify(ListIdioma));
        }
        dibujartableIdioma();
        LimpiarIdioma();

    });


    function MapperCalificacion(){
        var obj = new Object();
        obj.Estado = $("#Estado").val();
        obj.Tipo = $("#Tipo").val();
        obj.Valor = $("#Valor").val();
        obj.Observacion = $("#Observacion").val();
        return obj;
    }

       function LimpiarCalificacion(){
        $("#Estado").val("");
        $("#Tipo").val("");
        $("#Valor").val("");
         $("#Observacion").val("");
       } 

    function MapperIdioma(){
        var obj = new Object();
        obj.Idioma = $("#Idioma").val();
        obj.Nivel = $("#Nivel").val();
        obj.Fecha = $("#Fecha").val();
        obj.Entrevistador = $("#Entrevistador").val();
        return obj;
    }
    function LimpiarIdioma(){
        $("#Idioma").val("");
        $("#Nivel").val("");
        $("#Fecha").val("");
         $("#Entrevistador").val("");
       } 
    


    dibujartableIdioma();
    dibujartableCalificacion();

  
});


function EditarIdioma(numero){
    listIdioma = JSON.parse(localStorage.getItem('listIdioma'));
    $.each(listIdioma, function (index, item) {
        $("#Idioma").val(item.Idioma);
        $("#Nivel").val(item.Nivel);
        $("#Fecha").val(item.Fecha);
         $("#Entrevistador").val(item.Entrevistador);
    });
}     

function BorrarIdioma(numero){
    listIdioma = JSON.parse(localStorage.getItem('listIdioma'));
    const idiomas = listIdioma.filter(cita => cita.Index !== numero );
    localStorage.setItem('listIdioma', JSON.stringify(idiomas));
   
    dibujartableIdioma();
} 


function EditarCalificacion(numero){
    ListCalificacion = JSON.parse(localStorage.getItem('ListCalificacion'));
    $.each(ListCalificacion, function (index, item) {
        $("#Estado").val(item.Estado);
        $("#Tipo").val(item.Tipo);
        $("#Valor").val(item.Valor);
        $("#Observacion").val(item.Observacion);
    });
    dibujartableCalificacion();
}     

function BorrarCalificacion(numero){
    listCalificacion = JSON.parse(localStorage.getItem('ListCalificacion'));
    const Calificacion = listCalificacion.filter(cita => cita.Index !== numero );
    localStorage.setItem('ListCalificacion', JSON.stringify(Calificacion));
    dibujartableCalificacion();
} 




function dibujartableCalificacion(){
    $("#tableCalificacion tbody").html("");
    let template =`
        <tr>
            <td>:uno:</td>
            <td>:dos:</td>
            <td>:tres:</td>
            <td>:cuatro:</td>
            <td>:cinco:</td>
        </tr>
    `
    let table=''
    ListCalificacion = JSON.parse(localStorage.getItem('ListCalificacion'));
    $.each(ListCalificacion, function (index, item) {
      
        let tr = template;
        tr = tr.replace(':uno:',index);
        tr = tr.replace(':dos:',item.Estado);
        tr = tr.replace(':tres:',item.Tipo);
        tr = tr.replace(':cuatro:',item.Valor);
        tr = tr.replace(':cinco:','<button onclick="EditarCalificacion('+index+')" class="btn" >Editar</button> <button class="btn" onclick="BorrarCalificacion('+index+')" >Eliminar</button>');

         table = tr
         
    });

    $("#tableCalificacion tbody").append(table);
}



function dibujartableIdioma(){
    $("#tableIdioma tbody").html("");
    let template =`
    <tr>
        <td>:uno:</td>
        <td>:dos:</td>
        <td>:tres:</td>
        <td>:cuatro:</td>
        <td>:cinco:</td>
        <td>:seis:</td>
    </tr>
`;
let table='';
    listIdioma = JSON.parse(localStorage.getItem('listIdioma'));

    $.each(listIdioma, function (index, item) {
        
        let tr = template;
        tr = tr.replace(':uno:',index+1);
        tr = tr.replace(':dos:',item.Idioma);
        tr = tr.replace(':tres:',item.Nivel);
        tr = tr.replace(':cuatro:',item.Fecha);
        tr = tr.replace(':cinco:',item.Entrevistador);
        tr = tr.replace(':seis:','<button class="btn" onclick="EditarIdioma('+index+')">Editar</button> <button onclick="BorrarIdioma('+index+')" class="btn">Eliminar</button>');

        table = tr
    });

    $("#tableIdioma tbody").append(table);

}