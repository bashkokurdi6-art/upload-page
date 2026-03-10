const supabaseUrl="sb_publishable_lOotJfG-w3GgpDpD8446qA_Ba1nKV4k"
const supabaseKey="sb_secret_yG4_t0demILwY37g9Gu4Sw_9_SswlZ5"

const sb=supabase.createClient(supabaseUrl,supabaseKey)

async function send(){

let text=document.getElementById("msg").value

if(!text)return

await sb.from("messages")
.insert([{sender:"user",message:text}])

document.getElementById("msg").value=""

load()

}

async function load(){

let {data}=await sb
.from("messages")
.select("*")
.order("created_at",{ascending:true})

let box=document.getElementById("chat")

box.innerHTML=""

data.forEach(m=>{

let div=document.createElement("div")

div.className="msg "+m.sender

div.innerText=m.message

box.appendChild(div)

})

box.scrollTop=box.scrollHeight

}

load()

setInterval(load,1500)
