import { Product, Category, Review } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-earrings',
    name: 'Earrings',
    description: 'Lightweight studs, daily hoops & dangles crafted with anti-tarnish finish for everyday wear.',
    image: '',
    itemCount: 3,
  },
  {
    id: 'cat-pendant',
    name: 'Pendants',
    description: 'Minimalist daily wear pendants with anti-tarnish protective coating.',
    image: '',
    itemCount: 5,
  },
  {
    id: 'cat-earrings-pendant',
    name: 'Pendant with Earrings',
    description: 'Matching lightweight sets designed for comfortable daily wear and subtle charm.',
    image: '',
    itemCount: 6,
  },
  {
    id: 'cat-rings',
    name: 'Rings',
    description: 'Comfortable, skin-friendly daily wear adjustable rings that never tarnish.',
    image: '',
    itemCount: 2,
  },
  {
    id: 'cat-bracelets-handcuffs',
    name: 'Bangles & Handcuffs',
    description: 'Sleek anti-tarnish daily wear bangles & adjustable handcuffs for modern outfits.',
    image: '',
    itemCount: 2,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'suchi-p1',
    name: 'Gulabi Daily Wear Floral Jhumka Set',
    category: 'Earrings',
    price: 1299,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 48,
    isBestseller: true,
    inStock: true,
    tags: ['Daily Wear', 'Anti-Tarnish', 'Best Seller', 'Lightweight'],
    images: [],
    description: 'Ultra-lightweight daily wear artificial jhumkas with premium anti-tarnish protective clear coating. Features delicate blush pink accents designed for all-day comfort and affordable quality.',
    specifications: {
      material: 'Skin-Friendly Anti-Tarnish Alloy',
      finish: 'Anti-Tarnish Protective Clear Coat',
      stoneType: 'Sparkling Everyday Faceted Stones & Faux Pearls',
      weight: '18 grams pair',
      dimensions: '5.5 cm Length x 2.8 cm Width',
      careInstructions: 'Store in soft pouch after use. Water-resistant coating built for daily wear.'
    }
  },
  {
    id: 'suchi-p2',
    name: 'Aadhya Daily Solitaire Pendant',
    category: 'Pendants',
    price: 1899,
    originalPrice: 3499,
    rating: 4.9,
    reviewCount: 64,
    isBestseller: true,
    isTrending: true,
    inStock: true,
    tags: ['Daily Wear', 'Pendants', 'Anti-Tarnish', 'Affordable Quality'],
    images: [],
    description: 'Gleaming, skin-friendly daily wear pendant with a matching anti-tarnish chain. Designed for everyday office, college, and weekend outings.',
    specifications: {
      material: 'Anti-Tarnish Skin-Friendly Alloy',
      finish: 'High-Glow Anti-Tarnish Seal',
      stoneType: 'High-Clarity Everyday Sparkling Stones',
      weight: '12 grams',
      careInstructions: 'Wipe clean with a soft microfiber cloth. Tarnish-proof for daily wear.'
    }
  },
  {
    id: 'suchi-p3',
    name: 'Meera Everyday Antique Hoop Earrings',
    category: 'Earrings',
    price: 999,
    originalPrice: 1899,
    rating: 4.8,
    reviewCount: 32,
    isNewArrival: true,
    inStock: true,
    tags: ['Daily Wear', 'Hoops', 'Anti-Tarnish'],
    images: [],
    description: 'Classic lightweight crescent hoops featuring vintage antique tone with anti-tarnish protection, designed for effortless daily wear.',
    specifications: {
      material: 'Lightweight Anti-Tarnish Alloy',
      finish: 'Anti-Tarnish Vintage Tone',
      stoneType: 'Faux Gem Highlights',
      weight: '14 grams pair',
      dimensions: '4.5 cm Length x 3.2 cm Width',
      careInstructions: 'Store in provided soft cloth pouch.'
    }
  },
  {
    id: 'suchi-p4',
    name: 'Suhani Anti-Tarnish Daily Wear Bracelet',
    category: 'Bangles & Handcuffs',
    price: 1199,
    originalPrice: 2199,
    rating: 4.7,
    reviewCount: 29,
    isTrending: true,
    inStock: true,
    tags: ['Bracelet', 'Daily Wear', 'Anti-Tarnish', 'Everyday Luxury'],
    images: [],
    description: 'An evergreen flexible line bracelet with brilliant sparkling stones in a hypoallergenic anti-tarnish finish. Built for everyday comfort.',
    specifications: {
      material: 'Surgical Alloy with Anti-Tarnish Coating',
      finish: 'High Glow Glossy Finish',
      stoneType: 'Everyday High-Shine Stones',
      weight: '10 grams',
      dimensions: 'Adjustable 6.5 to 7.5 inches',
      careInstructions: 'Water resistant anti-tarnish coating. Wipe clean with soft cloth.'
    }
  },
  {
    id: 'suchi-p5',
    name: 'Rajkumari Everyday Earrings & Pendant Set',
    category: 'Pendant with Earrings',
    price: 3499,
    originalPrice: 6999,
    rating: 5.0,
    reviewCount: 19,
    isBestseller: true,
    inStock: true,
    tags: ['Pendant with Earrings', 'Daily Wear', 'Anti-Tarnish'],
    images: [],
    description: 'Complete daily wear jewellery set featuring lightweight matching dangling earrings paired with an elegant centerpiece pendant with anti-tarnish guarantee.',
    specifications: {
      material: 'Skin-Friendly Alloy Base with Anti-Tarnish Seal',
      finish: 'Anti-Tarnish Glow Finish',
      stoneType: 'High-Clarity Glass Beads & Faux Pearls',
      weight: '35 grams set',
      careInstructions: 'Keep in velvet pouch. Lightweight design comfortable for all-day wear.'
    }
  },
  {
    id: 'suchi-p6',
    name: 'Ananya Solitaire Halo Daily Wear Ring',
    category: 'Rings',
    price: 799,
    originalPrice: 1499,
    rating: 4.8,
    reviewCount: 42,
    isNewArrival: true,
    inStock: true,
    tags: ['Ring', 'Daily Wear', 'Anti-Tarnish', 'Adjustable'],
    images: [],
    description: 'A sparkling solitaire halo ring with an adjustable band designed for everyday comfort and zero tarnish guaranteed.',
    specifications: {
      material: 'Hypoallergenic Anti-Tarnish Alloy',
      finish: 'Anti-Tarnish Silver Polish',
      stoneType: 'High-Clarity Sparkling Stones',
      weight: '4 grams',
      dimensions: 'Free size (Adjustable band)',
      careInstructions: 'Safe for daily wear and easy to clean.'
    }
  },
  {
    id: 'suchi-p7',
    name: 'Roopkund Pearl Flower Daily Pendant',
    category: 'Pendants',
    price: 649,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    tags: ['Pendants', 'Pearls', 'Daily Wear', 'Anti-Tarnish'],
    images: [],
    description: 'An elegant floral motif daily wear pendant with delicate pearl strand chain. Anti-tarnish protected for affordable daily style.',
    specifications: {
      material: 'Anti-Tarnish Alloy',
      finish: 'Matte Anti-Tarnish Finish',
      stoneType: 'Faux Pearl Strands & Floral Motifs',
      weight: '10 grams',
      careInstructions: 'Store flat in ziplock pouch.'
    }
  },
  {
    id: 'suchi-p8',
    name: 'Nisha Emerald Green Daily Earrings with Pendant Set',
    category: 'Pendant with Earrings',
    price: 2499,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 38,
    isTrending: true,
    inStock: true,
    tags: ['Emerald', 'Pendant Set', 'Daily Wear', 'Anti-Tarnish'],
    images: [],
    description: 'Everyday pendant set strung with rich emerald green beads and sparkling spacers, complete with anti-tarnish daily wear matching earrings.',
    specifications: {
      material: 'Anti-Tarnish Alloy with Protective Coating',
      finish: 'High Glow Anti-Tarnish Polish',
      stoneType: 'Faceted Emerald Green Beads & Sparkling Accents',
      weight: '28 grams set',
      careInstructions: 'Keep dry. Store individually in soft pouches.'
    }
  },
  {
    id: 'suchi-p9',
    name: 'Padma Daily Wear Handcuff Kada Pair',
    category: 'Bangles & Handcuffs',
    price: 1499,
    originalPrice: 2799,
    rating: 4.8,
    reviewCount: 26,
    inStock: true,
    tags: ['Handcuffs', 'Daily Wear', 'Anti-Tarnish', 'Pair'],
    images: [],
    description: 'Pair of handcrafted openable daily wear handcuff kadas featuring delicate floral enamel work with anti-tarnish protective lacquer.',
    specifications: {
      material: 'Anti-Tarnish Base with Enamel Inlay',
      finish: 'Anti-Tarnish Micro Coating',
      stoneType: 'Faceted Sparkle Accents',
      weight: '32 grams pair',
      dimensions: 'Available sizes: 2.4, 2.6, 2.8',
      careInstructions: 'Wipe clean with a soft cloth. Anti-tarnish everyday protection.'
    }
  },
  {
    id: 'suchi-p10',
    name: 'Kavya Delicate Floral Daily Studs',
    category: 'Earrings',
    price: 599,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 51,
    isBestseller: true,
    inStock: true,
    tags: ['Studs', 'Daily Wear', 'Anti-Tarnish', 'Lightweight'],
    images: [],
    description: 'Inspired by the Suchi logo floral motif! Dainty daily wear flower studs with a sparkling center stone. Perfect for office, daily wear, or casual outings.',
    specifications: {
      material: 'Pure Anti-Tarnish Alloy',
      finish: 'Anti-Tarnish Clear Polish',
      stoneType: 'High-Clarity Everyday Stone',
      weight: '3 grams pair',
      careInstructions: 'Hypoallergenic posts. Safe for daily wear.'
    }
  },
  {
    id: 'suchi-p11',
    name: 'Sia Daily Charm Statement Ring',
    category: 'Rings',
    price: 899,
    originalPrice: 1599,
    rating: 4.7,
    reviewCount: 18,
    inStock: true,
    tags: ['Rings', 'Daily Wear', 'Anti-Tarnish'],
    images: [],
    description: 'A lightweight round daily wear ring featuring concentric floral petals around a ruby-red centerpiece, protected by anti-tarnish coating.',
    specifications: {
      material: 'Anti-Tarnish Alloy',
      finish: 'Anti-Tarnish Everyday Tone',
      stoneType: 'Faux Pearl & Red Center Accent',
      weight: '6 grams',
      dimensions: 'Free size adjustable ring shank',
      careInstructions: 'Handle with care. Anti-tarnish everyday wear.'
    }
  },
  {
    id: 'suchi-p12',
    name: 'Vanya Daily Coin Earrings with Pendant Set',
    category: 'Pendant with Earrings',
    price: 2199,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 31,
    isNewArrival: true,
    inStock: true,
    tags: ['Pendant with Earrings', 'Daily Wear', 'Anti-Tarnish'],
    images: [],
    description: 'Charming daily wear coin motif pendant set in anti-tarnish matte finish with subtle red cabochons and matching coin drop earrings.',
    specifications: {
      material: 'Anti-Tarnish Alloy Mix',
      finish: 'Matte Anti-Tarnish Coating',
      stoneType: 'Red Accents & Pearl Drops',
      weight: '30 grams set',
      careInstructions: 'Store in moisture-free container.'
    }
  },
  {
    id: 'suchi-p13',
    name: 'Tara Moonlit Anti-Tarnish Crescent Pendant',
    category: 'Pendants',
    price: 899,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 15,
    isNewArrival: true,
    inStock: true,
    tags: ['Daily Wear', 'Pendants', 'Anti-Tarnish', 'New Arrival'],
    images: [],
    description: 'A delicate moonlit crescent pendant with sparkling micro-pave zircons. Coated with anti-tarnish protective clear coat for everlasting daily shine.',
    specifications: {
      material: 'Anti-Tarnish Hypoallergenic Alloy',
      finish: 'High-Glow Anti-Tarnish Polish',
      stoneType: 'Micro-Pave Cubic Zirconia',
      weight: '9 grams',
      careInstructions: 'Wipe with a soft cloth after daily wear.'
    }
  },
  {
    id: 'suchi-p14',
    name: 'Drishti Evil Eye Protection Daily Pendant',
    category: 'Pendants',
    price: 749,
    originalPrice: 1399,
    rating: 4.8,
    reviewCount: 27,
    isTrending: true,
    inStock: true,
    tags: ['Daily Wear', 'Pendants', 'Anti-Tarnish', 'Evil Eye'],
    images: [],
    description: 'A protective blue sapphire glass evil eye motif on a sleek anti-tarnish chain. Perfect for college, office, and daily wear layering.',
    specifications: {
      material: 'Skin-Friendly Anti-Tarnish Alloy Base',
      finish: 'Anti-Tarnish Seal',
      stoneType: 'Enamel & Blue Glass Accent',
      weight: '8 grams',
      careInstructions: 'Store in ziplock when not in use.'
    }
  },
  {
    id: 'suchi-p15',
    name: 'Charvi Dainty Heart Motif Daily Wear Pendant',
    category: 'Pendants',
    price: 1099,
    originalPrice: 1999,
    rating: 5.0,
    reviewCount: 21,
    isBestseller: true,
    inStock: true,
    tags: ['Daily Wear', 'Pendants', 'Anti-Tarnish', 'Heart Motif'],
    images: [],
    description: 'An elegant intertwined heart pendant designed for daily romance and subtle glam. Tarnish-proof clear finish ideal for daily casual wear.',
    specifications: {
      material: 'Anti-Tarnish Premium Alloy',
      finish: 'Rose Gold Tone Anti-Tarnish Coating',
      stoneType: 'Faceted Sparkle Stones',
      weight: '11 grams',
      careInstructions: 'Safe for daily use.'
    }
  },
  {
    id: 'suchi-p16',
    name: 'Trisha Temple Motif Pendant with Matching Earrings Set',
    category: 'Pendant with Earrings',
    price: 2899,
    originalPrice: 5499,
    rating: 4.9,
    reviewCount: 34,
    isBestseller: true,
    inStock: true,
    tags: ['Pendant with Earrings', 'Daily Wear', 'Temple Design', 'Anti-Tarnish'],
    images: [],
    description: 'Exquisite daily wear temple art centerpiece pendant paired with matching lightweight jhumki style studs. Anti-tarnish gold finish built for all-day comfort.',
    specifications: {
      material: 'Anti-Tarnish Skin-Friendly Brass Alloy',
      finish: 'Antique Gold Anti-Tarnish Seal',
      stoneType: 'Ruby Red & Pearl Droplets',
      weight: '32 grams set',
      careInstructions: 'Store in velvet box provided.'
    }
  },
  {
    id: 'suchi-p17',
    name: 'Ishita Rose Quartz Daily Pendant with Studs Set',
    category: 'Pendant with Earrings',
    price: 1999,
    originalPrice: 3899,
    rating: 4.8,
    reviewCount: 19,
    isNewArrival: true,
    inStock: true,
    tags: ['Pendant with Earrings', 'Daily Wear', 'Rose Quartz', 'Anti-Tarnish'],
    images: [],
    description: 'Soft pastel rose quartz teardrop pendant matched with complementary solitaire studs. Features skin-safe anti-tarnish clear polish for daily office wear.',
    specifications: {
      material: 'Hypoallergenic Anti-Tarnish Alloy',
      finish: 'High-Glow Anti-Tarnish Finish',
      stoneType: 'Faux Rose Quartz & CZ Accents',
      weight: '24 grams set',
      careInstructions: 'Wipe clean with soft microfiber cloth.'
    }
  },
  {
    id: 'suchi-p18',
    name: 'Avani Kundan Floral Daily Pendant with Dangles Set',
    category: 'Pendant with Earrings',
    price: 3199,
    originalPrice: 5999,
    rating: 5.0,
    reviewCount: 42,
    isTrending: true,
    inStock: true,
    tags: ['Pendant with Earrings', 'Daily Wear', 'Kundan', 'Anti-Tarnish'],
    images: [],
    description: 'Classic Kundan glass stone floral cluster pendant with matching light dangling earrings. Tarnish-free daily wear set for effortless elegance.',
    specifications: {
      material: 'Anti-Tarnish Alloy with Clear Lacquer',
      finish: 'Glossy Gold Anti-Tarnish Tone',
      stoneType: 'Hand-set Glass Kundan Stones & Pearls',
      weight: '36 grams set',
      careInstructions: 'Avoid harsh direct perfume spray.'
    }
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'suchi-p1',
    productName: 'Gulabi Daily Wear Floral Jhumka Set',
    customerName: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: 'July 24, 2026',
    comment: 'The anti-tarnish quality on these Jhumkas is incredible! I wear them to office almost every day and they still shine like new. Super lightweight and comfortable.',
    verified: true,
    avatarUrl: ''
  },
  {
    id: 'rev-2',
    productId: 'suchi-p2',
    productName: 'Aadhya Daily Solitaire Pendant',
    customerName: 'Ananya Verma',
    location: 'New Delhi',
    rating: 5,
    date: 'July 18, 2026',
    comment: 'Perfect daily wear artificial jewellery! Suchi Jewellery packaging with the blush pink velvet box was so charming. Fast delivery via GPay payment.',
    verified: true,
    avatarUrl: ''
  },
  {
    id: 'rev-3',
    productId: 'suchi-p5',
    productName: 'Rajkumari Everyday Earrings & Pendant Set',
    customerName: 'Kavita Reddy',
    location: 'Hyderabad, Telangana',
    rating: 5,
    date: 'June 29, 2026',
    comment: 'I ordered this daily wear set and it exceeded my expectations! So light on the neck and anti-tarnish. Made to make you happy indeed! ❤️',
    verified: true,
    avatarUrl: ''
  },
  {
    id: 'rev-4',
    productId: 'suchi-p4',
    productName: 'Suhani Anti-Tarnish Daily Wear Bracelet',
    customerName: 'Rhea Sengupta',
    location: 'Kolkata, West Bengal',
    rating: 5,
    date: 'July 11, 2026',
    comment: 'Minimalist, classy, and super shiny. Doesn’t tarnish even when exposed to water or hand wash.',
    verified: true,
    avatarUrl: ''
  },
  {
    id: 'rev-5',
    productId: 'suchi-p10',
    productName: 'Kavya Delicate Floral Daily Studs',
    customerName: 'Sneha Patel',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    date: 'August 01, 2026',
    comment: 'Super cute daily wear studs! Highly recommend Suchi Jewellery for skin-friendly anti-tarnish artificial jewellery.',
    verified: true,
    avatarUrl: ''
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'insta-1',
    imageUrl: '',
    likes: '1.4k',
    handle: '@suchijewellery',
    caption: 'Radiate happiness with our daily wear anti-tarnish collection ✨🌸 #SuchiJewellery #MadeToMakeYouHappy #DailyWear'
  },
  {
    id: 'insta-2',
    imageUrl: '',
    likes: '2.1k',
    handle: '@suchijewellery',
    caption: 'Brilliance in every detail 💎 Anti-tarnish artificial jewellery designed for your everyday style.'
  },
  {
    id: 'insta-3',
    imageUrl: '',
    likes: '980',
    handle: '@suchijewellery',
    caption: 'Everyday Jhumkas & Studs crafted for effortless daily wear 💕 Swipe to see details!'
  },
  {
    id: 'insta-4',
    imageUrl: '',
    likes: '3.2k',
    handle: '@suchijewellery',
    caption: 'Handcrafted daily wear bracelets & handcuffs with anti-tarnish guarantee. Order yours today!'
  }
];
