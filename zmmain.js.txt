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
    name: "Pillowtalk",
    artist: "Zayn Malik",
    image: "https://www.dropbox.com/s/io3noinfin6phdo/pillowtalk1.png?raw=1",
    path: "https://www.dropbox.com/s/fs1drv1mey5ge7v/Pillowtalk.mp3?raw=1",
  },
  {
    name: "Trampoline",
    artist: "Zayn Malik",
    image: "https://www.dropbox.com/s/oo7lmli1kovvs94/trampoline1.jpg?raw=1",
    path: "https://www.dropbox.com/s/7s9veadcpwfq4pc/Trampoline.mp3?raw=1",
  },
  {
    name: "Dusk Till Dawn",
    artist: "Zayn Malik ft. Sia",
    image: "https://www.dropbox.com/s/a8mv00i3vcr8dfn/dusktilldawn1.jpg?raw=1",
    path: "https://www.dropbox.com/s/h2o32new6ws7rse/Dusk%20till%20dawn.mp3?raw=1",
  },
  {
    name: "Let Me",
    artist: "Zayn Malik",
    image: "https://www.dropbox.com/s/b5ub5t84hlqx2vf/letme1.jpg?raw=1",
    path: "https://www.dropbox.com/s/ca107iohzc4bvwh/Let%20me.mp3?raw=1",
  },
  {
    name: "Flames",
    artist: "Zayn Malik & R3HAB & Jungleboi",
    image: "https://www.dropbox.com/s/vmc6per4d5frgut/flames1.png?raw=1",
    path: "https://www.dropbox.com/s/aswsa72bgsxxaqo/R3HAB%20%26%20ZAYN%20%26%20Jungleboi%20-%20Flames%20%28Lyric%20Video%29.mp3?raw=1",
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

