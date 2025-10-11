import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { BrowserClient } from "./browser.client";
import { BackgroundListener } from "@/shared/listener.constant";
import { AdsSkipsummaryT } from "@/shared/ads-skip.interface";

const browserClient = new BrowserClient();

const getAdsSkipsGlobalSummary = (): Promise<AdsSkipsummaryT> => {
  return browserClient.get(BackgroundListener.GET_ADS_SKIP_GLOBAL_SUMMARY);
};

export const useAdsSkipsGlobalSummaryQuery = (
  options?: UseQueryOptions<AdsSkipsummaryT>
) =>
  useQuery<AdsSkipsummaryT>({
    queryKey: ["ads-skips", "summary", "global"],
    queryFn: getAdsSkipsGlobalSummary,
    ...options,
  });

const getAdsSkipsMonthSummary = (): Promise<
  Record<number, AdsSkipsummaryT>
> => {
  return browserClient.get(BackgroundListener.GET_ADS_SKIP_MONTH_SUMMARY);
};

export const useAdsSkipsMonthSummaryQuery = (
  options?: UseQueryOptions<Record<number, AdsSkipsummaryT>>
) =>
  useQuery<Record<number, AdsSkipsummaryT>>({
    queryKey: ["ads-skips", "summary", "month"],
    queryFn: () => getAdsSkipsMonthSummary(),
    ...options,
  });
