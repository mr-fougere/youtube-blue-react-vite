import { AdsSkipEntity, AdsSkipT } from "./ads-skip.entity";

export enum DatabaseStatus {
  NOT_READY = "not_ready",
  ERROR = "error",
  READY = "ready",
}

export type DataType = AdsSkipT;

export type MappingDataTableName = {
  "ads-skip": AdsSkipT;
};

export class DatabaseEngine {
  private db: IDBDatabase | null;
  public status = DatabaseStatus.NOT_READY;

  constructor(
    private readonly dbName: string = "youtube-blue",
    private version: number = 1
  ) {
    this.db = null;
  }

  // Ouvrir la base de données
  async openDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);

      request.onsuccess = () => {
        this.db = request.result;
        this.version = this.db.version;
        this.status = DatabaseStatus.READY;
        resolve();
      };

      request.onerror = (event) => {
        this.status = DatabaseStatus.ERROR;
        reject(
          `Erreur lors de l'ouverture de la base de données: ${
            (event.target as IDBRequest).error
          }`
        );
      };
    });
  }

  // Fermer la base de données
  closeDB(): void {
    if (this.db) {
      this.db.close();
      this.status = DatabaseStatus.NOT_READY;
      this.db = null;
    }
  }

  // Récupérer des éléments par index
  async getItems<T>(
    tableName: string,
    indexName: string,
    value: IDBValidKey | IDBKeyRange
  ): Promise<T[] | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Base de données non ouverte");
        return;
      }

      const transaction = this.db.transaction([tableName], "readonly");
      const store = transaction.objectStore(tableName);

      const index = store.index(indexName + "Index");
      const request = index.getAll(value);

      request.onsuccess = () => {
        resolve(request.result ? request.result : null);
      };

      request.onerror = (event) => {
        reject(
          `Erreur lors de la récupération de l'élément par index: ${
            (event.target as IDBRequest).error
          }`
        );
      };
    });
  }

  // Récupérer tous les éléments
  async getAllItems(): Promise<DataType[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Base de données non ouverte");
        return;
      }

      const transaction = this.db.transaction(
        this.db.objectStoreNames,
        "readonly"
      );
      const records: DataType[][] = [];

      transaction.oncomplete = () => {
        resolve(records.flat());
      };

      transaction.onerror = (event) => {
        reject(
          `Erreur lors de la récupération des enregistrements: ${
            (event.target as IDBRequest).error
          }`
        );
      };

      Array.from(this.db.objectStoreNames).forEach((storeName) => {
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
          records.push((event.target as IDBRequest<DataType[]>).result);
        };
      });
    });
  }

  // Ajouter un élément dans la base de données
  async addItem<T extends keyof MappingDataTableName>(
    item: MappingDataTableName[T],
    tableName: T
  ): Promise<MappingDataTableName[T]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Base de données non ouverte");
        return;
      }

      const transaction = this.db.transaction([tableName], "readwrite");
      const store = transaction.objectStore(tableName);

      const request = store.add(item);

      request.onsuccess = () => {
        // Résoudre avec l'élément ajouté
        resolve(item);
      };

      request.onerror = (event) => {
        reject(
          `Erreur lors de l'ajout de l'élément: ${
            (event.target as IDBRequest).error
          }`
        );
      };
    });
  }

  // Mettre à jour un élément dans la base de données
  async updateItem<T>(
    itemId: IDBValidKey,
    updatedData: Partial<T>,
    tableName: string
  ): Promise<T | string> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Base de données non ouverte");
        return;
      }

      const transaction = this.db.transaction([tableName], "readwrite");
      const store = transaction.objectStore(tableName);

      const getRequest = store.get(itemId);

      getRequest.onsuccess = () => {
        const existingItem = getRequest.result;
        if (existingItem) {
          Object.assign(existingItem, updatedData);
          const updateRequest = store.put(existingItem);

          updateRequest.onsuccess = () => {
            resolve(existingItem);
          };

          updateRequest.onerror = (event) => {
            reject(
              `Erreur lors de la mise à jour de l'élément: ${
                (event.target as IDBRequest).error
              }`
            );
          };
        } else {
          reject(`Aucun élément trouvé avec l'ID ${itemId}`);
        }
      };

      getRequest.onerror = (event) => {
        reject(
          `Erreur lors de la récupération de l'élément: ${
            (event.target as IDBRequest).error
          }`
        );
      };
    });
  }

  // Supprimer un élément de la base de données
  async deleteItem(itemId: IDBValidKey, tableName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Base de données non ouverte");
        return;
      }

      const transaction = this.db.transaction([tableName], "readwrite");
      const store = transaction.objectStore(tableName);

      const request = store.delete(itemId);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject(
          `Erreur lors de la suppression de l'élément: ${
            (event.target as IDBRequest).error
          }`
        );
      };
    });
  }

  // Mettre à jour la version de la base de données et créer une table
  async updateVersionAndCreateTable(
    tableName: string,
    indexDefinition: Record<string, IDBIndexParameters> | null
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("Base de données non ouverte");
        return;
      }

      this.closeDB();
      this.version++;

      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest).result;

        if (!db.objectStoreNames.contains(tableName)) {
          const objectStore = db.createObjectStore(tableName, {
            keyPath: "id",
            autoIncrement: true,
          });

          if (indexDefinition) {
            for (const indexName in indexDefinition) {
              const indexProperties = indexDefinition[indexName];
              objectStore.createIndex(
                indexName + "Index",
                indexName,
                indexProperties
              );
            }
          }
        } else {
          // Si la table existe déjà, on revient à la version précédente pour éviter un appel superflu
          this.version--;
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBRequest).result;
        resolve();
      };

      request.onerror = (event) => {
        reject(
          `Erreur lors de la mise à jour de la version et de la création de la table: ${
            (event.target as IDBRequest).error
          }`
        );
      };
    });
  }

  async createTables(): Promise<boolean> {
    for (const table of [AdsSkipEntity]) {
      await this.updateVersionAndCreateTable(table.name, table.config);
    }

    return true;
  }
}
