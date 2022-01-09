import err from "../../sounds/err.wav";
import success from "../../sounds/success.mp3";
import empty from "../../sounds/empty.wav";

class MultiMedia {
  vibro(time) {
    if (navigator.vibrate) {
      window.navigator.vibrate(time);
    }
  }

  errSound() {
    const errAudio = new Audio(err);
    errAudio.currentTime = 0;
    errAudio.play();
  }

  successSound() {
    const successAudio = new Audio(success);
    successAudio.currentTime = 0;
    successAudio.play();
  }
  emptySound() {
    const emptyAudio = new Audio(empty);
    emptyAudio.currentTime = 0;
    emptyAudio.play();
  }
}

export const multiMedia = new MultiMedia();
