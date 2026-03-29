import { loadEnvFile } from "node:process";
import typia from "typia";


export type ConfigType = Readonly<{
  dbPath: string
}>;

/**
 * Функция, для получения конфигурации приложения.
 */
export const getConfig = () => {
  // Манипуляции для извлечения значений из корневого .env в режиме разработки.
  if (process.env.DB_PATH === undefined) {
    loadEnvFile("../.env");
  } 
  const config: ConfigType = { dbPath: process.env.DB_PATH! };
  return typia.assert<ConfigType>(config);
};
