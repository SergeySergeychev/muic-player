const image = document.querySelector("img");
const title = document.getElementById("title");
const songArtist = document.getElementById("artist");
//Audio player
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
// Buttons
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// Current Song
let songIndex = 0;
// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Update Players DOM
function loadSong({ displayName, artist, name }) {
  title.textContent = displayName;
  songArtist.textContent = artist;
  music.src = `./music/${name}.mp3`;
  image.src = `./img/${name}.jpg`;
}

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    updateBar(duration, currentTime);
    updateDuration(duration);
    updateCurrTime(currentTime);
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const currentTime = (music.currentTime =
    (e.offsetX / this.clientWidth) * music.duration);
  updateCurrTime(currentTime);
  updateBar(music.duration, currentTime);
}

//////////////////// UPDATE PROGRESS BARS - HELPER FUNCTIONS///////////////////////////

// Update progress bar width
function updateBar(duration, currentTime) {
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
// Calculate song duration time and display.
function updateDuration(duration) {
  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = String(Math.floor(duration % 60));
  durationSeconds = durationSeconds.padStart(2, "0");
  if (durationSeconds && durationMinutes) {
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}
// Display audio files current time
function updateCurrTime(currentTime) {
  // Calculate and display current time.
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = String(Math.floor(currentTime % 60));
  currentSeconds = currentSeconds.padStart(2, "0");
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}

////////////////////// EVENT LISTENERS //////////////////////////////
// Play and pause.
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});
// Next Song
nextBtn.addEventListener("click", nextSong);
// Previous Song
prevBtn.addEventListener("click", prevSong);
// If song is ended play next Song
music.addEventListener("ended", nextSong);
// Update songs progress bar, duration time , current time and render.
music.addEventListener("timeupdate", updateProgressBar);
// Set desired time on progress bar.
progressContainer.addEventListener("click", setProgressBar);
