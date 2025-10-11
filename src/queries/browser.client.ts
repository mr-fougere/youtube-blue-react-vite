import { getBrowserInstance } from "@/helpers/utils";
import { BackgroundListener } from "@/shared/listener.constant";

export class BrowserClient {
  private readonly browser = getBrowserInstance();

  async get(backgroundListener: BackgroundListener) {
    return this.browser.runtime.sendMessage({
      action: backgroundListener,
    });
  }

  post(backgroundListener: BackgroundListener, data: Record<any, any>) {
    return this.browser.runtime.sendMessage({
      action: backgroundListener,
      data,
    });
  }
}
