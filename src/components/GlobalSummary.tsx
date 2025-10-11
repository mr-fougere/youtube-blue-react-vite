import { useAdsSkipsGlobalSummaryQuery } from "@/queries/ads-skips.query";
import { AdsSkipSummary } from "./AdsSkipSummary";

export function GlobalSummary() {
  const { data, isPending } = useAdsSkipsGlobalSummaryQuery();

  return (
    <div className="flex-1 p-2 gap-2 flex flex-col">
      <AdsSkipSummary data={data} isPending={isPending} />
    </div>
  );
}
