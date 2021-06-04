document.getElementById("save-settings").onclick = () => {
    localStorage.setItem("file-name", document.getElementById("file-name").value);
    localStorage.setItem("shot-angle", document.getElementById("shot-angle").value);
}