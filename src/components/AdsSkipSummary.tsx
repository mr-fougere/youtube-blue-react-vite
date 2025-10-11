import { AdsSkipsummaryT } from "@/shared/ads-skip.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faForward,
  faHourglassHalf,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { timeConverter } from "@/helpers/utils";

type AdsSkipSummaryProps = {
  data?: AdsSkipsummaryT;
  isPending: boolean;
};

export function AdsSkipSummary({ data, isPending }: AdsSkipSummaryProps) {
  const averageAdsTime = timeConverter(data?.averageDuration || 0);
  const totalAdsTime = timeConverter(data?.totalDuration || 0);

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-second-blue flex-1 gap-2 flex flex-col text-white items-center justify-center p-2 rounded-sm">
        <FontAwesomeIcon icon={faForward} />
        <div className="text-center text-xs">Skipped Ads</div>
        <div className="bg-white text-second-blue rounded-sm mx-auto font-bold w-full text-center">
          {isPending ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            data?.count || 0
          )}
        </div>
      </div>
      <div className="bg-second-blue flex-1 gap-2 flex flex-col text-white items-center justify-center p-2 rounded-sm">
        <FontAwesomeIcon icon={faHourglassHalf} />
        <div className="text-center text-xs">Average Ads Time</div>
        <div className="bg-white text-second-blue rounded-sm mx-auto font-bold w-full text-center">
          {isPending ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            averageAdsTime
          )}
        </div>
      </div>
      <div className="bg-second-blue flex-1 gap-2 flex flex-col text-white items-center justify-center p-2 rounded-sm">
        <FontAwesomeIcon icon={faBullhorn} />
        <div className="text-center text-xs">Total Ads Time</div>
        <div className="bg-white text-second-blue rounded-sm mx-auto font-bold w-full text-center">
          {isPending ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            totalAdsTime
          )}
        </div>
      </div>
    </div>
  );
}
