/* चंद्रकैलाश Tours & Travels - Real-Time Multi-Device Cloud Database API */

let globalCloudStore = null;

const INITIAL_PACKAGES = [
  {
    "id": "pkg-1",
    "name": "Complete Char Dham Yatra 2026",
    "slug": "char-dham-yatra",
    "showInHero": true,
    "heroOrder": 1,
    "destination": "Uttarakhand (Yamunotri, Gangotri, Kedarnath, Badrinath)",
    "coverImage": "images/himalayan_yatra.jpg",
    "packageGallery": [
      "images/himalayan_yatra.jpg",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
    ],
    "price": 32500,
    "originalPrice": 36000,
    "duration": "12 Days / 11 Nights",
    "dates": "15 May - 26 May 2026",
    "transport": "AC Tourist Bus",
    "hotelDetails": "3-Star Clean AC Hotels & Holy Ashrams",
    "meals": "Pure Veg Breakfast, Lunch & Dinner (Jain Available)",
    "activities": ["Ganga Aarti at Haridwar", "Kedarnath Temple Puja", "Badrinath Tapt Kund Bath", "Yamunotri & Gangotri Darshan"],
    "shortDesc": "Complete sacred pilgrimage covering all 4 Dhams with experienced tour manager.",
    "includedServices": [
      "AC Bus Travel",
      "3-Star Hotel & Ashram Accommodation",
      "Daily Fresh Pure Veg Breakfast, Lunch & Dinner",
      "Experienced Tour Manager & Local Guide Support",
      "Char Dham Yatra E-Pass & Temple Passes"
    ],
    "excludedServices": [
      "Personal Shopping & Medical Expenses",
      "Kedarnath Helicopter / Pony / Palki Ticket Cost",
      "Individual Temple VIP Passes"
    ],
    "rules": [
      "Original Aadhaar Card compulsory for all yatra passengers.",
      "₹5,000 token advance required at booking.",
      "Senior citizens must carry personal daily prescribed medicines."
    ],
    "itinerary": [
      { "day": 1, "title": "Departure Journey", "desc": "Overnight comfortable travel from Jalgaon/Maharashtra." },
      { "day": 2, "title": "Haridwar Arrival & Ganga Aarti", "desc": "Hotel check-in at Haridwar & evening holy Ganga Aarti at Har Ki Pauri." },
      { "day": 3, "title": "Yamunotri Dham Darshan", "desc": "Travel to Barkot, trek to Yamunotri Temple and holy Surya Kund bath." },
      { "day": 4, "title": "Uttarkashi to Gangotri Dham", "desc": "Visit Gangotri Temple on Bhagirathi river bank and perform sacred puja." },
      { "day": 5, "title": "Guptkashi to Kedarnath Trek", "desc": "Proceed to Sonprayag/Gaurikund and trek to sacred Kedarnath Temple." },
      { "day": 6, "title": "Kedarnath Temple Darshan", "desc": "Early morning Kedarnath Bholenath darshan, puja & descent to Guptkashi." },
      { "day": 7, "title": "Badrinath Dham Darshan", "desc": "Drive to Badrinath, Tapt Kund holy bath and Lord Badri Vishal darshan." },
      { "day": 8, "title": "Rishikesh Sightseeing & Return", "desc": "Visit Laxman Jhula, Ram Jhula, Triveni Ghat & start return journey." }
    ],
    "seatsLeft": 12,
    "status": "open",
    "visible": true,
    "category": "religious",
    "isFeatured": true,
    "isTrending": true,
    "isNew": true,
    "isSoldOut": false,
    "isUpcoming": false
  },
  {
    "id": "pkg-2",
    "name": "Vrindavan, Mathura, Gokul & Agra Darshan",
    "slug": "vrindavan-mathura",
    "showInHero": true,
    "heroOrder": 2,
    "destination": "Uttar Pradesh (Vrindavan - Mathura)",
    "coverImage": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
    "packageGallery": [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
    ],
    "price": 14800,
    "originalPrice": 17000,
    "duration": "6 Days / 5 Nights",
    "dates": "10 June - 15 June 2026",
    "transport": "AC Pushback Bus",
    "hotelDetails": "Deluxe AC Hotels in Vrindavan",
    "meals": "Daily Breakfast, Lunch & Pure Veg Dinner",
    "activities": ["Banke Bihari Darshan", "Prem Mandir Lighting Show", "Yamuna Aarti", "Taj Mahal Visit"],
    "shortDesc": "Blissful Krishna Darshan covering Banke Bihari, ISKCON, Prem Mandir illumination, Krishna Janmabhoomi & Taj Mahal.",
    "includedServices": [
      "Return AC Bus Travel",
      "5 Nights Deluxe AC Hotel Stay in Vrindavan",
      "Pure Veg Meals Included",
      "Special Temple Guide & Local Transport"
    ],
    "excludedServices": ["Taj Mahal & Fort Entry Monument Tickets", "Personal Shopping"],
    "rules": ["Follow temple dress codes and mobile phone restrictions."],
    "itinerary": [
      { "day": 1, "title": "Departure Journey", "desc": "Evening departure." },
      { "day": 2, "title": "Mathura Janmabhoomi & Dwarkadhish", "desc": "Check-in hotel, visit Shri Krishna Janmabhoomi & Vishram Ghat." },
      { "day": 3, "title": "Vrindavan Banke Bihari & Prem Mandir", "desc": "Banke Bihari Darshan, ISKCON Temple & evening grand Prem Mandir light show." },
      { "day": 4, "title": "Gokul, Barsana & Goverdhan", "desc": "Visit Nandgaon, Barsana Radha Rani temple & Goverdhan Parikrama point." },
      { "day": 5, "title": "Agra Taj Mahal & Return", "desc": "Visit Taj Mahal & Agra Fort, start return travel." }
    ],
    "seatsLeft": 8,
    "status": "open",
    "visible": true,
    "category": "religious",
    "isFeatured": true,
    "isTrending": true,
    "isNew": false,
    "isSoldOut": false,
    "isUpcoming": false
  },
  {
    "id": "pkg-3",
    "name": "Khatu Shyam, Salasar Balaji & Jaipur Special",
    "slug": "khatu-shyam-salasar",
    "showInHero": true,
    "heroOrder": 3,
    "destination": "Rajasthan (Khatu Shyamji - Salasar)",
    "coverImage": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
    "packageGallery": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
    ],
    "price": 16500,
    "originalPrice": 19000,
    "duration": "7 Days / 6 Nights",
    "dates": "20 July - 26 July 2026",
    "transport": "AC Bus",
    "hotelDetails": "3-Star AC Hotels in Khatu Shyam & Jaipur",
    "meals": "All Meals Included (Rajasthani & Veg Flavors)",
    "activities": ["Baba Khatu Shyam Darshan", "Salasar Balaji Puja", "Jaipur Hawa Mahal", "Pushkar Brahma Temple"],
    "shortDesc": "Blessed yatra to Baba Khatu Shyamji, Salasar Hanumanji Balaji, Pink City Jaipur Hawa Mahal & Pushkar Brahma Temple.",
    "includedServices": ["Travel, Hotel Stay & Veg Meals", "Guided VIP Darshan Lines"],
    "excludedServices": ["Personal Expenses"],
    "rules": ["Reporting on time at departure point."],
    "itinerary": [
      { "day": 1, "title": "Departure", "desc": "Overnight bus journey to Rajasthan." },
      { "day": 2, "title": "Khatu Shyamji Arrival & Darshan", "desc": "Hotel check-in & divine darshan of Baba Khatu Shyamji." },
      { "day": 3, "title": "Salasar Balaji & Rani Sati Dadi", "desc": "Salasar Balaji Mandir & Jhunjhunu Rani Sati Dadi temple visit." },
      { "day": 4, "title": "Jaipur Pink City Sightseeing", "desc": "Visit Hawa Mahal, Amer Fort, Jal Mahal & Johari Bazaar shopping." },
      { "day": 5, "title": "Pushkar & Return Journey", "desc": "Pushkar Sarovar bath, Lord Brahma Temple & return drive." }
    ],
    "seatsLeft": 4,
    "status": "open",
    "visible": true,
    "category": "religious",
    "isFeatured": false,
    "isTrending": true,
    "isNew": true,
    "isSoldOut": false,
    "isUpcoming": false
  },
  {
    "id": "pkg-4",
    "name": "Rishikesh Adventure & Kedarnath Special",
    "slug": "rishikesh-ganga-aarti",
    "showInHero": true,
    "heroOrder": 4,
    "destination": "Uttarakhand (Rishikesh & Kedarnath)",
    "coverImage": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80",
    "packageGallery": [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
      "images/himalayan_yatra.jpg"
    ],
    "price": 24900,
    "originalPrice": 28000,
    "duration": "9 Days / 8 Nights",
    "dates": "5 Aug - 13 Aug 2026",
    "transport": "AC Bus",
    "hotelDetails": "3-Star River View Hotels & Tents",
    "meals": "Daily Breakfast, Lunch & Dinner",
    "activities": ["Ganga River Rafting", "Cliff Jumping", "Kedarnath Trek", "Triveni Ghat Aarti"],
    "shortDesc": "Combine thrilling Ganga river rafting in Rishikesh with holy trek to Kedarnath Temple.",
    "includedServices": ["Travel, Stay, Veg Meals, Rafting Gear & Safety Instructor"],
    "excludedServices": ["Helicopter tickets"],
    "rules": ["Good health & basic physical fitness required."],
    "itinerary": [
      { "day": 1, "title": "Departure to Rishikesh", "desc": "Bus departure." },
      { "day": 2, "title": "Rishikesh White Water Rafting", "desc": "16km Ganga rafting & cliff jumping." },
      { "day": 3, "title": "Kedarnath Yatra Trek", "desc": "Sonprayag to Kedarnath temple trek & Bholenath darshan." }
    ],
    "seatsLeft": 15,
    "status": "open",
    "visible": true,
    "category": "adventure",
    "isFeatured": false,
    "isTrending": false,
    "isNew": true,
    "isSoldOut": false,
    "isUpcoming": true
  },
  {
    "id": "pkg-5",
    "name": "Rajasthan Royal Family & Desert Camping Tour",
    "slug": "rajasthan-tour",
    "showInHero": true,
    "heroOrder": 5,
    "destination": "Udaipur, Jodhpur & Jaisalmer",
    "coverImage": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
    "packageGallery": [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
    ],
    "price": 21500,
    "originalPrice": 25000,
    "duration": "8 Days / 7 Nights",
    "dates": "1 Sept - 8 Sept 2026",
    "transport": "AC Pushback Bus",
    "hotelDetails": "Royal Resorts & Sam Sand Dunes Luxury Desert Camps",
    "meals": "All Meals Included (Rajasthani Thali)",
    "activities": ["Lake Pichola Boating", "Camel Desert Safari", "Rajasthani Folk Dance", "Mehrangarh Fort"],
    "shortDesc": "Udaipur Lake Pichola boating, Jaisalmer camel desert safari, Rajasthani folk dance & Jodhpur Mehrangarh Fort.",
    "includedServices": ["Resort Stay, Desert Camping, Camel Safari, Cultural Night"],
    "excludedServices": ["Personal Boating & Monument Tickets"],
    "rules": ["Follow desert camp instructions."],
    "itinerary": [
      { "day": 1, "title": "Udaipur Lake City Arrival", "desc": "Visit City Palace & Lake Pichola sunset boat ride." },
      { "day": 2, "title": "Jaisalmer Fort & Sam Sand Dunes", "desc": "Golden Fort visit & evening camel safari with folk music." }
    ],
    "seatsLeft": 0,
    "status": "full",
    "visible": true,
    "category": "family",
    "isFeatured": true,
    "isTrending": false,
    "isNew": false,
    "isSoldOut": true,
    "isUpcoming": false
  }
];

const INITIAL_ALBUMS = [
  {
    "id": "alb-1",
    "title": "Char Dham Yatra 2026",
    "coverImage": "images/himalayan_yatra.jpg",
    "description": "Sacred moments and snow peak views from Kedarnath, Badrinath, Gangotri & Yamunotri pilgrimage batches.",
    "year": "2026",
    "category": "Char Dham",
    "photos": [
      { "id": "ap-101", "image": "images/himalayan_yatra.jpg", "title": "Kedarnath Bholenath Snow Peak Temple" },
      { "id": "ap-102", "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80", "title": "Badrinath Mandir & Tapt Kund Bath" },
      { "id": "ap-103", "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80", "title": "Haridwar Ganga Aarti Har Ki Pauri" }
    ]
  },
  {
    "id": "alb-2",
    "title": "Vrindavan & Mathura Bliss 2026",
    "coverImage": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    "description": "Prem Mandir illumination, Banke Bihari darshan and Shri Krishna Janmabhoomi memories.",
    "year": "2026",
    "category": "Vrindavan",
    "photos": [
      { "id": "ap-201", "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80", "title": "Prem Mandir Evening Light Show" },
      { "id": "ap-202", "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80", "title": "Yamuna River Aarti Ghat" }
    ]
  },
  {
    "id": "alb-3",
    "title": "Khatu Shyam & Salasar Balaji Yatra",
    "coverImage": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    "description": "Divine darshan of Baba Khatu Shyamji and Salasar Hanumanji Balaji.",
    "year": "2026",
    "category": "Khatu Shyam",
    "photos": [
      { "id": "ap-301", "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80", "title": "Jaipur Pink City Hawa Mahal" },
      { "id": "ap-302", "image": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80", "title": "Salasar Balaji Mandir Entry" }
    ]
  }
];

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (!globalCloudStore) {
        globalCloudStore = {
            packages: INITIAL_PACKAGES,
            albums: INITIAL_ALBUMS,
            settings: {
                companyName: 'चंद्रकैलाश Tours & Travels',
                heroTagline: 'प्रवास फक्त ठिकाणांचा नाही... आठवणींचा असतो.',
                heroSubheading: 'Explore India\'s Most Trusted Religious & Family Tour Packages with Chandrakailash Tours & Travels.',
                phone: '9960833090',
                whatsapp: '9960833090',
                instagram: '@chandrakailash_tours',
                copyrightText: '© 2026 Chandrakailash Tours & Travels. All Rights Reserved.'
            },
            reviews: [],
            lastUpdated: Date.now()
        };
    }

    if (req.method === 'POST') {
        try {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
            if (body && typeof body === 'object') {
                if (Array.isArray(body.packages)) {
                    globalCloudStore.packages = body.packages;
                }
                if (Array.isArray(body.albums)) {
                    globalCloudStore.albums = body.albums;
                }
                if (Array.isArray(body.reviews)) {
                    globalCloudStore.reviews = body.reviews;
                }
                if (body.settings && typeof body.settings === 'object') {
                    globalCloudStore.settings = { ...globalCloudStore.settings, ...body.settings };
                }
                globalCloudStore.lastUpdated = Date.now();
                return res.status(200).json({ success: true, message: 'Cloud DB Updated', lastUpdated: globalCloudStore.lastUpdated, packageCount: globalCloudStore.packages.length });
            }
        } catch (err) {
            return res.status(400).json({ error: 'Invalid payload' });
        }
    }

    return res.status(200).json(globalCloudStore);
}
