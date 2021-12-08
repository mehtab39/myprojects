var query = getId("enter");
var answer = getId("get");

async function getData() {

  const res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    body: JSON.stringify({
      q: `${query.value}`,
      source: "en",
      target:  getId(`Langs`).value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  let data=await res.json();
  console.log('data:', data.translatedText);
    answer.value= data.translatedText;
  
}

async function sLang() {
  let res = await fetch(`https://libretranslate.de/languages`);
  let data = await res.json();
  appenddata(data);
}
sLang();

function appenddata(d) {
  let container = document.getElementById(`Langs`);
  d.forEach((el) => {
    let opt = document.createElement(`option`);
    opt.value = el.code;
    opt.textContent = el.name;
    container.append(opt);
  });
}

function getId(id) {
  return document.getElementById(id);
}
