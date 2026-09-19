const form = document.querySelector("#song-form");
const searchInput = document.querySelector("#song-search");

const results = document.querySelector("#results");

const cd = document.querySelector("#cd");
const albumArt = document.querySelector("#album-art");

const trackTitle = document.querySelector("#track-title");
const artistName = document.querySelector("#artist-name");

const controls = document.querySelector("#player-controls");
const playButton = document.querySelector("#play-button");
const spotifyLink = document.querySelector("#spotify-link");

const audio = document.querySelector("#audio");


form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const search = searchInput.value.trim();

    if (!search) {
        return;
    }

    results.innerHTML = "<p>SEARCHING...</p>";

    try {

        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(search)}&entity=song&limit=5`
        );

        const data = await response.json();

        showResults(data.results);

    } catch (error) {

        results.innerHTML =
            "<p>Something went wrong. Try again.</p>";

        console.error(error);
    }

});


function showResults(songs) {

    results.innerHTML = "";

    if (songs.length === 0) {

        results.innerHTML =
            "<p>No tracks found.</p>";

        return;
    }

    songs.forEach(function(song) {

        const result = document.createElement("button");

        result.className = "song-result";
        result.type = "button";

        result.innerHTML = `
            <img
                src="${song.artworkUrl100}"
                alt=""
            >

            <span>
                <strong>${song.trackName}</strong>
                <small>${song.artistName}</small>
            </span>
        `;

        result.addEventListener("click", function() {

            loadSong(song);

        });

        results.appendChild(result);

    });

}


function loadSong(song) {

    trackTitle.textContent = song.trackName;
    artistName.textContent = song.artistName;


    // Higher resolution album artwork

    const artwork =
        song.artworkUrl100.replace(
            "100x100",
            "600x600"
        );

    albumArt.style.backgroundImage =
        `url("${artwork}")`;


    // Load preview

    audio.src = song.previewUrl;


    // Spotify search link

    const spotifySearch =
        `${song.trackName} ${song.artistName}`;

    spotifyLink.href =
        `https://open.spotify.com/search/${encodeURIComponent(spotifySearch)}`;


    controls.hidden = false;

    results.innerHTML = "";

    playButton.textContent =
        "▶ PLAY PREVIEW";

}


playButton.addEventListener("click", async function() {

    if (audio.paused) {

        try {

            await audio.play();

            cd.classList.add("playing");

            playButton.textContent =
                "Ⅱ PAUSE";

        } catch (error) {

            console.error(error);

        }

    } else {

        audio.pause();

        cd.classList.remove("playing");

        playButton.textContent =
            "▶ PLAY PREVIEW";

    }

});


audio.addEventListener("ended", function() {

    cd.classList.remove("playing");

    playButton.textContent =
        "▶ PLAY PREVIEW";

});
