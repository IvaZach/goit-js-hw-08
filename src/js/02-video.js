import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {});

const onPlay = function (data) {
  const timeInSeconds = data.seconds;
  console.log(timeInSeconds);
  localStorage.setItem('videoplayer-current-time', timeInSeconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const currentTime = Number(localStorage.getItem('videoplayer-current-time')) ?? 0;
console.log(currentTime);

player
  .setCurrentTime(currentTime)
  .then(function () {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });

player.off('play', onPlay);
