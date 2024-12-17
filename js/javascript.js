//function for get total
//function for create product
//sve data in local storage
//clear input
//read
//count
//delet
//update
//search
//clean data
//dark mode
let title=document.getElementById('title');
let price=document.getElementById('price');
let texces=document.getElementById('texces');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let catigory=document.getElementById('catigory');
let creat_bt=document.getElementById('creat_bt');
let mood='create';
let temp;
let mood_search='title'
//get total
function getTotal(){
    if(price.value!=""){
     let result= (+price.value+ +texces.value+ +ads.value)- +discount.value;
    total.innerHTML=result
    total.style.background='green'
    }
    else{
        total.innerHTML="   "
        total.style.background='red'   
    }
   
    
}
//create product
let datapro;
if (localStorage.product && localStorage.product !== "undefined") {
    try {
        datapro = JSON.parse(localStorage.product);
    } catch (error) {
        console.error("Error parsing localStorage data:", error);
        datapro = [];
    }
} else {
    datapro = [];
}
creat_bt.onclick=function(){
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        texces:texces.value,
        discount:discount.value,
        ads:ads.value,
        total:total.innerHTML,
        count:count.value,
        catigory:catigory.value.toLowerCase(),
    } 
     //count
     if (title.value!=" "&&price.value!=" "&&catigory.value!=" "){
     if(mood==="create"){
        if (newpro.count>1){
      for(let i=1;i<=newpro.count;i++){
            datapro.push(newpro)  
        }
    }
       else{
     datapro.push(newpro) 
        }}
    else{
        datapro[temp]=newpro
        mood='create';
        creat_bt.innerHTML="create"
        count.style.display="block"
    }
    clearData()
}
//sve data in local storage
localStorage.setItem('product',JSON.stringify(datapro))

showData()
}


//clear input
function clearData(){
    title.value="";
    price.value="";
    texces.value="";
    ads.value="";
    catigory.value="";
    total.innerHTML="";
    count.value="";
}


//reed
function showData(){
let table=""
 for(let i=0;i<datapro.length;i++){
    table += `
    <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].Text}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].catigory}</td>
        <td><button onclick="update(${i})" class="update">update</button></td>
        <td><button onclick="deletData(${i})" class="delet">delet</button></td>
    </tr>`;
 }
 document.querySelector('.table').innerHTML=table;
 let bt_delet=document.getElementById('deletall')
if(datapro.length>0){
    bt_delet.innerHTML=`
    <button onclick="deletall()" >delet all${datapro.length}</button>
    `
}
else
{
    bt_delet.innerHTML=" "   
}
}
showData()
getTotal()

//delet
function deletData(i){
datapro.splice(i,1)
localStorage.product=JSON.stringify(datapro)
showData()
}






//deletall
function deletall(){
    localStorage.clear();
    datapro.splice(0)
    showData()
    
}
//update
function update(i){
  
  title.value=datapro[i].title;
  price.value=datapro[i].price;
  texces.value=datapro[i].texces;
  ads.value=datapro[i].ads;
 discount.value=datapro[i].discount;
 getTotal()
 count.style.display=="none"
 catigory.value=datapro[i].catigory;
 creat_bt.innerHTML="update"
 mood='update'
 temp=i;
 scroll({
    top:0,
   behavior:"smooth"
 })
}

//search
let search=document.getElementById('search')
function getSearchMood(id){
 if(id=="SearchByTitle"){
    mood_search='title'
    .search.plaseholder="search by title"
    
 }else{
    mood_search='catigory'
     .search.plaseholder="search by catigory"
     
 }
search.focus()
search.value=" "
showData();
}

function searchdata(value){
    let table=" "
    if(mood_search=='title')
    {
    for(let i=0;i<datapro.length();i++)    
        if (datapro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].Text}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].catigory}</td>
                <td><button onclick="update(${i})" class="update">update</button></td>
                <td><button onclick="deletData(${i})" class="delet">delet</button></td>
            </tr>`;    
        }
    }
    else{
        for(let i=0;i<datapro.length();i++)    
            if (datapro[i].catigory.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].Text}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].catigory}</td>
                    <td><button onclick="update(${i})" class="update">update</button></td>
                    <td><button onclick="deletData(${i})" class="delet">delet</button></td>
                </tr>`;    
            }
        }
    
    document.querySelector('.table').innerHTML=table;
}
//clean data
 