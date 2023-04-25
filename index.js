function Api(param){
    this.api = param.api
    this.pag = document.getElementById(param.pag);
}
Api.prototype.styles = function(){
    let tag = document.querySelectorAll(".tag")
    let tags = [...tag]
    tags.map(e => {
        e.className = "tag"
        e.addEventListener("click", () => {
            if(e.className.split(" ").indexOf("imagen") != -1){
                e.className = "tag";
            }
            else{
                e.className += " imagen";
            }
        })
        e.addEventListener("mouseout", () => {
            e.className = "tag";
        })
    })
}

Api.prototype.Get = async function(){
        let search = document.getElementById("search")
        let api = this.api
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
            </div>
            <div class = "name">
            ${e["name"]} </div>
            <img src = "${e["image"]}">
            status: ${e["status"]}<br> 
            Specie: ${e["species"]}`;
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
            </div>
            <div class = "name">
            ${e["name"]} </div>
            <img src = "${e["image"]}">
            status: ${e["status"]}<br> 
            Specie: ${e["species"]}`;
        })
        this.styles()
}
Api.prototype.up = async function(){
    try{
        let right = document.getElementById("right")
        let index = 1;
        this.init(index)
        right.addEventListener("click",() => {
            this.pag.innerHTML = ""
            index++;
            this.init(index)
        })
        this.Get()    
    }catch(err){
        console.log(err)
    }
    
} 
const api = new Api({api:"https://rickandmortyapi.com/api/character", pag:"parametros"});
api.up()