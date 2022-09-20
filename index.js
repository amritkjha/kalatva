let songIndex = 0;
let audioElement = new Audio('music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressbar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSong = document.getElementById('masterSong');
let songItems = Array.from(document.getElementsByClassName("songItem"));
let prevButt = document.getElementById("prev-butt");
let nextButt = document.getElementById("next-butt");

let songs = [
	{songName: "Levels - Sidhu Moosewala", coverPath: "img/cover1.jpg", filePath: "music/1.mp3", duration: "03:48"},
	{songName: "Yaaran Ki Rees - Ndee Kundu", coverPath: "img/cover2.jpg", filePath: "music/2.mp3", duration: "02:49"},
	{songName: "Bholenath - Kaka Wrld", coverPath: "img/cover3.jpg", filePath: "music/3.mp3", duration: "05:21"},
	{songName: "295 - Sidhu Moosewala", coverPath: "img/cover4.jpg", filePath: "music/4.mp3", duration: "04:32"},
	{songName: "Parche - Karaj Randhawa", coverPath: "img/cover5.jpg", filePath: "music/5.mp3", duration: "03:20"},
	{songName: "Sarkar - Jaura Phagwara", coverPath: "img/cover6.jpg", filePath: "music/6.mp3", duration: "03:30"}
]

songItems.forEach((element, i) => {
	element.getElementsByTagName("img")[0].src = songs[i].coverPath;
	element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
	element.getElementsByClassName("dur")[0].innerText = songs[i].duration;
})

const makeAllPlays = () => {
	Array.from(document.getElementsByClassName('songItemPlay')).forEach(element =>{
		element.classList.remove('fa-pause-circle');
		element.classList.add('fa-play-circle');
	})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
	element.addEventListener('click', (e) => {
		makeAllPlays();
		songIndex = parseInt(e.target.id);
		e.target.classList.remove('fa-play-circle');
		e.target.classList.add('fa-pause-circle');
		audioElement.src = `music/${songIndex+1}.mp3`;
		audioElement.currentTime = 0;
		audioElement.play();
		masterSong.innerText = songs[songIndex].songName;
		gif.style.opacity = 1;
		masterPlay.classList.remove('fa-play-circle');
		masterPlay.classList.add('fa-pause-circle');
	})
})

masterPlay.addEventListener('click', () => {
	if (audioElement.paused || audioElement.currentTime<=0) 
	{
		audioElement.play();
		masterPlay.classList.remove('fa-play-circle');
		masterPlay.classList.add('fa-pause-circle');
		gif.style.opacity = 1;
	}
	else
	{
		audioElement.pause();
		masterPlay.classList.remove('fa-pause-circle');
		masterPlay.classList.add('fa-play-circle');
		makeAllPlays();
		gif.style.opacity = 0;
	}
})

audioElement.addEventListener('timeupdate', () => {
	progress = parseInt(audioElement.currentTime/audioElement.duration*100);
	console.log(progress);
	progressbar.value = progress;
})

progressbar.addEventListener('change', () => {
	audioElement.currentTime = (progressbar.value*audioElement.duration)/100;
})

prevButt.addEventListener('click', () => {
	if(songIndex <= 0)
	{
		songIndex = 5;
	}
	else
	{
		songIndex-=1;
	}

	audioElement.src = `${songIndex+1}.mp3`;
	audioElement.currentTime = 0;
	audioElement.play();
	makeAllPlays();
	masterSong.innerText = songs[songIndex].songName;
	gif.style.opacity = 1;
	masterPlay.classList.remove('fa-play-circle');
	masterPlay.classList.add('fa-pause-circle');
})

nextButt.addEventListener('click', () => {
	if(songIndex >= 5)
	{
		songIndex = 0;
	}
	else
	{
		songIndex+=1;
	}

	audioElement.src = `${songIndex+1}.mp3`;
	audioElement.currentTime = 0;
	audioElement.play();
	makeAllPlays();
	masterSong.innerText = songs[songIndex].songName;
	gif.style.opacity = 1;
	masterPlay.classList.remove('fa-play-circle');
	masterPlay.classList.add('fa-pause-circle');
})
