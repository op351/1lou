
async function zipFile (zip, contentName) {
    zip.generateAsync({type:"blob"}).then(zip => {
        // see FileSaver.js
        saveAs(zip, contentName + ".zip")
    })
}
const readAsBinaryString = blob => new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = function(event) {
      resolve(event.target.result);
    };
    reader.readAsBinaryString(blob);
  });
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function getMultiBlobContent (realLinks, metaReal, mainName) {
    let zip = new JSZip()
    for (let realLink of realLinks) {
        let blob = await fetch(realLink.realLink).then(r => r.blob())
        zip.file(realLink.realLinkName, await readAsBinaryString(blob), {binary: true})
    }
    if (mainName === "") {
        zipFile(zip, metaReal)
    } else {
        zipFile(zip, metaReal + "-" + mainName)
    }
}