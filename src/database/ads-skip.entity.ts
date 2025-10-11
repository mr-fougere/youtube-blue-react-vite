export type AdsSkipT = {
  timestamp: number;
  duration: number;
};

export const AdsSkipEntity = {
  name: "ads-skip",
  config: {
    timestamp: { unique: false },
    duration: { unique: false },
  },
};
