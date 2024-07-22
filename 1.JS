// input 

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");


let mood = 'create';
let tmp;

function gettotal()
{
    if(price.value != '')
    {
        let num = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = num;
        total.style.backgroundColor = "green";
    }
    else
    {
        total.innerHTML = '';
        total.style.backgroundColor = "red";
    }
}

let datapro;
if(localStorage.product != null)
    {
        datapro = JSON.parse(localStorage.product);
    }
    else{
        datapro = [];
    }

create.onclick = function(){

    let plural = {
        title : title.value.toLowerCase(), 
        price : price.value, 
        taxes : taxes.value, 
        ads : ads.value, 
        discount : discount.value, 
        total : total.innerHTML, 
        count : count.value,
        category : category.value.toLowerCase(),
    }



    if(title.value != '' && price.value != '' && category.value != '' && plural.count <= 1000){
    if(mood === 'create'){
        if(plural.count > 1){
            for(let x=0; x <plural.count; x++){
               datapro.push(plural);
            }
            }else{
             datapro.push(plural);
            }
    }else{
        datapro[tmp] = plural;
        mood = 'create';
        create.innerHTML = 'create';
        count.style.display = "block";
    }
    clearData();
  }  
  
    localStorage.setItem('product' , JSON.stringify(datapro));;
    readData();
}

function clearData(){
   title.value = '';
   price.value = '';
   taxes.value = '';
   ads.value = '';
   discount.value = '';
   total.innerHTML = '';
   count.value = '';
   category.value = '';
   total.style.backgroundColor = "red";
}

function readData(){
    let table = '';
    for(let i= 0; i < datapro.length; i++){
        table += `
      <tr> 
        <td> ${i+1} </td>
        <td> ${datapro[i].title} </td>
        <td> ${datapro[i].price} </td>
        <td> ${datapro[i].taxes} </td>
        <td> ${datapro[i].ads} </td>
        <td> ${datapro[i].discount} </td>
        <td> ${datapro[i].total} </td>
        <td> ${datapro[i].category} </td>
        <td> <button onclick="update(${i})" id="update"> update </td>
        <td> <button onclick="deletepro(${i})" id="delete"> delete </td>
      </tr>
        `;
        }

        document.getElementById("tbody").innerHTML = table;


        let btndeleteAll = document.getElementById("deleteAll");

        if(datapro.length > 0){
            btndeleteAll.innerHTML = `
            <button onclick="deleteAll()"> Delete All(${datapro.length}) </button>
            `;
        }
        else{
            btndeleteAll.innerHTML = '';
        }
}
readData();

function deletepro(i){
    datapro.splice(i , 1);
    localStorage.product = JSON.stringify(datapro);
    readData();
}

function deleteAll(){
    datapro.splice(0);
    localStorage.clear();
    readData();
}

function update(i){
   title.value =  datapro[i].title;
   price.value = datapro[i].price;
   taxes.value = datapro[i].taxes;
   ads.value = datapro[i].ads;
   discount.value = datapro[i].discount;
   gettotal();
   category.value = datapro[i].category;
   count.style.display = "none";
   create.innerHTML = 'update';
   mood = 'update';
   tmp = i;
   window.scroll({
    top : 0,
    behavior : "smooth",
   })
} 

let searchMood = 'title';  

function SearchBy(id){
    if(id == "search-by-title"){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder="search by "+ searchMood;
    search.focus();
    search.value = '';
    readData();
}

function searchData(value)
{
    let table = ''; 
    for(let i = 0; i < datapro.length; i++){
    if(searchMood == 'title')
        {

            if(datapro[i].title.includes(value.toLowerCase())){
                    table += `
                  <tr> 
                    <td> ${i} </td>
                    <td> ${datapro[i].title} </td>
                    <td> ${datapro[i].price} </td>
                    <td> ${datapro[i].taxes} </td>
                    <td> ${datapro[i].ads} </td>
                    <td> ${datapro[i].discount} </td>
                    <td> ${datapro[i].total} </td>
                    <td> ${datapro[i].category} </td>
                    <td> <button onclick="update(${i})" id="update"> update </td>
                    <td> <button onclick="deletepro(${i})" id="delete"> delete </td>
                  </tr>
                    `;
            }
        }




    else{
            if(datapro[i].category.includes(value.toLowerCase())){
                    table += `
                  <tr> 
                    <td> ${i} </td>
                    <td> ${datapro[i].title} </td>
                    <td> ${datapro[i].price} </td>
                    <td> ${datapro[i].taxes} </td>
                    <td> ${datapro[i].ads} </td>
                    <td> ${datapro[i].discount} </td>
                    <td> ${datapro[i].total} </td>
                    <td> ${datapro[i].category} </td>
                    <td> <button onclick="update(${i})" id="update"> update </td>
                    <td> <button onclick="deletepro(${i})" id="delete"> delete </td>
                  </tr>
                    `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;

}



