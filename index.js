function Api(param){
    this.api = param.api
    this.pag = document.getElementById(param.pag)
}
Api.prototype.styles = function(){
    let tag = document.querySelectorAll(".tag")
    let tags = [...tag]
    tags.map(e => {
        e.style.color = "red";
        e.style.margin = "10px";
        e.style.backgroundColor = "white";
        e.style.width = "20%";
        e.style.padding = "20px";
        e.style.borderRadius = "10px";
        e.style.boxShadow = "0 0 5px black "
    })
}
Api.prototype.Get = async function(){
    try{
        let data = await fetch(this.api);
        let json = await data.json();
        json.results.map(e => {
            this.pag.innerHTML += `<div class = 'tag'> <div class = 'id'>${e["id"]}</div><div class = "name"> ${e["name"]} </name><img src = "${e["image"]}">status: ${e["status"]}`;
        })
        this.styles()
        return json.results
    }catch(err){
        return err;
    }
}
Api.prototype.up = async function(){
    return this.Get()
} 
const api = new Api({api:"https://rickandmortyapi.com/api/character", pag:"parametros"});
console.log(api.up());