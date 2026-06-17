import { AdsSkipper } from "@/services/ads-skipper";
import { ButtonHandlerService } from "@/services/button-injector.servive";

const adsSkipper = new AdsSkipper();
const buttonHandler = new ButtonHandlerService();

const config = {
  childList: true,
  subtree: true,
};

const setupVariables = (player: HTMLDivElement) => {
  if (!player) return;

  if(!buttonHandler.buttonInjected) {
    buttonHandler.injectButton(player);
  }

  const moviePlayer = player;
  const videoPlayer = player.querySelector<HTMLVideoElement>(
    "VIDEO.video-stream.html5-main-video"
  );

  if (!videoPlayer) return;
  adsSkipper.setPlayers(moviePlayer, videoPlayer);
};

const mutationCallback = (mutations: MutationRecord[]) => {
  for (const mutation of mutations) {
    const target = mutation.target as HTMLElement;
    if (target.id == "movie_player") {
      setupVariables(target as HTMLDivElement);
    }

    if (target.classList.contains("video-ads")) {
      adsSkipper.skipAd();
    }
  }
};

const obs = new MutationObserver(mutationCallback);
obs.observe(document, config);
