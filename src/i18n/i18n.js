import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
    en: {
      translation: {
        "welcome": "Welcome",
        "search": "Search",
        "login": "Login",
        "logout": "Logout",
        "profile": "Profile",
        "settings": "Settings",
        "dashboard": "Dashboard",
        "compose": "Compose",
        "notifications": "Notifications",
        "history": "History",
        "sent": "Sent",
        "received": "Received",
        "pending": "Pending",
        "completed": "Completed",
        "support": "Support",
        "account": "Account",
        "logout": "Logout",
        "topicDescription": "Topic/Description",
        "advisorDepartment": "Advisor's Department",
        "seniorSecretaryDepartment": "Senior Secretary's Department",
        "additionalSecretaryLawSubsection": "Additional Secretary (Law) Subsection",
        "jointSecretaryLawBranch": "Joint Secretary (Law) Branch",
        "additionalSecretaryDisciplineSubsection": "Additional Secretary (Discipline) Subsection",
        "jointSecretaryDisciplineBranch": "Joint Secretary (Discipline) Branch",
        "lawSections": "Law Section",
        "disciplineSections": "Discipline Section",
        "recommendationComments": "Recommendation/Comments",
        "diaryNumber": "Diary Number",
        "internalDepartment": "Internal Department",
        "externalDepartment": "External Department",
        "signatureSeal": "Signature/Seal",
        "Send": "Send",
        "Accepted": "Accepted",
        "Unresolved": "Unresolved",
        "Completed": "Completed",
        "action": "Action",
        "Easy Diary Dashboard": "Easy Diary Dashboard",
      }
    },
    bn: {
      translation: {
        "welcome": "স্বাগতম",
        "search": "খুঁজুন",
        "login": "লগইন",
        "logout": "লগআউট",
        "profile": "প্রোফাইল",
        "settings": "সেটিংস",
        "dashboard": "ড্যাশবোর্ড",
        "compose": "ডায়রি লিখুন",
        "notifications": "নোটিফিকেশন",
        "history": "ইতিহাস",
        "sent": "প্রেরিত",
        "received": "গৃহীত",
        "pending": "অমীমাংসিত",
        "completed": "সম্পন্ন",
        "support": "জরুরী প্রোয়জন",
        "account": "অ্যাকাউন্ট",
        "logout": "লগ আউট",
        "topicDescription": "বিষয়/বর্ণনা",
        "advisorDepartment": "উপদেষ্টার দপ্তর",
        "seniorSecretaryDepartment": "সিনিয়র সচিবের দপ্তর",
        "additionalSecretaryLawSubsection": "অতিঃ সচিব (আইন) অনুবিভাগ",
        "jointSecretaryLawBranch": "যুগ্ন সচিব (আইন) অধিশাখা",
        "additionalSecretaryDisciplineSubsection": "অতিঃ সচিব (শৃংখলা) অনুবিভাগ",
        "jointSecretaryDisciplineBranch": "যুগ্ন সচিব (শৃংখলা) অধিশাখা",
        "lawSections": "আইন শাখা",
        "disciplineSections": "শৃংখলা শাখা",
        "recommendationComments": "সুপারিশ/মন্তব্য",
        "diaryNumber": "ডায়েরি নং",
        "internalDepartment": "বিবিধ/অভ্যন্তরীণ দপ্তর",
        "externalDepartment": "বিবিধ/বহিস্থ দপ্তর",
        "signatureSeal": "স্বাক্ষর/সীল",
        "Send": "প্রেরিত",
        "Accepted": "গৃহীত",
        "Unresolved": "অমীমাংসিত",
        "Completed": "সম্পন্ন",
        "action": "অ্যাকশন",
        "Easy Diary Dashboard": "সহজ ডায়েরি ড্যাশবোর্ড",
      }
    }
  };
  

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18next;
