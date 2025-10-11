import { useSuspenseQuery } from "@tanstack/react-query";
import { BrowserClient } from "./browser.client";
import { BackgroundListener } from "@/shared/listener.constant";
import { DatabaseStatus } from "@/database/engine";

const browserClient = new BrowserClient();

const getDatabaseStatus = () => {
  return browserClient.get(BackgroundListener.GET_DATABASE_STATUS);
};

export const useDatabaseStatusSuspenseQuery = () =>
  useSuspenseQuery<DatabaseStatus>({
    queryKey: ["database", "status"],
    queryFn: getDatabaseStatus,
  });
