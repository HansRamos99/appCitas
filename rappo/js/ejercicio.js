let arreglo;
let idL=[];
let escritores=[];

var cargarDatos= ()=>{
    let url='https://dataserverdaw.herokuapp.com/escritores/xml';
    fetch(url)
    .then((resp)=>{
        return resp.text();
    })
    .then((data)=>{
        let parser= new DOMParser();
        xmlDoc=parser.parseFromString(data, 'text/xml');
        arreglo= xmlDoc.getElementsByTagName('escritor');
        arreglo= Array.from(arreglo);
        arreglo.forEach((element)=>{
            let op=document.createElement('option');
            let list=element.childNodes;
            let id=list[0].textContent;
            idL.push(id);
            let escritor= list[1].textContent;
            escritores.push(escritor);
            op.setAttribute("value",list[0].textContent);
            op.textContent= list[1].textContent;
            let barra=document.getElementById('barra');
            barra.appendChild(op);
        });
    });

};

document.addEventListener('DOMContentLoaded', ()=>{
    cargarDatos();
});

document.querySelector('select').addEventListener('change', (event)=>{
    let url= 'https://dataserverdaw.herokuapp.com/escritores/frases';
    let id=parseInt(event.target.value, 10);
    let frases=document.getElementById('frases');
    let autor= escritores[idL.indexOf(event.target.value)];
    frases.innerHTML='';  
    fetch(url)
    .then((resp)=>{
        return resp.json();
    })
    .then((data)=>{
        let arr=data.frases;
        arr.forEach((element)=>{  
            if(element.id_autor == id){
                frases.innerHTML+='<div class="col-lg-3"> <div class="test-inner"><div class="test-author-thumb d-flex"><div class="test-author-info"><h4>'+autor+'</h4></div></div><span>'+element.texto+'</span><i class="fa fa-quote-right"></i></div></div>';
        }
    }
        );
    }
    );
});