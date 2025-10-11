import { AdsSkipT } from "@/database/ads-skip.entity";
import { getBrowserInstance } from "@/helpers/utils";
import { BackgroundListener } from "@/shared/listener.constant";

const ADS_MODULE_CLASSES = ".video-ads.ytp-ad-module";
const ADS_PREVIEW_CLASSES =
  ".ytp-ad-player-overlay-layout__skip-or-preview-container";
const DEFAULT_AD_TIME = 5; // in seconds
const SKIP_AD_BUTTON = ".ytp-skip-ad-button";

export class AdsSkipper {
  private adModule: HTMLDivElement | null = null;
  private player: HTMLDivElement | null = null;
  private videoPlayer: HTMLVideoElement | null = null;
  private active = true;
  private readonly browser = getBrowserInstance();

  constructor() {}

  setPlayers(player: HTMLDivElement, videoPlayer: HTMLVideoElement) {
    this.player = player;
    this.videoPlayer = videoPlayer;
    this.adModule = player.querySelector<HTMLDivElement>(ADS_MODULE_CLASSES);
  }

  forwardAdVideo = () => {
    if (!this.videoPlayer) return;

    this.videoPlayer.currentTime = this.videoPlayer.duration;
    this.videoPlayer.play();
    return { skippedDuration: Math.ceil(this.videoPlayer.duration) };
  };

  skipAd = () => {
    if (!this.active) return;
    if (!this.player) return;
    if (!this.videoPlayer) return;

    if (!this.adModule) return;

    const adPlayer = this.adModule.querySelector(ADS_PREVIEW_CLASSES);
    if (!adPlayer) return;

    const result = this.forwardAdVideo();

    if (result) {
      this.addNewSkip(result.skippedDuration);
    }

    // TODO : found solution to click on skip button add
    /*
      
    setTimeout(() => {
      if (!this.adModule) return;

      const skipButton = this.adModule.querySelector(
        SKIP_AD_BUTTON
      ) as HTMLElement | null;

      console.log("skip-button", skipButton);

      if (!skipButton) return;
      const mouseOverEvent = new MouseEvent("mouseover", {
        bubbles: true,
        cancelable: false,
        view: window,
      });

      skipButton.dispatchEvent(mouseOverEvent);

      skipButton.click();
    }, 50);
      
    */
  };

  addNewSkip(duration: number) {
    const data: AdsSkipT = {
      duration: duration,
      timestamp: new Date().getTime(),
    };

    const message = {
      action: BackgroundListener.ADD_NEW_ADS_SKIP,
      data,
    };

    this.browser.runtime
      .sendMessage(message)
      .catch(() => setTimeout(() => this.addNewSkip(duration), 1000));
  }
}
