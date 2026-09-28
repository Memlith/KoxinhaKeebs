export type KeyboardCategory = 'keyboard' | 'splitKeyboard' | 'macropad'

export type Keyboard = {
  id: number
  name: string
  category: KeyboardCategory
  description: string | null
  numKeys: number
  switches: string
  led: boolean | number
  hotswap: boolean | number
  avgBuildDays: number
  avgPrice: number
  finalPrice: number
  imageUrl?: string | null
  createdAt: string
}
export const keyboards = [
  {
    name: 'Tofu65',
    description: 'Um teclado mecânico customizado premium de 65% com design minimalista.',
    category: 'keyboard',
    numKeys: 68,
    led: true,
    hotswap: true,
    switches: 'Gateron Milky Yellow',
    avgBuildDays: 2,
    avgPrice: 400,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/5a/Mechanical_Keyboard.jpg',
    createdAt: new Date('2024-01-15T10:00:00Z').toISOString(),
  },
  {
    name: 'GMMK Pro',
    description: 'Um teclado premium 75% com montagem gasket (junta) e um encoder rotativo (knob).',
    category: 'keyboard',
    numKeys: 83,
    led: true,
    hotswap: true,
    switches: 'Gateron Oil King',
    avgBuildDays: 2,
    avgPrice: 450,
    imageUrl:
      'https://images.unsplash.com/photo-1562819606-b7a0ebd7e7c5?q=80&w=800&auto=format&fit=crop',
    createdAt: new Date('2024-02-10T14:30:00Z').toISOString(),
  },
  {
    name: 'Keychron Q1',
    description: 'Um teclado mecânico 75% totalmente customizável com suporte a QMK/VIA.',
    category: 'keyboard',
    numKeys: 81,
    led: true,
    hotswap: true,
    switches: 'Keychron K Pro Brown',
    avgBuildDays: 1,
    avgPrice: 430,
    imageUrl:
      'https://images.unsplash.com/photo-1760348213199-cb69ddf323d3?q=80&w=800&auto=format&fit=crop',
    createdAt: new Date('2024-03-05T09:15:00Z').toISOString(),
  },
  {
    name: 'Ergodox',
    description: 'Um teclado dividido ergonômico com layout colunar (columnar) e clusters de polegar.',
    category: 'splitKeyboard',
    numKeys: 76,
    led: true,
    hotswap: true,
    switches: 'Cherry MX Brown',
    avgBuildDays: 4,
    avgPrice: 370,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/c/cd/Ergodox_%2815322160951%29.jpg',
    createdAt: new Date('2024-04-20T16:45:00Z').toISOString(),
  },
  {
    name: 'FalbaDox',
    description: 'Um split ergonômico inspirado no ErgoDox, com switches Cherry MX e clusters de polegar.',
    category: 'splitKeyboard',
    numKeys: 76,
    led: true,
    hotswap: true,
    switches: 'Cherry MX Brown',
    avgBuildDays: 3,
    avgPrice: 410,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/58/FalbaDox_split_ergonomic_keyboard_%282015-01-29_by_mikael_altemark%29.jpg',
    createdAt: new Date('2024-05-12T11:20:00Z').toISOString(),
  },
  {
    name: 'Sofle V2',
    description: 'Um teclado dividido de 60% que possui dois encoders rotativos (knobs).',
    category: 'splitKeyboard',
    numKeys: 58,
    led: true,
    hotswap: true,
    switches: 'Gateron Yellow',
    avgBuildDays: 3,
    avgPrice: 430,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/e/eb/Split_keyboard_%28IMG_20210503_145935%29.jpg',
    createdAt: new Date('2024-06-08T13:10:00Z').toISOString(),
  },
  {
    name: 'Razer Orbweaver',
    description: 'Um keypad gamer mecânico de 20 teclas com direcional de polegar de 8 direções.',
    category: 'macropad',
    numKeys: 20,
    led: true,
    hotswap: false,
    switches: 'Razer Green',
    avgBuildDays: 1,
    avgPrice: 240,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/7b/Razer_Orbweaver_Mechanical_PC_Gaming_Keypad.jpg',
    createdAt: new Date('2024-07-01T08:00:00Z').toISOString(),
  },
  {
    name: 'Numpad USB',
    description: 'Um teclado numérico (numpad) USB standalone para entrada rápida de números.',
    category: 'macropad',
    numKeys: 17,
    led: true,
    hotswap: false,
    switches: 'Membrana',
    avgBuildDays: 1,
    avgPrice: 220,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/d/db/Numpad.JPG',
    createdAt: new Date('2024-08-15T15:30:00Z').toISOString(),
  },
  {
    name: 'TKC Numpad',
    description: 'Um teclado numérico mecânico standalone estilo Apple II, montado em kit.',
    category: 'macropad',
    numKeys: 17,
    led: true,
    hotswap: true,
    switches: 'Cherry MX Brown',
    avgBuildDays: 2,
    avgPrice: 270,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/3a/TKC_Numpad_-_top.JPG',
    createdAt: new Date('2024-09-10T17:50:00Z').toISOString(),
  },
]

export const categoryImages: Record<KeyboardCategory, string> = {
  keyboard:
    'https://upload.wikimedia.org/wikipedia/commons/5/5a/Mechanical_Keyboard.jpg',
  splitKeyboard:
    'https://upload.wikimedia.org/wikipedia/commons/c/cd/Ergodox_%2815322160951%29.jpg',
  macropad:
    'https://upload.wikimedia.org/wikipedia/commons/7/7b/Razer_Orbweaver_Mechanical_PC_Gaming_Keypad.jpg',
}