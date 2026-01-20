import { Product } from '../types';

// Using high-contrast, professional text-based placeholders for reliability and clarity.
// In a real production app, these would be local assets or hosted on a CDN.
const getImg = (text: string, bg: string) => 
  `https://placehold.co/400x400/${bg}/FFFFFF/png?text=${encodeURIComponent(text)}&font=roboto`;

export const products: Product[] = [
  {
    id: 'ff-diamonds',
    title: 'Free Fire Diamonds (BD)',
    category: 'Game Topup',
    image: getImg('Free Fire', 'FF6B00'),
    description: 'Instant Free Fire Diamond Top Up via Player ID. 100% Safe & Secure.',
    type: 'player_id',
    options: [
      { id: 'ff-25', name: '25 Diamonds', price: 23 },
      { id: 'ff-50', name: '50 Diamonds', price: 36 },
      { id: 'ff-115', name: '115 Diamonds', price: 80 },
      { id: 'ff-240', name: '240 Diamonds', price: 157 },
      { id: 'ff-355', name: '355 Diamonds', price: 236 },
      { id: 'ff-480', name: '480 Diamonds', price: 312 },
      { id: 'ff-505', name: '505 Diamonds', price: 349 },
      { id: 'ff-610', name: '610 Diamonds', price: 398 },
      { id: 'ff-850', name: '850 Diamonds', price: 555 },
      { id: 'ff-1090', name: '1090 Diamonds', price: 745 },
      { id: 'ff-1240', name: '1240 Diamonds', price: 795 },
      { id: 'ff-2530', name: '2530 Diamonds', price: 1609 },
      { id: 'ff-5060', name: '5060 Diamonds', price: 3219 },
      { id: 'ff-10120', name: '10120 Diamonds', price: 6383 },
      { id: 'ff-12650', name: '12650 Diamonds', price: 7978 },
      { id: 'ff-weekly', name: 'Weekly Membership', price: 155 },
      { id: 'ff-monthly', name: 'Monthly Membership', price: 775 },
    ]
  },
  {
    id: 'pubg-uc',
    title: 'PUBG Mobile UC (Global)',
    category: 'Game Topup',
    image: getImg('PUBG Mobile', '1A1A2E'),
    description: 'Top Up PUBG Mobile UC securely with Player ID. Global Server.',
    type: 'player_id',
    options: [
      { id: 'pubg-60', name: '60 UC', price: 115 },
      { id: 'pubg-120', name: '120 UC', price: 230 },
      { id: 'pubg-180', name: '180 UC', price: 345 },
      { id: 'pubg-240', name: '240 UC', price: 460 },
      { id: 'pubg-325', name: '325 UC', price: 575 },
      { id: 'pubg-660', name: '660 UC', price: 1150 },
      { id: 'pubg-1800', name: '1800 UC', price: 2865 },
      { id: 'pubg-3850', name: '3850 UC', price: 5720 },
      { id: 'pubg-8100', name: '8100 UC', price: 11450 },
    ]
  },
  {
    id: 'farlight-84',
    title: 'Farlight 84 Diamonds',
    category: 'Game Topup',
    image: getImg('Farlight 84', 'FBBF24'),
    description: 'Farlight 84 Diamond Top Up via Player ID. Fast & Secure.',
    type: 'player_id',
    options: [
      { id: 'fl-30', name: '30 Diamonds', price: 45 },
      { id: 'fl-50', name: '50 Diamonds', price: 65 },
      { id: 'fl-80', name: '80 Diamonds', price: 100 },
      { id: 'fl-100', name: '100 Diamonds', price: 120 },
      { id: 'fl-165', name: '165 Diamonds', price: 185 },
      { id: 'fl-220', name: '220 Diamonds', price: 240 },
      { id: 'fl-330', name: '330 Diamonds', price: 350 },
      { id: 'fl-880', name: '880 Diamonds', price: 925 },
      { id: 'fl-2240', name: '2240 Diamonds', price: 2350 },
      { id: 'fl-4700', name: '4700 Diamonds', price: 4700 },
    ]
  },
  {
    id: 'cod-mobile',
    title: 'Call of Duty Mobile CP',
    category: 'Game Topup',
    image: getImg('Call of Duty', '374151'),
    description: 'Call of Duty Mobile CP Top Up via Player ID.',
    type: 'player_id',
    options: [
      { id: 'cod-80', name: '80 CP', price: 125 },
      { id: 'cod-160', name: '160 CP', price: 250 },
      { id: 'cod-240', name: '240 CP', price: 375 },
      { id: 'cod-420', name: '420 CP', price: 625 },
      { id: 'cod-880', name: '880 CP', price: 1250 },
      { id: 'cod-2400', name: '2400 CP', price: 2500 },
    ]
  },
  {
    id: 'mlbb-diamonds',
    title: 'Mobile Legends (Global)',
    category: 'Game Topup',
    image: getImg('Mobile Legends', '2563EB'),
    description: 'Mobile Legends Bang Bang Diamond Top Up. Instant Delivery.',
    type: 'player_id',
    options: [
      { id: 'mlbb-11', name: '11 Diamonds', price: 20 },
      { id: 'mlbb-56', name: '56 Diamonds', price: 90 },
      { id: 'mlbb-277', name: '277 Diamonds', price: 450 },
      { id: 'mlbb-starlight', name: 'Starlight Member', price: 950 },
    ]
  },
  {
    id: 'clash-of-clans',
    title: 'Clash of Clans',
    category: 'Game Topup',
    image: getImg('Clash of Clans', 'DC2626'),
    description: 'Instant Gems via Player Tag. Supercell ID safe.',
    type: 'player_id',
    options: [
      { id: 'coc-80', name: '80 Gems', price: 95 },
      { id: 'coc-500', name: '500 Gems', price: 480 },
      { id: 'coc-pass', name: 'Gold Pass', price: 600 },
    ]
  },
  {
    id: 'netflix-card',
    title: 'Netflix Gift Card',
    category: 'Gift Cards',
    image: getImg('NETFLIX', 'E50914'),
    description: 'Netflix subscription gift cards. Code delivered to email/orders page.',
    type: 'voucher',
    options: [
      { id: 'nf-10', name: '$10 Gift Card', price: 1200 },
      { id: 'nf-25', name: '$25 Gift Card', price: 2900 },
    ]
  },
  {
    id: 'google-play',
    title: 'Google Play Card (US)',
    category: 'Gift Cards',
    image: getImg('Google Play', '34A853'),
    description: 'US Region Google Play Store Gift Card.',
    type: 'voucher',
    options: [
      { id: 'gp-5', name: '$5 Gift Card', price: 600 },
      { id: 'gp-10', name: '$10 Gift Card', price: 1150 },
      { id: 'gp-100', name: '$100 Gift Card', price: 11000 },
    ]
  },
  {
    id: 'roblox-robux',
    title: 'Roblox Robux',
    category: 'Game Topup',
    image: getImg('ROBLOX', '000000'),
    description: 'Robux via Code voucher. Redeem globally.',
    type: 'voucher',
    options: [
      { id: 'rbx-100', name: '100 Robux', price: 150 },
      { id: 'rbx-400', name: '400 Robux', price: 550 },
      { id: 'rbx-800', name: '800 Robux', price: 1050 },
    ]
  }
];