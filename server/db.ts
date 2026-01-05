import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users, projects, siteContent, type Project, type InsertProject, type SiteContent, type InsertSiteContent } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL);
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // For PostgreSQL, use onConflict instead of onDuplicateKeyUpdate
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Projects queries
export async function getProjects(): Promise<Project[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).orderBy(desc(projects.createdAt));
}

export async function getProjectById(id: number): Promise<Project | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProject(data: InsertProject): Promise<Project | null> {
  const db = await getDb();
  if (!db) return null;
  try {
    const result = await db.insert(projects).values(data).returning();
    if (result.length === 0) return null;
    return result[0] || null;
  } catch (error) {
    console.error('[Database] Failed to create project:', error);
    return null;
  }
}

export async function updateProject(id: number, data: Partial<InsertProject>): Promise<Project | null> {
  const db = await getDb();
  if (!db) return null;
  await db.update(projects).set(data).where(eq(projects.id, id));
  const result = await getProjectById(id);
  return result || null;
}

export async function deleteProject(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.delete(projects).where(eq(projects.id, id));
  return true;
}

// Site Content queries
export async function getSiteContent(key: string): Promise<SiteContent | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(siteContent).where(eq(siteContent.key, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllSiteContent(): Promise<SiteContent[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(siteContent);
}

export async function updateSiteContent(key: string, value: string): Promise<SiteContent | null> {
  const db = await getDb();
  if (!db) return null;
  
  const existing = await getSiteContent(key);
  if (existing) {
    await db.update(siteContent).set({ value }).where(eq(siteContent.key, key));
  } else {
    await db.insert(siteContent).values({ key, value });
  }
  
  const result = await getSiteContent(key);
  return result || null;
}
