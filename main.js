let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Night Changes",
    artist: "One Direction",
    image: "https://www.dropbox.com/s/5i2o7ph3kiih1bc/a2.jpg?raw=1",
    path: "https://www.dropbox.com/s/l6574mmg3hzh47m/Night%20Changes.mp3?raw=1"
  },
  {
    name: "What Makes You Beautiful",
    artist: "One Direction",
    image: "https://www.dropbox.com/s/ztvctbx8apvdnhv/a3.jpg?raw=1",
    path: "https://www.dropbox.com/s/dnk1damwg1t6g4n/What%20Makes%20You%20Beautiful.mp3?raw=1"
  },
  {
    name: "Story Of My Life",
    artist: "One Direction",
    image: "https://www.dropbox.com/s/0zfxi6pgn21vd1i/a4.jpg?raw=1",
    path: "https://www.dropbox.com/s/tot2avzp8wvcizr/Story%20Of%20My%20Life.mp3?raw=1",
  },
  {
    name: "Midnight Memories",
    artist: "One Direction",
    image: "https://www.dropbox.com/s/0zfxi6pgn21vd1i/a4.jpg?raw=1",
    path: "https://www.dropbox.com/s/jg5wwazd2pu8l0a/Midnight%20Memories.mp3?raw=1",
  },
  {
    name: "Steal My Girl",
    artist: "One Direction",
    image: "https://www.dropbox.com/s/5i2o7ph3kiih1bc/a2.jpg?raw=1",
    path: "https://www.dropbox.com/s/quu5ag52r4yt34x/Steal%20My%20Girl.mp3?raw=1",
  },
  {
    name: "Drag Me Down",
    artist: "One Direction",
    image: "https://www.dropbox.com/s/v1elye3xlpnepk3/a5.jpg?raw=1",
    path: "https://www.dropbox.com/s/v2lcl6yhf9nla3w/Drag%20Me%20Down.mp3?raw=1",
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

