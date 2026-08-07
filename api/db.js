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
    "name": "Khatu Shyam, Salasar Balaji & Jaipur Tour",
    "slug": "khatu-shyam-salasar",
    "showInHero": true,
    "heroOrder": 3,
    "destination": "Rajasthan (Khatu Shyamji - Salasar)",
    "coverImage": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
    "packageGallery": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
    ],
    "price": 16500,
    "originalPrice": 19000,
    "duration": "7 Days / 6 Nights",
    "dates": "20 July - 26 July 2026",
    "transport": "AC Luxury Bus",
    "hotelDetails": "3-Star Deluxe Hotels",
    "meals": "Rajasthani Special Veg Thali & Meals",
    "activities": ["Baba Khatu Shyam Darshan", "Salasar Hanuman Puja", "Jaipur City Palace & Hawa Mahal"],
    "shortDesc": "Blessed yatra to Baba Khatu Shyamji, Salasar Hanumanji Balaji, Pink City Jaipur Hawa Mahal & Pushkar Brahma Temple.",
    "includedServices": [
      "AC Bus Transport",
      "3-Star Deluxe Hotel Stay",
      "Rajasthani Pure Veg Food",
      "Sightseeing & Temple Passes"
    ],
    "excludedServices": ["Personal Purchases"],
    "rules": ["Carry government ID card."],
    "itinerary": [
      { "day": 1, "title": "Travel to Jaipur", "desc": "Departure & travel." },
      { "day": 2, "title": "Jaipur Sightseeing", "desc": "Amer Fort, Hawa Mahal & Jal Mahal." },
      { "day": 3, "title": "Khatu Shyamji Darshan", "desc": "Holy Darshan & Nishan Puja at Baba Khatu Shyam Dham." },
      { "day": 4, "title": "Salasar Balaji & Pushkar", "desc": "Salasar Hanumanji temple & Pushkar Brahma temple." }
    ],
    "seatsLeft": 4,
    "status": "open",
    "visible": true,
    "category": "family",
    "isFeatured": false,
    "isTrending": true,
    "isNew": true,
    "isSoldOut": false,
    "isUpcoming": false
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
            albums: [],
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
                if (Array.isArray(body.packages)) globalCloudStore.packages = body.packages;
                if (Array.isArray(body.albums)) globalCloudStore.albums = body.albums;
                if (Array.isArray(body.reviews)) globalCloudStore.reviews = body.reviews;
                if (body.settings && typeof body.settings === 'object') {
                    globalCloudStore.settings = { ...globalCloudStore.settings, ...body.settings };
                }
                globalCloudStore.lastUpdated = Date.now();
                return res.status(200).json({ success: true, message: 'Cloud DB Updated', lastUpdated: globalCloudStore.lastUpdated });
            }
        } catch (err) {
            return res.status(400).json({ error: 'Invalid payload' });
        }
    }

    return res.status(200).json(globalCloudStore);
}
