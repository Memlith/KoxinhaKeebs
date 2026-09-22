export type KeyboardCategory = 'keyboard' | 'splitKeyboard' | 'macropad'

export interface KeyboardLayout {
  id: string
  name: string
  description: string
  category: KeyboardCategory
  numKeys: number
  led: boolean
  hotswap: boolean
  switches: string
  avgBuildDays: number
  avgPrice: number
  createdAt: string
}

export const keyboardLayouts: KeyboardLayout[] = [
  {
    id: 'kb-1',
    name: 'Tofu65',
    description: 'Um teclado mecânico customizado premium de 65% com design minimalista.',
    category: 'keyboard',
    numKeys: 68,
    led: true,
    hotswap: true,
    switches: 'Gateron Milky Yellow',
    avgBuildDays: 2,
    avgPrice: 400,
    createdAt: new Date('2024-01-15T10:00:00Z').toISOString(),
  },
  {
    id: 'kb-2',
    name: 'GMMK Pro',
    description: 'Um teclado premium 75% com montagem gasket (junta) e um encoder rotativo (knob).',
    category: 'keyboard',
    numKeys: 83,
    led: true,
    hotswap: true,
    switches: 'Gateron Oil King',
    avgBuildDays: 2,
    avgPrice: 450,
    createdAt: new Date('2024-02-10T14:30:00Z').toISOString(),
  },
  {
    id: 'kb-3',
    name: 'Keychron Q1',
    description: 'Um teclado mecânico 75% totalmente customizável com suporte a QMK/VIA.',
    category: 'keyboard',
    numKeys: 81,
    led: true,
    hotswap: true,
    switches: 'Keychron K Pro Brown',
    avgBuildDays: 1,
    avgPrice: 430,
    createdAt: new Date('2024-03-05T09:15:00Z').toISOString(),
  },
  {
    id: 'sk-1',
    name: 'Corne (CRKB)',
    description: 'Um popular teclado dividido (split) de 40% com layout colunar e suporte opcional a telas OLED.',
    category: 'splitKeyboard',
    numKeys: 42,
    led: true,
    hotswap: true,
    switches: 'Kailh Choc V1 Red',
    avgBuildDays: 4,
    avgPrice: 370,
    createdAt: new Date('2024-04-20T16:45:00Z').toISOString(),
  },
  {
    id: 'sk-2',
    name: 'Lily58 Pro',
    description: 'Um teclado dividido de 58 teclas com uma fileira de números e telas OLED.',
    category: 'splitKeyboard',
    numKeys: 58,
    led: true,
    hotswap: true,
    switches: 'Kailh Box White',
    avgBuildDays: 3,
    avgPrice: 410,
    createdAt: new Date('2024-05-12T11:20:00Z').toISOString(),
  },
  {
    id: 'sk-3',
    name: 'Sofle V2',
    description: 'Um teclado dividido de 60% que possui dois encoders rotativos (knobs).',
    category: 'splitKeyboard',
    numKeys: 58,
    led: true,
    hotswap: true,
    switches: 'Gateron Yellow',
    avgBuildDays: 3,
    avgPrice: 430,
    createdAt: new Date('2024-06-08T13:10:00Z').toISOString(),
  },
  {
    id: 'mp-1',
    name: 'BDN9',
    description: 'Um macropad versátil de 9 teclas com opções para encoders rotativos.',
    category: 'macropad',
    numKeys: 9,
    led: true,
    hotswap: true,
    switches: 'Gateron Red',
    avgBuildDays: 1,
    avgPrice: 240,
    createdAt: new Date('2024-07-01T08:00:00Z').toISOString(),
  },
  {
    id: 'mp-2',
    name: 'Pikatea Macropad',
    description: 'Um macropad de 5 teclas projetado para ser montado debaixo de uma mesa ou monitor.',
    category: 'macropad',
    numKeys: 5,
    led: true,
    hotswap: true,
    switches: 'Kailh Box White',
    avgBuildDays: 1,
    avgPrice: 220,
    createdAt: new Date('2024-08-15T15:30:00Z').toISOString(),
  },
  {
    id: 'mp-3',
    name: 'Nullbits TIDBIT',
    description: 'Um teclado numérico e macropad de 19 teclas com estética retrô e vintage.',
    category: 'macropad',
    numKeys: 19,
    led: false,
    hotswap: false,
    switches: 'Cherry MX Brown',
    avgBuildDays: 2,
    avgPrice: 270,
    createdAt: new Date('2024-09-10T17:50:00Z').toISOString(),
  },
]
