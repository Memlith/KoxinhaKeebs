export type InitialKeyboard = {
  name: string
  description: string
  category: 'keyboard' | 'splitKeyboard' | 'macropad'
  numKeys: number
  led: boolean
  hotswap: boolean
  switches: string
  avgBuildDays: number
  avgPrice: number
  finalPrice: number
  imageUrl: string
}

export const initialKeyboards: InitialKeyboard[] = [
  {
    name: 'SINGAKBD Kohaku',
    description: 'Lubed (TriboSys 3204) Cherry MX Black switches, with 53g springs and switch films, mounted on an aluminum full plate.',
    category: 'keyboard',
    numKeys: 67,
    led: true,
    hotswap: false,
    switches: 'Cherry MX Black',
    avgBuildDays: 3,
    avgPrice: 2700,
    finalPrice: 3000,
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/5f68da90297b94613c756dd6/1722434972132-XC43JQ645BXNDBGRRS9W/LXI09834+1+65%25.jpg?format=1500w',
  },
  {
    name: 'Chocofi',
    description: 'Chocofi with White PBT Choc Keycaps and Nice!Nano MCU controller.',
    category: 'splitKeyboard',
    numKeys: 36,
    led: false,
    hotswap: true,
    switches: 'White Choc',
    avgBuildDays: 3,
    avgPrice: 650,
    finalPrice: 650,
    imageUrl: 'https://i.pinimg.com/1200x/8e/f0/4c/8ef04cf4033b8747d8956173c6193155.jpg',
  },
  {
    name: 'Macropad',
    description: 'Macropad com display.',
    category: 'macropad',
    numKeys: 7,
    led: true,
    hotswap: false,
    switches: 'Gateron Blue',
    avgBuildDays: 1,
    avgPrice: 250,
    finalPrice: 300,
    imageUrl: 'https://i.pinimg.com/1200x/2d/22/48/2d22486052d0888e85c90e09bb30a30c.jpg',
  },
  {
    name: 'Teclado Multi TC193 ABNT Preto USB 1,2m TF100',
    description: 'Interface: USB. Padrão: Brasileiro ABNT2 com Ç. Tipo: Membrana resistente à água.',
    category: 'keyboard',
    numKeys: 107,
    led: false,
    hotswap: false,
    switches: 'Membrana',
    avgBuildDays: 3,
    avgPrice: 25,
    finalPrice: 20,
    imageUrl: 'https://cdn.iset.io/assets/35158/produtos/1608/tc193-01.jpg',
  },
]
