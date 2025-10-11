import { DataFormatter } from "@/classes/data-formatter";
import { DataInjector } from "@/classes/data-injector";
import { DatabaseEngine } from "@/database/engine";
import { getBrowserInstance } from "@/helpers/utils";
import { BackgroundListener } from "@/shared/listener.constant";

const dbEngine = new DatabaseEngine();
const dataInjector = new DataInjector();
const dataFormatter = new DataFormatter();
const setup = async () => {
  try {
    await dbEngine.openDB();
    await dbEngine.createTables();
    setMessageListeners();
  } catch (error) {
    console.error(error);
  } finally {
    dbEngine.closeDB();
  }
  console.log("db setup");
};

const setMessageListeners = () => {
  const browser = getBrowserInstance();
  browser.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    console.log(request);

    if (request.action == BackgroundListener.ADD_NEW_ADS_SKIP) {
      dataInjector.add(request.data, "ads-skip");
    }

    if (request.action == BackgroundListener.GET_ADS_SKIP_GLOBAL_SUMMARY) {
      dbEngine.openDB().then(async () => {
        const items = await dbEngine.getAllItems();

        sendResponse(dataFormatter.formatPopup(items));
      });
      return true;
    }

    if (request.action == BackgroundListener.GET_DATABASE_STATUS) {
      sendResponse({ status: dbEngine.status });
    }
  });
};

setup();
