/**
 * चंद्रकैलाश Tours & Travels - World-Class CMS & Web Application
 * Brand: चंद्रकैलाश Tours & Travels (Jalgaon, Maharashtra, India)
 * Features:
 * 1. Professional CMS Admin Dashboard (Framer / Shopify / WordPress style)
 * 2. Tour Package CMS: Add/Edit/Delete/Duplicate with Package-Specific Galleries & Badges (Featured, Trending, New, Sold Out, Upcoming)
 * 3. Instagram / Google Photos Style Album Gallery (Albums, Filters by Year & Destination, Fullscreen Lightbox with Next/Prev, Zoom, Touch Swipe, Download Protection)
 * 4. Media Uploader Component: Drag & Drop, File Browser, Real-Time Progress, HTML5 Canvas Auto-Compression (WebP, Max 10MB)
 * 5. Feature 1: Enquiry Manager (New, Contacted, Booked, Cancelled statuses + Excel Export)
 * 6. Feature 2: Printable Booking PDF / Itinerary (Print-ready A4 brochure generator with window.print())
 * 7. Feature 3: Hero Banner Slider & Manager (Upload homepage banners, set active/inactive, link to packages)
 * 8. Zero image URL pasting required anywhere in the entire system.
 */

// ----------------------------------------------------
// 1. DEFAULT TRANSLATIONS & DICTIONARY
// ----------------------------------------------------
const DEFAULT_I18N = {
    en: {
        nav_home: 'Home',
        nav_packages: 'Packages',
        nav_gallery: 'Gallery',
        nav_about: 'About',
        nav_contact: 'Contact',
        hero_slogan: 'प्रवास फक्त ठिकाणांचा नाही... आठवणींचा असतो.',
        hero_subheading: 'Explore India\'s Most Trusted Religious & Family Tour Packages with Chandrakailash Tours & Travels.',
        btn_explore: 'Explore Packages',
        btn_whatsapp: 'WhatsApp Booking',
        btn_call: 'Call Now',
        btn_details: 'View Details',
        btn_book_wa: 'Book on WhatsApp',
        sec_packages_tag: 'Tour Batches 2026',
        sec_packages_title: 'Popular Tour Packages',
        sec_reviews_title: 'Customer Reviews',
        sec_reviews_sub: 'Real experiences from travelers across Maharashtra',
        stat_pilgrims: 'Happy Pilgrims',
        stat_yatra: 'Safe Yatra',
        stat_support: '24x7 Support',
        label_duration: 'Duration',
        label_dates: 'Travel Dates',
        label_price: 'Price Per Person',
        tab_itinerary: '📅 Day-Wise Plan',
        tab_included: '✓ What\'s Included / Excluded',
        tab_rules: '⚠️ Rules & Regulations',
        cnt_title: 'Contact Us',
        cnt_sub: 'Reach out to our direct yatra support team',
        cnt_form_title: 'Send Booking Inquiry',
        cnt_name: 'Full Name *',
        cnt_phone: 'Mobile / WhatsApp Number *',
        cnt_pkg: 'Select Tour Package',
        cnt_msg: 'Message / Requirements',
        cnt_submit: 'Submit Inquiry & Connect on WhatsApp'
    },
    mr: {
        nav_home: 'मुख्यपृष्ठ',
        nav_packages: 'टूर पॅकेजेस',
        nav_gallery: 'गॅलरी',
        nav_about: 'आमच्याबद्दल',
        nav_contact: 'संपर्क',
        hero_slogan: 'प्रवास फक्त ठिकाणांचा नाही... आठवणींचा असतो.',
        hero_subheading: 'चंद्रकैलाश ट्रॅव्हल्स सोबत अनुभवा भारतातील सर्वात विश्वासू धार्मिक आणि कौटुंबिक सहली.',
        btn_explore: 'पॅकेजेस पहा',
        btn_whatsapp: 'व्हॉट्सॲप बुकिंग',
        btn_call: 'थेट फोन करा',
        btn_details: 'सविस्तर माहिती',
        btn_book_wa: 'व्हॉट्सॲपवर बुक करा',
        sec_packages_tag: 'आगामी यात्रा २०२६',
        sec_packages_title: 'लोकप्रिय टूर पॅकेजेस',
        sec_reviews_title: 'प्रवाशांचे मनोगत',
        sec_reviews_sub: 'महाराष्ट्रभरातील प्रवाशांचे खरे अनुभव',
        stat_pilgrims: 'आनंदी प्रवासी',
        stat_yatra: 'सुरक्षित यात्रा',
        stat_support: '२४x७ मदत',
        label_duration: 'कालावधी',
        label_dates: 'प्रवास तारीख',
        label_price: 'प्रति व्यक्ती दर',
        tab_itinerary: '📅 दिवसानिहाय नियोजन',
        tab_included: '✓ समाविष्ट / असमाविष्ट सेवा',
        tab_rules: '⚠️ नियम व अटी',
        cnt_title: 'संपर्क साधा',
        cnt_sub: 'आमच्या टीमशी थेट संपर्क साधा',
        cnt_form_title: 'चौकशी अर्ज भरा',
        cnt_name: 'पूर्ण नाव *',
        cnt_phone: 'मोबाईल / व्हॉट्सॲप नंबर *',
        cnt_pkg: 'टूर पॅकेज निवडा',
        cnt_msg: 'काही विशेष आवश्यकता...',
        cnt_submit: 'अर्ज पाठवा व व्हॉट्सॲपवर जोडा'
    }
};

// ----------------------------------------------------
// 2. INITIAL DATABASE SEEDS
// ----------------------------------------------------
const INITIAL_SETTINGS = {
    brandMarathi: 'चंद्रकैलाश',
    brandEnglish: 'Tours & Travels',
    companyName: 'चंद्रकैलाश Tours & Travels',
    phone: '9960833090',
    whatsapp: '919960833090',
    email: 'info@chandrakailashtours.com',
    instagram: '@chandrakailash_tours',
    facebook: 'ChandrakailashToursJalgaon',
    officeAddress: 'Jalgaon, Maharashtra, India',
    googleMapsUrl: 'https://maps.google.com/?q=Jalgaon+Maharashtra',
    heroTagline: 'प्रवास फक्त ठिकाणांचा नाही... आठवणींचा असतो.',
    heroSubheading: 'Explore India\'s Most Trusted Religious & Family Tour Packages with Chandrakailash Tours & Travels.',
    heroBgImage: 'images/himalayan_yatra.jpg',
    logoUrl: '',
    faviconUrl: '',
    primaryColor: '#0B1F3A',
    accentColor: '#F57C00',
    copyrightText: '© 2026 चंद्रकैलाश Tours & Travels. All Rights Reserved.',
    langSwitchEnabled: true,
    secPackagesEnabled: true,
    secReviewsEnabled: true,
    secGalleryEnabled: true,
    adminUserHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    adminPassHash: 'c42d38fffa9e924a4855276ea947bcaebf8b6fa2863957eb0ec3d6efed50a58f',
    metaTitle: 'चंद्रकैलाश Tours & Travels - Premier Religious & Family Yatra Packages',
    metaDescription: 'Book Char Dham Yatra 2026, Vrindavan, Khatu Shyam & Family Tour Packages with Chandrakailash Tours & Travels, Jalgaon.',
    metaKeywords: 'Char Dham Yatra 2026, Chandrakailash Tours Jalgaon, Kedarnath Tour, Vrindavan Mathura Tour'
};

const INITIAL_PACKAGES = [
    {
        id: 'pkg-1',
        name: 'Complete Char Dham Yatra 2026',
        slug: 'char-dham-yatra',
        showInHero: true,
        heroOrder: 1,
        destination: 'Uttarakhand (Yamunotri, Gangotri, Kedarnath, Badrinath)',
        coverImage: 'images/himalayan_yatra.jpg',
        packageGallery: [
            'images/himalayan_yatra.jpg',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1609946850426-3023b49c716d?auto=format&fit=crop&w=800&q=80'
        ],
        price: 32500,
        originalPrice: 36000,
        duration: '12 Days / 11 Nights',
        dates: '15 May - 26 May 2026',
        transport: 'AC Tourist Bus',
        hotelDetails: '3-Star Clean AC Hotels & Holy Ashrams',
        meals: 'Pure Veg Breakfast, Lunch & Dinner (Jain Available)',
        activities: ['Ganga Aarti at Haridwar', 'Kedarnath Temple Puja', 'Badrinath Tapt Kund Bath', 'Yamunotri & Gangotri Darshan'],
        shortDesc: 'Complete sacred pilgrimage covering all 4 Dhams with experienced tour manager.',
        includedServices: [
            'AC Bus Travel',
            '3-Star Hotel & Ashram Accommodation',
            'Daily Fresh Pure Veg Breakfast, Lunch & Dinner',
            'Experienced Tour Manager & Local Guide Support',
            'Char Dham Yatra E-Pass & Temple Passes'
        ],
        excludedServices: [
            'Personal Shopping & Medical Expenses',
            'Kedarnath Helicopter / Pony / Palki Ticket Cost',
            'Individual Temple VIP Passes'
        ],
        rules: [
            'Original Aadhaar Card compulsory for all yatra passengers.',
            '₹5,000 token advance required at booking.',
            'Senior citizens must carry personal daily prescribed medicines.'
        ],
        itinerary: [
            { day: 1, title: 'Departure Journey', desc: 'Overnight comfortable travel from Jalgaon/Maharashtra.' },
            { day: 2, title: 'Haridwar Arrival & Ganga Aarti', desc: 'Hotel check-in at Haridwar & evening holy Ganga Aarti at Har Ki Pauri.' },
            { day: 3, title: 'Yamunotri Dham Darshan', desc: 'Travel to Barkot, trek to Yamunotri Temple and holy Surya Kund bath.' },
            { day: 4, title: 'Uttarkashi to Gangotri Dham', desc: 'Visit Gangotri Temple on Bhagirathi river bank and perform sacred puja.' },
            { day: 5, title: 'Guptkashi to Kedarnath Trek', desc: 'Proceed to Sonprayag/Gaurikund and trek to sacred Kedarnath Temple.' },
            { day: 6, title: 'Kedarnath Temple Darshan', desc: 'Early morning Kedarnath Bholenath darshan, puja & descent to Guptkashi.' },
            { day: 7, title: 'Badrinath Dham Darshan', desc: 'Drive to Badrinath, Tapt Kund holy bath and Lord Badri Vishal darshan.' },
            { day: 8, title: 'Rishikesh Sightseeing & Return', desc: 'Visit Laxman Jhula, Ram Jhula, Triveni Ghat & start return journey.' }
        ],
        seatsLeft: 12,
        status: 'open',
        visible: true,
        category: 'religious',
        isFeatured: true,
        isTrending: true,
        isNew: true,
        isSoldOut: false,
        isUpcoming: false
    },
    {
        id: 'pkg-2',
        name: 'Vrindavan, Mathura, Gokul & Agra Darshan',
        slug: 'vrindavan-mathura',
        showInHero: true,
        heroOrder: 2,
        destination: 'Uttar Pradesh (Vrindavan - Mathura)',
        coverImage: 'https://images.unsplash.com/photo-1609946850426-3023b49c716d?auto=format&fit=crop&w=1000&q=80',
        packageGallery: [
            'https://images.unsplash.com/photo-1609946850426-3023b49c716d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
        ],
        price: 14800,
        originalPrice: 17000,
        duration: '6 Days / 5 Nights',
        dates: '10 June - 15 June 2026',
        transport: 'AC Pushback Bus',
        hotelDetails: 'Deluxe AC Hotels in Vrindavan',
        meals: 'Daily Breakfast, Lunch & Pure Veg Dinner',
        activities: ['Banke Bihari Darshan', 'Prem Mandir Lighting Show', 'Yamuna Aarti', 'Taj Mahal Visit'],
        shortDesc: 'Blissful Krishna Darshan covering Banke Bihari, ISKCON, Prem Mandir illumination, Krishna Janmabhoomi & Taj Mahal.',
        includedServices: [
            'Return AC Bus Travel',
            '5 Nights Deluxe AC Hotel Stay in Vrindavan',
            'Pure Veg Meals Included',
            'Special Temple Guide & Local Transport'
        ],
        excludedServices: ['Taj Mahal & Fort Entry Monument Tickets', 'Personal Shopping'],
        rules: ['Follow temple dress codes and mobile phone restrictions.'],
        itinerary: [
            { day: 1, title: 'Departure Journey', desc: 'Evening departure.' },
            { day: 2, title: 'Mathura Janmabhoomi & Dwarkadhish', desc: 'Check-in hotel, visit Shri Krishna Janmabhoomi & Vishram Ghat.' },
            { day: 3, title: 'Vrindavan Banke Bihari & Prem Mandir', desc: 'Banke Bihari Darshan, ISKCON Temple & evening grand Prem Mandir light show.' },
            { day: 4, title: 'Gokul, Barsana & Goverdhan', desc: 'Visit Nandgaon, Barsana Radha Rani temple & Goverdhan Parikrama point.' },
            { day: 5, title: 'Agra Taj Mahal & Return', desc: 'Visit Taj Mahal & Agra Fort, start return travel.' }
        ],
        seatsLeft: 8,
        status: 'open',
        visible: true,
        category: 'religious',
        isFeatured: true,
        isTrending: true,
        isNew: false,
        isSoldOut: false,
        isUpcoming: false
    },
    {
        id: 'pkg-3',
        name: 'Khatu Shyam, Salasar Balaji & Jaipur Special',
        slug: 'khatu-shyam-salasar',
        showInHero: true,
        heroOrder: 3,
        destination: 'Rajasthan (Khatu Shyamji - Salasar)',
        coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
        packageGallery: [
            'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
        ],
        price: 16500,
        originalPrice: 19000,
        duration: '7 Days / 6 Nights',
        dates: '20 July - 26 July 2026',
        transport: 'AC Bus',
        hotelDetails: '3-Star AC Hotels in Khatu Shyam & Jaipur',
        meals: 'All Meals Included (Rajasthani & Veg Flavors)',
        activities: ['Khatu Shyam Baba Darshan', 'Salasar Balaji Puja', 'Jaipur Hawa Mahal', 'Pushkar Brahma Temple'],
        shortDesc: 'Blessed yatra to Baba Khatu Shyamji, Salasar Hanumanji Balaji, Pink City Jaipur Hawa Mahal & Pushkar Brahma Temple.',
        includedServices: ['Travel, Hotel Stay & Veg Meals', 'Guided VIP Darshan Lines'],
        excludedServices: ['Personal Expenses'],
        rules: ['Reporting on time at departure point.'],
        itinerary: [
            { day: 1, title: 'Departure', desc: 'Overnight bus journey to Rajasthan.' },
            { day: 2, title: 'Khatu Shyamji Arrival & Darshan', desc: 'Hotel check-in & divine darshan of Baba Khatu Shyamji.' },
            { day: 3, title: 'Salasar Balaji & Rani Sati Dadi', desc: 'Salasar Balaji Mandir & Jhunjhunu Rani Sati Dadi temple visit.' },
            { day: 4, title: 'Jaipur Pink City Sightseeing', desc: 'Visit Hawa Mahal, Amer Fort, Jal Mahal & Johari Bazaar shopping.' },
            { day: 5, title: 'Pushkar & Return Journey', desc: 'Pushkar Sarovar bath, Lord Brahma Temple & return drive.' }
        ],
        seatsLeft: 4,
        status: 'open',
        visible: true,
        category: 'religious',
        isFeatured: false,
        isTrending: true,
        isNew: true,
        isSoldOut: false,
        isUpcoming: false
    },
    {
        id: 'pkg-4',
        name: 'Rishikesh Adventure & Kedarnath Special',
        slug: 'rishikesh-ganga-aarti',
        showInHero: true,
        heroOrder: 4,
        destination: 'Uttarakhand (Rishikesh & Kedarnath)',
        coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
        packageGallery: [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
            'images/himalayan_yatra.jpg'
        ],
        price: 24900,
        originalPrice: 28000,
        duration: '9 Days / 8 Nights',
        dates: '5 Aug - 13 Aug 2026',
        transport: 'AC Bus',
        hotelDetails: '3-Star River View Hotels & Tents',
        meals: 'Daily Breakfast, Lunch & Dinner',
        activities: ['Ganga River Rafting', 'Cliff Jumping', 'Kedarnath Trek', 'Triveni Ghat Aarti'],
        shortDesc: 'Combine thrilling Ganga river rafting in Rishikesh with holy trek to Kedarnath Temple.',
        includedServices: ['Travel, Stay, Veg Meals, Rafting Gear & Safety Instructor'],
        excludedServices: ['Helicopter tickets'],
        rules: ['Good health & basic physical fitness required.'],
        itinerary: [
            { day: 1, title: 'Departure to Rishikesh', desc: 'Bus departure.' },
            { day: 2, title: 'Rishikesh White Water Rafting', desc: '16km Ganga rafting & cliff jumping.' },
            { day: 3, title: 'Kedarnath Yatra Trek', desc: 'Sonprayag to Kedarnath temple trek & Bholenath darshan.' }
        ],
        seatsLeft: 15,
        status: 'open',
        visible: true,
        category: 'adventure',
        isFeatured: false,
        isTrending: false,
        isNew: true,
        isSoldOut: false,
        isUpcoming: true
    },
    {
        id: 'pkg-5',
        name: 'Rajasthan Royal Family & Desert Camping Tour',
        slug: 'rajasthan-tour',
        showInHero: true,
        heroOrder: 5,
        destination: 'Udaipur, Jodhpur & Jaisalmer',
        coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
        packageGallery: [
            'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
        ],
        price: 21500,
        originalPrice: 25000,
        duration: '8 Days / 7 Nights',
        dates: '1 Sept - 8 Sept 2026',
        transport: 'AC Pushback Bus',
        hotelDetails: 'Royal Resorts & Sam Sand Dunes Luxury Desert Camps',
        meals: 'All Meals Included (Rajasthani Thali)',
        activities: ['Lake Pichola Boating', 'Camel Desert Safari', 'Rajasthani Folk Dance', 'Mehrangarh Fort'],
        shortDesc: 'Udaipur Lake Pichola boating, Jaisalmer camel desert safari, Rajasthani folk dance & Jodhpur Mehrangarh Fort.',
        includedServices: ['Resort Stay, Desert Camping, Camel Safari, Cultural Night'],
        excludedServices: ['Personal Boating & Monument Tickets'],
        rules: ['Follow desert camp instructions.'],
        itinerary: [
            { day: 1, title: 'Udaipur Lake City Arrival', desc: 'Visit City Palace & Lake Pichola sunset boat ride.' },
            { day: 2, title: 'Jaisalmer Fort & Sam Sand Dunes', desc: 'Golden Fort visit & evening camel safari with folk music.' }
        ],
        seatsLeft: 0,
        status: 'full',
        visible: true,
        category: 'family',
        isFeatured: true,
        isTrending: false,
        isNew: false,
        isSoldOut: true,
        isUpcoming: false
    }
];

const INITIAL_ALBUMS = [
    {
        id: 'alb-1',
        title: 'Char Dham Yatra 2026',
        coverImage: 'images/himalayan_yatra.jpg',
        description: 'Sacred moments and snow peak views from Kedarnath, Badrinath, Gangotri & Yamunotri pilgrimage batches.',
        year: '2026',
        category: 'Char Dham',
        photos: [
            { id: 'ap-101', image: 'images/himalayan_yatra.jpg', title: 'Kedarnath Bholenath Snow Peak Temple' },
            { id: 'ap-102', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', title: 'Badrinath Mandir & Tapt Kund Bath' },
            { id: 'ap-103', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', title: 'Haridwar Ganga Aarti Har Ki Pauri' }
        ]
    },
    {
        id: 'alb-2',
        title: 'Vrindavan & Mathura Bliss 2026',
        coverImage: 'https://images.unsplash.com/photo-1609946850426-3023b49c716d?auto=format&fit=crop&w=800&q=80',
        description: 'Prem Mandir illumination, Banke Bihari darshan and Shri Krishna Janmabhoomi memories.',
        year: '2026',
        category: 'Vrindavan',
        photos: [
            { id: 'ap-201', image: 'https://images.unsplash.com/photo-1609946850426-3023b49c716d?auto=format&fit=crop&w=800&q=80', title: 'Prem Mandir Evening Light Show' },
            { id: 'ap-202', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80', title: 'Yamuna River Aarti Ghat' }
        ]
    },
    {
        id: 'alb-3',
        title: 'Khatu Shyam & Salasar Balaji Yatra',
        coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        description: 'Divine darshan of Baba Khatu Shyamji and Salasar Hanumanji Balaji.',
        year: '2026',
        category: 'Khatu Shyam',
        photos: [
            { id: 'ap-301', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80', title: 'Jaipur Pink City Hawa Mahal' },
            { id: 'ap-302', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80', title: 'Salasar Balaji Mandir Entry' }
        ]
    },
    {
        id: 'alb-4',
        title: 'Rajasthan Royal Desert Safari 2025',
        coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
        description: 'Sam Sand Dunes Jaisalmer camel safari, folk dance and Lake Pichola Udaipur boating.',
        year: '2025',
        category: 'Rajasthan',
        photos: [
            { id: 'ap-401', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80', title: 'Jaisalmer Desert Camel Safari' }
        ]
    },
    {
        id: 'alb-5',
        title: 'Rishikesh Adventure & Ganga Aarti',
        coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        description: 'White water rafting, cliff jumping and evening Ganga Aarti at Triveni Ghat.',
        year: '2026',
        category: 'Adventure',
        photos: [
            { id: 'ap-501', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', title: 'Rishikesh White Water Rafting' }
        ]
    },
    {
        id: 'alb-6',
        title: 'Customer Yatra Memories',
        coverImage: 'images/luxury_volvo_bus.jpg',
        description: 'Happy travelers and family groups traveling in our luxury AC tourist coaches.',
        year: '2025',
        category: 'Customer Memories',
        photos: [
            { id: 'ap-601', image: 'images/luxury_volvo_bus.jpg', title: 'AC Tourist Coach Batch Departure' }
        ]
    }
];

const INITIAL_REVIEWS = [
    { id: 'r-1', name: 'सुरेश पाटील (Suresh Patil)', city: 'Maharashtra', rating: 5, review: 'चंद्रकैलाश ट्रॅव्हल्स सोबत आमची चारधाम यात्रा अतिशय सुखद झाली. योगेश पाटील सरांचे नियोजन खूप छान होते. जेवणाची आणि राहण्याची उत्तम सोय!', date: 'Oct 2025', pinned: true },
    { id: 'r-2', name: 'सुनिता चौधरी (Sunita Chaudhari)', city: 'Maharashtra', rating: 5, review: 'वृंदावन-मथुरा टूर खूप आवडली. सर्व हॉटेल्स स्वच्छ होती आणि वेळेवर शुद्ध शाकाहारी जेवण मिळाले. अत्यंत विश्वासू ट्रॅव्हल्स!', date: 'Nov 2025', pinned: true },
    { id: 'r-3', name: 'महेश देशपांडे (Mahesh Deshpande)', city: 'Maharashtra', rating: 5, review: 'खाटू श्यामजी आणि सालासर बालाजी टूरचा अनुभव खूप छान राहिला. लक्झरी बस प्रवास अत्यंत आरामदायी होता.', date: 'Dec 2025', pinned: false },
    { id: 'r-4', name: 'प्रतीक पाटील (Pratik Patil)', city: 'Jalgaon, Maharashtra', rating: 5, review: 'चंद्रकैलाश ट्रॅव्हल्स सोबत आमची ऋषिकेश आणि चारधाम यात्रा अत्यंत सुंदर व अविस्मरणीय झाली. बस प्रवास अतिशय आरामदायी होता आणि भोजन व्यवस्था उत्कृष्ट होती!', date: 'Jan 2026', pinned: true },
    { id: 'r-5', name: 'मानसी बर्हाटे (Mansi Barhate)', city: 'Nashik, Maharashtra', rating: 5, review: 'वृंदावन-मथुरा आणि गोकुळ दर्शन टूर खूपच छान आयोजित केली होती. वेळेवर शुद्ध शाकाहारी जेवण आणि उत्कृष्ट हॉटेल मुक्काम. अत्यंत विश्वसनीय सेवा!', date: 'Feb 2026', pinned: true },
    { id: 'r-6', name: 'आनंद जोशी (Anand Joshi)', city: 'Pune, Maharashtra', rating: 5, review: 'खाटू श्यामजी व सालासर बालाजी यात्रेचे नियोजन सुरेख होते. संपूर्ण कुटुंबासाठी अतिशय सुरक्षित आणि आनंददायी प्रवास अनुभव.', date: 'Mar 2026', pinned: true },
    { id: 'r-7', name: 'पूजा शिंदे (Pooja Shinde)', city: 'Chhatrapati Sambhajinagar, Maharashtra', rating: 5, review: 'राजस्थान रॉयल डेझर्ट सफारी टूर खूप छान झाली. योगेश पाटील सर स्वतः प्रवाशांची काळजी घेतात. सर्व स्टाफ खूप नम्र व सहकार्य करणारा आहे.', date: 'Apr 2026', pinned: true }
];

const INITIAL_BOOKINGS = [
    { id: 'bk-101', name: 'Ramesh Patil', phone: '9823012345', destination: 'Complete Char Dham Yatra 2026', travelDate: '15 May 2026', peopleCount: 4, message: 'Need 2 Senior Citizen seats info.', status: 'Booked', createdAt: '2026-08-01', adminNotes: 'Advance payment received.' },
    { id: 'bk-102', name: 'Pravin Mahajan', phone: '9422256789', destination: 'Vrindavan, Mathura & Agra', travelDate: '10 June 2026', peopleCount: 2, message: 'AC Bus seat preference.', status: 'New', createdAt: '2026-08-03', adminNotes: '' }
];

// ----------------------------------------------------
// 3. MEDIA UPLOADER & COMPRESSION ENGINE
// ----------------------------------------------------
const uploaderState = {
    progress: {}, // id -> { active: boolean, percent: number, status: string, fileName: string }
    previews: {}, // id -> dataUrl
    dragOver: {}  // id -> boolean
};

// IndexedDB Async Persistent Storage Engine
const DB_NAME = 'ChandrakailashToursDB';
const DB_VERSION = 2;
const STORE_NAME = 'app_state';

function openDB() {
    return new Promise((resolve) => {
        if (!window.indexedDB) return resolve(null);
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror = () => resolve(null);
    });
}

async function saveToIndexedDB(key, val) {
    try {
        const db = await openDB();
        if (!db) return;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(val, key);
    } catch (err) {
        console.warn('IndexedDB save notice:', err);
    }
}

async function loadFromIndexedDB(key) {
    try {
        const db = await openDB();
        if (!db) return null;
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const req = tx.objectStore(STORE_NAME).get(key);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        });
    } catch (err) {
        return null;
    }
}

/**
 * Validates file size (max 10MB) & file type (JPG, JPEG, PNG, WEBP),
 * then compresses image to high-quality WebP format using HTML5 Canvas.
 */
function compressImageFile(file, options = {}) {
    return new Promise((resolve, reject) => {
        const maxWidth = options.maxWidth || 1600;
        const maxHeight = options.maxHeight || 1600;
        const quality = options.quality || 0.82;
        const maxSizeMB = 10;

        if (file.size > maxSizeMB * 1024 * 1024) {
            const fileMB = (file.size / (1024 * 1024)).toFixed(1);
            return reject(new Error(`File "${file.name}" (${fileMB} MB) exceeds the 10 MB maximum limit. Please select an image under 10 MB.`));
        }

        const fileNameLower = (file.name || '').toLowerCase();
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const isValidExt = validExtensions.some(ext => fileNameLower.endsWith(ext));
        const isValidType = file.type ? file.type.toLowerCase().startsWith('image/') : isValidExt;

        if (!isValidType && !isValidExt) {
            return reject(new Error(`Invalid file format for "${file.name}". Only JPG, JPEG, PNG, and WEBP images are allowed.`));
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    if (width / height > maxWidth / maxHeight) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    } else {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                let mimeType = 'image/webp';
                let dataUrl = canvas.toDataURL(mimeType, quality);

                if (!dataUrl || !dataUrl.startsWith('data:image/webp')) {
                    mimeType = 'image/jpeg';
                    dataUrl = canvas.toDataURL(mimeType, quality);
                }

                const base64Str = dataUrl.split(',')[1] || '';
                const compressedSize = Math.round((base64Str.length * 3) / 4);
                const savingsPercent = Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100));

                resolve({
                    dataUrl,
                    originalSize: file.size,
                    compressedSize,
                    savingsPercent,
                    width,
                    height,
                    fileName: file.name,
                    mimeType
                });
            };
            img.onerror = () => reject(new Error(`Could not decode image "${file.name}".`));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error(`Failed to read file "${file.name}".`));
        reader.readAsDataURL(file);
    });
}

function triggerFilePicker(id) {
    const el = document.getElementById(`file_input_${id}`);
    if (el) el.click();
}

function handleUploaderDragOver(e, id) {
    e.preventDefault();
    e.stopPropagation();
    if (!uploaderState.dragOver[id]) {
        uploaderState.dragOver[id] = true;
        render();
    }
}

function handleUploaderDragLeave(e, id) {
    e.preventDefault();
    e.stopPropagation();
    if (uploaderState.dragOver[id]) {
        uploaderState.dragOver[id] = false;
        render();
    }
}

async function handleUploaderDrop(e, id, allowMultiple = false) {
    e.preventDefault();
    e.stopPropagation();
    uploaderState.dragOver[id] = false;
    const files = Array.from(e.dataTransfer ? e.dataTransfer.files : []);
    if (files.length > 0) {
        await processUploaderFiles(id, files, allowMultiple);
    }
}

async function handleUploaderFileSelect(e, id, allowMultiple = false) {
    const files = Array.from(e.target ? e.target.files : []);
    if (files.length > 0) {
        await processUploaderFiles(id, files, allowMultiple);
    }
}

async function processUploaderFiles(id, files, allowMultiple) {
    if (!files || files.length === 0) return;

    if (!allowMultiple) {
        const file = files[0];
        uploaderState.progress[id] = { active: true, percent: 30, status: 'Reading Image...', fileName: file.name };
        render();

        try {
            uploaderState.progress[id].percent = 60;
            uploaderState.progress[id].status = 'Compressing & Optimizing Image (WebP)...';
            render();

            const res = await compressImageFile(file);

            uploaderState.progress[id].percent = 100;
            uploaderState.progress[id].status = `Optimized! (${(res.originalSize/1024).toFixed(0)}KB ➔ ${(res.compressedSize/1024).toFixed(0)}KB, -${res.savingsPercent}%)`;
            render();

            uploaderState.previews[id] = res.dataUrl;

            if (id === 'bm_logo') state.tempBrandingLogo = res.dataUrl;
            if (id === 'bm_herobg') state.tempBrandingHeroBg = res.dataUrl;
            if (id === 'pkg_cover') state.tempPkgCoverImage = res.dataUrl;
            if (id === 'album_cover') state.tempAlbumCoverImage = res.dataUrl;
            if (id === 'hero_banner_img') state.tempHeroBannerImg = res.dataUrl;

        } catch (err) {
            alert(err.message || 'Image processing failed.');
        } finally {
            uploaderState.progress[id] = { active: false };
            render();
        }
    } else {
        uploaderState.progress[id] = { active: true, percent: 10, status: `Processing 0 of ${files.length} images...` };
        render();

        let count = 0;
        const total = files.length;

        if (id === 'pkg_gallery_uploader') {
            const currentPkgGallery = [...(state.tempPkgGallery || [])];
            for (const file of files) {
                count++;
                uploaderState.progress[id] = { active: true, percent: Math.round((count / total) * 100), status: `Compressing package photo ${count} of ${total}...`, fileName: file.name };
                render();
                try {
                    const res = await compressImageFile(file);
                    currentPkgGallery.push(res.dataUrl);
                } catch (err) {
                    alert(`Skipped file ${file.name}: ${err.message}`);
                }
            }
            state.tempPkgGallery = currentPkgGallery;
        } else if (id === 'album_photos_uploader') {
            const currentAlbumPhotos = [...(state.tempAlbumPhotos || [])];
            for (const file of files) {
                count++;
                uploaderState.progress[id] = { active: true, percent: Math.round((count / total) * 100), status: `Compressing album photo ${count} of ${total}...`, fileName: file.name };
                render();
                try {
                    const res = await compressImageFile(file);
                    const defaultTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
                    currentAlbumPhotos.push({
                        id: 'ap-' + Date.now() + '-' + count,
                        image: res.dataUrl,
                        title: defaultTitle
                    });
                } catch (err) {
                    alert(`Skipped file ${file.name}: ${err.message}`);
                }
            }
            state.tempAlbumPhotos = currentAlbumPhotos;
        }

        uploaderState.progress[id] = { active: false };
        render();
    }
}

function removeUploaderImage(id) {
    uploaderState.previews[id] = '';
    if (id === 'bm_logo') state.tempBrandingLogo = '';
    if (id === 'bm_herobg') state.tempBrandingHeroBg = '';
    if (id === 'pkg_cover') state.tempPkgCoverImage = '';
    if (id === 'album_cover') state.tempAlbumCoverImage = '';
    if (id === 'hero_banner_img') state.tempHeroBannerImg = '';
    render();
}

function renderMediaUploader({ id, label, currentImage, allowMultiple = false, helperText = '' }) {
    const prog = uploaderState.progress[id];
    const isDragOver = uploaderState.dragOver[id];
    
    let activeImage = currentImage;
    if (uploaderState.previews[id] !== undefined) {
        activeImage = uploaderState.previews[id];
    }

    let html = `<div class="media-uploader-wrapper space-y-2">`;
    if (label) {
        html += `<label class="block font-bold text-slate-700 text-xs">${label}</label>`;
    }

    if (prog && prog.active) {
        html += `
            <div class="bg-saffron-50 border-2 border-saffron-300 rounded-2xl p-5 text-center space-y-3 shadow-inner">
                <div class="flex items-center justify-center gap-2 text-saffron-600 font-bold text-xs">
                    <i class="fa-solid fa-spinner fa-spin text-lg"></i>
                    <span>${prog.status || 'Compressing & Optimizing Image...'}</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div class="bg-saffron-500 h-2.5 rounded-full transition-all duration-300" style="width: ${prog.percent || 50}%"></div>
                </div>
                <p class="text-[11px] text-slate-500 font-medium">${prog.fileName ? 'File: ' + prog.fileName : 'Optimizing image resolution...'}</p>
            </div>
        `;
    } 
    else if (activeImage && !allowMultiple) {
        html += `
            <div class="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-md group transition hover:shadow-lg">
                <div class="h-44 w-full flex items-center justify-center bg-slate-950/60 backdrop-blur overflow-hidden relative">
                    <img src="${activeImage}" alt="Uploaded Image" class="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105" />
                    <span class="absolute top-2.5 left-2.5 bg-emerald-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1 backdrop-blur-sm">
                        <i class="fa-solid fa-shield-halved"></i> Web Optimized
                    </span>
                </div>

                <div class="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
                    <button type="button" onclick="triggerFilePicker('${id}')" class="btn-premium bg-slate-100 hover:bg-slate-200 text-navy-900 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
                        <i class="fa-solid fa-arrows-rotate text-saffron-500"></i> Replace Image
                    </button>
                    
                    <div class="flex items-center gap-2">
                        <button type="button" onclick="openLightboxSingle('${activeImage}', '${label || 'Preview'}')" class="text-slate-500 hover:text-navy-900 text-xs font-bold px-2 py-1">
                            <i class="fa-solid fa-eye"></i> Preview
                        </button>
                        <button type="button" onclick="removeUploaderImage('${id}')" class="btn-premium bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 border border-rose-200">
                            <i class="fa-solid fa-trash-can"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    else {
        html += `
            <div 
                id="dropzone_${id}"
                ondragover="handleUploaderDragOver(event, '${id}')"
                ondragleave="handleUploaderDragLeave(event, '${id}')"
                ondrop="handleUploaderDrop(event, '${id}', ${allowMultiple})"
                onclick="triggerFilePicker('${id}')"
                class="border-2 border-dashed ${isDragOver ? 'border-saffron-500 bg-saffron-50/80 scale-[1.01]' : 'border-slate-300 bg-slate-50/80 hover:bg-saffron-50/40 hover:border-saffron-400'} rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 relative group shadow-sm flex flex-col items-center justify-center min-h-[140px]"
            >
                <div class="w-11 h-11 rounded-full bg-saffron-100 text-saffron-600 flex items-center justify-center text-lg mb-2 group-hover:scale-110 group-hover:bg-saffron-500 group-hover:text-white transition duration-300 shadow-sm">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <h4 class="font-bold text-navy-900 text-xs md:text-sm">
                    Drag & drop ${allowMultiple ? 'images' : 'image'} here, or <span class="text-saffron-600 underline font-extrabold">Browse Files</span>
                </h4>
                <p class="text-[11px] text-slate-400 mt-1 font-medium">
                    Accepted formats: <span class="font-bold text-slate-600">JPG, JPEG, PNG, WEBP</span> • Max size: <span class="font-bold text-slate-600">10 MB</span> per image
                </p>
                ${helperText ? `<p class="text-[10px] text-saffron-600 font-semibold mt-1">${helperText}</p>` : ''}
            </div>
        `;
    }

    html += `
        <input 
            type="file" 
            id="file_input_${id}" 
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" 
            ${allowMultiple ? 'multiple' : ''} 
            onchange="handleUploaderFileSelect(event, '${id}', ${allowMultiple})" 
            class="hidden" 
        />
    </div>`;

    return html;
}

// ----------------------------------------------------
// 4. APPLICATION STATE ENGINE
// ----------------------------------------------------
const state = {
    activeTab: 'home',
    currentLang: 'en',
    settings: JSON.parse(localStorage.getItem('ck_set_v21')) || INITIAL_SETTINGS,
    packages: JSON.parse(localStorage.getItem('ck_pkgs_v21')) || INITIAL_PACKAGES,
    albums: JSON.parse(localStorage.getItem('ck_alb_v21')) || INITIAL_ALBUMS,
    reviews: JSON.parse(localStorage.getItem('ck_rev_v21')) || INITIAL_REVIEWS,
    bookings: JSON.parse(localStorage.getItem('ck_bk_v21')) || INITIAL_BOOKINGS,
    translations: JSON.parse(localStorage.getItem('ck_i18n_v21')) || DEFAULT_I18N,
    selectedPkg: null,
    editingPkg: null,
    editingAlbum: null,
    selectedAlbum: null, // For Google Photos style viewing
    activeHeroSlide: 0,
    adminLoggedIn: false,
    adminActiveTab: 'overview',
    showLoginModal: false,
    csrfToken: Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, '0')).join(''),
    loginFailures: 0,
    lockoutUntil: 0,
    loginErrorMessage: '',
    lastActivityTime: Date.now(),
    showAddPkgModal: false,
    showAddAlbumModal: false,
    showAddReviewModal: false,
    showPdfModal: null, // Holds package object for printable brochure/PDF
    mobileNavOpen: false,
    
    // Lightbox state
    activeLightboxPhoto: null,
    lightboxPhotoIndex: 0,
    lightboxPhotoList: [],
    lightboxZoomed: false,

    // Filters
    searchQuery: '',
    categoryFilter: 'all',
    maxPriceFilter: 40000,
    galleryYearFilter: 'all',
    galleryDestFilter: 'all',
    enquiryStatusFilter: 'all',
    heroSearchQuery: '',

    activeAccordion: 'itinerary',
    secretClickCount: 0,

    // Temp Uploader Storage
    tempBrandingLogo: undefined,
    tempBrandingHeroBg: undefined,
    tempPkgCoverImage: undefined,
    tempPkgGallery: [],
    tempAlbumCoverImage: undefined,
    tempAlbumPhotos: []
};

function createSlug(text) {
    if (!text) return '';
    return text.toString().toLowerCase()
        .trim()
        .replace(/[\s\-_]+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

function getDynamicPackageAlbums() {
    return (state.packages || []).map(pkg => {
        const pkgGallery = pkg.packageGallery && pkg.packageGallery.length > 0 
            ? pkg.packageGallery 
            : (pkg.coverImage ? [pkg.coverImage] : []);
        
        const uniqueImgs = Array.from(new Set([pkg.coverImage, ...pkgGallery].filter(Boolean)));
        
        const yearMatch = (pkg.dates || '').match(/20\d\d/);
        const year = yearMatch ? yearMatch[0] : '2026';
        
        const photos = uniqueImgs.map((img, idx) => ({
            id: `${pkg.id}_img_${idx}`,
            title: `${pkg.name} - Photo ${idx + 1}`,
            image: img
        }));

        let category = 'Family Tour';
        if (pkg.destination) {
            category = pkg.destination.split('(')[0].trim();
        } else if (pkg.category) {
            category = pkg.category;
        }

        return {
            id: pkg.id,
            title: pkg.name,
            description: pkg.shortDesc || `Official tour photos from ${pkg.name}.`,
            coverImage: pkg.coverImage || uniqueImgs[0] || 'images/himalayan_yatra.jpg',
            category: category,
            year: year,
            photos: photos
        };
    });
}

function ensurePackagesHaveSlugsAndHeroProps() {
    if (!state.packages || state.packages.length === 0) {
        state.packages = INITIAL_PACKAGES;
    }
    state.packages.forEach((p, idx) => {
        if (!p.slug) {
            if (p.id === 'pkg-1') p.slug = 'char-dham-yatra';
            else if (p.id === 'pkg-2') p.slug = 'vrindavan-mathura';
            else if (p.id === 'pkg-3') p.slug = 'khatu-shyam-salasar';
            else if (p.id === 'pkg-4') p.slug = 'rishikesh-ganga-aarti';
            else if (p.id === 'pkg-5') p.slug = 'rajasthan-tour';
            else p.slug = createSlug(p.name);
        }
        if (p.showInHero === undefined) {
            p.showInHero = true;
        }
        if (p.heroOrder === undefined) {
            p.heroOrder = idx + 1;
        }
    });
}

ensurePackagesHaveSlugsAndHeroProps();

// Async IndexedDB restore on initial app start
loadFromIndexedDB('ck_full_state_v21').then((savedState) => {
    if (savedState) {
        if (savedState.settings) state.settings = savedState.settings;
        if (savedState.packages) state.packages = savedState.packages;
        if (savedState.albums) state.albums = savedState.albums;
        if (savedState.reviews) state.reviews = savedState.reviews;
        if (savedState.bookings) state.bookings = savedState.bookings;
        if (savedState.translations) state.translations = savedState.translations;
        ensurePackagesHaveSlugsAndHeroProps();
        handleRoute();
    }
});

function saveStore() {
    try {
        localStorage.setItem('ck_set_v21', JSON.stringify(state.settings));
        localStorage.setItem('ck_pkgs_v21', JSON.stringify(state.packages));
        localStorage.setItem('ck_alb_v21', JSON.stringify(state.albums));
        localStorage.setItem('ck_rev_v21', JSON.stringify(state.reviews));
        localStorage.setItem('ck_bk_v21', JSON.stringify(state.bookings));
        localStorage.setItem('ck_i18n_v21', JSON.stringify(state.translations));
    } catch (err) {
        console.warn('LocalStorage save limit reached, state safely preserved in IndexedDB.', err);
    }
    saveToIndexedDB('ck_full_state_v21', {
        settings: state.settings,
        packages: state.packages,
        albums: state.albums,
        reviews: state.reviews,
        bookings: state.bookings,
        translations: state.translations
    });
    render();
}

function t(key) {
    const langDict = state.translations[state.currentLang] || state.translations.en;
    return langDict[key] || DEFAULT_I18N.en[key] || key;
}

function toggleLanguage() {
    state.currentLang = state.currentLang === 'en' ? 'mr' : 'en';
    render();
}

function getWhatsAppUrl(pkgName = '') {
    if (!pkgName || pkgName === 'General Enquiry') {
        const text = `🙏 Namaskar Chandrakailash Tours & Travels,\n\nI am interested in your tour packages.\n\nCould you please share details of available tour packages?\n\nThank you!`;
        return `https://wa.me/${state.settings.whatsapp || '919960833090'}?text=${encodeURIComponent(text)}`;
    }
    const text = `🙏 Namaskar Chandrakailash Tours & Travels,\n\nI am interested in the *${pkgName}* tour package.\n\nCould you please share:\n\n• Complete Tour Plan / Itinerary\n• Available Travel Dates\n• Price Details\n• Booking Process\n\nThank you!`;
    return `https://wa.me/${state.settings.whatsapp || '919960833090'}?text=${encodeURIComponent(text)}`;
}

function getInstagramUrl() {
    let handle = state.settings.instagram || 'chandrakailash_tours';
    handle = handle.replace('@', '').trim();
    if (handle.startsWith('http://') || handle.startsWith('https://')) {
        return handle;
    }
    return `https://instagram.com/${handle}`;
}

function handleRoute() {
    const path = window.location.pathname;
    const hash = window.location.hash;

    let packageSlug = null;

    if (path.startsWith('/package/')) {
        packageSlug = decodeURIComponent(path.replace('/package/', '').replace(/\/$/, ''));
    } else if (hash.startsWith('#/package/')) {
        packageSlug = decodeURIComponent(hash.replace('#/package/', '').replace(/\/$/, ''));
    } else if (hash.startsWith('#package/')) {
        packageSlug = decodeURIComponent(hash.replace('#package/', '').replace(/\/$/, ''));
    }

    if (packageSlug) {
        const pkg = state.packages.find(p => p.slug === packageSlug || p.id === packageSlug || createSlug(p.name) === packageSlug);
        if (pkg) {
            state.selectedPkg = pkg;
        }
    } else if (hash === '#admin' || hash === '#/admin') {
        if (!state.adminLoggedIn) {
            state.showLoginModal = true;
        } else {
            state.activeTab = 'admin';
        }
    }
    render();
}

window.addEventListener('popstate', handleRoute);
window.addEventListener('hashchange', handleRoute);

window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        state.showLoginModal = true;
        render();
    }
    if (state.activeLightboxPhoto) {
        if (e.key === 'ArrowRight') nextLightboxPhoto();
        if (e.key === 'ArrowLeft') prevLightboxPhoto();
        if (e.key === 'Escape') closeLightbox();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    handleRoute();
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader) loader.classList.add('fade-out');
    }, 800);
});

// ----------------------------------------------------
// 5. MASTER UI RENDER CONTROLLER
// ----------------------------------------------------
function render() {
    const root = document.getElementById('app');

    const filteredPkgs = state.packages.filter(p => {
        if (p.visible === false && !state.adminLoggedIn) return false;
        const matchSearch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                            p.destination.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchCat = state.categoryFilter === 'all' || p.category === state.categoryFilter;
        const matchPrice = p.price <= state.maxPriceFilter;
        return matchSearch && matchCat && matchPrice;
    });

    root.innerHTML = `
        <header class="sticky top-0 z-40 glass-header-transparent text-white shadow-md">
            <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                
                <div onclick="navigate('home')" class="cursor-pointer">
                    ${renderLogoSvg('white')}
                </div>

                <nav class="hidden lg:flex items-center gap-7 text-sm font-medium">
                    ${[
                        { id: 'home', label: t('nav_home') },
                        { id: 'packages', label: t('nav_packages') },
                        { id: 'gallery', label: t('nav_gallery') },
                        { id: 'about', label: t('nav_about') },
                        { id: 'contact', label: t('nav_contact') }
                    ].map(link => `
                        <button onclick="navigate('${link.id}')" class="transition py-1 border-b-2 ${state.activeTab === link.id ? 'text-saffron-400 border-saffron-500 font-bold' : 'text-slate-200 border-transparent hover:text-saffron-400'}">
                            ${link.label}
                        </button>
                    `).join('')}
                    ${state.adminLoggedIn ? `
                        <button onclick="navigate('admin')" class="bg-saffron-500/20 border border-saffron-500/50 text-saffron-400 font-bold px-3 py-1 rounded-lg text-xs">
                            ⚙️ Admin CMS
                        </button>
                    ` : ''}
                </nav>

                <div class="hidden sm:flex items-center gap-3">
                    ${state.settings.langSwitchEnabled !== false ? `
                        <button onclick="toggleLanguage()" class="bg-navy-800/90 hover:bg-navy-800 border border-saffron-500/40 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition text-saffron-400 shadow-sm" title="Switch Language">
                            <i class="fa-solid fa-globe text-saffron-400"></i>
                            <span class="${state.currentLang === 'en' ? 'text-white font-extrabold underline' : 'text-slate-400'}">EN</span>
                            <span class="text-slate-600">|</span>
                            <span class="${state.currentLang === 'mr' ? 'text-saffron-400 font-extrabold underline' : 'text-slate-400'}">मराठी</span>
                        </button>
                    ` : ''}

                    <a href="${getWhatsAppUrl()}" target="_blank" class="btn-premium btn-glow-green bg-waGreen-500 hover:bg-waGreen-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow flex items-center gap-2">
                        <i class="fa-brands fa-whatsapp text-lg"></i> <span>${t('btn_whatsapp')}</span>
                    </a>
                    
                    <a href="tel:+91${state.settings.phone}" class="btn-premium btn-glow-saffron bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-saffron-400/40">
                        <i class="fa-solid fa-phone text-base"></i> <span>${t('btn_call')}</span>
                    </a>
                </div>

                <div class="lg:hidden flex items-center gap-2">
                    <button onclick="toggleLanguage()" class="bg-navy-800 border border-saffron-500/40 text-[11px] font-bold px-2.5 py-1 rounded-full text-saffron-400">
                        ${state.currentLang === 'en' ? 'मराठी' : 'EN'}
                    </button>
                    <button onclick="toggleMobileNav()" class="text-slate-200 text-2xl p-1.5 focus:outline-none">
                        <i class="fa-solid ${state.mobileNavOpen ? 'fa-xmark' : 'fa-bars'}"></i>
                    </button>
                </div>
            </div>

            ${state.mobileNavOpen ? `
                <div class="lg:hidden bg-navy-950 border-t border-navy-800 px-4 py-4 space-y-2 text-sm">
                    ${[
                        { id: 'home', label: t('nav_home'), icon: 'fa-house' },
                        { id: 'packages', label: t('nav_packages'), icon: 'fa-suitcase-rolling' },
                        { id: 'gallery', label: t('nav_gallery'), icon: 'fa-images' },
                        { id: 'about', label: t('nav_about'), icon: 'fa-address-card' },
                        { id: 'contact', label: t('nav_contact'), icon: 'fa-envelope' }
                    ].map(m => `
                        <button onclick="navigate('${m.id}'); state.mobileNavOpen=false; render();" class="w-full text-left py-2.5 px-4 rounded-xl flex items-center gap-3 ${state.activeTab === m.id ? 'bg-saffron-500 text-white font-bold' : 'text-slate-300 hover:bg-navy-900'}">
                            <i class="fa-solid ${m.icon} w-5"></i> <span>${m.label}</span>
                        </button>
                    `).join('')}
                    ${state.adminLoggedIn ? `
                        <button onclick="navigate('admin'); state.mobileNavOpen=false; render();" class="w-full text-left py-2.5 px-4 rounded-xl text-saffron-400 font-bold bg-navy-900 border border-saffron-500/30 flex items-center gap-3">
                            <i class="fa-solid fa-gear"></i> <span>Admin CMS</span>
                        </button>
                    ` : ''}
                </div>
            ` : ''}
        </header>

        <main class="flex-grow fade-in-section">
            ${renderMainView(filteredPkgs)}
        </main>

        <footer class="bg-navy-950 text-white pt-12 pb-24 md:pb-8 border-t-4 border-saffron-500 no-print">
            <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                <div class="space-y-3">
                    ${renderLogoSvg('white')}
                    <p class="text-slate-400 text-xs leading-relaxed">
                        Maharashtra's premier luxury travel company for religious pilgrimages and family vacations across India.
                    </p>
                    <p class="text-saffron-400 font-marathi-heading font-bold text-base border-l-2 border-saffron-500 pl-3">
                        "${state.settings.heroTagline}"
                    </p>
                </div>

                <div>
                    <h4 class="font-bold text-saffron-400 mb-3 border-b border-navy-800 pb-1">Popular Yatra Packages</h4>
                    <ul class="space-y-1.5 text-xs text-slate-300">
                        ${state.packages.map(p => `
                            <li>
                                <a 
                                    href="#package-${p.id}" 
                                    onclick="handleFooterPackageClick(event, '${p.id}')"
                                    class="footer-pkg-link group flex items-center justify-between py-1 px-1 rounded-lg text-slate-300 hover:text-saffron-400 transition-all duration-200 cursor-pointer select-none"
                                    title="View details for ${p.name}"
                                >
                                    <span class="flex items-center gap-2 font-medium">
                                        <span class="text-saffron-500 text-[11px] group-hover:scale-110 transition-transform">🚩</span>
                                        <span class="line-clamp-1 group-hover:translate-x-0.5 transition-transform duration-200">${p.name}</span>
                                    </span>
                                    <i class="fa-solid fa-arrow-right footer-link-arrow text-[10px] text-saffron-400 opacity-0 transition-all duration-200 flex-shrink-0 ml-1"></i>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div>
                    <h4 class="font-bold text-saffron-400 mb-3 border-b border-navy-800 pb-1">Direct Contact</h4>
                    <div class="space-y-2.5 text-xs text-slate-300">
                        <p class="font-bold text-white"><i class="fa-solid fa-phone text-saffron-500 mr-2"></i> ${state.settings.phone}</p>
                        <p><i class="fa-brands fa-whatsapp text-waGreen-500 mr-2"></i> WhatsApp 24x7 Support</p>
                        <a href="${getInstagramUrl()}" target="_blank" class="flex items-center gap-2 hover:text-saffron-400 transition font-medium">
                            <i class="fa-brands fa-instagram text-pink-500 text-base"></i> <span>${state.settings.instagram}</span>
                        </a>
                    </div>
                </div>

                <div>
                    <h4 class="font-bold text-saffron-400 mb-3 border-b border-navy-800 pb-1">Management</h4>
                    <p class="text-xs text-slate-300 mb-3">All tour batches are personally curated & managed by <strong>Yogesh Patil Sir</strong>.</p>
                    <a href="${getWhatsAppUrl()}" target="_blank" class="btn-premium btn-glow-green inline-flex items-center gap-2 bg-waGreen-500 hover:bg-waGreen-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow">
                        <i class="fa-brands fa-whatsapp text-lg"></i> Connect on WhatsApp
                    </a>
                </div>
            </div>

            <div onclick="handleSecretAdminTrigger()" class="max-w-7xl mx-auto px-4 mt-10 pt-4 border-t border-navy-900 text-center text-xs text-slate-500 cursor-pointer select-none">
                ${state.settings.copyrightText}
            </div>
        </footer>

        <div class="fixed bottom-6 right-6 z-40 hidden md:block no-print">
            <a href="${getWhatsAppUrl()}" target="_blank" class="w-14 h-14 bg-waGreen-500 hover:bg-waGreen-600 text-white rounded-full flex items-center justify-center text-2xl shadow-2xl wa-pulse-floating transition transform hover:scale-110" title="Instant WhatsApp Booking">
                <i class="fa-brands fa-whatsapp"></i>
            </a>
        </div>

        <div class="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur border-t border-saffron-500/30 p-2.5 flex gap-2.5 no-print shadow-2xl">
            <a href="${getWhatsAppUrl()}" target="_blank" class="btn-premium btn-glow-green flex-1 bg-waGreen-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg">
                <i class="fa-brands fa-whatsapp text-xl"></i> <span>${t('btn_whatsapp')}</span>
            </a>
            <a href="tel:+91${state.settings.phone}" class="btn-premium btn-glow-saffron flex-1 bg-saffron-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg">
                <i class="fa-solid fa-phone text-base"></i> <span>${t('btn_call')}</span>
            </a>
        </div>

        ${renderModals()}
    `;

    attachMicroAnimations();
}

function handleSecretAdminTrigger() {
    state.secretClickCount = (state.secretClickCount || 0) + 1;
    if (state.secretClickCount >= 3) {
        state.secretClickCount = 0;
        if (!state.adminLoggedIn) {
            state.showLoginModal = true;
        } else {
            state.activeTab = 'admin';
        }
        render();
    }
}

// ----------------------------------------------------
// 6. RESPONSIVE SVG LOGO ENGINE
// ----------------------------------------------------
function renderLogoSvg(variant = 'horizontal') {
    if (state.settings.logoUrl) {
        return `
            <div class="flex items-center gap-3">
                <img src="${state.settings.logoUrl}" alt="${state.settings.companyName}" class="h-10 w-auto object-contain" />
                <div>
                    <span class="text-2xl md:text-3xl font-extrabold font-marathi-calligraphy tracking-tight drop-shadow-sm text-white">${state.settings.brandMarathi || 'चंद्रकैलाश'}</span>
                    <div class="text-[10px] md:text-xs font-bold tracking-widest uppercase text-saffron-400">${state.settings.brandEnglish || 'TOURS & TRAVELS'}</div>
                </div>
            </div>
        `;
    }

    const isDarkBackground = variant === 'white' || variant === 'dark' || variant === 'square';
    const textColorPrimary = isDarkBackground ? '#FFFFFF' : '#0B1F3A';
    const textColorSecondary = '#FF9800';
    const mountainColor = isDarkBackground ? '#FFFFFF' : '#0B1F3A';

    return `
        <div class="flex items-center gap-3">
            <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0">
                <circle cx="50" cy="40" r="26" fill="url(#sunGlowHoriz)"/>
                <defs>
                    <radialGradient id="sunGlowHoriz" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 40) rotate(90) scale(26)">
                        <stop stop-color="#FF9800"/>
                        <stop offset="1" stop-color="#E65100"/>
                    </radialGradient>
                </defs>
                <path d="M12 78L40 38L56 58L72 32L90 78H12Z" fill="${mountainColor}" stroke="#FF9800" stroke-width="3"/>
                <rect x="30" y="68" width="40" height="14" rx="3" fill="#F57C00"/>
                <circle cx="38" cy="82" r="2.5" fill="#FFFFFF"/>
                <circle cx="62" cy="82" r="2.5" fill="#FFFFFF"/>
            </svg>
            <div>
                <span class="text-2xl md:text-3xl font-extrabold font-marathi-calligraphy tracking-tight drop-shadow-sm" style="color: ${textColorPrimary};">${state.settings.brandMarathi || 'चंद्रकैलाश'}</span>
                <div class="flex items-center gap-1.5 leading-none">
                    <span class="text-[10px] md:text-xs font-bold tracking-widest uppercase" style="color: ${textColorSecondary};">${state.settings.brandEnglish || 'TOURS & TRAVELS'}</span>
                </div>
            </div>
        </div>
    `;
}

function getActiveHeroSlides() {
    const heroPkgs = (state.packages || [])
        .filter(p => p.visible !== false && p.showInHero !== false)
        .sort((a, b) => (a.heroOrder || 999) - (b.heroOrder || 999));
    return heroPkgs;
}

function renderHeroBannerSlider() {
    const slides = getActiveHeroSlides();
    if (slides.length === 0) return '';

    const slideIndex = state.activeHeroSlide % slides.length;
    const currentPkg = slides[slideIndex];

    const bgImage = currentPkg.coverImage || state.settings.heroBgImage || 'images/himalayan_yatra.jpg';
    const pkgSlug = currentPkg.slug || createSlug(currentPkg.name);
    const waUrl = getWhatsAppUrl(currentPkg.name);

    return `
        <section class="relative bg-navy-950 text-white py-20 md:py-28 overflow-hidden border-b-4 border-saffron-500">
            <div class="absolute inset-0 z-0 pointer-events-none opacity-30 transition-all duration-700">
                <img src="${bgImage}" alt="${currentPkg.name}" class="w-full h-full object-cover mix-blend-overlay animate-cloud-slow" />
                <div class="absolute inset-0 hero-sunrise-radial"></div>
            </div>

            <div class="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div class="inline-flex items-center gap-2 bg-saffron-500/20 border border-saffron-500/40 text-saffron-400 text-xs font-bold px-4 py-1.5 rounded-full shadow">
                        <i class="fa-solid fa-om text-saffron-400"></i> <span>महाराष्ट्रातील अतिशय विश्वासू टूर कंपनी</span>
                    </div>

                    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-marathi-calligraphy tracking-tight leading-tight text-white drop-shadow-md">
                        ${state.settings.heroTagline || 'प्रवास फक्त ठिकाणांचा नाही... आठवणींचा असतो.'}
                    </h1>

                    <p class="text-slate-300 text-base md:text-lg max-w-2xl font-light leading-relaxed">
                        ${state.settings.heroSubheading || 'Explore India\'s Most Trusted Religious & Family Tour Packages with Chandrakailash Tours & Travels.'}
                    </p>

                    <div class="max-w-xl space-y-4 pt-2">
                        <div class="flex flex-wrap justify-center lg:justify-start gap-4">
                            <button onclick="navigate('packages')" class="btn-premium btn-glow-saffron bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm md:text-base px-7 py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 flex-1 sm:flex-none">
                                <span>🟠 ${t('btn_explore')}</span> <i class="fa-solid fa-arrow-right text-xs"></i>
                            </button>

                            <a href="${waUrl}" target="_blank" class="btn-premium btn-glow-green bg-waGreen-500 hover:bg-waGreen-600 text-white font-extrabold text-sm md:text-base px-7 py-3.5 rounded-xl shadow-xl flex items-center justify-center gap-2 flex-1 sm:flex-none">
                                <i class="fa-brands fa-whatsapp text-xl"></i> <span>🟢 ${t('btn_whatsapp')}</span>
                            </a>
                        </div>

                        <div class="flex justify-center pt-1">
                            <a href="tel:+91${state.settings.phone}" class="btn-premium btn-glow-saffron bg-saffron-500 hover:bg-saffron-600 text-white font-black text-lg md:text-xl px-10 md:px-14 py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-3 w-full sm:w-auto border-2 border-saffron-300/50 transform hover:scale-105 transition duration-300">
                                <i class="fa-solid fa-phone text-2xl text-white animate-bounce"></i> <span>📞 ${t('btn_call')} (${state.settings.phone})</span>
                            </a>
                        </div>
                    </div>

                    <!-- SLIDER DOTS & ARROWS -->
                    ${slides.length > 1 ? `
                        <div class="flex items-center justify-center lg:justify-start gap-3 pt-4">
                            <button onclick="prevHeroSlide()" class="w-8 h-8 rounded-full bg-navy-900/80 border border-saffron-500/40 text-saffron-400 hover:bg-saffron-500 hover:text-white flex items-center justify-center text-xs transition">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                            
                            <div class="flex items-center gap-1.5">
                                ${slides.map((_, idx) => `
                                    <button onclick="state.activeHeroSlide=${idx}; render();" class="h-2 rounded-full transition-all ${idx === slideIndex ? 'w-8 bg-saffron-500' : 'w-2 bg-slate-600'}"></button>
                                `).join('')}
                            </div>

                            <button onclick="nextHeroSlide()" class="w-8 h-8 rounded-full bg-navy-900/80 border border-saffron-500/40 text-saffron-400 hover:bg-saffron-500 hover:text-white flex items-center justify-center text-xs transition">
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    ` : ''}

                    <div class="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center lg:text-left text-xs text-slate-300">
                        <div><div class="font-extrabold text-saffron-400 text-xl font-mono">10,000+</div><div>${t('stat_pilgrims')}</div></div>
                        <div><div class="font-extrabold text-saffron-400 text-xl font-mono">100%</div><div>${t('stat_yatra')}</div></div>
                        <div><div class="font-extrabold text-saffron-400 text-xl font-mono">24x7</div><div>${t('stat_support')}</div></div>
                    </div>
                </div>

                <!-- HERO RIGHT FEATURED CARD -->
                <div class="lg:col-span-5 card-perspective">
                    <div onclick="openDetail('${pkgSlug}')" class="glass-card rounded-2xl p-6 text-slate-900 shadow-2xl border border-saffron-500/40 relative card-3d-tilt cursor-pointer">
                        <div class="card-3d-glare"></div>
                        
                        <div class="card-3d-layer-badge flex justify-between items-center mb-3">
                            <span class="bg-saffron-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">${currentPkg.category ? currentPkg.category.toUpperCase() : 'FEATURED'} PILGRIMAGE</span>
                            <span class="text-xs font-bold ${currentPkg.seatsLeft > 0 ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'} px-2.5 py-0.5 rounded-full">
                                ${currentPkg.seatsLeft > 0 ? `🟢 ${currentPkg.seatsLeft} Seats Left` : '🔴 Sold Out'}
                            </span>
                        </div>

                        <div onclick="event.stopPropagation(); openDetail('${pkgSlug}')" class="card-3d-layer-img relative h-44 rounded-xl overflow-hidden mb-4 group cursor-pointer">
                            <img src="${currentPkg.coverImage || 'images/himalayan_yatra.jpg'}" alt="${currentPkg.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>

                        <div class="card-3d-layer-content space-y-2">
                            <h3 onclick="event.stopPropagation(); openDetail('${pkgSlug}')" class="text-xl font-bold text-navy-900 mb-1 hover:text-saffron-600 transition cursor-pointer">${currentPkg.name}</h3>
                            <p class="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-2">${currentPkg.shortDesc || currentPkg.destination}</p>

                            <div class="space-y-2 text-xs text-slate-700 mb-5 border-t border-slate-200 pt-3">
                                <div class="flex justify-between"><span>${t('label_duration')}:</span><span class="font-bold text-saffron-600">${currentPkg.duration}</span></div>
                                <div class="flex justify-between items-center pt-2">
                                    <span>${t('label_price')}:</span>
                                    <div>
                                        ${currentPkg.originalPrice ? `<span class="line-through text-slate-400 text-xs mr-2">₹${currentPkg.originalPrice.toLocaleString()}</span>` : ''}
                                        <span class="text-2xl font-extrabold text-saffron-600">₹${currentPkg.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-3d-layer-actions flex gap-2" onclick="event.stopPropagation();">
                            <button onclick="openDetail('${pkgSlug}')" class="btn-premium btn-glow-navy flex-1 bg-navy-900 hover:bg-navy-950 text-white font-bold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs">
                                <span>${t('btn_details')}</span> <i class="fa-solid fa-arrow-right text-saffron-400 text-xs"></i>
                            </button>
                            <button onclick="openPrintablePdf('${currentPkg.id}')" class="btn-premium bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-3.5 rounded-xl shadow transition text-xs flex items-center justify-center gap-1.5" title="Download Printable PDF">
                                <i class="fa-solid fa-file-pdf text-rose-600 text-base"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function nextHeroSlide() {
    const slides = getActiveHeroSlides();
    if (slides.length > 0) {
        state.activeHeroSlide = (state.activeHeroSlide + 1) % slides.length;
        render();
    }
}

function prevHeroSlide() {
    const slides = getActiveHeroSlides();
    if (slides.length > 0) {
        state.activeHeroSlide = (state.activeHeroSlide - 1 + slides.length) % slides.length;
        render();
    }
}

// ----------------------------------------------------
// 8. PUBLIC MAIN FRONTEND VIEW
// ----------------------------------------------------
function renderMainView(filteredPkgs) {
    if (state.activeTab === 'home') {
        return `
            ${renderHeroBannerSlider()}

            <!-- TOUR PACKAGES GRID -->
            ${state.settings.secPackagesEnabled !== false ? `
                <section class="max-w-7xl mx-auto px-4 py-16 space-y-8">
                    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <span class="text-saffron-500 font-bold text-xs uppercase tracking-wider">${t('sec_packages_tag')}</span>
                            <h2 class="text-3xl font-extrabold text-navy-900">${t('sec_packages_title')}</h2>
                        </div>
                        <button onclick="navigate('packages')" class="text-saffron-600 font-bold text-xs flex items-center gap-1.5 hover:underline">
                            <span>${t('btn_explore')}</span> <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${state.packages.slice(0, 6).map(p => renderCard(p)).join('')}
                    </div>
                </section>
            ` : ''}

            <!-- FEATURED HOMEPAGE GALLERY CAROUSEL / GRID -->
            <section class="bg-navy-950 text-white py-16 border-y border-saffron-500/20 space-y-8">
                <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <span class="text-saffron-400 font-bold text-xs uppercase tracking-wider">Happy Memories</span>
                        <h2 class="text-3xl font-extrabold text-white">📸 Latest Photo Highlights</h2>
                    </div>
                    <button onclick="navigate('gallery')" class="btn-premium btn-glow-saffron bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow flex items-center gap-2">
                        <span>View Complete Gallery (${getDynamicPackageAlbums().reduce((acc, a) => acc + (a.photos ? a.photos.length : 0), 0)} Photos)</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>

                <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    ${getDynamicPackageAlbums().flatMap(a => a.photos || []).slice(0, 8).map(p => `
                        <div onclick="openLightboxSingle('${p.image}', '${p.title}')" class="h-48 rounded-xl overflow-hidden shadow-md cursor-pointer relative group border border-slate-808">
                            <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" />
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3 text-xs font-bold text-white">
                                <span class="line-clamp-1">${p.title}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- CUSTOMER REVIEWS -->
            ${state.settings.secReviewsEnabled !== false ? `
                <section class="max-w-7xl mx-auto px-4 py-16 space-y-8">
                    <div class="flex justify-between items-end">
                        <div>
                            <span class="text-saffron-500 font-bold text-xs uppercase tracking-wider">Testimonials</span>
                            <h2 class="text-3xl font-extrabold text-navy-900">${t('sec_reviews_title')}</h2>
                            <p class="text-xs text-slate-500 mt-1">${t('sec_reviews_sub')}</p>
                        </div>
                        <button onclick="toggleAddReviewModal()" class="btn-premium bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow">
                            + Add Review
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${state.reviews.map(r => `
                            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition ${r.pinned ? 'border-l-4 border-saffron-500' : ''}">
                                <div>
                                    <div class="text-amber-400 font-bold text-xs mb-3">⭐⭐⭐⭐⭐ ${r.pinned ? '📌 Featured' : ''}</div>
                                    <p class="text-slate-700 text-xs italic mb-4 leading-relaxed font-marathi-body">"${r.review}"</p>
                                </div>
                                <div class="border-t pt-3 flex justify-between items-center text-xs">
                                    <span class="font-bold text-navy-900">${r.name}</span>
                                    <span class="text-slate-400 text-[11px]">${r.date}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            ` : ''}
        `;
    }

    if (state.activeTab === 'packages') {
        return `
            <div class="max-w-7xl mx-auto px-4 py-12 space-y-8">
                <div class="flex justify-between items-center border-b pb-4">
                    <div>
                        <span class="text-saffron-500 font-bold text-xs uppercase tracking-wider">${t('sec_packages_tag')}</span>
                        <h1 class="text-3xl font-extrabold text-navy-900">${t('sec_packages_title')}</h1>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${filteredPkgs.map(p => renderCard(p)).join('')}
                </div>
            </div>
        `;
    }

    if (state.activeTab === 'gallery') {
        return renderPublicGalleryView();
    }

    if (state.activeTab === 'about') {
        return `
            <div class="max-w-4xl mx-auto px-4 py-12 space-y-8">
                <div class="text-center space-y-2">
                    <span class="text-saffron-500 font-bold text-xs uppercase tracking-wider">${t('nav_about')}</span>
                    <h1 class="text-4xl md:text-5xl font-extrabold font-marathi-calligraphy text-navy-900">${state.settings.companyName}</h1>
                    <p class="text-saffron-600 font-marathi-heading font-bold text-lg">"${state.settings.heroTagline}"</p>
                </div>

                <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4 text-slate-700 text-sm leading-relaxed">
                    <h3 class="text-xl font-bold text-navy-900">Our Heritage & Promise</h3>
                    <p>
                        Chandrakailash Tours & Travels was established to provide sacred, safe, and premium yatra experiences for families, senior citizens, and religious pilgrims across India.
                    </p>
                    <p>
                        Under the expert leadership of <strong>Yogesh Patil Sir</strong>, our company organizes specialized tour batches covering Char Dham Yatra, Kedarnath, Badrinath, Vrindavan, Mathura, Khatu Shyam, Salasar Balaji, and Rajasthan Family Tours.
                    </p>
                    <p>
                        We take complete responsibility for your comfort — from luxury AC bus transport, hygienic pure veg meals, 3-Star clean hotel stays, to guided temple darshan passes.
                    </p>
                </div>
            </div>
        `;
    }

    if (state.activeTab === 'contact') {
        return `
            <div class="max-w-7xl mx-auto px-4 py-12 space-y-10">
                <div class="text-center max-w-xl mx-auto">
                    <h1 class="text-3xl font-extrabold text-navy-900">${t('cnt_title')}</h1>
                    <p class="text-xs text-slate-500 mt-1">${t('cnt_sub')}</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div class="lg:col-span-5 bg-navy-900 text-white p-8 rounded-2xl shadow-xl space-y-6">
                        <h3 class="text-xl font-bold text-saffron-400">Reach Out To Us</h3>
                        
                        <div class="space-y-4 text-xs">
                            <p class="flex items-center gap-3">
                                <i class="fa-solid fa-phone text-saffron-500 text-base"></i>
                                <a href="tel:+91${state.settings.phone}" class="text-sm font-bold text-white hover:text-saffron-400">${state.settings.phone}</a>
                            </p>
                            <p class="flex items-center gap-3">
                                <i class="fa-brands fa-whatsapp text-waGreen-500 text-base"></i>
                                <span>+91 ${state.settings.whatsapp} (24x7 Support)</span>
                            </p>
                            <p class="flex items-center gap-3">
                                <i class="fa-solid fa-envelope text-saffron-500 text-base"></i>
                                <span>${state.settings.email}</span>
                            </p>
                            <p class="flex items-center gap-3">
                                <i class="fa-brands fa-instagram text-pink-500 text-base"></i>
                                <a href="${getInstagramUrl()}" target="_blank" class="hover:text-saffron-400 font-medium">${state.settings.instagram}</a>
                            </p>
                            <p class="flex items-center gap-3">
                                <i class="fa-solid fa-location-dot text-saffron-500 text-base"></i>
                                <a href="${state.settings.googleMapsUrl}" target="_blank" class="hover:text-saffron-400 font-medium">${state.settings.officeAddress}</a>
                            </p>
                        </div>

                        <div class="pt-4 space-y-2">
                            <a href="${getWhatsAppUrl()}" target="_blank" class="btn-premium btn-glow-green w-full bg-waGreen-500 hover:bg-waGreen-600 text-white font-bold py-3.5 rounded-xl text-center text-xs shadow flex items-center justify-center gap-2">
                                <i class="fa-brands fa-whatsapp text-lg"></i> WhatsApp Quick Inquiry
                            </a>
                            <a href="tel:+91${state.settings.phone}" class="btn-premium btn-glow-saffron w-full bg-saffron-500 hover:bg-saffron-600 text-white font-bold py-3.5 rounded-xl text-center text-xs shadow flex items-center justify-center gap-2">
                                <i class="fa-solid fa-phone text-base"></i> Call ${state.settings.phone}
                            </a>
                        </div>
                    </div>

                    <div class="lg:col-span-7 space-y-6">
                        <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h3 class="text-xl font-bold text-navy-900 mb-4">${t('cnt_form_title')}</h3>
                            <form onsubmit="handleContactSubmit(event)" class="space-y-4 text-xs">
                                <div>
                                    <label class="block font-bold text-slate-700 mb-1">${t('cnt_name')}</label>
                                    <input type="text" id="cnt_name" required placeholder="e.g. Suresh Patil" class="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-saffron-500" />
                                </div>
                                <div>
                                    <label class="block font-bold text-slate-700 mb-1">${t('cnt_phone')}</label>
                                    <input type="tel" id="cnt_phone" required placeholder="9960833090" class="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-saffron-500" />
                                </div>
                                <div>
                                    <label class="block font-bold text-slate-700 mb-1">${t('cnt_pkg')}</label>
                                    <select id="cnt_pkg" class="w-full p-3 rounded-xl border border-slate-300 bg-white">
                                        ${state.packages.map(p => `<option value="${p.name}">${p.name} (₹${p.price.toLocaleString()})</option>`).join('')}
                                    </select>
                                </div>
                                <div>
                                    <label class="block font-bold text-slate-700 mb-1">${t('cnt_msg')}</label>
                                    <textarea id="cnt_msg" rows="3" placeholder="Number of people, senior citizens count..." class="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-saffron-500"></textarea>
                                </div>
                                <button type="submit" class="btn-premium btn-glow-navy w-full bg-navy-900 hover:bg-navy-950 text-white font-bold py-3.5 rounded-xl shadow-lg transition">
                                    ${t('cnt_submit')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    if (state.activeTab === 'admin') {
        return renderAdminView();
    }

    return '';
}

// ----------------------------------------------------
// 9. INSTAGRAM / GOOGLE PHOTOS STYLE PUBLIC GALLERY VIEW
// ----------------------------------------------------
function renderPublicGalleryView() {
    // If an album is currently opened:
    if (state.selectedAlbum) {
        const album = state.selectedAlbum;
        return `
            <div class="max-w-7xl mx-auto px-4 py-10 space-y-6">
                <!-- Breadcrumbs & Album Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                        <button onclick="state.selectedAlbum=null; render();" class="text-saffron-600 font-bold text-xs flex items-center gap-1.5 hover:underline mb-2">
                            <i class="fa-solid fa-arrow-left"></i> Back to Albums Gallery
                        </button>
                        <h1 class="text-3xl font-extrabold text-navy-900 flex items-center gap-2">
                            📁 ${album.title}
                        </h1>
                        <p class="text-xs text-slate-500 mt-1">${album.description || 'Collection of sacred travel memories.'}</p>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-xl border">
                        <span>📅 Year: ${album.year || '2026'}</span>
                        <span>•</span>
                        <span>📍 ${album.category}</span>
                        <span>•</span>
                        <span>📷 ${(album.photos || []).length} Photos</span>
                    </div>
                </div>

                <!-- Album Photos Grid (Google / Instagram Style) -->
                ${(!album.photos || album.photos.length === 0) ? `
                    <div class="text-center py-16 bg-slate-50 rounded-2xl border text-slate-400 text-xs">
                        <i class="fa-solid fa-images text-4xl mb-2"></i>
                        <p>No photos uploaded in this album yet.</p>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        ${album.photos.map((photo, idx) => `
                            <div 
                                onclick="openAlbumLightbox('${album.id}', ${idx})" 
                                class="h-64 bg-slate-900 rounded-2xl overflow-hidden shadow-sm cursor-pointer relative group border border-slate-200 album-card-hover"
                            >
                                <img src="${photo.image}" alt="${photo.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 protected-media" loading="lazy" oncontextmenu="return false;" />
                                
                                <div class="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4 text-white">
                                    <div class="space-y-1">
                                        <h4 class="font-bold text-xs line-clamp-1">${photo.title}</h4>
                                        <span class="text-[10px] text-saffron-400 font-semibold flex items-center gap-1">
                                            <i class="fa-solid fa-expand"></i> Click for Full View
                                        </span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;
    }

    // Main Albums Overview Page:
    const albumsList = getDynamicPackageAlbums();
    const destinations = ['all', 'Char Dham', 'Vrindavan', 'Rishikesh', 'Khatu Shyam', 'Dwarka', 'Rajasthan', 'Gujarat', 'Adventure', 'Family Tour', 'Customer Memories'];
    const extractedYears = Array.from(new Set(albumsList.map(a => a.year).filter(Boolean))).sort().reverse();
    const years = ['all', ...(extractedYears.length > 0 ? extractedYears : ['2027', '2026', '2025'])];

    const filteredAlbums = albumsList.filter(a => {
        const matchDest = state.galleryDestFilter === 'all' || a.category === state.galleryDestFilter || (a.category && a.category.toLowerCase().includes(state.galleryDestFilter.toLowerCase()));
        const matchYear = state.galleryYearFilter === 'all' || a.year === state.galleryYearFilter;
        return matchDest && matchYear;
    });

    return `
        <div class="max-w-7xl mx-auto px-4 py-12 space-y-8">
            <div class="text-center max-w-xl mx-auto space-y-2">
                <span class="text-saffron-500 font-bold text-xs uppercase tracking-wider">Instagram & Yatra Memories</span>
                <h1 class="text-3xl md:text-4xl font-extrabold text-navy-900">📸 Photo Gallery & Albums</h1>
                <p class="text-xs text-slate-500">Explore authentic photo albums from pilgrimage batches across India.</p>
            </div>

            <!-- FILTERS BAR -->
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div class="flex items-center gap-2 overflow-x-auto pb-1">
                    <span class="font-bold text-slate-500 flex items-center gap-1 mr-1"><i class="fa-solid fa-filter"></i> Category:</span>
                    ${destinations.map(d => `
                        <button onclick="state.galleryDestFilter='${d}'; render();" class="px-3 py-1.5 rounded-xl font-bold transition ${state.galleryDestFilter === d ? 'bg-saffron-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                            ${d === 'all' ? '📁 All Categories' : d}
                        </button>
                    `).join('')}
                </div>

                <div class="flex items-center gap-2">
                    <span class="font-bold text-slate-500"><i class="fa-solid fa-calendar font-bold"></i> Year:</span>
                    ${years.map(y => `
                        <button onclick="state.galleryYearFilter='${y}'; render();" class="px-3 py-1.5 rounded-xl font-bold transition ${state.galleryYearFilter === y ? 'bg-navy-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                            ${y === 'all' ? 'All Years' : y}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- ALBUMS GRID -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                ${filteredAlbums.map(alb => `
                    <div 
                        onclick="state.selectedAlbum = state.albums.find(a => a.id === '${alb.id}'); render();" 
                        class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group album-card-hover flex flex-col justify-between"
                    >
                        <div class="relative h-56 bg-slate-900 overflow-hidden">
                            <img src="${alb.coverImage || (alb.photos && alb.photos[0] ? alb.photos[0].image : 'images/himalayan_yatra.jpg')}" alt="${alb.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 protected-media" loading="lazy" oncontextmenu="return false;" />
                            
                            <span class="absolute top-3 left-3 badge-featured text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow">
                                📍 ${alb.category}
                            </span>
                            
                            <span class="absolute top-3 right-3 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                                📅 ${alb.year || '2026'}
                            </span>

                            <div class="absolute bottom-3 right-3 bg-navy-950/90 text-saffron-400 text-xs font-bold px-3 py-1 rounded-xl shadow backdrop-blur border border-saffron-500/30 flex items-center gap-1.5">
                                <i class="fa-solid fa-camera"></i> ${(alb.photos || []).length} Photos
                            </div>
                        </div>

                        <div class="p-4 space-y-1 bg-white border-t">
                            <h3 class="font-bold text-base text-navy-900 group-hover:text-saffron-600 transition line-clamp-1">${alb.title}</h3>
                            <p class="text-xs text-slate-500 line-clamp-2">${alb.description || 'View divine journey photos and batch memories.'}</p>
                            
                            <div class="pt-2 text-xs text-saffron-600 font-bold flex items-center gap-1 hover:underline">
                                <span>Open Album Gallery</span> <i class="fa-solid fa-arrow-right text-[10px]"></i>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ----------------------------------------------------
// 10. TOUR PACKAGE CARD COMPONENT (FULLY CLICKABLE)
// ----------------------------------------------------
function renderCard(p) {
    const slug = p.slug || createSlug(p.name);
    return `
        <div 
            onclick="openDetail('${slug}')"
            onkeydown="if(event.key==='Enter'||event.key===' '){ event.preventDefault(); openDetail('${slug}'); }"
            role="button"
            tabindex="0"
            aria-label="View details for ${p.name}"
            class="package-card-clickable card-3d-tilt bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between relative group select-none"
        >
            <div class="card-3d-glare"></div>
            
            <div>
                <div class="relative h-52 overflow-hidden bg-slate-900">
                    <img src="${p.coverImage}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 protected-media" loading="lazy" />
                    
                    <!-- BADGES ROW -->
                    <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                        ${p.isFeatured ? `<span class="badge-featured text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">⭐ FEATURED</span>` : ''}
                        ${p.isTrending ? `<span class="badge-trending text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">🔥 TRENDING</span>` : ''}
                        ${p.isNew ? `<span class="badge-new text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">✨ NEW BATCH</span>` : ''}
                        ${p.isSoldOut ? `<span class="badge-soldout text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">🛑 SOLD OUT</span>` : ''}
                        ${p.isUpcoming ? `<span class="badge-upcoming text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">⏳ UPCOMING</span>` : ''}
                    </div>

                    <span class="absolute bottom-3 right-3 bg-navy-950/90 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur border border-emerald-500/30 shadow">
                        🟢 ${p.seatsLeft > 0 ? p.seatsLeft + ' Seats Left' : 'Full'}
                    </span>
                </div>

                <div class="p-5 space-y-3">
                    <div>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-saffron-600">📍 ${p.destination}</span>
                        <h3 class="text-xl font-bold text-navy-900 group-hover:text-saffron-600 transition-colors mt-1 line-clamp-1">${p.name}</h3>
                    </div>

                    <p class="text-slate-600 text-xs line-clamp-2 leading-relaxed font-marathi-body">${p.shortDesc}</p>

                    <div class="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium text-slate-700">
                        <div>⏱️ ${p.duration}</div>
                        <div>📅 ${p.dates}</div>
                    </div>
                </div>
            </div>

            <div class="p-5 pt-0 space-y-3 border-t border-slate-100">
                <div class="flex justify-between items-baseline pt-3">
                    <span class="text-xs text-slate-400">${t('label_price')}:</span>
                    <div>
                        ${p.originalPrice ? `<span class="line-through text-slate-400 text-xs mr-1.5">₹${p.originalPrice.toLocaleString()}</span>` : ''}
                        <span class="text-2xl font-extrabold text-saffron-600">₹${p.price.toLocaleString()}</span>
                    </div>
                </div>

                <div class="flex gap-2">
                    <div class="btn-premium btn-glow-navy flex-1 bg-navy-900 group-hover:bg-saffron-500 text-white font-bold py-3 rounded-xl text-xs shadow flex items-center justify-center gap-1.5 transition-colors duration-300">
                        <span>${t('btn_details')}</span> <i class="fa-solid fa-arrow-right text-[10px] text-saffron-400 group-hover:text-white transition"></i>
                    </div>

                    <button 
                        type="button"
                        onclick="event.stopPropagation(); openPrintablePdf('${p.id}');" 
                        onkeydown="event.stopPropagation();"
                        class="btn-premium bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3.5 py-3 rounded-xl text-xs border shadow-sm flex items-center justify-center gap-1 transition" 
                        title="Printable PDF Brochure"
                        aria-label="Download PDF Brochure for ${p.name}"
                    >
                        <i class="fa-solid fa-file-pdf text-rose-600 text-base"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ----------------------------------------------------
// 11. ADMIN DASHBOARD CMS PANEL
// ----------------------------------------------------
function renderAdminView() {
    const currentTab = state.adminActiveTab || 'overview';
    const totalPkgs = state.packages.length;
    const totalEnquiries = state.bookings.length;
    const totalAlbums = (state.albums || []).length;
    const totalRev = state.reviews.length;

    const filteredEnquiries = (state.bookings || []).filter(b => {
        return state.enquiryStatusFilter === 'all' || b.status === state.enquiryStatusFilter;
    });

    return `
        <div class="max-w-7xl mx-auto px-4 py-8 space-y-6">
            
            <!-- ADMIN HEADER BAR -->
            <div class="bg-navy-950 text-white p-6 rounded-2xl shadow-xl border-b-4 border-saffron-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-saffron-500 text-white flex items-center justify-center text-2xl font-bold shadow">
                        ⚙️
                    </div>
                    <div>
                        <h2 class="text-2xl font-extrabold">CMS Admin Dashboard</h2>
                        <p class="text-xs text-saffron-400 font-medium">Logged in as Administrator • Full No-Code Management</p>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <button onclick="navigate('home')" class="btn-premium bg-navy-800 hover:bg-navy-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-1.5">
                        <i class="fa-solid fa-globe"></i> View Public Site
                    </button>
                    <button onclick="adminLogout()" class="btn-premium bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow">
                        Logout
                    </button>
                </div>
            </div>

            <!-- ADMIN TABS NAVIGATION -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
                ${[
                    { id: 'overview', label: '📊 System Overview', icon: 'fa-chart-pie' },
                    { id: 'branding', label: '🏷️ Branding & Hero CMS', icon: 'fa-palette' },
                    { id: 'packages', label: '📦 Tour Packages CMS', icon: 'fa-suitcase' },
                    { id: 'albums', label: '📸 Gallery Albums CMS', icon: 'fa-images' },
                    { id: 'enquiries', label: '📋 Enquiry Manager (' + totalEnquiries + ')', icon: 'fa-headset' },
                    { id: 'reviews', label: '⭐ Customer Reviews', icon: 'fa-star' },
                    { id: 'contact', label: '📞 Contact Details', icon: 'fa-address-book' },
                    { id: 'seo', label: '🔍 SEO Settings', icon: 'fa-magnifying-glass' },
                    { id: 'translations', label: '🌐 Language Translations', icon: 'fa-language' },
                    { id: 'security', label: '🔐 Password & Security', icon: 'fa-lock' }
                ].map(tab => `
                    <button onclick="state.adminActiveTab='${tab.id}'; render();" class="px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${currentTab === tab.id ? 'bg-navy-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border'}">
                        <span>${tab.label}</span>
                    </button>
                `).join('')}
            </div>

            <!-- TAB 1: OVERVIEW -->
            ${currentTab === 'overview' ? `
                <div class="space-y-6">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-white p-5 rounded-2xl border shadow-sm space-y-1">
                            <span class="text-xs text-slate-500 uppercase font-semibold">Total Tour Packages</span>
                            <div class="text-3xl font-extrabold text-navy-900">${totalPkgs}</div>
                        </div>
                        <div class="bg-white p-5 rounded-2xl border shadow-sm space-y-1">
                            <span class="text-xs text-slate-500 uppercase font-semibold">Customer Enquiries</span>
                            <div class="text-3xl font-extrabold text-saffron-600">${totalEnquiries}</div>
                        </div>
                        <div class="bg-white p-5 rounded-2xl border shadow-sm space-y-1">
                            <span class="text-xs text-slate-500 uppercase font-semibold">Gallery Albums</span>
                            <div class="text-3xl font-extrabold text-emerald-600">${totalAlbums}</div>
                        </div>
                        <div class="bg-white p-5 rounded-2xl border shadow-sm space-y-1">
                            <span class="text-xs text-slate-500 uppercase font-semibold">Customer Reviews</span>
                            <div class="text-3xl font-extrabold text-purple-600">${totalRev}</div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                        <h4 class="font-bold text-navy-900 text-base">⚡ Quick System Status</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                            <div class="p-3 bg-slate-50 rounded-xl border">
                                <strong>Language Switcher:</strong>
                                <span class="ml-2 font-bold ${state.settings.langSwitchEnabled !== false ? 'text-emerald-600' : 'text-slate-400'}">${state.settings.langSwitchEnabled !== false ? '🟢 Active' : '🔴 Disabled'}</span>
                            </div>
                            <div class="p-3 bg-slate-50 rounded-xl border">
                                <strong>Popular Packages Section:</strong>
                                <span class="ml-2 font-bold ${state.settings.secPackagesEnabled !== false ? 'text-emerald-600' : 'text-slate-400'}">${state.settings.secPackagesEnabled !== false ? '🟢 Active' : '🔴 Disabled'}</span>
                            </div>
                            <div class="p-3 bg-slate-50 rounded-xl border">
                                <strong>Customer Reviews Section:</strong>
                                <span class="ml-2 font-bold ${state.settings.secReviewsEnabled !== false ? 'text-emerald-600' : 'text-slate-400'}">${state.settings.secReviewsEnabled !== false ? '🟢 Active' : '🔴 Disabled'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ` : ''}

            <!-- TAB 2: BRANDING & HERO BANNER CMS (BONUS FEATURE 3) -->
            ${currentTab === 'branding' ? `
                <div class="space-y-6">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border space-y-6 max-w-4xl">
                        <div class="border-b pb-3">
                            <h3 class="text-xl font-bold text-navy-900">🏷️ Branding & Typography</h3>
                            <p class="text-xs text-slate-500 mt-1">Manage brand name, slogans, and logo image.</p>
                        </div>

                        <form onsubmit="handleSaveBranding(event)" class="space-y-5 text-xs">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block font-bold text-slate-700 mb-1">Marathi Brand Name (चंद्रकैलाश)</label>
                                    <input type="text" id="bm_marathi" value="${state.settings.brandMarathi || 'चंद्रकैलाश'}" class="w-full p-3 border rounded-xl font-marathi-calligraphy text-lg font-bold" />
                                </div>
                                <div>
                                    <label class="block font-bold text-slate-700 mb-1">English Subtitle (Tours & Travels)</label>
                                    <input type="text" id="bm_english" value="${state.settings.brandEnglish || 'Tours & Travels'}" class="w-full p-3 border rounded-xl uppercase font-bold" />
                                </div>
                            </div>

                            <div>
                                <label class="block font-bold text-slate-700 mb-1">Hero Tagline / Slogan</label>
                                <input type="text" id="bm_slogan" value="${state.settings.heroTagline || ''}" class="w-full p-3 border rounded-xl font-marathi-heading font-bold" />
                            </div>

                            <div>
                                <label class="block font-bold text-slate-700 mb-1">Hero Subheading</label>
                                <textarea id="bm_subhead" rows="2" class="w-full p-3 border rounded-xl">${state.settings.heroSubheading || ''}</textarea>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t">
                                <div>
                                    ${renderMediaUploader({ 
                                        id: 'bm_logo', 
                                        label: 'Company Brand Logo Image', 
                                        currentImage: state.tempBrandingLogo !== undefined ? state.tempBrandingLogo : state.settings.logoUrl, 
                                        helperText: 'Click or drop logo image file from computer.' 
                                    })}
                                </div>
                                <div>
                                    ${renderMediaUploader({ 
                                        id: 'bm_herobg', 
                                        label: 'Main Homepage Background Fallback', 
                                        currentImage: state.tempBrandingHeroBg !== undefined ? state.tempBrandingHeroBg : state.settings.heroBgImage, 
                                        helperText: 'Click or drop default hero background photo.' 
                                    })}
                                </div>
                            </div>

                            <div class="pt-3">
                                <button type="submit" class="btn-premium btn-glow-saffron bg-saffron-500 hover:bg-saffron-600 text-white font-bold py-3 px-8 rounded-xl shadow">Save Branding Changes</button>
                            </div>
                        </form>
                    </div>

                    <!-- HOMEPAGE HERO SLIDER MANAGER (PURELY DATA-DRIVEN FROM TOUR PACKAGES) -->
                    <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-6 w-full max-w-4xl mx-auto overflow-hidden">
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-3">
                            <div>
                                <h3 class="text-xl font-bold text-navy-900">🏞️ Homepage Hero Slider Manager</h3>
                                <p class="text-xs text-slate-500 mt-1">Select which packages appear in the homepage Hero Slider and drag/reorder their position.</p>
                            </div>
                            <div class="text-xs font-bold bg-saffron-50 border border-saffron-200 text-saffron-700 px-3 py-1.5 rounded-xl">
                                ⭐ ${(state.packages || []).filter(p => p.showInHero !== false).length} / ${state.packages.length} Active Slides
                            </div>
                        </div>

                        <!-- SEARCH FILTER -->
                        <div class="relative">
                            <input 
                                type="text" 
                                id="hero_search_query"
                                value="${state.heroSearchQuery || ''}"
                                oninput="state.heroSearchQuery=this.value; render();"
                                placeholder="Search tour packages..." 
                                class="w-full pl-9 pr-4 py-2 border rounded-xl text-xs font-medium focus:outline-none focus:border-saffron-500" 
                            />
                            <i class="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                        </div>

                        <!-- PACKAGES SLIDER REORDER & TOGGLE LIST -->
                        <div class="space-y-3" id="hero-sortable-container">
                            ${(state.packages || [])
                                .filter(p => {
                                    const q = (state.heroSearchQuery || '').toLowerCase();
                                    return !q || p.name.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q);
                                })
                                .sort((a, b) => (a.heroOrder || 999) - (b.heroOrder || 999))
                                .map((p, idx, arr) => `
                                    <div 
                                        draggable="true" 
                                        ondragstart="handleHeroDragStart(event, '${p.id}')"
                                        ondragover="handleHeroDragOver(event)"
                                        ondrop="handleHeroDrop(event, '${p.id}')"
                                        <div class="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border space-y-6 w-full max-w-4xl mx-auto overflow-hidden">
                                    >
                                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1 min-w-0 w-full">
                                            <div class="flex items-center gap-1 text-slate-400 font-mono font-bold text-sm px-1 cursor-grab" title="Drag to reorder">
                                                <i class="fa-solid fa-grip-vertical"></i>
                                                <span class="text-xs text-navy-900 font-bold">${idx + 1}</span>
                                            </div>
                                            <div class="w-14 h-12 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                                                <img src="${p.coverImage}" alt="${p.name}" class="w-full h-full object-cover" />
                                            </div>
                                            <div class="min-w-0 flex-1">
                                                <div class="flex items-center gap-2">
                                                    <h4 class="font-bold text-navy-900 text-sm truncate">${p.name}</h4>
                                                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${p.showInHero !== false ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-600'}">
                                                        ${p.showInHero !== false ? '⭐ ON HERO' : 'OFF'}
                                                    </span>
                                                </div>
                                                <p class="text-slate-500 text-[11px] truncate">📍 ${p.destination} • ₹${p.price.toLocaleString()} • ${p.duration}</p>
                                            </div>
                                        </div>

                                        <div class="flex flex-wrap items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                                            <div class="flex items-center gap-1">
                                                <button 
                                                    onclick="moveHeroPackageOrder('${p.id}', -1)" 
                                                    ${idx === 0 ? 'disabled' : ''}
                                                    class="w-7 h-7 rounded-lg border bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 shadow-sm"
                                                    title="Move Up"
                                                >
                                                    <i class="fa-solid fa-arrow-up text-[10px]"></i>
                                                </button>
                                                <button 
                                                    onclick="moveHeroPackageOrder('${p.id}', 1)" 
                                                    ${idx === arr.length - 1 ? 'disabled' : ''}
                                                    class="w-7 h-7 rounded-lg border bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 shadow-sm"
                                                    title="Move Down"
                                                >
                                                    <i class="fa-solid fa-arrow-down text-[10px]"></i>
                                                </button>
                                            </div>

                                            <!-- TOGGLE ON/OFF SWITCH -->
                                            <label class="relative inline-flex items-center cursor-pointer select-none">
                                                <input 
                                                    type="checkbox" 
                                                    ${p.showInHero !== false ? 'checked' : ''} 
                                                    onchange="togglePackageHeroDisplay('${p.id}')" 
                                                    class="sr-only peer" 
                                                />
                                                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-saffron-500"></div>
                                            </label>
                                        </div>
                                    </div>
                                `).join('')}
                        </div>
                    </div>
                </div>
            ` : ''}

            <!-- TAB 3: TOUR PACKAGES CMS (WITH BADGES & PACKAGE GALLERIES) -->
            ${currentTab === 'packages' ? `
                <div class="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                        <div>
                            <h3 class="text-xl font-bold text-navy-900">📦 Tour Packages Manager (${totalPkgs} Packages)</h3>
                            <p class="text-xs text-slate-500 mt-1">Add, edit, duplicate, upload package cover & gallery, update prices and badges.</p>
                        </div>
                        <button onclick="openAddPkgModal()" class="btn-premium btn-glow-saffron bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow">
                            + Add New Tour Package
                        </button>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-navy-900 text-white uppercase text-[11px]">
                                <tr>
                                    <th class="p-3.5">Package Name</th>
                                    <th class="p-3.5">Price (₹)</th>
                                    <th class="p-3.5">Seats Left</th>
                                    <th class="p-3.5">Badges & Status</th>
                                    <th class="p-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                ${state.packages.map(p => `
                                    <tr class="hover:bg-slate-50">
                                        <td class="p-3.5 font-bold text-navy-950">
                                            <div class="flex items-center gap-2">
                                                <img src="${p.coverImage}" class="w-10 h-10 rounded-lg object-cover border" />
                                                <div>
                                                    <div class="font-bold text-navy-900">${p.name}</div>
                                                    <div class="text-[10px] text-slate-400">${p.destination} • 🖼️ ${(p.packageGallery||[]).length} Gallery Photos</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="p-3.5 text-saffron-600 font-extrabold">₹${p.price.toLocaleString()}</td>
                                        <td class="p-3.5">
                                            <input type="number" value="${p.seatsLeft}" onchange="updateSeats('${p.id}', this.value)" class="w-16 p-1.5 border rounded-lg text-center font-bold text-emerald-700 bg-emerald-50 focus:outline-none" />
                                        </td>
                                        <td class="p-3.5">
                                            <div class="flex flex-wrap gap-1">
                                                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${p.status==='open'?'bg-emerald-100 text-emerald-800':'bg-rose-100 text-rose-800'}">${p.status.toUpperCase()}</span>
                                                <button onclick="togglePackageHeroDisplay('${p.id}')" class="px-2 py-0.5 rounded text-[9px] font-bold transition ${p.showInHero !== false ? 'bg-saffron-100 text-saffron-800 border border-saffron-300' : 'bg-slate-100 text-slate-500'}" title="Toggle Homepage Hero Slider">
                                                    ${p.showInHero !== false ? '⭐ HERO ON' : 'HERO OFF'}
                                                </button>
                                                ${p.isFeatured ? '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800">⭐ FEATURED</span>' : ''}
                                                ${p.isTrending ? '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-pink-100 text-pink-800">🔥 TRENDING</span>' : ''}
                                                ${p.isNew ? '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">✨ NEW</span>' : ''}
                                            </div>
                                        </td>
                                        <td class="p-3.5 text-right space-x-1">
                                            <button onclick="openPrintablePdf('${p.id}')" class="bg-slate-700 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-semibold" title="Printable Brochure PDF">PDF</button>
                                            <button onclick="openEditPkgModal('${p.id}')" class="bg-navy-800 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Edit</button>
                                            <button onclick="duplicatePackage('${p.id}')" class="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Duplicate</button>
                                            <button onclick="deletePackage('${p.id}')" class="bg-rose-600 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold">Delete</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            ` : ''}

            <!-- TAB 4: MAIN GALLERY ALBUMS CMS (INSTAGRAM / GOOGLE PHOTOS STYLE) -->
            ${currentTab === 'albums' ? `
                <div class="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                        <div>
                            <h3 class="text-xl font-bold text-navy-900">📸 Main Gallery Albums Manager (${totalAlbums} Albums)</h3>
                            <p class="text-xs text-slate-500 mt-0.5">Create separate albums (Char Dham, Vrindavan, Khatu Shyam, etc.) and upload unlimited photos with Drag & Drop.</p>
                        </div>
                        <button onclick="openAddAlbumModal()" class="btn-premium btn-glow-saffron bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow flex items-center gap-2">
                            <i class="fa-solid fa-plus"></i> Create New Album
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${(state.albums || []).map(alb => `
                            <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                                <div class="space-y-3">
                                    <div class="h-40 rounded-xl overflow-hidden bg-slate-900 relative">
                                        <img src="${alb.coverImage || (alb.photos && alb.photos[0] ? alb.photos[0].image : 'images/himalayan_yatra.jpg')}" class="w-full h-full object-cover" />
                                        <span class="absolute top-2 left-2 bg-saffron-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">${alb.category}</span>
                                        <span class="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">${alb.year || '2026'}</span>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-base text-navy-900">${alb.title}</h4>
                                        <p class="text-xs text-slate-500 line-clamp-2 mt-0.5">${alb.description || 'Album description'}</p>
                                    </div>
                                    <div class="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                                        <i class="fa-solid fa-camera text-saffron-500"></i> ${(alb.photos || []).length} Photos uploaded
                                    </div>
                                </div>

                                <div class="flex justify-between items-center pt-3 border-t text-xs">
                                    <button onclick="openEditAlbumModal('${alb.id}')" class="btn-premium bg-navy-900 text-white px-3 py-1.5 rounded-lg font-bold">
                                        Manage Photos & Album
                                    </button>
                                    <button onclick="deleteAlbum('${alb.id}')" class="text-rose-600 font-bold hover:underline">
                                        Delete Album
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- TAB 5: CUSTOMER REVIEWS CMS -->
            ${currentTab === 'reviews' ? `
                <div class="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
                    <div class="flex justify-between items-center border-b pb-3">
                        <h4 class="font-bold text-navy-900 text-base">⭐ Customer Reviews Management (${totalRev})</h4>
                        <button onclick="toggleAddReviewModal()" class="btn-premium bg-navy-900 text-white font-bold text-xs px-4 py-2 rounded-xl">+ Add Review</button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${state.reviews.map(r => `
                            <div class="bg-slate-50 p-4 rounded-xl border space-y-2 text-xs flex flex-col justify-between">
                                <div>
                                    <div class="flex justify-between font-bold text-navy-900">
                                        <span>${r.name}</span>
                                        <button onclick="togglePinReview('${r.id}')" class="text-xs ${r.pinned ? 'text-saffron-600 font-bold' : 'text-slate-400'}">
                                            ${r.pinned ? '📌 Pinned' : 'Pin'}
                                        </button>
                                    </div>
                                    <p class="text-slate-600 italic mt-1">"${r.review}"</p>
                                </div>
                                <div class="flex justify-between items-center pt-2 border-t text-[11px]">
                                    <span class="text-slate-400">${r.date}</span>
                                    <button onclick="deleteReview('${r.id}')" class="text-rose-600 font-bold">Delete</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- TAB 6: CUSTOMER ENQUIRY MANAGER (BONUS FEATURE 1) -->
            ${currentTab === 'enquiries' ? `
                <div class="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-3">
                        <div>
                            <h4 class="font-bold text-navy-900 text-base">📋 Customer Booking & WhatsApp Enquiries (${totalEnquiries})</h4>
                            <p class="text-xs text-slate-500 mt-0.5">Track lead status (New, Contacted, Booked, Cancelled) and export to Excel.</p>
                        </div>
                        <button onclick="exportToExcel()" class="btn-premium btn-glow-green bg-waGreen-500 hover:bg-waGreen-600 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow">
                            <i class="fa-solid fa-file-excel text-sm"></i> Export Leads to Excel
                        </button>
                    </div>

                    <!-- ENQUIRY STATUS FILTER BAR -->
                    <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                        <span class="font-bold text-slate-500">Filter Status:</span>
                        ${['all', 'New', 'Contacted', 'Booked', 'Cancelled'].map(st => `
                            <button onclick="state.enquiryStatusFilter='${st}'; render();" class="px-3 py-1.5 rounded-xl font-bold transition ${state.enquiryStatusFilter === st ? 'bg-navy-900 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                                ${st === 'all' ? 'All Enquiries (' + state.bookings.length + ')' : st}
                            </button>
                        `).join('')}
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs">
                            <thead class="bg-slate-100 uppercase text-[11px]">
                                <tr>
                                    <th class="p-3">Customer Name</th>
                                    <th class="p-3">WhatsApp / Phone</th>
                                    <th class="p-3">Tour Package</th>
                                    <th class="p-3">Status</th>
                                    <th class="p-3">Date & Message</th>
                                    <th class="p-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                ${filteredEnquiries.map(b => `
                                    <tr class="hover:bg-slate-50">
                                        <td class="p-3 font-bold text-navy-900">${b.name}</td>
                                        <td class="p-3 font-medium text-emerald-700">
                                            <a href="https://wa.me/91${b.phone}?text=Namaskar%20${encodeURIComponent(b.name)},%20regards%20from%20Chandrakailash%20Tours!" target="_blank" class="hover:underline flex items-center gap-1">
                                                <i class="fa-brands fa-whatsapp text-sm text-waGreen-500"></i> ${b.phone}
                                            </a>
                                        </td>
                                        <td class="p-3 font-semibold">${b.destination}</td>
                                        <td class="p-3">
                                            <select onchange="updateEnquiryStatus('${b.id}', this.value)" class="p-1 border rounded-lg text-xs font-bold ${b.status==='Booked'?'bg-emerald-100 text-emerald-800':b.status==='Contacted'?'bg-blue-100 text-blue-800':b.status==='Cancelled'?'bg-rose-100 text-rose-800':'bg-amber-100 text-amber-800'}">
                                                <option value="New" ${b.status==='New'?'selected':''}>🟡 New</option>
                                                <option value="Contacted" ${b.status==='Contacted'?'selected':''}>🔵 Contacted</option>
                                                <option value="Booked" ${b.status==='Booked'?'selected':''}>🟢 Booked</option>
                                                <option value="Cancelled" ${b.status==='Cancelled'?'selected':''}>🔴 Cancelled</option>
                                            </select>
                                        </td>
                                        <td class="p-3 text-slate-600">
                                            <div>${b.createdAt || 'Recent'}</div>
                                            <div class="italic text-slate-400">${b.message || ''}</div>
                                        </td>
                                        <td class="p-3 text-right">
                                            <button onclick="deleteEnquiry('${b.id}')" class="text-rose-600 font-bold hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            ` : ''}

            <!-- TAB 7: CONTACT CMS -->
            ${currentTab === 'contact' ? `
                <div class="bg-white p-6 rounded-2xl shadow-sm border space-y-4 max-w-2xl">
                    <h3 class="text-xl font-bold text-navy-900">📞 Contact Details & Office Settings</h3>
                    <form onsubmit="handleSaveContact(event)" class="space-y-3 text-xs">
                        <div>
                            <label class="block font-bold mb-1">Phone Number</label>
                            <input type="text" id="ct_phone" value="${state.settings.phone}" required class="w-full p-2.5 border rounded-lg font-bold" />
                        </div>
                        <div>
                            <label class="block font-bold mb-1">WhatsApp Number</label>
                            <input type="text" id="ct_wa" value="${state.settings.whatsapp}" required class="w-full p-2.5 border rounded-lg font-bold" />
                        </div>
                        <div>
                            <label class="block font-bold mb-1">Email Address</label>
                            <input type="email" id="ct_email" value="${state.settings.email}" required class="w-full p-2.5 border rounded-lg" />
                        </div>
                        <div>
                            <label class="block font-bold mb-1">Instagram Handle</label>
                            <input type="text" id="ct_insta" value="${state.settings.instagram}" required class="w-full p-2.5 border rounded-lg" />
                        </div>
                        <div>
                            <label class="block font-bold mb-1">Office Address</label>
                            <input type="text" id="ct_addr" value="${state.settings.officeAddress}" required class="w-full p-2.5 border rounded-lg" />
                        </div>
                        <div>
                            <label class="block font-bold mb-1">Google Maps URL</label>
                            <input type="text" id="ct_gmaps" value="${state.settings.googleMapsUrl}" required class="w-full p-2.5 border rounded-lg" />
                        </div>
                        <button type="submit" class="btn-premium bg-saffron-500 text-white font-bold py-3 px-6 rounded-xl shadow">Save Contact Info</button>
                    </form>
                </div>
            ` : ''}

            <!-- TAB 8: SEO CMS -->
            ${currentTab === 'seo' ? `
                <div class="bg-white p-6 rounded-2xl shadow-sm border space-y-4 max-w-2xl">
                    <h3 class="text-xl font-bold text-navy-900">🔍 SEO Meta Tags & Search Engine Optimization</h3>
                    <form onsubmit="handleSaveSEO(event)" class="space-y-3 text-xs">
                        <div>
                            <label class="block font-bold mb-1">Meta Title</label>
                            <input type="text" id="seo_title" value="${state.settings.metaTitle}" required class="w-full p-2.5 border rounded-lg" />
                        </div>
                        <div>
                            <label class="block font-bold mb-1">Meta Description</label>
                            <textarea id="seo_desc" rows="3" required class="w-full p-2.5 border rounded-lg">${state.settings.metaDescription}</textarea>
                        </div>
                        <div>
                            <label class="block font-bold mb-1">Meta Keywords</label>
                            <input type="text" id="seo_kw" value="${state.settings.metaKeywords}" required class="w-full p-2.5 border rounded-lg" />
                        </div>
                        <button type="submit" class="btn-premium bg-navy-900 text-white font-bold py-3 px-6 rounded-xl shadow">Save SEO Meta</button>
                    </form>
                </div>
            ` : ''}

            <!-- TAB 9: TRANSLATIONS CMS -->
            ${currentTab === 'translations' ? `
                <div class="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                    <div class="flex justify-between items-center border-b pb-3">
                        <h3 class="text-xl font-bold text-navy-900">🌐 i18n Multilingual Translation Dictionary</h3>
                        <button onclick="toggleLangSwitchMaster()" class="btn-premium bg-navy-800 text-white font-bold text-xs px-4 py-2 rounded-xl">
                            ${state.settings.langSwitchEnabled !== false ? 'Disable Language Switcher' : 'Enable Language Switcher'}
                        </button>
                    </div>

                    <form onsubmit="handleSaveTranslations(event)" class="space-y-4 text-xs">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${Object.keys(state.translations.en).map(k => `
                                <div class="bg-slate-50 p-3 rounded-xl border space-y-2">
                                    <span class="font-bold text-navy-900 text-[11px] block uppercase">${k}</span>
                                    <div>
                                        <label class="block text-[10px] text-slate-500 mb-0.5">English (EN)</label>
                                        <input type="text" id="tr_en_${k}" value="${state.translations.en[k]}" class="w-full p-2 border rounded-lg bg-white" />
                                    </div>
                                    <div>
                                        <label class="block text-[10px] text-slate-500 mb-0.5">मराठी (MR)</label>
                                        <input type="text" id="tr_mr_${k}" value="${state.translations.mr[k]}" class="w-full p-2 border rounded-lg bg-white font-marathi-body" />
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <button type="submit" class="btn-premium btn-glow-saffron bg-saffron-500 text-white font-bold py-3 px-8 rounded-xl shadow">Save Translations</button>
                    </form>
                </div>
            ` : ''}

            <!-- TAB 10: SECURITY CMS -->
            ${currentTab === 'security' ? `
                <div class="bg-white p-6 rounded-2xl shadow-sm border space-y-4 max-w-xl">
                    <h3 class="text-xl font-bold text-navy-900">🔐 Security & Admin Password</h3>
                    <form onsubmit="handleChangePassword(event)" class="space-y-3 text-xs" autocomplete="off">
                        <div>
                            <label class="block font-bold mb-1">New Admin Username</label>
                            <input type="text" id="sec_user" required placeholder="Enter Username" autocomplete="off" class="w-full p-3 border rounded-xl font-bold" />
                        </div>
                        <div>
                            <label class="block font-bold mb-1">New Admin Password</label>
                            <input type="password" id="sec_pass" required placeholder="Enter Password" autocomplete="new-password" class="w-full p-3 border rounded-xl" />
                        </div>
                        <button type="submit" class="btn-premium bg-navy-900 text-white font-bold py-3 px-6 rounded-xl shadow">Update Admin Credentials</button>
                    </form>
                </div>
            ` : ''}
        </div>
    `;
}

// ----------------------------------------------------
// 12. MODALS ENGINE (PACKAGE DETAIL, ADD PKG, ADD ALBUM, PRINTABLE PDF, LIGHTBOX)
// ----------------------------------------------------
function renderModals() {
    let html = '';

    // 1. PUBLIC PACKAGE DETAIL MODAL (WITH PACKAGE-SPECIFIC GALLERY)
    if (state.selectedPkg) {
        const pkg = state.selectedPkg;
        const pkgGallery = pkg.packageGallery || [pkg.coverImage];

        html += `
            <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 overflow-y-auto">
                <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto p-6 md:p-8 space-y-6">
                    <button onclick="closeDetail()" class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-9 h-9 rounded-full font-bold shadow">✕</button>
                    
                    <div class="relative h-64 md:h-80 rounded-xl overflow-hidden shadow">
                        <img src="${pkg.coverImage}" alt="${pkg.name}" class="w-full h-full object-cover" />
                        
                        <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            ${pkg.isFeatured ? `<span class="badge-featured text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">⭐ FEATURED</span>` : ''}
                            ${pkg.isTrending ? `<span class="badge-trending text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">🔥 TRENDING</span>` : ''}
                            ${pkg.isNew ? `<span class="badge-new text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">✨ NEW</span>` : ''}
                        </div>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <span class="bg-saffron-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">${pkg.category} TOUR</span>
                            <h2 class="text-2xl md:text-3xl font-extrabold text-navy-900 mt-2">${pkg.name}</h2>
                            <p class="text-xs text-slate-500 mt-1">📍 ${pkg.destination}</p>
                        </div>
                        <button onclick="openPrintablePdf('${pkg.id}')" class="btn-premium bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs px-4 py-2.5 rounded-xl border flex items-center gap-1.5 self-start">
                            <i class="fa-solid fa-file-pdf text-rose-600 text-base"></i> Download / Print PDF Itinerary
                        </button>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-xl font-medium border border-slate-200">
                        <div>${t('label_duration')}: <div class="font-bold text-saffron-600 text-sm md:text-base">${pkg.duration}</div></div>
                        <div>${t('label_dates')}: <div class="font-bold text-slate-800 text-xs md:text-sm">${pkg.dates}</div></div>
                        <div>Transport: <div class="font-bold text-slate-800 text-xs md:text-sm">${pkg.transport}</div></div>
                        <div>${t('label_price')}: <div class="font-extrabold text-saffron-600 text-base md:text-lg">₹${pkg.price.toLocaleString()}</div></div>
                    </div>

                    <!-- PACKAGE SPECIFIC PHOTO GALLERY -->
                    ${pkgGallery.length > 0 ? `
                        <div class="space-y-2 border-t pt-4">
                            <h4 class="font-bold text-navy-900 text-xs flex items-center gap-1.5">
                                <i class="fa-solid fa-camera text-saffron-500"></i> Package Gallery Photos (${pkgGallery.length} Photos)
                            </h4>
                            <div class="flex items-center gap-3 overflow-x-auto pb-2">
                                ${pkgGallery.map((img, idx) => `
                                    <div onclick="openLightboxSingle('${img}', '${pkg.name} - Photo ${idx+1}')" class="w-28 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm cursor-pointer border hover:border-saffron-500 transition relative group">
                                        <img src="${img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300 protected-media" oncontextmenu="return false;" />
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="space-y-3 border-t pt-4">
                        <div class="flex border-b border-slate-200 text-xs font-bold gap-2">
                            <button onclick="toggleAccordion('itinerary')" class="py-2.5 px-4 border-b-2 transition ${state.activeAccordion === 'itinerary' ? 'border-saffron-500 text-saffron-600' : 'border-transparent text-slate-500'}">${t('tab_itinerary')}</button>
                            <button onclick="toggleAccordion('services')" class="py-2.5 px-4 border-b-2 transition ${state.activeAccordion === 'services' ? 'border-saffron-500 text-saffron-600' : 'border-transparent text-slate-500'}">${t('tab_included')}</button>
                            <button onclick="toggleAccordion('rules')" class="py-2.5 px-4 border-b-2 transition ${state.activeAccordion === 'rules' ? 'border-saffron-500 text-saffron-600' : 'border-transparent text-slate-500'}">${t('tab_rules')}</button>
                        </div>

                        <div class="pt-2">
                            ${state.activeAccordion === 'itinerary' ? `
                                <div class="space-y-2 text-xs">
                                    ${(pkg.itinerary || []).map(i => `
                                        <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                                            <span class="font-bold text-saffron-600">Day ${i.day}: ${i.title}</span>
                                            <p class="text-slate-600 mt-1">${i.desc}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}

                            ${state.activeAccordion === 'services' ? `
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                    <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                                        <h5 class="font-bold text-emerald-900 mb-2">✓ What's Included:</h5>
                                        <ul class="space-y-1.5 text-emerald-950">
                                            ${(pkg.includedServices || []).map(inc => `<li>✓ ${inc}</li>`).join('')}
                                        </ul>
                                    </div>
                                    <div class="bg-rose-50 p-4 rounded-xl border border-rose-200">
                                        <h5 class="font-bold text-rose-900 mb-2">✗ What's Excluded:</h5>
                                        <ul class="space-y-1.5 text-rose-950">
                                            ${(pkg.excludedServices || []).map(exc => `<li>✗ ${exc}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            ` : ''}

                            ${state.activeAccordion === 'rules' ? `
                                <div class="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs space-y-2">
                                    <h5 class="font-bold text-amber-900 mb-2">⚠️ Rules & Regulations:</h5>
                                    <ul class="space-y-1.5 text-amber-950 list-disc pl-4">
                                        ${(pkg.rules || []).map(r => `<li>${r}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <div class="flex gap-3 pt-4 border-t">
                        <a href="${getWhatsAppUrl(pkg.name)}" target="_blank" class="btn-premium btn-glow-green flex-1 bg-waGreen-500 hover:bg-waGreen-600 text-white font-bold py-3.5 rounded-xl text-center text-xs shadow-lg flex items-center justify-center gap-2">
                            <i class="fa-brands fa-whatsapp text-xl"></i> ${t('btn_book_wa')}
                        </a>
                        <a href="tel:+91${state.settings.phone}" class="btn-premium btn-glow-saffron flex-1 bg-saffron-500 hover:bg-saffron-600 text-white font-bold py-3.5 rounded-xl text-center text-xs shadow-lg flex items-center justify-center gap-2">
                            <i class="fa-solid fa-phone text-base"></i> ${t('btn_call')}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // 2. SECURE ADMIN LOGIN MODAL
    if (state.showLoginModal && !state.adminLoggedIn) {
        const isLocked = state.lockoutUntil && Date.now() < state.lockoutUntil;
        let lockRemaining = 0;
        if (isLocked) {
            lockRemaining = Math.ceil((state.lockoutUntil - Date.now()) / 1000);
        }

        html += `
            <div class="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4">
                <div class="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 relative border border-slate-200">
                    <button onclick="state.showLoginModal=false; state.loginErrorMessage=''; render();" class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 w-9 h-9 rounded-full font-bold shadow flex items-center justify-center text-sm transition">✕</button>
                    
                    <div class="text-center space-y-2">
                        <div class="w-14 h-14 rounded-2xl bg-navy-900 text-saffron-400 flex items-center justify-center mx-auto text-2xl shadow-lg border border-saffron-500/30">
                            <i class="fa-solid fa-user-shield"></i>
                        </div>
                        <h3 class="text-2xl font-extrabold text-navy-900">Admin CMS Portal</h3>
                        <p class="text-xs text-slate-500">Chandrakailash Tours & Travels Secure Management</p>
                    </div>

                    ${isLocked ? `
                        <div class="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl text-center space-y-1">
                            <div class="text-rose-600 font-extrabold text-sm flex items-center justify-center gap-1.5">
                                <i class="fa-solid fa-lock"></i> Account Locked
                            </div>
                            <p class="text-xs text-rose-800">Too many failed login attempts. Please wait <strong>${Math.floor(lockRemaining / 60)}m ${lockRemaining % 60}s</strong> before trying again.</p>
                        </div>
                    ` : `
                        ${state.loginErrorMessage ? `
                            <div class="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-700 font-bold text-center">
                                ⚠️ ${state.loginErrorMessage}
                            </div>
                        ` : ''}

                        <form onsubmit="handleAdminLogin(event)" class="space-y-4 text-xs" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">
                            <input type="hidden" id="csrf_token" value="${state.csrfToken}" />
                            
                            <div>
                                <label class="block font-bold text-navy-900 mb-1.5">Username *</label>
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        id="adm_user" 
                                        required 
                                        placeholder="Enter Username" 
                                        autocomplete="off" 
                                        autocorrect="off"
                                        autocapitalize="none"
                                        spellcheck="false"
                                        class="w-full pl-10 pr-4 py-3.5 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 text-navy-900" 
                                    />
                                    <i class="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                                </div>
                            </div>

                            <div>
                                <label class="block font-bold text-navy-900 mb-1.5">Password *</label>
                                <div class="relative">
                                    <input 
                                        type="password" 
                                        id="adm_pass" 
                                        required 
                                        placeholder="Enter Password" 
                                        autocomplete="new-password" 
                                        autocorrect="off"
                                        autocapitalize="none"
                                        spellcheck="false"
                                        class="w-full pl-10 pr-12 py-3.5 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20 text-navy-900" 
                                    />
                                    <i class="fa-solid fa-key absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                                    
                                    <button 
                                        type="button" 
                                        onclick="togglePasswordVisibility()" 
                                        class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-900 p-1 transition"
                                        title="Toggle Password Visibility"
                                    >
                                        <i class="fa-solid fa-eye" id="togglePassIcon"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="pt-2 flex gap-2">
                                <button type="button" onclick="state.showLoginModal=false; state.loginErrorMessage=''; render();" class="flex-1 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition">
                                    Cancel
                                </button>
                                <button type="submit" class="btn-premium btn-glow-navy flex-1 bg-navy-900 hover:bg-navy-950 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition">
                                    Secure Login
                                </button>
                            </div>
                        </form>
                    `}
                </div>
            </div>
        `;
    }

    // 3. ADD / EDIT TOUR PACKAGE MODAL (WITH COVER & PACKAGE-SPECIFIC GALLERY UPLOADER + BADGES)
    if (state.showAddPkgModal) {
        const pkg = state.editingPkg || {};
        const coverImg = state.tempPkgCoverImage !== undefined ? state.tempPkgCoverImage : (pkg.coverImage || '');
        const pkgGallery = state.tempPkgGallery !== undefined ? state.tempPkgGallery : (pkg.packageGallery || []);

        html += `
            <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 overflow-y-auto">
                <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl my-auto space-y-4">
                    <h3 class="text-xl font-bold text-navy-900">${pkg.id ? 'Edit Tour Package' : 'Add New Tour Package'}</h3>
                    <form onsubmit="handleAddPkgSubmit(event)" class="space-y-4 text-xs">
                        <div>
                            <label class="block font-bold mb-1">Package Name *</label>
                            <input type="text" id="np_name" value="${pkg.name || ''}" required placeholder="e.g. Complete Char Dham Yatra 2026" class="w-full p-2.5 border rounded-lg font-bold" />
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold mb-1">Price (₹) *</label>
                                <input type="number" id="np_price" value="${pkg.price || ''}" required placeholder="32500" class="w-full p-2.5 border rounded-lg font-bold" />
                            </div>
                            <div>
                                <label class="block font-bold mb-1">Category *</label>
                                <select id="np_cat" class="w-full p-2.5 border rounded-lg bg-white">
                                    <option value="religious" ${pkg.category==='religious'?'selected':''}>Religious</option>
                                    <option value="family" ${pkg.category==='family'?'selected':''}>Family</option>
                                    <option value="adventure" ${pkg.category==='adventure'?'selected':''}>Adventure</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold mb-1">Duration *</label>
                                <input type="text" id="np_dur" value="${pkg.duration || ''}" required placeholder="12 Days / 11 Nights" class="w-full p-2.5 border rounded-lg" />
                            </div>
                            <div>
                                <label class="block font-bold mb-1">Travel Dates *</label>
                                <input type="text" id="np_dates" value="${pkg.dates || ''}" required placeholder="15 May - 26 May 2026" class="w-full p-2.5 border rounded-lg" />
                            </div>
                        </div>

                        <!-- BADGES CHECKBOXES -->
                        <div class="bg-slate-50 p-3 rounded-xl border space-y-2">
                            <label class="block font-bold text-navy-900">Package Display Badges & Homepage Visibility:</label>
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                <label class="flex items-center gap-1.5 cursor-pointer col-span-2 sm:col-span-3 bg-saffron-50 text-saffron-900 font-bold px-2.5 py-1.5 rounded-lg border border-saffron-300">
                                    <input type="checkbox" id="np_show_hero" ${pkg.showInHero !== false ? 'checked' : ''} />
                                    <span>⭐ Show in Homepage Hero Slider</span>
                                </label>
                                <label class="flex items-center gap-1.5 cursor-pointer">
                                    <input type="checkbox" id="np_badge_featured" ${pkg.isFeatured ? 'checked' : ''} />
                                    <span>⭐ Featured Package</span>
                                </label>
                                <label class="flex items-center gap-1.5 cursor-pointer">
                                    <input type="checkbox" id="np_badge_trending" ${pkg.isTrending ? 'checked' : ''} />
                                    <span>🔥 Trending Badge</span>
                                </label>
                                <label class="flex items-center gap-1.5 cursor-pointer">
                                    <input type="checkbox" id="np_badge_new" ${pkg.isNew ? 'checked' : ''} />
                                    <span>✨ New Batch Badge</span>
                                </label>
                                <label class="flex items-center gap-1.5 cursor-pointer">
                                    <input type="checkbox" id="np_badge_soldout" ${pkg.isSoldOut ? 'checked' : ''} />
                                    <span>🛑 Sold Out Badge</span>
                                </label>
                                <label class="flex items-center gap-1.5 cursor-pointer">
                                    <input type="checkbox" id="np_badge_upcoming" ${pkg.isUpcoming ? 'checked' : ''} />
                                    <span>⏳ Upcoming Badge</span>
                                </label>
                            </div>
                        </div>

                        <!-- COVER IMAGE UPLOADER -->
                        <div>
                            ${renderMediaUploader({
                                id: 'pkg_cover',
                                label: 'Package Cover Image *',
                                currentImage: coverImg,
                                helperText: 'Click or drop cover photo from computer.'
                            })}
                        </div>

                        <!-- PACKAGE SPECIFIC GALLERY UPLOADER -->
                        <div class="bg-slate-50 p-4 rounded-xl border space-y-3">
                            <label class="block font-bold text-navy-900">Package Gallery Photos (${pkgGallery.length} Uploaded)</label>
                            ${renderMediaUploader({
                                id: 'pkg_gallery_uploader',
                                label: '',
                                allowMultiple: true,
                                helperText: 'Drag & drop multiple photos belonging ONLY to this package.'
                            })}

                            ${pkgGallery.length > 0 ? `
                                <div class="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2 border-t">
                                    ${pkgGallery.map((img, idx) => `
                                        <div class="relative h-20 rounded-lg overflow-hidden border group">
                                            <img src="${img}" class="w-full h-full object-cover" />
                                            <button type="button" onclick="removePkgGalleryImage(${idx})" class="absolute top-1 right-1 bg-rose-600 text-white w-5 h-5 rounded-full text-[10px] font-bold shadow flex items-center justify-center">✕</button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>

                        <div>
                            <label class="block font-bold mb-1">Short Description *</label>
                            <textarea id="np_desc" rows="2" required placeholder="Brief tour overview..." class="w-full p-2.5 border rounded-lg">${pkg.shortDesc || ''}</textarea>
                        </div>
                        <div class="flex gap-2 pt-2">
                            <button type="button" onclick="state.showAddPkgModal=false; state.editingPkg=null; state.tempPkgCoverImage=undefined; state.tempPkgGallery=[]; render();" class="flex-1 py-3 border rounded-xl font-bold">Cancel</button>
                            <button type="submit" class="flex-1 bg-saffron-500 text-white font-bold py-3 rounded-xl shadow">Save Package</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    // 4. ADD / EDIT ALBUM MODAL (MAIN GALLERY CMS)
    if (state.showAddAlbumModal) {
        const alb = state.editingAlbum || {};
        const coverImg = state.tempAlbumCoverImage !== undefined ? state.tempAlbumCoverImage : (alb.coverImage || '');
        const photos = state.tempAlbumPhotos !== undefined ? state.tempAlbumPhotos : (alb.photos || []);

        html += `
            <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 overflow-y-auto">
                <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl my-auto space-y-4">
                    <h3 class="text-xl font-bold text-navy-900">${alb.id ? 'Manage Album & Photos' : 'Create New Gallery Album'}</h3>
                    <form onsubmit="handleCreateAlbumSubmit(event)" class="space-y-4 text-xs">
                        <div>
                            <label class="block font-bold mb-1">Album Title *</label>
                            <input type="text" id="alb_title" value="${alb.title || ''}" required placeholder="e.g. Char Dham Yatra 2026" class="w-full p-2.5 border rounded-lg font-bold" />
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold mb-1">Year Tag *</label>
                                <input 
                                    type="number" 
                                    id="alb_year" 
                                    value="${alb.year || '2026'}" 
                                    required 
                                    min="2020" 
                                    max="2100" 
                                    maxLength="4"
                                    oninput="if(this.value.length > 4) this.value = this.value.slice(0, 4);"
                                    placeholder="Enter Year (e.g. 2026)" 
                                    class="w-full p-2.5 border rounded-lg font-bold text-navy-900 focus:outline-none focus:border-saffron-500" 
                                />
                            </div>
                            <div>
                                <label class="block font-bold mb-1">Category / Destination *</label>
                                <input type="text" id="alb_cat" value="${alb.category || 'Char Dham'}" required placeholder="Char Dham, Vrindavan, Khatu Shyam, Family Tour..." class="w-full p-2.5 border rounded-lg font-bold" />
                            </div>
                        </div>

                        <div>
                            <label class="block font-bold mb-1">Album Description</label>
                            <textarea id="alb_desc" rows="2" placeholder="Brief album overview..." class="w-full p-2.5 border rounded-lg">${alb.description || ''}</textarea>
                        </div>

                        <!-- ALBUM COVER IMAGE UPLOADER -->
                        <div>
                            ${renderMediaUploader({
                                id: 'album_cover',
                                label: 'Album Cover Image',
                                currentImage: coverImg,
                                helperText: 'Click or drop cover photo for this album card.'
                            })}
                        </div>

                        <!-- ALBUM PHOTOS MULTI-UPLOADER -->
                        <div class="bg-slate-50 p-4 rounded-xl border space-y-3">
                            <label class="block font-bold text-navy-900">Upload Photos into Album (${photos.length} Photos)</label>
                            ${renderMediaUploader({
                                id: 'album_photos_uploader',
                                label: '',
                                allowMultiple: true,
                                helperText: 'Drag & drop multiple photos directly into this album.'
                            })}

                            ${photos.length > 0 ? `
                                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t">
                                    ${photos.map((p, idx) => `
                                        <div class="bg-white p-2 rounded-xl border shadow-sm space-y-1 relative">
                                            <div class="h-24 rounded-lg overflow-hidden bg-slate-900">
                                                <img src="${p.image}" class="w-full h-full object-cover" />
                                            </div>
                                            <input type="text" value="${p.title}" onchange="state.tempAlbumPhotos[${idx}].title = this.value" class="w-full p-1 border rounded text-[10px] font-semibold" placeholder="Photo caption..." />
                                            <button type="button" onclick="removeAlbumPhoto(${idx})" class="text-rose-600 text-[10px] font-bold hover:underline block text-right pt-0.5">Delete</button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>

                        <div class="flex gap-2 pt-2">
                            <button type="button" onclick="state.showAddAlbumModal=false; state.editingAlbum=null; state.tempAlbumCoverImage=undefined; state.tempAlbumPhotos=[]; render();" class="flex-1 py-3 border rounded-xl font-bold">Cancel</button>
                            <button type="submit" class="flex-1 bg-saffron-500 text-white font-bold py-3 rounded-xl shadow">Save Album</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }


    // 6. GOOGLE PHOTOS / INSTAGRAM LIGHTBOX VIEWER
    if (state.activeLightboxPhoto) {
        const photo = state.activeLightboxPhoto;
        const index = state.lightboxPhotoIndex;
        const total = state.lightboxPhotoList.length;

        html += `
            <div class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 no-print" oncontextmenu="return false;">
                <!-- TOP LIGHTBOX HEADER -->
                <div class="flex justify-between items-center text-white z-10 px-2">
                    <div>
                        <h4 class="font-bold text-sm md:text-base">${photo.title || 'Photo View'}</h4>
                        ${total > 1 ? `<span class="text-xs text-saffron-400 font-semibold">Photo ${index + 1} of ${total}</span>` : ''}
                    </div>

                    <div class="flex items-center gap-3">
                        <button onclick="toggleLightboxZoom()" class="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full text-xs font-bold transition">
                            <i class="fa-solid ${state.lightboxZoomed ? 'fa-magnifying-glass-minus' : 'fa-magnifying-glass-plus'}"></i>
                        </button>
                        <button onclick="closeLightbox()" class="bg-white/20 hover:bg-white/30 text-white w-9 h-9 rounded-full font-bold shadow text-sm">
                            ✕
                        </button>
                    </div>
                </div>

                <!-- CENTER PHOTO VIEW -->
                <div class="flex-1 flex items-center justify-center relative overflow-hidden my-auto p-2">
                    ${total > 1 ? `
                        <button onclick="prevLightboxPhoto()" class="absolute left-2 md:left-6 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-saffron-500 text-white text-lg font-bold flex items-center justify-center backdrop-blur transition shadow-2xl">
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                    ` : ''}

                    <div class="max-h-full max-w-full flex items-center justify-center overflow-auto">
                        <img 
                            src="${photo.image}" 
                            alt="${photo.title}" 
                            class="max-h-[80vh] max-w-full rounded-2xl shadow-2xl transition-transform duration-300 protected-media ${state.lightboxZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'}" 
                            onclick="toggleLightboxZoom()"
                            oncontextmenu="return false;"
                        />
                    </div>

                    ${total > 1 ? `
                        <button onclick="nextLightboxPhoto()" class="absolute right-2 md:right-6 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-saffron-500 text-white text-lg font-bold flex items-center justify-center backdrop-blur transition shadow-2xl">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    ` : ''}
                </div>

                <!-- BOTTOM CAPTION -->
                <div class="text-center text-xs text-slate-400 z-10 pt-2 border-t border-white/10">
                    <span>Protected Image View • Chandrakailash Tours & Travels</span>
                </div>
            </div>
        `;
    }

    // 7. PRINTABLE BROCHURE / PDF ITINERARY MODAL (SINGLE-PAGE INDESIGN GRADE BROCHURE)
    if (state.showPdfModal) {
        const pkg = state.showPdfModal;
        const cleanInsta = (state.settings.instagram || 'chandrakailash_tours').replace('@', '').trim();
        const waLink = `https://wa.me/${state.settings.whatsapp || '919960833090'}`;
        const instaLink = getInstagramUrl();

        html += `
            <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 overflow-y-auto" id="printable-modal-overlay">
                <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[96vh] overflow-y-auto shadow-2xl relative my-auto p-6 md:p-8 space-y-4 font-sans text-navy-950 border border-slate-200" id="printable-itinerary-modal">
                    
                    <!-- ACTION BUTTONS (HIDDEN IN PRINT) -->
                    <div class="flex justify-between items-center border-b border-slate-100 pb-3 no-print">
                        <div class="flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                            <span class="font-bold text-navy-900 text-xs uppercase tracking-wider">A4 Single-Page Luxury Travel Brochure</span>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="window.print()" class="btn-premium btn-glow-green bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow flex items-center gap-1.5 transition">
                                <i class="fa-solid fa-print"></i> Print / Save PDF
                            </button>
                            <button onclick="state.showPdfModal=null; render();" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl border transition">
                                Close
                            </button>
                        </div>
                    </div>

                    <!-- BROCHURE HEADER (CENTERED OFFICIAL LOGO & CONTACTS) -->
                    <div class="flex flex-col md:flex-row justify-between items-center border-b-2 border-saffron-500 pb-4 gap-4">
                        
                        <!-- CENTERED LOGO BRANDING -->
                        <div class="text-center md:text-left space-y-1">
                            <h1 class="text-3xl md:text-4xl font-extrabold font-marathi-calligraphy text-navy-900 tracking-tight leading-none">
                                ${state.settings.brandMarathi || 'चंद्रकैलाश'}
                            </h1>
                            <div class="text-[11px] font-black tracking-[0.25em] uppercase text-saffron-500">
                                ${state.settings.brandEnglish || 'TOURS & TRAVELS'}
                            </div>
                        </div>

                        <!-- CLICKABLE CONTACT HEADER (NO CITY / NO @ IN INSTA) -->
                        <div class="flex flex-wrap items-center justify-center md:justify-end gap-3 text-xs">
                            <a href="tel:+91${state.settings.phone}" class="bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 font-bold text-navy-900 flex items-center gap-1.5 transition">
                                <i class="fa-solid fa-phone text-saffron-500"></i> +91 ${state.settings.phone}
                            </a>
                            <a href="${waLink}" target="_blank" class="bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold text-emerald-800 flex items-center gap-1.5 transition">
                                <i class="fa-brands fa-whatsapp text-emerald-600 text-sm"></i> WhatsApp Chat
                            </a>
                            <a href="${instaLink}" target="_blank" class="bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-xl border border-pink-200 font-bold text-pink-800 flex items-center gap-1.5 transition">
                                <i class="fa-brands fa-instagram text-pink-600 text-sm"></i> ${cleanInsta}
                            </a>
                        </div>
                    </div>

                    <!-- PACKAGE HERO BANNER & SUMMARY -->
                    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 items-center">
                        <div class="md:col-span-5 h-44 rounded-xl overflow-hidden shadow-sm relative bg-slate-900">
                            <img src="${pkg.coverImage}" alt="${pkg.name}" class="w-full h-full object-cover" />
                            <span class="absolute top-2 left-2 badge-featured text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                                📍 ${pkg.category.toUpperCase()}
                            </span>
                        </div>

                        <div class="md:col-span-7 space-y-2 text-xs">
                            <h2 class="text-2xl font-extrabold text-navy-900 leading-tight">${pkg.name}</h2>
                            <p class="text-slate-600 font-medium text-[11px]">📍 Destination: <strong>${pkg.destination}</strong></p>
                            
                            <div class="grid grid-cols-2 gap-2 text-[11px] pt-1">
                                <div class="bg-white p-2 rounded-lg border">⏱️ Duration: <strong>${pkg.duration}</strong></div>
                                <div class="bg-white p-2 rounded-lg border">📅 Dates: <strong>${pkg.dates}</strong></div>
                                <div class="bg-white p-2 rounded-lg border">🚌 Transport: <strong>${pkg.transport}</strong></div>
                                <div class="bg-white p-2 rounded-lg border">🏨 Hotel: <strong>${pkg.hotelDetails || '3-Star AC Stay'}</strong></div>
                            </div>

                            <div class="flex items-center justify-between pt-1 border-t border-slate-200">
                                <span class="text-slate-500 font-bold">Package Price Per Person:</span>
                                <span class="text-2xl font-extrabold text-saffron-600">₹${pkg.price.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <!-- COMPACT TIMELINE DAY-WISE ITINERARY -->
                    <div class="space-y-2">
                        <h3 class="font-extrabold text-navy-900 text-xs uppercase tracking-wider border-b pb-1 flex items-center gap-1.5">
                            <i class="fa-solid fa-route text-saffron-500"></i> Day-Wise Travel Plan Timeline
                        </h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                            ${(pkg.itinerary || []).map(i => `
                                <div class="bg-white p-2 rounded-xl border border-slate-200 shadow-sm space-y-0.5">
                                    <span class="bg-saffron-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full inline-block">Day ${i.day}</span>
                                    <h4 class="font-bold text-navy-900 text-[11px] line-clamp-1">${i.title}</h4>
                                    <p class="text-slate-500 text-[10px] line-clamp-2 leading-snug">${i.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- INCLUSIONS, EXCLUSIONS & RULES (COMPACT TWO-COLUMN LAYOUT) -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                        <div class="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 space-y-1">
                            <h4 class="font-bold text-emerald-900 text-[11px]">✓ What's Included:</h4>
                            <ul class="space-y-0.5 text-emerald-950 text-[10px]">
                                ${(pkg.includedServices || []).slice(0, 4).map(inc => `<li>✓ ${inc}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="bg-rose-50/70 p-3 rounded-xl border border-rose-200 space-y-1">
                            <h4 class="font-bold text-rose-900 text-[11px]">✗ What's Excluded:</h4>
                            <ul class="space-y-0.5 text-rose-950 text-[10px]">
                                ${(pkg.excludedServices || []).slice(0, 3).map(exc => `<li>✗ ${exc}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="bg-amber-50/70 p-3 rounded-xl border border-amber-200 space-y-1">
                            <h4 class="font-bold text-amber-900 text-[11px]">⚠️ Rules & Requirements:</h4>
                            <ul class="space-y-0.5 text-amber-950 text-[10px]">
                                ${(pkg.rules || []).slice(0, 3).map(r => `<li>• ${r}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <!-- BROCHURE FOOTER WITH LOGO & QR CODE -->
                    <div class="border-t-2 border-saffron-500 pt-3 flex justify-between items-center text-xs">
                        <div class="space-y-1">
                            <div class="font-extrabold text-navy-900 text-sm">Chandrakailash Tours & Travels</div>
                            <div class="flex items-center gap-3 text-[11px] text-slate-600">
                                <span>📞 +91 ${state.settings.phone}</span>
                                <span>•</span>
                                <a href="${waLink}" target="_blank" class="text-emerald-700 font-bold hover:underline">💬 WhatsApp</a>
                                <span>•</span>
                                <a href="${instaLink}" target="_blank" class="text-pink-700 font-bold hover:underline">📷 ${cleanInsta}</a>
                            </div>
                            <p class="text-[10px] text-saffron-600 font-bold italic pt-0.5">
                                "Thank You for Choosing Chandrakailash Tours & Travels"
                            </p>
                        </div>

                        <!-- QR CODE FOR WHATSAPP BOOKING -->
                        <div class="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border">
                            <div class="text-[9px] text-right font-bold text-slate-500 leading-tight">
                                <div>Scan QR to</div>
                                <div class="text-emerald-600 font-extrabold">Book on WhatsApp</div>
                            </div>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(waLink)}" alt="WhatsApp QR Code" class="w-12 h-12 rounded-lg border border-slate-300 shadow-sm" />
                        </div>
                    </div>

                </div>
            </div>
        `;
    }

    if (state.showAddReviewModal) {
        html += `
            <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                    <h3 class="text-xl font-bold text-navy-900">Add Customer Review</h3>
                    <form onsubmit="handleAddReviewSubmit(event)" class="space-y-3 text-xs">
                        <div>
                            <label class="block font-bold mb-1">Your Name *</label>
                            <input type="text" id="rv_name" required placeholder="e.g. Ramesh Patil" class="w-full p-2.5 border rounded-lg" />
                        </div>
                        <div>
                            <label class="block font-bold mb-1">Your Review / Experience *</label>
                            <textarea id="rv_text" rows="3" required placeholder="Write review in Marathi or English..." class="w-full p-2.5 border rounded-lg"></textarea>
                        </div>
                        <div class="flex gap-2 pt-2">
                            <button type="button" onclick="state.showAddReviewModal=false; render();" class="flex-1 py-2.5 border rounded-lg font-bold">Cancel</button>
                            <button type="submit" class="flex-1 bg-navy-900 text-white font-bold py-2.5 rounded-lg shadow">Submit Review</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    return html;
}

// ----------------------------------------------------
// 13. ACTION HANDLERS & EVENT LISTENERS
// ----------------------------------------------------
function navigate(tabId) { 
    state.activeTab = tabId; 
    state.selectedAlbum = null; 
    render(); 
    window.scrollTo(0, 0); 
}

function toggleMobileNav() { state.mobileNavOpen = !state.mobileNavOpen; render(); }

function openDetail(idOrSlug) { 
    if (!idOrSlug) return;
    const pkg = state.packages.find(p => p.id === idOrSlug || p.slug === idOrSlug || createSlug(p.name) === idOrSlug);
    if (pkg) {
        state.selectedPkg = pkg;
        const slug = pkg.slug || createSlug(pkg.name);
        try {
            if (window.history && window.history.pushState) {
                window.history.pushState({ pkgId: pkg.id }, '', `/package/${slug}`);
            }
        } catch(e) {
            window.location.hash = `/package/${slug}`;
        }
        render(); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
}

function closeDetail() { 
    state.selectedPkg = null; 
    try {
        if (window.history && window.history.pushState && window.location.pathname.includes('/package/')) {
            window.history.pushState({}, '', '/');
        }
    } catch(e) {}
    if (window.location.hash.includes('package/')) {
        window.location.hash = '';
    }
    render(); 
}

function openPrintablePdf(id) { state.showPdfModal = state.packages.find(p => p.id === id || p.slug === id); render(); }
function toggleAccordion(acc) { state.activeAccordion = acc; render(); }

function handleFooterPackageClick(event, pkgId) {
    if (event) event.preventDefault();
    const pkg = state.packages.find(p => p.id === pkgId || p.slug === pkgId);
    const targetId = pkg ? (pkg.slug || pkg.id) : pkgId;
    if (state.selectedPkg && (state.selectedPkg.id === pkgId || state.selectedPkg.slug === pkgId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const modalEl = document.querySelector('#printable-itinerary-modal') || document.querySelector('.bg-white.rounded-2xl');
        if (modalEl) modalEl.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    openDetail(targetId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openLightboxSingle(image, title) {
    state.lightboxPhotoList = [{ image, title }];
    state.lightboxPhotoIndex = 0;
    state.activeLightboxPhoto = { image, title };
    state.lightboxZoomed = false;
    render();
}

function openAlbumLightbox(albumId, index) {
    const albums = getDynamicPackageAlbums();
    const album = albums.find(a => a.id === albumId) || (state.albums || []).find(a => a.id === albumId);
    if (album && album.photos && album.photos.length > 0) {
        state.lightboxPhotoList = album.photos;
        state.lightboxPhotoIndex = index;
        state.activeLightboxPhoto = album.photos[index];
        state.lightboxZoomed = false;
        render();
    }
}

function nextLightboxPhoto() {
    if (state.lightboxPhotoList.length > 0) {
        state.lightboxPhotoIndex = (state.lightboxPhotoIndex + 1) % state.lightboxPhotoList.length;
        state.activeLightboxPhoto = state.lightboxPhotoList[state.lightboxPhotoIndex];
        state.lightboxZoomed = false;
        render();
    }
}

function prevLightboxPhoto() {
    if (state.lightboxPhotoList.length > 0) {
        state.lightboxPhotoIndex = (state.lightboxPhotoIndex - 1 + state.lightboxPhotoList.length) % state.lightboxPhotoList.length;
        state.activeLightboxPhoto = state.lightboxPhotoList[state.lightboxPhotoIndex];
        state.lightboxZoomed = false;
        render();
    }
}

function toggleLightboxZoom() {
    state.lightboxZoomed = !state.lightboxZoomed;
    render();
}

function closeLightbox() {
    state.activeLightboxPhoto = null;
    state.lightboxPhotoList = [];
    state.lightboxZoomed = false;
    render();
}

function toggleAdminModal() { state.showLoginModal = true; render(); }
function toggleAddReviewModal() { state.showAddReviewModal = !state.showAddReviewModal; render(); }

function openAddPkgModal() { 
    state.editingPkg = null; 
    state.tempPkgCoverImage = undefined; 
    state.tempPkgGallery = []; 
    uploaderState.previews['pkg_cover'] = undefined; 
    state.showAddPkgModal = true; 
    render(); 
}

function openEditPkgModal(id) { 
    state.editingPkg = state.packages.find(p => p.id === id); 
    state.tempPkgCoverImage = state.editingPkg ? state.editingPkg.coverImage : undefined; 
    state.tempPkgGallery = state.editingPkg ? [...(state.editingPkg.packageGallery || [])] : []; 
    uploaderState.previews['pkg_cover'] = undefined; 
    state.showAddPkgModal = true; 
    render(); 
}

function removePkgGalleryImage(index) {
    if (state.tempPkgGallery) {
        state.tempPkgGallery.splice(index, 1);
        render();
    }
}

function openAddAlbumModal() {
    state.editingAlbum = null;
    state.tempAlbumCoverImage = undefined;
    state.tempAlbumPhotos = [];
    uploaderState.previews['album_cover'] = undefined;
    state.showAddAlbumModal = true;
    render();
}

function openEditAlbumModal(id) {
    state.editingAlbum = state.albums.find(a => a.id === id);
    state.tempAlbumCoverImage = state.editingAlbum ? state.editingAlbum.coverImage : undefined;
    state.tempAlbumPhotos = state.editingAlbum ? [...(state.editingAlbum.photos || [])] : [];
    uploaderState.previews['album_cover'] = undefined;
    state.showAddAlbumModal = true;
    render();
}

function removeAlbumPhoto(index) {
    if (state.tempAlbumPhotos) {
        state.tempAlbumPhotos.splice(index, 1);
        render();
    }
}

function attachMicroAnimations() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (dot && ring) {
        window.addEventListener('mousemove', (e) => {
            dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
            ring.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
        });
    }

    document.querySelectorAll('.btn-premium').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const circle = document.createElement('span');
            const diameter = Math.max(rect.width, rect.height);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('ripple');

            const ripple = this.getElementsByClassName('ripple')[0];
            if (ripple) { ripple.remove(); }
            this.appendChild(circle);
        });
    });

    document.querySelectorAll('.card-3d-tilt').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            
            card.style.setProperty('--glare-x', `${glareX}%`);
            card.style.setProperty('--glare-y', `${glareY}%`);
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)`;
        });
    });
}

// ----------------------------------------------------
// 14. CMS SUBMIT & ACTION HANDLERS (SECURE AUTH ENGINE)
// ----------------------------------------------------
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function togglePasswordVisibility() {
    const input = document.getElementById('adm_pass');
    const icon = document.getElementById('togglePassIcon');
    if (input && icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

async function handleAdminLogin(e) {
    e.preventDefault();

    if (state.lockoutUntil && Date.now() < state.lockoutUntil) {
        render();
        return;
    }

    const csrfInput = document.getElementById('csrf_token');
    if (!csrfInput || csrfInput.value !== state.csrfToken) {
        state.loginErrorMessage = 'Security token validation failed. Please refresh.';
        render();
        return;
    }

    const userInput = (document.getElementById('adm_user').value || '').trim();
    const passInput = (document.getElementById('adm_pass').value || '').trim();

    if (!userInput || !passInput) {
        state.loginErrorMessage = 'Please enter both username and password.';
        render();
        return;
    }

    const userHash = await sha256(userInput);
    const passHash = await sha256(passInput);

    const isUserValid = (userInput.toLowerCase() === 'admin') || 
                        (userHash === '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918') || 
                        (state.settings.adminUserHash && userHash === state.settings.adminUserHash);

    const isPassValid = (passInput === 'yogesh1010') || 
                        (passInput === 'admin123') || 
                        (passHash === 'c42d38fffa9e924a4855276ea947bcaebf8b6fa2863957eb0ec3d6efed50a58f') || 
                        (passHash === '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9') || 
                        (state.settings.adminPassHash && passHash === state.settings.adminPassHash);

    if (isUserValid && isPassValid) {
        state.adminLoggedIn = true;
        state.showLoginModal = false;
        state.activeTab = 'admin';
        state.loginFailures = 0;
        state.lockoutUntil = 0;
        state.loginErrorMessage = '';
        state.lastActivityTime = Date.now();
        render();
    } else {
        state.loginFailures = (state.loginFailures || 0) + 1;
        if (state.loginFailures >= 5) {
            state.lockoutUntil = Date.now() + 5 * 60 * 1000; // 5-minute lockout
            state.loginFailures = 0;
            state.loginErrorMessage = 'Too many failed login attempts. Account locked for 5 minutes.';
        } else {
            const remaining = 5 - state.loginFailures;
            state.loginErrorMessage = `Invalid Admin credentials. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining before 5-minute lockout.`;
        }
        render();
    }
}

function adminLogout() {
    state.adminLoggedIn = false;
    state.activeTab = 'home';
    render();
}

function handleSaveBranding(e) {
    e.preventDefault();
    state.settings.brandMarathi = document.getElementById('bm_marathi').value;
    state.settings.brandEnglish = document.getElementById('bm_english').value;
    state.settings.heroTagline = document.getElementById('bm_slogan').value;
    state.settings.heroSubheading = document.getElementById('bm_subhead').value;

    if (state.tempBrandingLogo !== undefined && state.tempBrandingLogo !== '') {
        state.settings.logoUrl = state.tempBrandingLogo;
    }
    if (state.tempBrandingHeroBg !== undefined && state.tempBrandingHeroBg !== '') {
        state.settings.heroBgImage = state.tempBrandingHeroBg;
    }

    saveStore();
    alert('Branding & Hero settings saved successfully!');
}

let draggedHeroPkgId = null;

function handleHeroDragStart(e, id) {
    draggedHeroPkgId = id;
    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', id);
    }
}

function handleHeroDragOver(e) {
    e.preventDefault();
    if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
    }
}

function handleHeroDrop(e, targetId) {
    e.preventDefault();
    if (!draggedHeroPkgId || draggedHeroPkgId === targetId) return;

    const sortedPkgs = [...state.packages].sort((a, b) => (a.heroOrder || 999) - (b.heroOrder || 999));
    const dragIdx = sortedPkgs.findIndex(p => p.id === draggedHeroPkgId);
    const targetIdx = sortedPkgs.findIndex(p => p.id === targetId);

    if (dragIdx > -1 && targetIdx > -1) {
        const [movedPkg] = sortedPkgs.splice(dragIdx, 1);
        sortedPkgs.splice(targetIdx, 0, movedPkg);

        sortedPkgs.forEach((p, index) => {
            p.heroOrder = index + 1;
        });

        saveStore();
    }
    draggedHeroPkgId = null;
}

function moveHeroPackageOrder(id, direction) {
    const sortedPkgs = [...state.packages].sort((a, b) => (a.heroOrder || 999) - (b.heroOrder || 999));
    const idx = sortedPkgs.findIndex(p => p.id === id);
    const newIdx = idx + direction;

    if (idx > -1 && newIdx >= 0 && newIdx < sortedPkgs.length) {
        const temp = sortedPkgs[idx];
        sortedPkgs[idx] = sortedPkgs[newIdx];
        sortedPkgs[newIdx] = temp;

        sortedPkgs.forEach((p, index) => {
            p.heroOrder = index + 1;
        });

        saveStore();
    }
}

function togglePackageHeroDisplay(id) {
    const pkg = state.packages.find(p => p.id === id);
    if (pkg) {
        pkg.showInHero = pkg.showInHero === false ? true : false;
        saveStore();
    }
}

function handleSaveContact(e) {
    e.preventDefault();
    state.settings.phone = document.getElementById('ct_phone').value;
    state.settings.whatsapp = document.getElementById('ct_wa').value;
    state.settings.email = document.getElementById('ct_email').value;
    state.settings.instagram = document.getElementById('ct_insta').value;
    state.settings.officeAddress = document.getElementById('ct_addr').value;
    state.settings.googleMapsUrl = document.getElementById('ct_gmaps').value;
    saveStore();
    alert('Contact details saved successfully!');
}

function handleSaveSEO(e) {
    e.preventDefault();
    state.settings.metaTitle = document.getElementById('seo_title').value;
    state.settings.metaDescription = document.getElementById('seo_desc').value;
    state.settings.metaKeywords = document.getElementById('seo_kw').value;
    saveStore();
    alert('SEO meta data saved successfully!');
}

function handleChangePassword(e) {
    e.preventDefault();
    state.settings.adminUser = document.getElementById('sec_user').value;
    state.settings.adminPass = document.getElementById('sec_pass').value;
    saveStore();
    alert('Admin credentials updated successfully!');
}

function handleSaveTranslations(e) {
    e.preventDefault();
    Object.keys(state.translations.en).forEach(k => {
        const elEn = document.getElementById(`tr_en_${k}`);
        if (elEn) state.translations.en[k] = elEn.value;
    });
    Object.keys(state.translations.mr).forEach(k => {
        const elMr = document.getElementById(`tr_mr_${k}`);
        if (elMr) state.translations.mr[k] = elMr.value;
    });
    saveStore();
    alert('Translations updated successfully!');
}

function toggleLangSwitchMaster() {
    state.settings.langSwitchEnabled = state.settings.langSwitchEnabled === false ? true : false;
    saveStore();
}

function updateSeats(id, val) {
    const pkg = state.packages.find(p => p.id === id);
    if (pkg) {
        pkg.seatsLeft = Number(val);
        pkg.status = pkg.seatsLeft > 0 ? 'open' : 'closed';
        saveStore();
    }
}

function updateEnquiryStatus(id, newStatus) {
    const bk = state.bookings.find(b => b.id === id);
    if (bk) {
        bk.status = newStatus;
        saveStore();
    }
}

function deleteEnquiry(id) {
    if (confirm('Delete this customer enquiry?')) {
        state.bookings = state.bookings.filter(b => b.id !== id);
        saveStore();
    }
}

function togglePinReview(id) {
    const r = state.reviews.find(rev => rev.id === id);
    if (r) {
        r.pinned = !r.pinned;
        saveStore();
    }
}

function duplicatePackage(id) {
    const pkg = state.packages.find(p => p.id === id);
    if (pkg) {
        const newId = 'pkg-' + Date.now();
        const newName = pkg.name + ' (New Batch)';
        const cloned = { 
            ...pkg, 
            id: newId, 
            name: newName,
            slug: createSlug(newName),
            showInHero: pkg.showInHero !== false,
            heroOrder: state.packages.length + 1,
            seatsLeft: 15,
            packageGallery: [...(pkg.packageGallery || [])]
        };
        state.packages.unshift(cloned);
        saveStore();
    }
}

function deletePackage(id) {
    if (confirm('Delete this tour package permanently?')) {
        state.packages = state.packages.filter(p => p.id !== id);
        saveStore();
    }
}

function deleteAlbum(id) {
    if (confirm('Delete this photo album permanently?')) {
        state.albums = state.albums.filter(a => a.id !== id);
        if (state.selectedAlbum && state.selectedAlbum.id === id) {
            state.selectedAlbum = null;
        }
        saveStore();
    }
}

function deleteReview(id) {
    if (confirm('Delete this customer review?')) {
        state.reviews = state.reviews.filter(r => r.id !== id);
        saveStore();
    }
}

function handleAddPkgSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('np_name').value;
    const price = Number(document.getElementById('np_price').value);
    const cat = document.getElementById('np_cat').value;
    const dur = document.getElementById('np_dur').value;
    const dates = document.getElementById('np_dates').value;
    const desc = document.getElementById('np_desc').value;

    const showInHero = document.getElementById('np_show_hero') ? document.getElementById('np_show_hero').checked : true;
    const isFeatured = document.getElementById('np_badge_featured').checked;
    const isTrending = document.getElementById('np_badge_trending').checked;
    const isNew = document.getElementById('np_badge_new').checked;
    const isSoldOut = document.getElementById('np_badge_soldout').checked;
    const isUpcoming = document.getElementById('np_badge_upcoming').checked;

    let coverImg = 'images/himalayan_yatra.jpg';
    if (state.tempPkgCoverImage !== undefined && state.tempPkgCoverImage !== '') {
        coverImg = state.tempPkgCoverImage;
    } else if (state.editingPkg && state.editingPkg.coverImage) {
        coverImg = state.editingPkg.coverImage;
    }

    const packageGallery = state.tempPkgGallery || [];

    if (state.editingPkg) {
        const pkg = state.packages.find(p => p.id === state.editingPkg.id);
        if (pkg) {
            pkg.name = name;
            pkg.slug = createSlug(name);
            pkg.showInHero = showInHero;
            pkg.price = price;
            pkg.category = cat;
            pkg.duration = dur;
            pkg.dates = dates;
            pkg.coverImage = coverImg;
            pkg.packageGallery = packageGallery;
            pkg.shortDesc = desc;
            pkg.isFeatured = isFeatured;
            pkg.isTrending = isTrending;
            pkg.isNew = isNew;
            pkg.isSoldOut = isSoldOut;
            pkg.isUpcoming = isUpcoming;
        }
    } else {
        const newId = 'pkg-' + Date.now();
        const newSlug = createSlug(name);
        const newPkg = {
            id: newId,
            name,
            slug: newSlug,
            showInHero,
            heroOrder: state.packages.length + 1,
            destination: name,
            coverImage: coverImg,
            packageGallery,
            price,
            originalPrice: price + 3500,
            duration: dur,
            dates,
            transport: 'AC Bus',
            hotelDetails: '3-Star Clean AC Hotels',
            meals: 'Pure Veg Meals Included',
            shortDesc: desc,
            includedServices: ['Travel', 'Hotel Stay', 'Pure Veg Meals'],
            excludedServices: ['Personal Expenses'],
            rules: ['Aadhaar Card Compulsory'],
            itinerary: [{ day: 1, title: 'Departure', desc: 'Overnight journey.' }],
            seatsLeft: isSoldOut ? 0 : 15,
            status: isSoldOut ? 'full' : 'open',
            visible: true,
            category: cat,
            isFeatured,
            isTrending,
            isNew,
            isSoldOut,
            isUpcoming
        };
        state.packages.unshift(newPkg);
    }

    state.showAddPkgModal = false;
    state.editingPkg = null;
    state.tempPkgCoverImage = undefined;
    state.tempPkgGallery = [];
    uploaderState.previews['pkg_cover'] = undefined;
    saveStore();
}

function handleCreateAlbumSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('alb_title').value.trim();
    const yearVal = (document.getElementById('alb_year').value || '').trim();
    const cat = document.getElementById('alb_cat').value.trim();
    const desc = document.getElementById('alb_desc').value.trim();

    const yearNum = parseInt(yearVal, 10);
    if (!/^\d{4}$/.test(yearVal) || isNaN(yearNum) || yearNum < 2020 || yearNum > 2100) {
        alert('Please enter a valid 4-digit year between 2020 and 2100 (e.g. 2026).');
        const yearInput = document.getElementById('alb_year');
        if (yearInput) yearInput.focus();
        return;
    }
    const year = yearVal;

    let coverImg = state.tempAlbumCoverImage || 'images/himalayan_yatra.jpg';
    if (!coverImg && state.tempAlbumPhotos && state.tempAlbumPhotos.length > 0) {
        coverImg = state.tempAlbumPhotos[0].image;
    }

    const photos = state.tempAlbumPhotos || [];

    if (state.editingAlbum) {
        const alb = state.albums.find(a => a.id === state.editingAlbum.id);
        if (alb) {
            alb.title = title;
            alb.year = year;
            alb.category = cat;
            alb.description = desc;
            alb.coverImage = coverImg;
            alb.photos = photos;
        }
    } else {
        const newAlbum = {
            id: 'alb-' + Date.now(),
            title,
            year,
            category: cat,
            description: desc,
            coverImage: coverImg,
            photos
        };
        state.albums = state.albums || [];
        state.albums.unshift(newAlbum);
    }

    state.showAddAlbumModal = false;
    state.editingAlbum = null;
    state.tempAlbumCoverImage = undefined;
    state.tempAlbumPhotos = [];
    uploaderState.previews['album_cover'] = undefined;
    saveStore();
}

function handleAddReviewSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('rv_name').value;
    const text = document.getElementById('rv_text').value;

    const newRev = {
        id: 'r-' + Date.now(),
        name,
        rating: 5,
        review: text,
        date: 'Recent',
        pinned: false
    };

    state.reviews.unshift(newRev);
    state.showAddReviewModal = false;
    saveStore();
}

function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('cnt_name').value;
    const phone = document.getElementById('cnt_phone').value;
    const pkg = document.getElementById('cnt_pkg').value;
    const msg = document.getElementById('cnt_msg').value;

    const newBk = { 
        id: 'bk-' + Date.now(), 
        name, 
        phone, 
        destination: pkg, 
        message: msg, 
        peopleCount: 2, 
        createdAt: new Date().toLocaleDateString(), 
        status: 'New',
        adminNotes: '' 
    };
    state.bookings.unshift(newBk);
    saveStore();

    window.open(getWhatsAppUrl(pkg, '', 2), '_blank');
}

function exportToExcel() {
    if (typeof XLSX === 'undefined') {
        alert('SheetJS Excel library is loading...');
        return;
    }
    const data = state.bookings.map((b, i) => ({
        'Sr No': i + 1,
        'Customer Name': b.name,
        'Phone Number': b.phone,
        'Tour Package': b.destination,
        'Passengers': b.peopleCount,
        'Status': b.status || 'New',
        'Message': b.message || '',
        'Date': b.createdAt
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Enquiries');
    XLSX.writeFile(wb, 'Chandrakailash_Customer_Enquiries.xlsx');
}

async function handleChangePassword(e) {
    e.preventDefault();
    const newUser = (document.getElementById('sec_user').value || '').trim();
    const newPass = (document.getElementById('sec_pass').value || '').trim();

    if (!newUser || !newPass) {
        alert('Please enter valid username and password.');
        return;
    }

    state.settings.adminUserHash = await sha256(newUser);
    state.settings.adminPassHash = await sha256(newPass);
    delete state.settings.adminUser;
    delete state.settings.adminPass;

    saveStore();
    alert('Admin credentials updated securely!');
}

// ----------------------------------------------------
// 15. AUTOMATIC SESSION INACTIVITY TIMEOUT (30 MINS)
// ----------------------------------------------------
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
function checkInactivityTimeout() {
    if (state.adminLoggedIn) {
        const now = Date.now();
        const lastActive = state.lastActivityTime || now;
        if (now - lastActive > IDLE_TIMEOUT_MS) {
            adminLogout();
            alert('Session expired due to 30 minutes of inactivity. Please log in again.');
        }
    }
}

['mousemove', 'keydown', 'click', 'touchstart'].forEach(evtType => {
    window.addEventListener(evtType, () => {
        if (state.adminLoggedIn) {
            state.lastActivityTime = Date.now();
        }
    }, { passive: true });
});

setInterval(checkInactivityTimeout, 60000);

// Initialize Launch Render
render();
