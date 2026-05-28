const reciters = [
  {
    name: "مشاری راشد",
    image: "https://i.imgur.com/1.jpg",
    folder: "Alafasy_128kbps"
  },

  {
    name: "سودەیس",
    image: "https://i.imgur.com/2.jpg",
    folder: "Abdurrahmaan_As-Sudais_128kbps"
  }
];

const surahs = [
  { id: "001", name: "الفاتحة" },
  { id: "002", name: "البقرة" },
  { id: "003", name: "آل عمران" },
  { id: "004", name: "النساء" },
  { id: "005", name: "المائدة" }
];

const recitersDiv = document.getElementById("reciters");
const surahList = document.getElementById("surahList");

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const nowPlaying = document.getElementById("nowPlaying");

let currentReciter = reciters[0];
let currentIndex = 0;

function loadReciters(){

  reciters.forEach(reciter => {

    recitersDiv.innerHTML += `
      <div class="reciter-card">

        <img src="${reciter.image}"
        onclick="selectReciter('${reciter.folder}')">

        <p>${reciter.name}</p>

      </div>
    `;
  });
}

function selectReciter(folder){

  currentReciter = reciters.find(r => r.folder === folder);

  loadSurahs();
}

function loadSurahs(){

  surahList.innerHTML = "";

  surahs.forEach((surah,index)=>{

    surahList.innerHTML += `
      <div class="surah-card"
      onclick="playSurah(${index})">

        ${surah.id} - ${surah.name}

      </div>
    `;
  });
}

function playSurah(index){

  currentIndex = index;

  const surah = surahs[index];

  const url =
  `https://everyayah.com/data/${currentReciter.folder}/${surah.id}.mp3`;

  audio.src = url;

  audio.play();

  nowPlaying.innerText =
  `${surah.name} - ${currentReciter.name}`;
}

playBtn.onclick = ()=>{

  audio.play();
};

pauseBtn.onclick = ()=>{

  audio.pause();
};

nextBtn.onclick = ()=>{

  currentIndex++;

  if(currentIndex >= surahs.length){

    currentIndex = 0;
  }

  playSurah(currentIndex);
};

prevBtn.onclick = ()=>{

  currentIndex--;

  if(currentIndex < 0){

    currentIndex = surahs.length - 1;
  }

  playSurah(currentIndex);
};

loadReciters();

loadSurahs();
