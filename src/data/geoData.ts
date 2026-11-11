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
        id: 'naogaon_dist',
        name: 'নওগাঁ',
        nameEn: 'Naogaon',
        upazilas: [
          {
            id: 'naogaon_sadar',
            name: 'নওগাঁ সদর',
            nameEn: 'Naogaon Sadar',
            unions: [
              {
                id: 'naogaon_pauro',
                name: 'নওগাঁ পৌরসভা ও সদর',
                nameEn: 'Naogaon Municipality & Sadar',
                mouzas: [
                  { id: 'ng_m1', name: 'চকমুক্তার', nameEn: 'Chakmuktar', jlNo: '১২', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'ng_m2', name: 'পার-নওগাঁ', nameEn: 'Par-Naogaon', jlNo: '১৫', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'ng_m3', name: 'বরুণকান্দি', nameEn: 'Barunkandi', jlNo: '১৮', surveyTypes: ['RS', 'BS', 'CS', 'SA'] },
                  { id: 'ng_m4', name: 'উল্লাসপুর', nameEn: 'Ullashpur', jlNo: '২২', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'ng_m5', name: 'দুবলহাটি', nameEn: 'Dubalhati', jlNo: '৩৫', surveyTypes: ['RS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'ng_m6', name: 'বলিহার', nameEn: 'Balihar', jlNo: '৪৪', surveyTypes: ['RS', 'CS', 'SA'] },
                  { id: 'ng_m7', name: 'শিকারপুর', nameEn: 'Shikarpur', jlNo: '৫১', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'ng_m8', name: 'বোয়ালিয়া', nameEn: 'Boalia', jlNo: '৬০', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'ng_m9', name: 'হাঁপানিয়া', nameEn: 'Hapania', jlNo: '৬৭', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                ],
              },
            ],
          },
          {
            id: 'badalgachhi',
            name: 'বদলগাছী',
            nameEn: 'Badalgachhi',
            unions: [
              {
                id: 'badalgachhi_u',
                name: 'বদলগাছী ইউনিয়ন ও এলাকা',
                nameEn: 'Badalgachhi Union',
                mouzas: [
                  { id: 'bg_m1', name: 'পাহাড়পুর (সোমপুর বিহার)', nameEn: 'Paharpur', jlNo: '০৮', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'bg_m2', name: 'বদলগাছী', nameEn: 'Badalgachhi', jlNo: '১৪', surveyTypes: ['RS', 'BS', 'CS', 'SA'] },
                  { id: 'bg_m3', name: 'কোলা', nameEn: 'Kola', jlNo: '২১', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'bg_m4', name: 'মথুরাপুর', nameEn: 'Mathurapur', jlNo: '২৯', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'bg_m5', name: 'বিলাশবাড়ী', nameEn: 'Bilashbari', jlNo: '৩৭', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                  { id: 'bg_m6', name: 'মিঠাপুর', nameEn: 'Mithapur', jlNo: '৪২', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'bg_m7', name: 'আধাইপুর', nameEn: 'Adhaipur', jlNo: '৪৯', surveyTypes: ['RS', 'BS', 'SA'] },
                ],
              },
            ],
          },
          {
            id: 'mohadevpur',
            name: 'মহাদেবপুর',
            nameEn: 'Mohadevpur',
            unions: [
              {
                id: 'mohadevpur_u',
                name: 'মহাদেবপুর ইউনিয়ন ও এলাকা',
                nameEn: 'Mohadevpur Area',
                mouzas: [
                  { id: 'mh_m1', name: 'মহাদেবপুর', nameEn: 'Mohadevpur', jlNo: '০১', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'mh_m2', name: 'খাজুর', nameEn: 'Khajur', jlNo: '১১', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'mh_m3', name: 'চান্দাশ', nameEn: 'Chandash', jlNo: '১৯', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'mh_m4', name: 'এনায়েতপুর', nameEn: 'Enayetpur', jlNo: '২৭', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                  { id: 'mh_m5', name: 'চেরাগপুর', nameEn: 'Cheragpur', jlNo: '৩৩', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'mh_m6', name: 'ভীমপুর', nameEn: 'Bhimpur', jlNo: '৪৮', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'mh_m7', name: 'হাতুড়', nameEn: 'Hatur', jlNo: '৫৫', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'mh_m8', name: 'রাইগাঁ', nameEn: 'Raigaon', jlNo: '৬২', surveyTypes: ['RS', 'BS', 'SA'] },
                ],
              },
            ],
          },
          {
            id: 'patnitala',
            name: 'পত্নীতলা',
            nameEn: 'Patnitala',
            unions: [
              {
                id: 'patnitala_u',
                name: 'পত্নীতলা ও নজিপুর',
                nameEn: 'Patnitala & Nazipur',
                mouzas: [
                  { id: 'pt_m1', name: 'নজিপুর পৌরসভা', nameEn: 'Nazipur', jlNo: '০৫', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'pt_m2', name: 'পত্নীতলা', nameEn: 'Patnitala', jlNo: '১৬', surveyTypes: ['RS', 'BS', 'CS', 'SA'] },
                  { id: 'pt_m3', name: 'শিহাড়া', nameEn: 'Shihara', jlNo: '২৪', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'pt_m4', name: 'মাটিন্দর', nameEn: 'Matindor', jlNo: '৩১', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'pt_m5', name: 'আকবরপুর', nameEn: 'Akbarpur', jlNo: '৩৮', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'pt_m6', name: 'পাটিচরা', nameEn: 'Patichara', jlNo: '৪৫', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                  { id: 'pt_m7', name: 'দিবর', nameEn: 'Dibor', jlNo: '৫২', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'pt_m8', name: 'আমাইড়', nameEn: 'Amair', jlNo: '৫৯', surveyTypes: ['RS', 'BS', 'SA'] },
                ],
              },
            ],
          },
          {
            id: 'dhamoirhat',
            name: 'ধামইরহাট',
            nameEn: 'Dhamoirhat',
            unions: [
              {
                id: 'dhamoirhat_u',
                name: 'ধামইরহাট পৌরসভা ও এলাকা',
                nameEn: 'Dhamoirhat Area',
                mouzas: [
                  { id: 'dh_m1', name: 'ধামইরহাট', nameEn: 'Dhamoirhat', jlNo: '০৭', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'dh_m2', name: 'আলমপুর', nameEn: 'Alampur', jlNo: '১৪', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'dh_m3', name: 'আগ্রাদ্বিগুন', nameEn: 'Agradigun', jlNo: '২২', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                  { id: 'dh_m4', name: 'উমার', nameEn: 'Umar', jlNo: '৩০', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'dh_m5', name: 'আড়ানগর', nameEn: 'Aranagar', jlNo: '৩৬', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'dh_m6', name: 'জাহানপুর', nameEn: 'Jahanpur', jlNo: '৪১', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'dh_m7', name: 'ইসবপুর', nameEn: 'Isabpur', jlNo: '৪৮', surveyTypes: ['RS', 'BS', 'SA'] },
                ],
              },
            ],
          },
          {
            id: 'sapahar',
            name: 'সাপাহার',
            nameEn: 'Sapahar',
            unions: [
              {
                id: 'sapahar_u',
                name: 'সাপাহার সদর ও ইউনিয়ন',
                nameEn: 'Sapahar Area',
                mouzas: [
                  { id: 'sp_m1', name: 'সাপাহার', nameEn: 'Sapahar', jlNo: '০৩', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'sp_m2', name: 'তিলনা', nameEn: 'Tilna', jlNo: '১২', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                  { id: 'sp_m3', name: 'শিরন্টী', nameEn: 'Shiranti', jlNo: '১৯', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'sp_m4', name: 'আইহাই', nameEn: 'Aihai', jlNo: '২৮', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'sp_m5', name: 'গোয়ালা', nameEn: 'Goala', jlNo: '৩৪', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'sp_m6', name: 'পাতাড়ী', nameEn: 'Patari', jlNo: '৪১', surveyTypes: ['RS', 'BS', 'SA'] },
                ],
              },
            ],
          },
          {
            id: 'porsha',
            name: 'পোরশা',
            nameEn: 'Porsha',
            unions: [
              {
                id: 'porsha_u',
                name: 'পোরশা ও নিতপুর',
                nameEn: 'Porsha Area',
                mouzas: [
                  { id: 'pr_m1', name: 'নিতপুর', nameEn: 'Nitpur', jlNo: '০৪', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'pr_m2', name: 'ঘাটনগর', nameEn: 'Ghatnagar', jlNo: '১৩', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'pr_m3', name: 'তেঁতুলিয়া', nameEn: 'Tentulia', jlNo: '২০', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'pr_m4', name: 'ছাওড়', nameEn: 'Chhaor', jlNo: '২৭', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'pr_m5', name: 'গাঙ্গুরিয়া', nameEn: 'Ganguria', jlNo: '৩৩', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                  { id: 'pr_m6', name: 'মশিদপুর', nameEn: 'Moshidpur', jlNo: '৩৯', surveyTypes: ['RS', 'BS', 'SA'] },
                ],
              },
            ],
          },
          {
            id: 'manda',
            name: 'মান্দা',
            nameEn: 'Manda',
            unions: [
              {
                id: 'manda_u',
                name: 'মান্দা ও প্রসাদপুর',
                nameEn: 'Manda Area',
                mouzas: [
                  { id: 'md_m1', name: 'প্রসাদপুর', nameEn: 'Prasadpur', jlNo: '০৯', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'md_m2', name: 'মান্দা', nameEn: 'Manda', jlNo: '১৫', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'md_m3', name: 'কুশুম্বা (মসজিদ এলাকা)', nameEn: 'Kushumba', jlNo: '২২', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'md_m4', name: 'তেঁতুলিয়া', nameEn: 'Tentulia', jlNo: '৩১', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'md_m5', name: 'ভালাইন', nameEn: 'Bhalain', jlNo: '৩৯', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'md_m6', name: 'কাঁশোপাড়া', nameEn: 'Kashopara', jlNo: '৪৬', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'md_m7', name: 'নুরুল্লাবাদ', nameEn: 'Nurullabad', jlNo: '৫২', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'md_m8', name: 'কালিকাপুর', nameEn: 'Kalikapur', jlNo: '৫৮', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'md_m9', name: 'মৈনম', nameEn: 'Moinom', jlNo: '৬৫', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                ],
              },
            ],
          },
          {
            id: 'niamatpur',
            name: 'নিয়ামতপুর',
            nameEn: 'Niamatpur',
            unions: [
              {
                id: 'niamatpur_u',
                name: 'নিয়ামতপুর সদর ও ইউনিয়ন',
                nameEn: 'Niamatpur Area',
                mouzas: [
                  { id: 'nm_m1', name: 'নিয়ামতপুর', nameEn: 'Niamatpur', jlNo: '০৬', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'nm_m2', name: 'ভাবিচা', nameEn: 'Bhabicha', jlNo: '১৪', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'nm_m3', name: 'রসুলপুর', nameEn: 'Rasulpur', jlNo: '২১', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'nm_m4', name: 'হাজিনগর', nameEn: 'Hajinagar', jlNo: '২৯', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                  { id: 'nm_m5', name: 'চন্দননগর', nameEn: 'Chandannagar', jlNo: '৩৫', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'nm_m6', name: 'বাহাদুরপুর', nameEn: 'Bahadurpur', jlNo: '৪২', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'nm_m7', name: 'শ্রীমন্তপুর', nameEn: 'Shrimantapur', jlNo: '৪৮', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'nm_m8', name: 'পাড়ইল', nameEn: 'Parail', jlNo: '৫৫', surveyTypes: ['RS', 'BS', 'SA'] },
                ],
              },
            ],
          },
          {
            id: 'atrai',
            name: 'আত্রাই',
            nameEn: 'Atrai',
            unions: [
              {
                id: 'atrai_u',
                name: 'আত্রাই ও আহসানগঞ্জ',
                nameEn: 'Atrai Area',
                mouzas: [
                  { id: 'at_m1', name: 'আত্রাই (আহসানগঞ্জ)', nameEn: 'Ahsanganj', jlNo: '০২', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'at_m2', name: 'ভবানীপুর', nameEn: 'Bhabanipur', jlNo: '১০', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'at_m3', name: 'কালিকাপুর', nameEn: 'Kalikapur', jlNo: '১৭', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'at_m4', name: 'বান্দাইখাড়া', nameEn: 'Bandaikhara', jlNo: '২৫', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                  { id: 'at_m5', name: 'পাঁচুপুর', nameEn: 'Panchupur', jlNo: '৩২', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'at_m6', name: 'শাহাগোলা', nameEn: 'Shahagola', jlNo: '৪০', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'at_m7', name: 'ভোঁপাড়া', nameEn: 'Bhopara', jlNo: '৪৭', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'at_m8', name: 'বিশা', nameEn: 'Bisha', jlNo: '৫৪', surveyTypes: ['RS', 'BS', 'SA'] },
                ],
              },
            ],
          },
          {
            id: 'raninagar',
            name: 'রাণীনগর',
            nameEn: 'Raninagar',
            unions: [
              {
                id: 'raninagar_u',
                name: 'রাণীনগর সদর ও ইউনিয়ন',
                nameEn: 'Raninagar Area',
                mouzas: [
                  { id: 'rn_m1', name: 'রাণীনগর', nameEn: 'Raninagar', jlNo: '০৫', surveyTypes: ['RS', 'BS', 'CS', 'SA', 'NAMJARI'] },
                  { id: 'rn_m2', name: 'খট্টেশ্বর', nameEn: 'Khatteshwar', jlNo: '১১', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'rn_m3', name: 'কাশিমপুর', nameEn: 'Kashimpur', jlNo: '১৮', surveyTypes: ['RS', 'BS', 'SA', 'NAMJARI'] },
                  { id: 'rn_m4', name: 'গোনা', nameEn: 'Gona', jlNo: '২৬', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'rn_m5', name: 'একডালা', nameEn: 'Ekdala', jlNo: '৩৪', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'rn_m6', name: 'মিরাট', nameEn: 'Mirat', jlNo: '৪৩', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'rn_m7', name: 'পারইল', nameEn: 'Parail', jlNo: '৫০', surveyTypes: ['RS', 'BS', 'SA'] },
                  { id: 'rn_m8', name: 'বড়গাছা', nameEn: 'Bargachha', jlNo: '৫৭', surveyTypes: ['RS', 'BS', 'SA'] },
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
          {
            id: 'godagari',
            name: 'গোদাগাড়ী',
            nameEn: 'Godagari',
            unions: [
              {
                id: 'godagari_u',
                name: 'গোদাগাড়ী',
                nameEn: 'Godagari',
                mouzas: [
                  { id: 'gd_m1', name: 'গোদাগাড়ী', nameEn: 'Godagari', jlNo: '০৪', surveyTypes: ['RS', 'BS', 'SA'] },
                ],
              },
            ],
          },
          {
            id: 'paba',
            name: 'পবা',
            nameEn: 'Paba',
            unions: [
              {
                id: 'paba_u',
                name: 'পবা',
                nameEn: 'Paba',
                mouzas: [
                  { id: 'pb_m1', name: 'নওহাটা', nameEn: 'Nowhata', jlNo: '০৮', surveyTypes: ['RS', 'BS'] },
                ],
              },
            ],
          },
        ],
      },
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
        id: 'natore_dist',
        name: 'নাটোর',
        nameEn: 'Natore',
        upazilas: [
          {
            id: 'natore_sadar',
            name: 'নাটোর সদর',
            nameEn: 'Natore Sadar',
            unions: [
              {
                id: 'natore_u',
                name: 'নাটোর পৌরসভা',
                nameEn: 'Natore Municipality',
                mouzas: [
                  { id: 'nt_m1', name: 'কানাইখালী', nameEn: 'Kanaikhali', jlNo: '০২', surveyTypes: ['RS', 'CS', 'SA'] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'pabna_dist',
        name: 'পাবনা',
        nameEn: 'Pabna',
        upazilas: [
          {
            id: 'pabna_sadar',
            name: 'পাবনা সদর',
            nameEn: 'Pabna Sadar',
            unions: [
              {
                id: 'pabna_u',
                name: 'পাবনা পৌরসভা',
                nameEn: 'Pabna Municipality',
                mouzas: [
                  { id: 'pn_m1', name: 'শালগাড়ীয়া', nameEn: 'Shalgariya', jlNo: '০৬', surveyTypes: ['RS', 'CS', 'SA'] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'sirajganj_dist',
        name: 'সিরাজগঞ্জ',
        nameEn: 'Sirajganj',
        upazilas: [
          {
            id: 'sirajganj_sadar',
            name: 'সিরাজগঞ্জ সদর',
            nameEn: 'Sirajganj Sadar',
            unions: [
              {
                id: 'sirajganj_u',
                name: 'সিরাজগঞ্জ পৌরসভা',
                nameEn: 'Sirajganj Municipality',
                mouzas: [
                  { id: 'sr_m1', name: 'মালশাপাড়া', nameEn: 'Malshapara', jlNo: '০৩', surveyTypes: ['RS', 'CS', 'SA'] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'joypurhat_dist',
        name: 'জয়পুরহাট',
        nameEn: 'Joypurhat',
        upazilas: [
          {
            id: 'joypurhat_sadar',
            name: 'জয়পুরহাট সদর',
            nameEn: 'Joypurhat Sadar',
            unions: [
              {
                id: 'joypurhat_u',
                name: 'জয়পুরহাট সদর',
                nameEn: 'Joypurhat Sadar',
                mouzas: [
                  { id: 'jp_m1', name: 'শান্তিনগর', nameEn: 'Shantinagar', jlNo: '০৫', surveyTypes: ['RS', 'CS', 'SA'] },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'chapai_dist',
        name: 'চাঁপাইনবাবগঞ্জ',
        nameEn: 'Chapai Nawabganj',
        upazilas: [
          {
            id: 'chapai_sadar',
            name: 'চাঁপাইনবাবগঞ্জ সদর',
            nameEn: 'Chapai Nawabganj Sadar',
            unions: [
              {
                id: 'chapai_u',
                name: 'চাঁপাইনবাবগঞ্জ সদর',
                nameEn: 'Chapai Sadar',
                mouzas: [
                  { id: 'cp_m1', name: 'শান্তিমোড়', nameEn: 'Shantimor', jlNo: '০১', surveyTypes: ['RS', 'CS', 'SA'] },
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
