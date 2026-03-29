import * as schema from "./drizzle.schema";
import { ConfigType } from "../config";
import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Database from "better-sqlite3";
import { eq, sql } from "drizzle-orm";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";


@Injectable()
export class DrizzleService implements OnModuleDestroy {

  private db: BetterSQLite3Database<typeof schema>;
  private dirver: Database.Database;

  constructor(private readonly config: ConfigService<ConfigType>) {
    this.dirver = new Database(config.get("dbPath"));
    // Настройки для sqlite
    this.dirver.pragma("foreign_keys = ON");
    this.dirver.pragma("journal_mode = WAL");
    this.dirver.pragma("synchronous = NORMAL");
    this.db = drizzle(this.dirver, { schema });
  }

  onModuleDestroy() {
    this.dirver.close();
  }

  createResource(newRes: schema.InsertResource): Promise<schema.SelectResource[]> {
    return this.db.insert(schema.resources).values(newRes).returning();
  }

  getResource(slug: string): Promise<schema.SelectResource[]> {
    return this.db.select().from(schema.resources).where(eq(schema.resources.slug, slug));
  }

  getResources(): Promise<schema.SelectResource[]> {
    return this.db.select().from(schema.resources);
  }

  deleteResource(slug: string) {
    return this.db.delete(schema.resources).where(eq(schema.resources.slug, slug));
  }

  createLog(slug: string, type: string, content: string) {
    const resourceIdField = sql.identifier(schema.logs.resourceId.name);
    const typeField = sql.identifier(schema.logs.type.name);
    const contentField = sql.identifier(schema.logs.content.name);
    return this.db.all(sql`
      INSERT INTO ${schema.logs} (${resourceIdField}, ${typeField}, ${contentField})
      SELECT ${schema.resources.id}, ${type}, ${content}
      FROM ${schema.resources}
      WHERE ${schema.resources.slug} = ${slug}
      RETURNING *
    `);
  }

  getLogsStat(slug: string) {
    const req = sql`
      WITH RECURSIVE
        HoursCTE(hour) AS (
          SELECT unixepoch() - (unixepoch() % 3600)
          UNION ALL
          SELECT hour - 3600
          FROM HoursCTE
          WHERE hour > (unixepoch() - 167 * 3600)
        ),
        LogsCTE(received_at, type) AS (
          SELECT received_at, type
          FROM logs AS l
          INNER JOIN resources AS r ON l.resource_id = r.id AND r.slug = ${slug}
        )
        SELECT 
          hour,
          COUNT(CASE WHEN logs.type = 'info' THEN 1 END) AS info,
          COUNT(CASE WHEN logs.type = 'warning' THEN 1 END) AS warning,
          COUNT(CASE WHEN logs.type = 'success' THEN 1 END) AS success,
          COUNT(CASE WHEN logs.type = 'error' THEN 1 END) AS error
        FROM HoursCTE
        LEFT JOIN logs ON HoursCTE.hour = (logs.received_at - logs.received_at % 3600)
        GROUP BY hour
        ORDER BY hour
    `;
    return this.db.all(req);
  }

  // savePingResult(pingResult: INewPing) {
  //   return this.db.insert(schema.pings).values(pingResult);
  // }

}