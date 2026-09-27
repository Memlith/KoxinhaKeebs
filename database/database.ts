import type { SQLiteDatabase } from 'expo-sqlite'
import { initialKeyboards } from '../data/initialKeyboards'

const DATABASE_VERSION = 2

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

  const columns = await db.getAllAsync<{ name: string }>('PRAGMA table_info(keyboards)')
  const hasImageUrl = columns.some((column) => column.name === 'imageUrl')

  if (!hasImageUrl) {
    await db.execAsync('ALTER TABLE keyboards ADD COLUMN imageUrl TEXT')
  }

  const versionResult = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  )
  const currentVersion = versionResult?.user_version ?? 0

  if (currentVersion < 1) {
    await db.execAsync(`
      DELETE FROM orders;
      DELETE FROM keyboards;
      PRAGMA user_version = 1;
    `)
  }

  if (currentVersion < DATABASE_VERSION) {
    const countResult = await db.getFirstAsync<{ total: number }>(
      'SELECT COUNT(*) as total FROM keyboards'
    )

    if (countResult?.total === 0) {
      for (const keyboard of initialKeyboards) {
        await db.runAsync(
          `INSERT INTO keyboards
            (name, description, category, numKeys, led, hotswap, switches, avgBuildDays, avgPrice, finalPrice, imageUrl)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          keyboard.name,
          keyboard.description,
          keyboard.category,
          keyboard.numKeys,
          keyboard.led ? 1 : 0,
          keyboard.hotswap ? 1 : 0,
          keyboard.switches,
          keyboard.avgBuildDays,
          keyboard.avgPrice,
          keyboard.finalPrice,
          keyboard.imageUrl,
        )
      }
    }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`)
  }
}
