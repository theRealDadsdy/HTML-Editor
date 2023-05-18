function run() {
  var win = window.open();
  win.document.write(html.value);
  let script = win.document.createElement("script");
  win.document.body.appendChild(script);
  script.innerHTML = js.value;
  let style = win.document.createElement("style");
  win.document.body.appendChild(style);
  style.innerHTML = css.value;
}

async function save(text, name){
  if (!text){
    return;
  }
  const fileHandle = await window.showSaveFilePicker({suggestedName: name});
  const writable = await fileHandle.createWritable();
  await writable.write(text);
  await writable.close();
}

async function saveAll(){
  await save(html.value, "index.html");
  await save(js.value, "script.js");
  await save(css.value, "style.css");
}

document.addEventListener("keydown", async (event) => {
  if (event.keyCode == 83 && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
    event.preventDefault();
    await saveAll();
  }
});

function load(){
  const fileInput = document.createElement("input");
  fileInput.type = "file";

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      let ext = file.name.split('.')[1];
      eval(ext).value = reader.result;
    });

    reader.readAsText(file);
  });

  fileInput.click();
};