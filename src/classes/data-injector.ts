import { DatabaseEngine, MappingDataTableName } from "@/database/engine";

export class DataInjector extends DatabaseEngine {
  constructor() {
    super();
  }

  public async add<T extends keyof MappingDataTableName>(
    item: MappingDataTableName[T],
    tableName: T
  ): Promise<MappingDataTableName[T]> {
    await this.openDB();
    return new Promise((resolve, reject) => {
      this.addItem<T>(item, tableName)
        .then((item) => {
          resolve(item);
        })
        .catch((e) => {
          console.error(e);
          reject();
        });
    });
  }
}
