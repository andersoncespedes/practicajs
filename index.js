function Api(param){
    this.api = param.api
    this.pag = document.getElementById(param.pag);
}
Api.prototype.styles = function(){
    let tag = document.querySelectorAll(".tag")
    let tags = [...tag]
    tags.map(e => {
        let hid = e.querySelector(".id_hidden");
        let id = e.querySelector(".id");
        e.className = "tag";
        e.addEventListener("click", () => {
              if(hid.className == "id"){
                hid.className = "id_hidden";
                id.className = "id"
            }
            else{
                hid.className = "id";
                id.className = "id_hidden"
            }
            if(e.className.split(" ").indexOf("imagen") != -1){
                e.className = "tag";
                }
             else{
                e.className += " imagen";
            } 
          
        })
        e.addEventListener("mouseout", () => {
            e.className = "tag";
            hid.className = "id_hidden";
            id.className = "id"
            
        })
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
            console.log(search.value)
            var data = await fetch(api+"?name="+search.value);
            var json = await data.json();
            json.results.map(e => {
            this.pag.innerHTML += `<div class = 'tag'> 
            <div class = 'id'>
                ${e["id"]}
                <div class = "name">
                ${e["name"]} </div>
                <img src = "${e["image"]}" style = "width:100%; border-radius:20px">
                status: ${e["status"]}<br> 
                Specie: ${e["species"]}
            </div>
            <div class = "id_hidden" >
                jaslkdjask
            </div>
            `;
        })
        this.styles()
        })
}
Api.prototype.init = async function(page = 1){
    var data = await fetch(this.api + "?page="+page);
            var json = await data.json();
            json.results.map(e => {
            this.pag.innerHTML += `<div class = 'tag'> 
            <div class = 'id'>
                ${e["id"]}
                <div class = "name">
                ${e["name"]} </div>
                <img src = "${e["image"]}" style = "width:100%; border-radius:20px">
                status: ${e["status"]}<br> 
                Specie: ${e["species"]}
            </div>
            <div class = "id_hidden">
                jaslkdjask
            </div>
            `;

        })
        this.styles()
}
Api.prototype.title =  function(){
    let tit = document.getElementById("tit");
    let gif = document.getElementById("gif-ap");
    let count = 0
    tit.addEventListener("click", () => {
        count++;
        console.log(count)
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
            this.init(index);
        })
        left.addEventListener("click", () => {
            this.pag.innerHTML = ""
            index--;
            if(index <= 1){
                index = 1;
            }
            this.init(index);
        })
        this.Get()    
        this.title()
    }catch(err){
        console.log(err)
    }
    
} 
const api = new Api({api:"https://rickandmortyapi.com/api/character", pag:"parametros"});
api.up()