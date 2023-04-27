function Api(param){
    this.api = param.api
    this.pag = document.getElementById(param.pag);
    this.filter = document.getElementById(param.filter);
}
Api.prototype.styles = function(){
    let tag = document.querySelectorAll(".tag")
    let tags = [...tag]
    tags.map(e => {
        let hid = e.querySelector(".id_hidden");
        let id = e.querySelector(".id");
        e.className = "tag";
        e.addEventListener("click", () => {
            if(hid.className == "id ap"){
                hid.className = "id_hidden";
                id.className = "id"
            }
            else{
                hid.className = "id";
                hid.className += " ap"
                id.className = "id_hidden"
            }
            if(e.className.split(" ").indexOf("imagen") != -1){
                e.className = "tag";
            }
             else{
                e.className += " imagen";
            } 
          
        })
    })
}
Api.prototype.filt = function(param){
    let keys = Object.keys(param).filter(e => !/image|location|created|url|id|episode/.test(e));
    let parent = this.filter;
    parent.innerHTML = ""
    keys.map(e => {
    
    let select = document.createElement("select");
    select.className = "selector"
    
    parent.appendChild(select);
        var option = document.createElement("option");
        option.value = e;
        option.text = e;
        select.appendChild(option);
    })
}
Api.prototype.Get = async function(){
        let search = document.getElementById("search")
        let api = this.api;
        search.addEventListener("keydown", async(ev) => {
        this.pag.innerHTML = ""
        })
        search.addEventListener("keyup", async(ev) => {
            this.pag.innerHTML = ""
            if(search.value.length >= 1){
                search.style.backgroundColor = "white";
                search.style.color = "black";
            } 
            else{
                search.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            }
            var data = await fetch(api+"?name="+search.value);
            var json = await data.json();
            json.results.map(async (e, i) => {
            this.pag.innerHTML += `
            <div class = 'tag'> 
                <div class = 'id'>
                    ${e["id"]}
                    <div class = "name">
                    ${e["name"]} </div>
                    <hr>
                    <img src = "${e["image"]}" style = "width:100%; border-radius:20px; border:3px solid white;">
                    status: ${e["status"]}<br> 
                    Specie: ${e["species"]}
                </div>
                <span class = "id_hidden" >
                    Episodios:<span class = "ep"></span>
                </div>
            </div>
            `;
            let count = 0;
            e["episode"].map( async (e,ip) => {
                let arr = await fetch(e);
                let j = await arr.json()
                document.getElementsByClassName("ep")[i].innerHTML +=(count < 1 ? "<br>" + j.episode :  j.episode)+ ip + " " +j.name + "<br>"
                count++
            });
        })
        this.styles()   
        })
     
}
Api.prototype.init = async function(page = 1){
    var data = await fetch(this.api + "?page="+page);
            var json = await data.json();
            this.filt(...json.results)
            json.results.map(async (e,i) => {
            var arr = ""
            
            this.pag.innerHTML += `
            <div class = 'tag'> 
                <div class = 'id'>
                    ${e["id"]}
                    <hr>
                    <div class = "name">
                    ${e["name"]} </div>
                    
                    <img src = "${e["image"]}" style = "width:100%; border-radius:20px; border:3px solid black;">
                    Status: ${e["status"]}<br> 
                    Specie: ${e["species"]}
                </div>
                <div class = "id_hidden">
                    Episodios:<span class = "ep"></span>
                </div>
            </div>
            `;
            let count = 0
            e["episode"].map( async (e,ip) => {
                let arr = await fetch(e);
                let j = await arr.json()
                document.getElementsByClassName("ep")[i].innerHTML +=(count < 1 ? "<br>" + j.episode :  j.episode)+ ip + " " +j.name + "<br>"
                count++
            });
        })
        this.styles()
}
Api.prototype.title =  function(){
    let tit = document.getElementById("tit");
    let gif = document.getElementById("gif-ap");
    let count = 0;

    tit.addEventListener("click", () => {
        count++;
        if(count > 5){
            gif.style.opacity = "1";
            tit.style.opacity = "0";
            count = 0;
            setTimeout(() => {
                gif.style.opacity = "0";
                tit.style.opacity = "1";
            }, 3000);
        }
    })
}
Api.prototype.up = async function(){
    try{
        let right = document.getElementById("right")
        let left = document.getElementById("left")
        let index = 1;
        this.init(index)
        right.addEventListener("click",() => {
            this.pag.innerHTML = ""
            index++;
            if(index > 1){
                left.style.display = "inline";

            }
            this.init(index);
        })
        left.addEventListener("click", () => {
            this.pag.innerHTML = ""
            index--;
            if(index <= 1){
                index = 1;
                left.style.display = "none";
            }
            this.init(index);
        })
        this.Get()    
        this.title()
    }catch(err){
        console.log(err)
    }
    
} 
const api = new Api({api:"https://rickandmortyapi.com/api/character", pag:"parametros", filter:"filtros"});
api.up()