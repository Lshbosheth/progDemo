const songList = [
    {
        name: '枫',
        artist: '周杰伦',
        src: './assets/枫.mp3',
        cover: './assets/1.webp'
    },
    {
        name: 'Love Story',
        artist: 'Taylor Swift',
        src: './assets/Love Story.mp3',
        cover: './assets/2.webp'
    }
]

const artistName = document.querySelector('.artist-name')
const songName = document.querySelector('.song-name')
const fillBar = document.querySelector('.fill-bar')
const time = document.querySelector('.time')
const cover = document.getElementById('cover')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const progressBar = document.querySelector('.progress-bar')


let song = new Audio()
let currentSong = 0
let playing = false
document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong)
    song.addEventListener('timeupdate', updateProgress)
    song.addEventListener('ended', nextSong)
    prevBtn.addEventListener('click', prevSong)
    nextBtn.addEventListener('click', nextSong)
    playBtn.addEventListener('click', togglePlay)
    progressBar.addEventListener('click', seek)
})

function loadSong(songIndex) {
    song.src = songList[songIndex].src
    song.cover = songList[songIndex].cover
    song.artist = songList[songIndex].artist
    song.name = songList[songIndex].name
    cover.src = song.cover
    artistName.innerText = song.artist
    songName.innerText = song.name
    cover.style.backgroundImage = `url(${song.cover})`
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100
        fillBar.style.width = `${pos}%`
        const duration = formatTime(song.duration)
        const currentTime = formatTime(song.currentTime)
        time.innerText = `${duration}`
        time.innerText = `${currentTime} - ${duration}`
    }
}

function formatTime(sec) {
    const min = Math.floor(sec / 60)
    const secs = Math.floor(sec % 60)
    return `${min}:${secs < 10? '0' : ''}${secs}`
}

function prevSong() {
    if (currentSong > 0) {
        currentSong--
    } else {
        currentSong = songList.length - 1
    }
    playMusic()
}

function nextSong() {
    if (currentSong < songList.length - 1) {
        currentSong++
    } else {
        currentSong = 0
    }
    playMusic()
}

function togglePlay() {
    if(playing) {
        song.pause()
    } else {
        song.play()
    }
    playing = !playing
    playBtn.classList.toggle('fa-pause', playing)
    playBtn.classList.toggle('fa-play', !playing)
    cover.classList.toggle('active', playing)
}

function seek(event) {
    const pos = event.offsetX / progressBar.offsetWidth
    const duration = song.duration
    song.currentTime = (pos * duration)
}

function playMusic() {
    loadSong(currentSong)
    song.play()
    playing = true
    playBtn.classList.add('fa-pause')
    playBtn.classList.remove('fa-play')
    cover.classList.add('active')
}


