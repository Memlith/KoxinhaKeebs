import type { SQLiteDatabase } from 'expo-sqlite'
import { keyboardLayouts } from '../data/keyboard'

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
        imageUrl TEXT,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        keyboardId INTEGER NOT NULL,
        keyboardName TEXT NOT NULL,
        totalPrice REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    `)

  const count = await db.getFirstAsync<{ total: number }>(
    'SELECT COUNT(*) as total FROM keyboards'
  )

  if (count?.total === 0) {
    for (const keyboard of keyboardLayouts) {
      await db.runAsync(
        `INSERT INTO keyboards
          (name, description, category, numKeys, led, hotswap, switches, avgBuildDays, avgPrice, finalPrice, imageUrl, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        keyboard.name,
        keyboard.description,
        keyboard.category,
        keyboard.numKeys,
        keyboard.led ? 1 : 0,
        keyboard.hotswap ? 1 : 0,
        keyboard.switches,
        keyboard.avgBuildDays,
        keyboard.avgPrice,
        keyboard.avgPrice,
        keyboard.imageUrl ?? null,
        keyboard.createdAt,
      )
    }
  }
}
