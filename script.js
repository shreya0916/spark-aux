const button = document.querySelector("#load");
const cd = document.querySelector(".cd");
const songInput = document.querySelector("#song");

button.addEventListener("click", function () {

    const song = songInput.value.trim();

    if (song === "") {
        return;
    }

    cd.classList.add("playing");

    button.textContent = "NOW PLAYING ♪";

});
