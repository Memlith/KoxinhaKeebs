import type { SQLiteDatabase } from 'expo-sqlite'

export async function startDatabase(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS keyboards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL CHECK (category IN ('keyboard', 'splitKeyboard', 'macropad')),
        numKeys INTEGER NOT NULL,
        led BOOLEAN NOT NULL,
        hotswap BOOLEAN NOT NULL,
        switches TEXT NOT NULL,
        avgBuildDays INTEGER NOT NULL,
        avgPrice INTEGER DEFAULT 0,
        finalPrice INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    `)
}
