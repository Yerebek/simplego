export interface CampaignSlide {
  id: string;
  badgeIcon: string;
  badgeText: string;
  headline: string;
  calloutTitle: string;
  calloutBody: string;
  footnote: string;
  imageUrl: string;
  imageAlt: string;
  ctaType: 'stores' | 'action';
  actionLabel?: string;
  targetModal?: ModalContext;
}

export type PlatformCardId = 'ezlink' | 'concession' | 'motoring' | 'online-services';

export interface PlatformCardItem {
  id: PlatformCardId;
  href: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  fallbackIcon: string;
  highlights: string[];
}

export type AppFeatureId =
  | 'transactions'
  | 'auto-topup'
  | 'motoring'
  | 'concession'
  | 'claims'
  | 'myinfo';

export interface AppFeatureItem {
  id: AppFeatureId;
  icon: string;
  title: string;
  description: string;
  accentTone: 'primary' | 'secondary';
}

export type AssistanceType =
  | 'ticket-offices'
  | 'ticketing-service-centres'
  | 'self-help-machines'
  | 'contact-centre';

export interface AssistanceCardItem {
  id: AssistanceType;
  href: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  fallbackIcon: string;
  summary: string;
}

export interface TransitLocation {
  id: string;
  name: string;
  category: Exclude<AssistanceType, 'contact-centre'>;
  categoryLabel: string;
  station: string;
  mrtLine: string;
  address: string;
  hours: string;
  services: string[];
}

export interface ConcessionPassOption {
  id: string;
  group: string;
  monthlyPrice: number;
  passName: string;
  coverage: string;
  eligibility: string;
}

export interface TransitTransaction {
  id: string;
  date: string;
  category: string;
  service: string;
  timeRange: string;
  route: string;
  amount: number;
  status: 'Posted' | 'Pending' | 'Refunded';
  icon: 'train' | 'directions_bus' | 'directions_car' | 'add_card';
}

export interface FaqEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
}

export type ModalContext =
  | { type: 'none' }
  | { type: 'search' }
  | { type: 'product'; productId: PlatformCardId }
  | { type: 'locations'; category: AssistanceType }
  | { type: 'app-download'; source?: 'google-play' | 'app-store' | 'features' }
  | { type: 'assistant' }
  | {
      type: 'info';
      section:
        | 'about'
        | 'faqs'
        | 'newsroom'
        | 'sitemap'
        | 'careers'
        | 'terms'
        | 'privacy'
        | 'whistleblowing';
    };

export const HERO_CAMPAIGN_IMAGE =
  'https://lh3.googleusercontent.com/aida/ALJJyrAoNrAXoJdUseohSk-gwV08HePC7zGe3atH2eXzUi3LuPgxmVRRPMLR2O3NVoTNJnbojjxDu31IRl_YTl7ZYjBmKl29XUq5xbKF0e3K_IktXgegURWCjvgO5r6rgUYLY-ZidIarqKWviiB2N2z3AdhqB0l94hzQw4nPhUUirJh3wvXiq9ZvNjzkugzdUTdZcSMqmSW4Lvok1D1K2YMR5CxKmd6h5cYh49UY_noH0tFYFn3L8g7eoAqaCRLTrjLo';

export const HAND_MOCKUP_IMAGE =
  'https://lh3.googleusercontent.com/aida/ALJJyrDQZ4_RXp5XjzFs-bUF-SehWrIp_HGVoCtrzsXq8J-VcasS2UL_V4j1dO-_Xqi6WF-E3SVEx2VFwEfG3JTmzqnhq9WEXtGYDvrY1Gy0x2GSrXCkzkm8FTe6YFffo7ilz9-e4GrsJvogE1RHaQm9wte11qSYXKBKclNdKwEIn0SLsEfaVRDWer4TsbTWhrxa-9Ak-X2ZJ9hRv4p7xlWREB4Zt50GUmNQUHodypkSMona2zM60OKFRS7IR54';

export const CAMPAIGN_SLIDES: CampaignSlide[] = [
  {
    id: 'ride-to-rewards',
    badgeIcon: 'directions_bus',
    badgeText: 'RIDE TO REWARDS • 1 NOV 2026 - 31 MAR 2027',
    headline: 'STAND TO WIN $1,000 TRAVEL CREDITS',
    calloutTitle: 'GET CASHBACK FOR YOUR TOP-UPS!',
    calloutBody:
      'Top up via the SimplyGo App and get $0.50 cashback!* Exclusively for SimplyGo Concession cardholders.',
    footnote:
      '*Capped at $2 per card per month over the campaign period. Terms & conditions apply.',
    imageUrl: HERO_CAMPAIGN_IMAGE,
    imageAlt: 'Ride to Rewards with SimplyGo — Stand to win $1,000 travel credits',
    ctaType: 'stores',
  },
  {
    id: 'concession-pass-savings',
    badgeIcon: 'badge',
    badgeText: 'MONTHLY TRAVEL PASSES • SAVE MORE EVERY DAY',
    headline: 'UNLIMITED BUS & TRAIN RIDES WITH ONE PASS',
    calloutTitle: 'CALCULATE YOUR MONTHLY COMMUTE SAVINGS',
    calloutBody:
      'Purchase your Adult, Student, or Senior Citizen Monthly Concession Pass anytime via the SimplyGo App.',
    footnote:
      'Instant pass activation for SimplyGo Concession cardholders without visiting a kiosk.',
    imageUrl: HERO_CAMPAIGN_IMAGE,
    imageAlt: 'Unlimited bus and train rides with SimplyGo Monthly Travel Passes',
    ctaType: 'action',
    actionLabel: 'Explore Concession Passes',
    targetModal: { type: 'product', productId: 'concession' },
  },
  {
    id: 'motoring-auto-pay',
    badgeIcon: 'directions_car',
    badgeText: 'EZ-LINK MOTORING • ZERO TOP-UP HASSLE',
    headline: 'SEAMLESS ERP & CARPARK PAYMENTS ON THE MOVE',
    calloutTitle: 'LINK YOUR BANK CARD FOR AUTO-PAY',
    calloutBody:
      'Activate EZ-Link Motoring in the SimplyGo App to track ERP and parking deductions effortlessly.',
    footnote: 'Compatible with dual-mode In-Vehicle Units (IU) and On-Board Units (OBU).',
    imageUrl: HERO_CAMPAIGN_IMAGE,
    imageAlt: 'EZ-Link Motoring seamless ERP and carpark payments',
    ctaType: 'action',
    actionLabel: 'Set Up EZ-Link Motoring',
    targetModal: { type: 'product', productId: 'motoring' },
  },
  {
    id: 'online-fare-claims',
    badgeIcon: 'receipt_long',
    badgeText: 'ONLINE SERVICES • INSTANT JOURNEY TRACKING',
    headline: 'CHECK FARES & SUBMIT TRAVEL CLAIMS ONLINE',
    calloutTitle: 'FULL TRANSPARENCY FOR EVERY TRIP',
    calloutBody:
      'View up to 6 months of public transport fare history and file fare adjustment claims in minutes.',
    footnote: 'Real-time status tracking available for all registered SimplyGo EZ-Link and bank cards.',
    imageUrl: HERO_CAMPAIGN_IMAGE,
    imageAlt: 'Check fares and submit travel claims online with SimplyGo',
    ctaType: 'action',
    actionLabel: 'Check Card & Claims',
    targetModal: { type: 'product', productId: 'online-services' },
  },
  {
    id: 'singpass-myinfo-apply',
    badgeIcon: 'verified_user',
    badgeText: 'SINGPASS MYINFO • FAST CARD APPLICATIONS',
    headline: 'APPLY FOR CONCESSION CARDS IN MINUTES',
    calloutTitle: 'SKIP THE QUEUE AT TICKETING CENTRES',
    calloutBody:
      'Verify your details securely via Singpass MyInfo and receive your SimplyGo Concession card by mail.',
    footnote: 'Available for Tertiary Students, Senior Citizens, NSFs, and Workfare Transport Concession.',
    imageUrl: HERO_CAMPAIGN_IMAGE,
    imageAlt: 'Apply for SimplyGo Concession cards securely with Singpass MyInfo',
    ctaType: 'action',
    actionLabel: 'Find Service Centres',
    targetModal: { type: 'locations', category: 'ticketing-service-centres' },
  },
];

export const PLATFORM_CARDS: PlatformCardItem[] = [
  {
    id: 'ezlink',
    href: '#ezlink',
    title: 'EZ-Link & SimplyGo EZ-Link Cards',
    subtitle: 'Tap & pay across MRT, LRT, buses, and participating retail outlets.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrBdI4tR2gZAzhKStd-6wdO23iO8IE9AgwBRnmFMc-9p6D2QB43Lybel0h3-V2dK_8m7I1ZiXLVOctpsRguETQT0KUxzYhc9HX4X8prOmqF_xIqN8McsUUi8tkl9hY7qlY_MEUbqamPZghqFCQ6tUwWOHPPIZBijr49AWRgLGPglIZdaXtnXIh6hmHMQS7hGy_anYFyGdk6HsnAFbXVEdZW7ooBlmw0ISPcHm0W3n2_1B2HPDDnM',
    imageAlt: 'EZ-Link and SimplyGo EZ-Link Cards',
    fallbackIcon: 'credit_card',
    highlights: [
      'Instant remote top-ups via the SimplyGo App',
      'Detailed fare & transaction history on mobile',
      'Upgrade existing CEPAS EZ-Link cards at any kiosk',
    ],
  },
  {
    id: 'concession',
    href: '#concession',
    title: 'Concession & Monthly Travel Cards',
    subtitle: 'Discounted fares and unlimited monthly passes for eligible commuters.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrCA9kVx18Yh1nTax6OUbbojEssfXyS7gPjUZUDL4XTaUIJBEx8lL4qBVPfktlEgc4-V3hK-Nylp32TntTfXW7-_d8QhGYAw3zb0KqZ6vSISVImXj6lzmqNTRYKkmERF4J4ev3utu-YcFnoTjuYB3L25-g8Yd7fUTdKm0u9hoX4uj4WaD9MoI9qzYwjpN45k2yd0cDHD7J1JRG1UG55Efovi-qQr9KpTdNilFasuMgMKzbgnGZA0-_A4I1Q',
    imageAlt: 'Concession and Monthly Travel Cards',
    fallbackIcon: 'badge',
    highlights: [
      'Student, Senior Citizen, Adult, NSF & Workfare tiers',
      'Buy Monthly Travel Passes directly in the SimplyGo App',
      'Lost card balance protection upon registration',
    ],
  },
  {
    id: 'motoring',
    href: '#motoring',
    title: 'EZ-Link Motoring',
    subtitle: 'Hassle-free auto-payment for ERP gantries and EPS carparks.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrDD4TGk0pzH1yOCAMjPv3f0R8iDD2QnAtNZUJLk_4B9-ndDBTlinq6gftfPAOpMAmhHvripH-xJNsNWYe3XrF_RofckzoLk5UNp7e5op9UFz_DmTSulEvY91wLoFM9zkhkiQPIqh1xK3rriPjx8NeMpc1AzY_2K_zmlQ0AkN8V2WDki8FBwBEBLAxP0jygCtN3dY5RygXsN22ZnnotRleVuXnCkhUG8xPTHhd8KaQeOV-NwsYdVKyI',
    imageAlt: 'EZ-Link Motoring',
    fallbackIcon: 'directions_car',
    highlights: [
      'Automatic top-ups billed directly to your payment card',
      'Never get caught with insufficient IU / OBU balance',
      'Consolidated monthly motoring statements',
    ],
  },
  {
    id: 'online-services',
    href: '#online-services',
    title: 'Online Services',
    subtitle: 'Check balances, inspect trip fares, and submit travel claims online.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrB91Rd--we1idQpSXakYK9PslMKl4wGjCpTlVK1rADbDJAoxTSDrb8As5Et_ACKzDEFkUbjg4ziCGtWN0zcsZBR-Gsr8XPRgPetRRLWaZqqdavrPjEYAwT3mRFTAnIaqV-n3AUV42Y9gazoi5Ai7ttfmMGfLQ_-Ydmeeyj7cbK-o_2QVOxtEGHoND5qvFJNVNw3kitF7CTqvUMu2fyLP_rTeLNLLHtHDCQdPXnbbTw6oU0vbThjRWBIAhF-rjBmEw',
    imageAlt: 'Online Services',
    fallbackIcon: 'laptop_mac',
    highlights: [
      'Instant card balance & trip breakdown lookup',
      'Online Fare Adjustment & Overcharge Claims',
      'Lost concession card blocking and replacement',
    ],
  },
];

export const KEY_APP_FEATURES: AppFeatureItem[] = [
  {
    id: 'transactions',
    icon: 'location_on',
    title: 'View Transactions',
    description: 'Check your card balance and view payment transactions',
    accentTone: 'primary',
  },
  {
    id: 'auto-topup',
    icon: 'autorenew',
    title: 'Auto Top-up',
    description:
      'Link your credit or debit card for seamless automatic top-ups whenever your balance runs low.',
    accentTone: 'secondary',
  },
  {
    id: 'motoring',
    icon: 'directions_car',
    title: 'Motoring Service',
    description:
      'Manage ERP and carpark payments with EZ-Link Motoring directly from your phone.',
    accentTone: 'secondary',
  },
  {
    id: 'concession',
    icon: 'badge',
    title: 'Concession Card Services',
    description:
      'Apply for concession cards, purchase monthly travel passes, and check card validity.',
    accentTone: 'secondary',
  },
  {
    id: 'claims',
    icon: 'receipt_long',
    title: 'Travel Claims',
    description: 'Submit fare adjustment claims and track claim statuses in real time.',
    accentTone: 'secondary',
  },
  {
    id: 'myinfo',
    icon: 'verified_user',
    title: 'MyInfo Verification',
    description:
      'Verify your identity securely with Singpass MyInfo for faster card applications.',
    accentTone: 'secondary',
  },
];

export const ASSISTANCE_CARDS: AssistanceCardItem[] = [
  {
    id: 'ticket-offices',
    href: '#ticket-offices',
    title: 'SimplyGo Ticket Offices',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrBxUZfQaMTebLVpIxuIsJ2I-wKiDB6Wnqy6CNiAoI89aNUCt95lZ4XhGhn4dqSj-f9MdR_3xeThg73AeqZ6-LVVD6__yDsv9D_55esDyF4bb_f_L4vtAVZ3K7zxSlmIOVaZEGjOSslCpXo1-h2r52X1ZcyLWulYmZCm_nwDi-pSMicmX9WNCf5aEy42T8X-jzIu7S2xu2VCrCNbha2RscZG8p1Trek3wgl9RxHN0tw-tjheNnE4ueQNfOQKhQ50',
    imageAlt: 'SimplyGo Ticket Offices',
    fallbackIcon: 'storefront',
    summary: 'Located at major MRT stations and bus interchanges for card purchases and top-ups.',
  },
  {
    id: 'ticketing-service-centres',
    href: '#ticketing-service-centres',
    title: 'SimplyGo Ticketing Service Centres',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrA0I6_ePMlzGg6A9cg44BovzB5EdUuNitzUBocE25FkKyrFdgF0w-XRxKwMgvO7dGv9wt4hiDxjzG6b3cy3EkcYmiRAK9hIO8e6WynS7VxSPypEXw_4xTcOuOkxZ5MJQQCf_JyFuQwixq8s16yLTjSG5JHh3wlnvH_9mhy4L30BfKvyL0Ce4PXJT17AYnBXVE9tXvYxXIKX3XzVBFS7OINDcGALY0VqB7vHqICBW59Vdqa8Mo8gfFkpAfZeSo7YkQ',
    imageAlt: 'SimplyGo Ticketing Service Centres',
    fallbackIcon: 'support_agent',
    summary: 'Full-service hubs for immediate concession card replacement and complex enquiries.',
  },
  {
    id: 'self-help-machines',
    href: '#self-help-machines',
    title: 'Self-Help Ticketing Machines',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrCiu5Rudq96lUTkmkoxk23j5i7uSOxbsgNqQ6aVwhvRZVLOzaX0urQxw2StDacphsMoe21zTP1yICTw1GTnx5YeX5MbciNQ3w89kzXiHX6KVk4fLjH2DPGbuJW4DyJduDt3O2fvw8XbHNnMs6lmh-UQ1HyAmm-pztsSqiBjoVSIWM0JhTyrAk6xgJJfjfFddcVPg1os8BWuMgvicPvRZNFQrqPmAI79Epl3r0kSi9jiaCY_fdU5dQ',
    imageAlt: 'Self-Help Ticketing Machines',
    fallbackIcon: 'point_of_sale',
    summary: '24/7 kiosks across all MRT stations for top-ups, pass purchases, and card upgrades.',
  },
  {
    id: 'contact-centre',
    href: '#contact-centre',
    title: 'Contact Centre',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrAQWMYr1jenrMVlOzoDJhx2s83CE-3WOL9j7i3863LXvGPSUzEJByPJc6-OWsjcgDPgf_ENVoRKj7G--Ny7zYuDC1v-9d_cXl8VY4BCxMChOxFonS1iv5pLV-6HzakQpk_RCSm6EzI_f3fzyiN6TBtoVMpPXTDP3USsPY4xvDqxRbvodSFKyaUxTuy5YOSJ-A9RlwYXgJQ6sz1y2sLprtk0OW4TgWgUFnDyJhwzYK7xoHvXjkpbQACfV48GNOAyGx4',
    imageAlt: 'Contact Centre',
    fallbackIcon: 'call',
    summary: 'Reach our hotline at 6883 5048 (8 am – 6 pm daily) or submit an online enquiry.',
  },
];

export const TRANSIT_LOCATIONS: TransitLocation[] = [
  {
    id: 'loc-raffles',
    name: 'Raffles Place SimplyGo Ticket Office',
    category: 'ticket-offices',
    categoryLabel: 'SimplyGo Ticket Office',
    station: 'Raffles Place MRT',
    mrtLine: 'North-South / East-West Line',
    address: '5 Raffles Place, Concourse Level (Exit A/B), Singapore 048618',
    hours: 'Mon – Sun: 10:00 AM – 8:00 PM',
    services: ['Card Top-Up', 'Concession Pass Purchase', 'Card Upgrade', 'Fare Enquiries'],
  },
  {
    id: 'loc-orchard',
    name: 'Orchard SimplyGo Ticket Office',
    category: 'ticket-offices',
    categoryLabel: 'SimplyGo Ticket Office',
    station: 'Orchard MRT',
    mrtLine: 'North-South / Thomson-East Coast Line',
    address: '437 Orchard Road, Basement Concourse, Singapore 238878',
    hours: 'Mon – Sun: 10:00 AM – 8:00 PM',
    services: ['Card Top-Up', 'Tourist Pass', 'SimplyGo Card Purchase'],
  },
  {
    id: 'loc-tampines',
    name: 'Tampines Ticketing Service Centre',
    category: 'ticketing-service-centres',
    categoryLabel: 'SimplyGo Ticketing Service Centre',
    station: 'Tampines Bus Interchange',
    mrtLine: 'East-West / Downtown Line',
    address: '512 Tampines Central 1, #01-01, Singapore 520512',
    hours: 'Mon – Sun: 10:00 AM – 6:00 PM (Closed on Public Holidays)',
    services: [
      'Immediate Concession Replacement',
      'Lost Card Claims',
      'Photo Capture & Application',
      'Balance Refund',
    ],
  },
  {
    id: 'loc-jurong-east',
    name: 'Jurong East Ticketing Service Centre',
    category: 'ticketing-service-centres',
    categoryLabel: 'SimplyGo Ticketing Service Centre',
    station: 'Jurong East MRT / Interchange',
    mrtLine: 'North-South / East-West Line',
    address: '10 Jurong East Street 12, Concourse Level, Singapore 609690',
    hours: 'Mon – Sun: 10:00 AM – 6:00 PM (Closed on Public Holidays)',
    services: [
      'Immediate Concession Replacement',
      'Senior & Student Card Processing',
      'Fare Adjustment Assistance',
    ],
  },
  {
    id: 'loc-somerset',
    name: 'Somerset Ticketing Service Centre',
    category: 'ticketing-service-centres',
    categoryLabel: 'SimplyGo Ticketing Service Centre',
    station: 'Somerset MRT',
    mrtLine: 'North-South Line',
    address: '1 Somerset Road, Basement 1 Concourse, Singapore 238162',
    hours: 'Mon – Sun: 10:00 AM – 6:00 PM (Closed on Public Holidays)',
    services: [
      'Concession Card Replacement',
      'Workfare & Disability Concession',
      'Card Refund & Disputes',
    ],
  },
  {
    id: 'loc-woodlands',
    name: 'Woodlands Integrated Transport Hub Kiosks',
    category: 'self-help-machines',
    categoryLabel: 'Self-Help Ticketing Machine',
    station: 'Woodlands MRT',
    mrtLine: 'North-South / Thomson-East Coast Line',
    address: '30 Woodlands Avenue 2, Concourse & Bus Hub, Singapore 738343',
    hours: 'Daily: 5:30 AM – 12:30 AM (MRT Operating Hours)',
    services: ['Cashless Top-Up', 'SimplyGo Card Upgrade', 'Monthly Pass Renewal', 'Receipt Print'],
  },
  {
    id: 'loc-dhoby-ghaut',
    name: 'Dhoby Ghaut Self-Help Ticketing Kiosks',
    category: 'self-help-machines',
    categoryLabel: 'Self-Help Ticketing Machine',
    station: 'Dhoby Ghaut MRT',
    mrtLine: 'NSL / NEL / CCL Interchange',
    address: '11 Orchard Road, B1 Transfer Concourse, Singapore 238826',
    hours: 'Daily: 5:30 AM – 12:30 AM (MRT Operating Hours)',
    services: ['Cashless Top-Up', 'SimplyGo Card Upgrade', 'Balance Check'],
  },
  {
    id: 'loc-harbourfront',
    name: 'HarbourFront SimplyGo Ticket Office',
    category: 'ticket-offices',
    categoryLabel: 'SimplyGo Ticket Office',
    station: 'HarbourFront MRT',
    mrtLine: 'North East / Circle Line',
    address: '81 Telok Blangah Road, Concourse Level, Singapore 098867',
    hours: 'Mon – Sun: 10:00 AM – 8:00 PM',
    services: ['Tourist Pass Sales', 'Card Top-Up', 'Concession Enquiries'],
  },
];

export const CONCESSION_PASSES: ConcessionPassOption[] = [
  {
    id: 'adult-monthly',
    group: 'Adult',
    monthlyPrice: 128.0,
    passName: 'Adult Monthly Travel Card (AMTC)',
    coverage: 'Unlimited rides on basic bus services & MRT/LRT trains',
    eligibility: 'Singapore Citizens & Permanent Residents aged 18–59',
  },
  {
    id: 'senior-monthly',
    group: 'Senior Citizen',
    monthlyPrice: 58.0,
    passName: 'Senior Citizen Monthly Concession Pass',
    coverage: 'Unlimited rides on basic bus services & MRT/LRT trains',
    eligibility: 'Singapore Citizens & Permanent Residents aged 60 and above',
  },
  {
    id: 'tertiary-monthly',
    group: 'Polytechnic / University',
    monthlyPrice: 51.0,
    passName: 'Tertiary Student Hybrid Concession Pass',
    coverage: 'Unlimited rides on basic bus services & MRT/LRT trains',
    eligibility: 'Full-time diploma & degree students at MOE-registered institutions',
  },
  {
    id: 'secondary-monthly',
    group: 'Primary / Secondary / JC',
    monthlyPrice: 43.5,
    passName: 'Student Hybrid Concession Pass',
    coverage: 'Unlimited rides on basic bus services & MRT/LRT trains',
    eligibility: 'MOE Primary, Secondary, Junior College & ITE students',
  },
  {
    id: 'workfare-monthly',
    group: 'Workfare (WTCS)',
    monthlyPrice: 96.0,
    passName: 'Workfare Transport Concession Monthly Pass',
    coverage: 'Unlimited rides on basic bus services & MRT/LRT trains',
    eligibility: 'Lower-wage Singapore Citizen workers under the WIS scheme',
  },
];

export const SAMPLE_TRANSACTIONS: TransitTransaction[] = [
  {
    id: 'tx-1',
    date: '01-Jul-2024',
    category: 'Public Transport',
    service: 'Train Service',
    timeRange: '6:17 PM - 7:05 PM',
    route: 'Kranji - Marina Bay',
    amount: -0.99,
    status: 'Pending',
    icon: 'train',
  },
  {
    id: 'tx-2',
    date: '01-Jul-2024',
    category: 'Public Transport',
    service: 'Bus Service 190',
    timeRange: '8:12 AM - 8:44 AM',
    route: 'Choa Chu Kang Int - Orchard Rd',
    amount: -1.42,
    status: 'Posted',
    icon: 'directions_bus',
  },
  {
    id: 'tx-3',
    date: '30-Jun-2024',
    category: 'Card Top-Up',
    service: 'SimplyGo App Auto Top-up',
    timeRange: '2:05 PM',
    route: 'Visa •••• 4821',
    amount: 20.0,
    status: 'Posted',
    icon: 'add_card',
  },
  {
    id: 'tx-4',
    date: '29-Jun-2024',
    category: 'Public Transport',
    service: 'Train Service',
    timeRange: '1:18 PM - 1:47 PM',
    route: 'Bugis - Tampines',
    amount: -1.56,
    status: 'Posted',
    icon: 'train',
  },
];

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    id: 'faq-1',
    category: 'SimplyGo App & Cards',
    question: 'What is the difference between a SimplyGo EZ-Link card and a regular EZ-Link card?',
    answer:
      'A SimplyGo EZ-Link card lets you check your balance, view trip-by-trip fare charges, receive push notifications for deductions, and top up remotely on the SimplyGo App. Note that fare deductions are displayed in the app rather than at MRT/bus fare gates.',
  },
  {
    id: 'faq-2',
    category: 'Top-Ups & Auto Top-Up',
    question: 'How do I activate Auto Top-up on the SimplyGo App?',
    answer:
      'Open the SimplyGo App, select your registered SimplyGo EZ-Link or Concession card, tap "Auto Top-up", link a Visa or Mastercard credit/debit card, and choose your preferred top-up threshold ($5, $10, or $20) and reload value.',
  },
  {
    id: 'faq-3',
    category: 'Concession & Passes',
    question: 'Can I buy my Monthly Concession Pass online without visiting a kiosk?',
    answer:
      'Yes! SimplyGo Concession cardholders can purchase and activate Monthly Concession Passes directly from the SimplyGo App using PayNow, credit/debit cards, or mobile wallets.',
  },
  {
    id: 'faq-4',
    category: 'Travel Claims',
    question: 'How do I submit a fare adjustment or overcharge claim?',
    answer:
      'Select the disputed journey under View Transactions in the SimplyGo App or under Online Services on this website, choose the reason (e.g., missed tap-out or bus stop mismatch), and submit your claim. Most claims are processed within 5 working days.',
  },
  {
    id: 'faq-5',
    category: 'Lost Card & Refunds',
    question: 'What happens if I lose my registered SimplyGo Concession or EZ-Link card?',
    answer:
      'You can immediately block your lost card through the SimplyGo App or by calling our Hotline at 6883 5048. Any remaining balance on a registered SimplyGo card is protected and can be refunded or transferred to your replacement card.',
  },
];

export const NEWSROOM_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    date: '15 Nov 2026',
    category: 'Campaigns',
    title: 'Ride to Rewards Campaign: $0.50 Cashback & $1,000 Travel Credits',
    summary:
      'From 1 Nov 2026 to 31 Mar 2027, SimplyGo Concession cardholders enjoy $0.50 cashback on app top-ups (capped at $2/card/month) plus lucky draw chances to win $1,000 in travel credits.',
  },
  {
    id: 'news-2',
    date: '05 Nov 2026',
    category: 'Service Advisory',
    title: 'Temporary Suspension of Card Top-Ups at DBS ATMs',
    summary:
      'Due to DBS scheduled maintenance starting 5 Nov, EZ-Link and Concession cardholders can continue topping up seamlessly via the SimplyGo App, Self-Help Ticketing Machines, and SimplyGo Ticket Offices.',
  },
  {
    id: 'news-3',
    date: '20 Oct 2026',
    category: 'Product Update',
    title: 'Faster Singpass MyInfo Verification for Student & Senior Concession Cards',
    summary:
      'Applicants can now complete identity and address verification in under two minutes with updated MyInfo integration on the SimplyGo App.',
  },
];
