export interface Mouza {
  id: string;
  name: string;
  nameEn: string;
  jlNo: string;
  surveyTypes: string[];
}

export interface Union {
  id: string;
  name: string;
  nameEn: string;
  mouzas: Mouza[];
}

export interface Upazila {
  id: string;
  name: string;
  nameEn: string;
  unions: Union[];
}

export interface District {
  id: string;
  name: string;
  nameEn: string;
  upazilas: Upazila[];
}

export interface Division {
  id: string;
  name: string;
  nameEn: string;
  districts: District[];
}

export const SURVEY_TYPES = [
  { id: 'RS', name: 'আর.এস (RS)', desc: 'Revisional Survey', available: true },
  { id: 'BS', name: 'বি.এস (BS)', desc: 'Bangladesh Survey', available: true },
  { id: 'CS', name: 'সি.এস (CS)', desc: 'Cadastral Survey', available: true },
  { id: 'SA', name: 'এস.এ (SA)', desc: 'State Acquisition Survey', available: true },
  { id: 'CITY', name: 'সিটি জরিপ (City Survey)', desc: 'Dhaka/Chittagong City Survey', available: true },
  { id: 'NAMJARI', name: 'নামজারি / ই-মিউটেশন (Namjari)', desc: 'Mutation Porchia Record', available: true },
];

export const GEO_DATA: Division[] = [
  {
    id: 'dhaka_div',
    name: 'ঢাকা বিভাগ',
    nameEn: 'Dhaka Division',
    districts: [
      {
        id: 'dhaka_dist',
        name: 'ঢাকা',
        nameEn: 'Dhaka',
        upazilas: [
          {
            id: 'dhanmondi',
            name: 'ধানমন্ডি সার্কেল',
            nameEn: 'Dhanmondi Circle',
            unions: [
              {
                id: 'dhanmondi_u',
                name: 'ধানমন্ডি',
                nameEn: 'Dhanmondi',
                mouzas: [
                  { id: 'm1', name: 'ধানমন্ডি', nameEn: 'Dhanmondi', jlNo: '০৫', surveyTypes: ['RS', 'BS', 'CITY', 'NAMJARI'] },
                  { id: 'm2', name: 'শুক্ৰাবাদ', nameEn: 'Shukrabad', jlNo: '০৬', surveyTypes: ['RS', 'BS', 'CITY'] },
                  { id: 'm3', name: 'সোবহানবাগ', nameEn: 'Sobhanbag', jlNo: '০৭', surveyTypes: ['RS', 'BS', 'CITY'] },
                ],
              },
            ],
          },
          {
            id: 'savar',
            name: 'সাভার',
            nameEn: 'Savar',
            unions: [
              {
                id: 'savar_sadar',
                name: 'সাভার সদর ইউনিয়ন',
                nameEn: 'Savar Sadar',
                mouzas: [
                  { id: 'm4', name: 'রাজাশন', nameEn: 'Rajashon', jlNo: '১০৩', surveyTypes: ['RS', 'BS', 'SA', 'CS', 'NAMJARI'] },
                  { id: 'm5', name: 'মজিদপুর', nameEn: 'Majidpur', jlNo: '১০৪', surveyTypes: ['RS', 'BS', 'SA', 'CS'] },
                  { id: 'm6', name: 'আনন্দপুর', nameEn: 'Anandapur', jlNo: '১০৫', surveyTypes: ['RS', 'BS', 'NAMJARI'] },
                ],
              },
              {
                id: 'ashulia',
                name: 'আশুলিয়া ইউনিয়ন',
                nameEn: 'Ashulia',
                mouzas: [
                  { id: 'm7', name: 'আশুলিয়া', nameEn: 'Ashulia', jlNo: '৪৭', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'm8', name: 'জিরাবো', nameEn: 'Zirabo', jlNo: '৪৮', surveyTypes: ['RS', 'BS', 'NAMJARI'] },
                ],
              },
            ],
          },
          {
            id: 'mirpur_circle',
            name: 'মিরপুর সার্কেল',
            nameEn: 'Mirpur Circle',
            unions: [
              {
                id: 'mirpur_u',
                name: 'মিরপুর',
                nameEn: 'Mirpur',
                mouzas: [
                  { id: 'm9', name: 'মিরপুর', nameEn: 'Mirpur', jlNo: '১২', surveyTypes: ['RS', 'BS', 'CITY', 'CS', 'NAMJARI'] },
                  { id: 'm10', name: 'পাইকপাড়া', nameEn: 'Paikpara', jlNo: '১৩', surveyTypes: ['RS', 'BS', 'CITY'] },
                  { id: 'm11', name: 'সেনপাড়া পর্বতা', nameEn: 'Senpara Parbata', jlNo: '১৪', surveyTypes: ['RS', 'BS', 'CITY'] },
                ],
              },
            ],
          },
          {
            id: 'dhamrai',
            name: 'ধামরাই',
            nameEn: 'Dhamrai',
            unions: [
              {
                id: 'dhamrai_sadar',
                name: 'ধামরাই পৌরসভা',
                nameEn: 'Dhamrai Municipality',
                mouzas: [
                  { id: 'm12', name: 'ধামরাই', nameEn: 'Dhamrai', jlNo: '২১', surveyTypes: ['RS', 'SA', 'CS', 'BS'] },
                  { id: 'm13', name: 'কুল্লা', nameEn: 'Kulla', jlNo: '২২', surveyTypes: ['RS', 'SA', 'CS'] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'gazipur_dist',
        name: 'গাজীপুর',
        nameEn: 'Gazipur',
        upazilas: [
          {
            id: 'gazipur_sadar',
            name: 'গাজীপুর সদর',
            nameEn: 'Gazipur Sadar',
            unions: [
              {
                id: 'joydebpur',
                name: 'জয়দেবপুর',
                nameEn: 'Joydebpur',
                mouzas: [
                  { id: 'm14', name: 'জয়দেবপুর', nameEn: 'Joydebpur', jlNo: '৩৩', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                  { id: 'm15', name: 'চান্দনা', nameEn: 'Chandana', jlNo: '৩৪', surveyTypes: ['RS', 'BS'] },
                ],
              },
            ],
          },
          {
            id: 'sreepur',
            name: 'শ্রীপুর',
            nameEn: 'Sreepur',
            unions: [
              {
                id: 'sreepur_u',
                name: 'শ্রীপুর ইউনিয়ন',
                nameEn: 'Sreepur',
                mouzas: [
                  { id: 'm16', name: 'মাওনা', nameEn: 'Mawna', jlNo: '৫৫', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'm17', name: 'তেলিহাটি', nameEn: 'Telihati', jlNo: '৫৬', surveyTypes: ['RS', 'BS'] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'narayanganj_dist',
        name: 'নারায়ণগঞ্জ',
        nameEn: 'Narayanganj',
        upazilas: [
          {
            id: 'narayanganj_sadar',
            name: 'নারায়ণগঞ্জ সদর',
            nameEn: 'Narayanganj Sadar',
            unions: [
              {
                id: 'fatullah',
                name: 'ফতুল্লা',
                nameEn: 'Fatullah',
                mouzas: [
                  { id: 'm18', name: 'ফতুল্লা', nameEn: 'Fatullah', jlNo: '১৭', surveyTypes: ['RS', 'BS', 'CS', 'SA'] },
                  { id: 'm19', name: 'জালকুড়ি', nameEn: 'Jalkuri', jlNo: '১৮', surveyTypes: ['RS', 'BS'] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'chittagong_div',
    name: 'চট্টগ্রাম বিভাগ',
    nameEn: 'Chittagong Division',
    districts: [
      {
        id: 'ctg_dist',
        name: 'চট্টগ্রাম',
        nameEn: 'Chattogram',
        upazilas: [
          {
            id: 'panchlaish',
            name: 'পাঁচলাইশ সার্কেল',
            nameEn: 'Panchlaish Circle',
            unions: [
              {
                id: 'panchlaish_u',
                name: 'পাঁচলাইশ',
                nameEn: 'Panchlaish',
                mouzas: [
                  { id: 'm20', name: 'পাঁচলাইশ', nameEn: 'Panchlaish', jlNo: '০২', surveyTypes: ['BS', 'RS', 'CITY', 'NAMJARI'] },
                  { id: 'm21', name: 'মুরাদপুর', nameEn: 'Muradpur', jlNo: '০৩', surveyTypes: ['BS', 'RS', 'CITY'] },
                ],
              },
            ],
          },
          {
            id: 'patiya',
            name: 'পটিয়া',
            nameEn: 'Patiya',
            unions: [
              {
                id: 'patiya_sadar',
                name: 'পটিয়া পৌরসভা',
                nameEn: 'Patiya Municipality',
                mouzas: [
                  { id: 'm22', name: 'পটিয়া', nameEn: 'Patiya', jlNo: '৪৫', surveyTypes: ['BS', 'RS', 'CS'] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'coxsbazar_dist',
        name: 'কক্সবাজার',
        nameEn: 'Cox\'s Bazar',
        upazilas: [
          {
            id: 'cox_sadar',
            name: 'কক্সবাজার সদর',
            nameEn: 'Cox\'s Bazar Sadar',
            unions: [
              {
                id: 'cox_city',
                name: 'ঝিলংজা',
                nameEn: 'Jhilongja',
                mouzas: [
                  { id: 'm23', name: 'ঝিলংজা', nameEn: 'Jhilongja', jlNo: '০৯', surveyTypes: ['BS', 'RS', 'NAMJARI'] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'rajshahi_div',
    name: 'রাজশাহী বিভাগ',
    nameEn: 'Rajshahi Division',
    districts: [
      {
        id: 'bogra_dist',
        name: 'বগুড়া',
        nameEn: 'Bogura',
        upazilas: [
          {
            id: 'bogra_sadar',
            name: 'বগুড়া সদর',
            nameEn: 'Bogura Sadar',
            unions: [
              {
                id: 'bogra_pauro',
                name: 'বগুড়া পৌরসভা',
                nameEn: 'Bogura Municipality',
                mouzas: [
                  { id: 'm24', name: 'ফুলবাড়ী', nameEn: 'Fulbari', jlNo: '৪১', surveyTypes: ['RS', 'CS', 'SA', 'BS'] },
                  { id: 'm25', name: 'সাবগ্রাম', nameEn: 'Sabgram', jlNo: '৪২', surveyTypes: ['RS', 'SA'] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'rajshahi_dist',
        name: 'রাজশাহী',
        nameEn: 'Rajshahi',
        upazilas: [
          {
            id: 'boalia',
            name: 'বোয়ালিয়া',
            nameEn: 'Boalia',
            unions: [
              {
                id: 'boalia_u',
                name: 'বোয়ালিয়া',
                nameEn: 'Boalia',
                mouzas: [
                  { id: 'm26', name: 'হেতেম খাঁ', nameEn: 'Hetem Khan', jlNo: '০১', surveyTypes: ['RS', 'CS', 'BS'] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sylhet_div',
    name: 'সিলেট বিভাগ',
    nameEn: 'Sylhet Division',
    districts: [
      {
        id: 'sylhet_dist',
        name: 'সিলেট',
        nameEn: 'Sylhet',
        upazilas: [
          {
            id: 'sylhet_sadar',
            name: 'সিলেট সদর',
            nameEn: 'Sylhet Sadar',
            unions: [
              {
                id: 'khadimnagar',
                name: 'খাদিমনগর',
                nameEn: 'Khadimnagar',
                mouzas: [
                  { id: 'm27', name: 'খাদিমপাড়া', nameEn: 'Khadimpara', jlNo: '৭৭', surveyTypes: ['RS', 'BS', 'CS'] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'khulna_div',
    name: 'খুলনা বিভাগ',
    nameEn: 'Khulna Division',
    districts: [
      {
        id: 'khulna_dist',
        name: 'খুলনা',
        nameEn: 'Khulna',
        upazilas: [
          {
            id: 'khulna_sadar',
            name: 'খুলনা সদর',
            nameEn: 'Khulna Sadar',
            unions: [
              {
                id: 'khalishpur',
                name: 'খালিশপুর',
                nameEn: 'Khalishpur',
                mouzas: [
                  { id: 'm28', name: 'বয়রা', nameEn: 'Boyra', jlNo: '১৪', surveyTypes: ['RS', 'CS', 'SA', 'BS'] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
