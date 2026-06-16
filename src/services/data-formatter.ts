import { AdsSkipT } from "@/database/ads-skip.entity";
import { AdsSkipsummaryT } from "@/shared/ads-skip.interface";

export class DataFormatter {
  formatPopup(adsSkips: AdsSkipT[]): AdsSkipsummaryT {
    const totalDuration = adsSkips.reduce((acc, skip) => {
      return (acc += skip.duration);
    }, 0);

    const count = adsSkips.length;
    const averageDuration = Math.round(totalDuration / count);

    return {
      totalDuration,
      averageDuration,
      count,
    };
  }

  formatMonthPopup(adsSkips: AdsSkipT[]): Record<number, AdsSkipsummaryT> {
    const monthSorted = adsSkips.reduce<Record<number, AdsSkipT[]>>(
      (acc, skip) => {
        const month = new Date(skip.timestamp).getMonth();

        if (!acc[month]) {
          acc[month] = [];
        }

        acc[month].push(skip);
        return acc;
      },
      {}
    );

    const result: Record<number, AdsSkipsummaryT> = {};

    for (const [monthStr, skips] of Object.entries(monthSorted)) {
      const month = Number(monthStr); // clé du record = number
      result[month] = this.formatPopup(skips);
    }

    return result;
  }
}
