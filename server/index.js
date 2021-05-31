const http = require("http");
const port = 8111;
const fs = require("fs");
let called =false;
const server = http.createServer((req,res)=>{
   
    let counter = fs.readFileSync("./data.txt","utf8");
    let css = fs.readFileSync("./views/style.css");
    let js = fs.readFileSync("./views/main.js","utf8");
    let newJs = "var data="+counter+";" +js;
    let data = "";
    switch (req.url) {
        case "/style.css":
            res.writeHead(200,{"Content-type":"text/css"})
            res.end(css);
            break;
        case "/main.js":
            res.writeHead(200,{"Content-type":"text/javascript"})
            res.end(newJs);
            break;
        default: {
            if(req.url==="/") data ="index.html"
            else if(req.url==="/about") data = "about.html" 
            else if(req.url==="/contact") data ="contact.html"
            else data = "404.html"
            fs.readFile("./views/"+data, (err,page)=>{
                if(err) {
                    console.log(err)
                    res.end();
                }
                res.writeHead(200, "Content-type","text/html");
                res.write(page);
                res.end();
                if(!called){
                    called =!called;
                    fs.writeFileSync("./data.txt",JSON.stringify(parseInt(counter)+1));
                }
               else called = !called;
            })
        }
    }
    console.log("Request received");
    console.log(req.url); 
});


server.listen(port,"localhost",()=>{
    console.log("Server is listening to 8002");
    fs.writeFileSync("./data.txt","0");
})

