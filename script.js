document.addEventListener('DOMContentLoaded', function(event) {

  document.getElementById('card1').scrollIntoView();
  var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      keyboard: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 100,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
     },
  });

});


document.addEventListener('DOMContentLoaded', function(event) {
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

  var start = function(num) {
      var audio = document.querySelectorAll('audio');
      var ctx = new AudioContext();
      var analyser = ctx.createAnalyser();
      var audioSrc = ctx.createMediaElementSource(audio[num]);
      // we have to connect the MediaElementSource with the analyser
      audioSrc.connect(analyser);
      analyser.connect(ctx.destination);
      // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
      // analyser.fftSize = 64;
      // frequencyBinCount tells you how many values you'll receive from the analyser
      var frequencyData = new Uint8Array(analyser.frequencyBinCount);

      // we're ready to receive some data!
      var canvas = document.querySelectorAll('canvas'),
          cwidth = canvas[num].width,
          cheight = canvas[num].height - 2,
          meterWidth = 2, //width of the meters in the spectrum
          gap = 1, //gap between meters
          capHeight = 2,
          capStyle = '#fff',
          meterNum = 150 / (2), //count of the meters
          capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
      ctx = canvas[num].getContext('2d'),
      gradient = ctx.createLinearGradient(0, 0, 0, 300);

      // loop
      function renderFrame() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var step = Math.round(array.length / meterNum); //sample limited data from the total array
          ctx.clearRect(0, 0, cwidth, cheight);
          for (var i = 0; i < meterNum; i++) {
              var value = array[i * step *.5];
              if (capYPositionArray.length < Math.round(meterNum)) {
                  capYPositionArray.push(value);
              };
              ctx.fillStyle = capStyle;
              //draw the cap, with transition effect
              ctx.fillRect(i * 6 /*meterWidth+gap*/ , cheight - value*.125 + capHeight, meterWidth, cheight); //the meter
          }
          requestAnimationFrame(renderFrame);
      }
      renderFrame();
      // audio.play();
  };

  for (let i = 0; i < 3; i++){
      audio[i].onplay = function(){
          start(i);
      }
  }
})


document.addEventListener('DOMContentLoaded', function(event) {

  const bgArray = [
    "url(https://images.unsplash.com/photo-1507471509451-1d04d60f896d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80)",
    "url(https://images.unsplash.com/photo-1615012553971-f7251c225e01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80)",
    "url(https://images.unsplash.com/photo-1535868463750-c78d9543614f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80)",
    "url(https://images.unsplash.com/photo-1609894851180-7be27983da7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80)",
    "url(https://images.unsplash.com/photo-1559552440-8e17304991e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80)",
    "url(https://images.unsplash.com/photo-1515658323406-25d61c141a6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1909&q=80)",
    "url(https://images.unsplash.com/photo-1476370648495-3533f64427a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80)",
    "url(https://images.unsplash.com/photo-1629197680187-d75229c25190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80)",
    "url(https://images.unsplash.com/photo-1531816458010-fb7685eecbcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80)",
    "url(https://images.unsplash.com/photo-1570284613060-766c33850e00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80)",
    "url(https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80)",
    "url(https://plus.unsplash.com/premium_photo-1661899053699-f49eb65ca6a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1767&q=80)",
    "url(https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1828&q=80)",
    "url(https://images.unsplash.com/photo-1543157145-f78c636d023d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80)",
    "url(https://images.unsplash.com/photo-1503796964332-e25e282e390f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80)"

  ];

  const progress_bar = document.querySelectorAll(`#progress_bar`);
  const song = document.querySelectorAll(`#audio`);
  const button_icon = document.querySelectorAll(`#button_icon`);
  const button = document.querySelectorAll(`#button`);
  const next = document.querySelectorAll(`#nextS`);
  const prev = document.querySelectorAll(`#prevS`);
  const bg = document.querySelector(`body`);
  //change i to card number
  for (let i = 0; i < 3; i++){
    prev[i].addEventListener("click", function(event){
      pause(i);
      play(i-1);
      change_bg(i-1);
    });

    next[i].addEventListener("click", function(event){
      pause(i);
      play(i+1);
      change_bg(i+1);
    });

    button[i].addEventListener("click", function(event){
      play_pause(i);
    });
    song[i].addEventListener("loadedmetadata", function(event){
      progress_bar[i].max = song[i].duration;
      progress_bar[i].value = song[i].currentTime;
    });
    progress_bar[i].addEventListener("change", function(){
      progress_change(i);
    });


    if(song[i].paused) {
      setInterval(()=>{progress_bar[i].value = song[i].currentTime;},
      500);
    };
    if(progress_bar[i].value == song[i].duration) {
      pause(i);
      play(i+1);
      change_bg(i+1);
    }
  };

  function play_pause(num){
    if (button_icon[num].classList.contains("fa-play")){
      song[num].play();
      button_icon[num].classList.remove("fa-play");
      button_icon[num].classList.add("fa-pause");
    }else if (button_icon[num].classList.contains("fa-pause")){
        song[num].pause();
        button_icon[num].classList.remove("fa-pause");
        button_icon[num].classList.add("fa-play");
    }
  };

  function play(num){
    song[num].play();
    button_icon[num].classList.remove("fa-play");
    button_icon[num].classList.add("fa-pause");
  };

  function pause(num){
    song[num].pause();
    button_icon[num].classList.remove("fa-pause");
    button_icon[num].classList.add("fa-play");
  };

  function progress_change(num){
    song[num].play();
    song[num].currentTime = progress_bar[num].value;
    button_icon[num].classList.remove("fa-play");
    button_icon[num].classList.add("fa-pause");
  };

  function change_bg(num){
    let pathname = window.location.pathname;
    let index = pathname.match(/\d+/g) - 1;
    bg.style.background = bgArray[num + (3 * index)];
    bg.style.backgroundSize = 'cover';
  };

});
