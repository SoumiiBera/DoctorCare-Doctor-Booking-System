import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  // =====================================================
  // ENGLISH
  // =====================================================
  en: {
    // Navbar
    home: "Home",
    doctors: "Doctors",
    appointments: "Appointments",
    about: "About",
    emergency: "Emergency",
    login: "Login",
    getStarted: "Get Started",

    // Home
    findDoctor: "Find the Right Doctor",
    healthcareMade: "Healthcare Made Simple",
    welcome: "Welcome to DoctorCare",
    simpleAccessible:
      "Simple, accessible and trusted healthcare for everyone.",
    findTrusted:
      "Find verified doctors, book appointments and get quality healthcare with ease.",
    emergencyHelp: "Need Emergency Help?",
    quickSearch: "Quick Doctor Search",
    verifiedDoctors: "Verified Doctors",
    easyBooking: "Easy Booking",
    safeSecure: "Safe & Secure",
    findDoctors: "Find Doctors",
    bookNow: "Book Now",
    learnMore: "Learn More",

    // Doctor
    verifiedDoctor: "Verified Doctor",
    yearsExperience: "Years Experience",
    consultationFee: "Consultation Fee",
    viewProfile: "View Profile",

    // Specializations
    cardiologist: "Cardiologist",
    dermatologist: "Dermatologist",
    neurologist: "Neurologist",
    pediatrician: "Pediatrician",

    // Location
    kolkata: "Kolkata",

    // Qualification
    mbbsMdCardiology: "MBBS, MD Cardiology",
    mbbsMdDermatology: "MBBS, MD Dermatology",
    mbbsDmNeurology: "MBBS, DM Neurology",
    mbbsMdPediatrics: "MBBS, MD Pediatrics",

    // Doctor Profile
    bookYourAppointment: "Book Your Appointment",
    aboutDoctor: "About Doctor",
    qualification: "Qualification",
    experience: "Experience",
    rating: "Rating",
    availableForConsultation: "Available for Consultation",
    onlineInPerson: "Online & In-person consultation available",
    browseOtherDoctors: "Browse Other Doctors",
    backToDoctors: "Back to Doctors",
    doctorNotFound: "Doctor Not Found",
    doctorNotFoundMessage:
      "Sorry, we couldn't find this doctor's information.",
    verifiedDoctorUpper: "VERIFIED DOCTOR",
    specialist: "Specialist",

    // Search
    searchDoctor: "Search doctor by name...",
    noDoctorFound: "No Doctor Found",
    tryAnotherDoctor:
      "Try searching with another doctor name.",

    // =====================================================
    // APPOINTMENT
    // =====================================================

    scheduleConsultation:
      "Schedule a consultation with your trusted healthcare professional.",

    patientInformation: "Patient Information",

    patientInformationSubtitle:
      "Please provide your details to book an appointment.",

    fullName: "Full Name",

    enterFullName:
      "Enter your full name",

    emailAddress: "Email Address",

    enterEmail:
      "Enter your email address",

    phoneNumber: "Phone Number",

    enterPhone:
      "Enter your phone number",

    appointmentDate: "Appointment Date",

    preferredTime: "Preferred Time",

    selectPreferredTime:
      "Select preferred time",

    reasonForVisit: "Reason for Visit",

    reasonPlaceholder:
      "e.g. General consultation",

    privacyNote:
      "Your personal information is kept private and secure.",

    confirmAppointment:
      "Confirm Appointment",

    appointmentBooked:
      "Appointment Booked!",

    appointmentSuccessWith:
      "Your appointment with",

    appointmentSuccessfullyBooked:
      "has been successfully booked.",

    doctorLabel: "Doctor",

    dateLabel: "Date",

    timeLabel: "Time",

    feeLabel: "Fee",

    viewMyAppointments:
      "View My Appointments",
  },

  // =====================================================
  // BENGALI
  // =====================================================
  bn: {
    // Navbar
    home: "হোম",
    doctors: "ডাক্তার",
    appointments: "অ্যাপয়েন্টমেন্ট",
    about: "আমাদের সম্পর্কে",
    emergency: "জরুরি সাহায্য",
    login: "লগইন",
    getStarted: "শুরু করুন",

    // Home
    findDoctor: "সঠিক ডাক্তার খুঁজুন",
    healthcareMade: "সহজ স্বাস্থ্যসেবা",
    welcome: "DoctorCare-এ স্বাগতম",
    simpleAccessible:
      "সবার জন্য সহজ, নির্ভরযোগ্য এবং সহজলভ্য স্বাস্থ্যসেবা।",
    findTrusted:
      "Verified ডাক্তার খুঁজুন, অ্যাপয়েন্টমেন্ট বুক করুন এবং সহজেই মানসম্মত স্বাস্থ্যসেবা পান।",
    emergencyHelp: "জরুরি সাহায্য দরকার?",
    quickSearch: "দ্রুত ডাক্তার খুঁজুন",
    verifiedDoctors: "Verified ডাক্তার",
    easyBooking: "সহজ বুকিং",
    safeSecure: "নিরাপদ ও সুরক্ষিত",
    findDoctors: "ডাক্তার খুঁজুন",
    bookNow: "এখনই বুক করুন",
    learnMore: "আরও জানুন",

    // Doctor
    verifiedDoctor: "Verified ডাক্তার",
    yearsExperience: "বছরের অভিজ্ঞতা",
    consultationFee: "পরামর্শের ফি",
    viewProfile: "প্রোফাইল দেখুন",

    // Specializations
    cardiologist: "হৃদরোগ বিশেষজ্ঞ",
    dermatologist: "চর্মরোগ বিশেষজ্ঞ",
    neurologist: "স্নায়ুরোগ বিশেষজ্ঞ",
    pediatrician: "শিশু বিশেষজ্ঞ",

    // Location
    kolkata: "কলকাতা",

    // Qualification
    mbbsMdCardiology: "MBBS, MD কার্ডিওলজি",
    mbbsMdDermatology: "MBBS, MD ডার্মাটোলজি",
    mbbsDmNeurology: "MBBS, DM নিউরোলজি",
    mbbsMdPediatrics: "MBBS, MD পেডিয়াট্রিক্স",

    // Doctor Profile
    bookYourAppointment:
      "আপনার অ্যাপয়েন্টমেন্ট বুক করুন",

    aboutDoctor:
      "ডাক্তারের সম্পর্কে",

    qualification:
      "যোগ্যতা",

    experience:
      "অভিজ্ঞতা",

    rating:
      "রেটিং",

    availableForConsultation:
      "পরামর্শের জন্য উপলব্ধ",

    onlineInPerson:
      "অনলাইন এবং সরাসরি পরামর্শ উভয়ই উপলব্ধ",

    browseOtherDoctors:
      "অন্য ডাক্তার দেখুন",

    backToDoctors:
      "ডাক্তারদের কাছে ফিরে যান",

    doctorNotFound:
      "ডাক্তার পাওয়া যায়নি",

    doctorNotFoundMessage:
      "দুঃখিত, আমরা এই ডাক্তারের তথ্য খুঁজে পাইনি।",

    verifiedDoctorUpper:
      "VERIFIED ডাক্তার",

    specialist:
      "বিশেষজ্ঞ",

    // Search
    searchDoctor:
      "ডাক্তারের নাম দিয়ে খুঁজুন...",

    noDoctorFound:
      "কোনও ডাক্তার পাওয়া যায়নি",

    tryAnotherDoctor:
      "অন্য ডাক্তারের নাম দিয়ে আবার চেষ্টা করুন।",

    // =====================================================
    // APPOINTMENT
    // =====================================================

    scheduleConsultation:
      "আপনার বিশ্বস্ত স্বাস্থ্যসেবা বিশেষজ্ঞের সাথে পরামর্শের সময় নির্ধারণ করুন।",

    patientInformation:
      "রোগীর তথ্য",

    patientInformationSubtitle:
      "অ্যাপয়েন্টমেন্ট বুক করতে আপনার তথ্য দিন।",

    fullName:
      "পুরো নাম",

    enterFullName:
      "আপনার পুরো নাম লিখুন",

    emailAddress:
      "ইমেইল ঠিকানা",

    enterEmail:
      "আপনার ইমেইল ঠিকানা লিখুন",

    phoneNumber:
      "ফোন নম্বর",

    enterPhone:
      "আপনার ফোন নম্বর লিখুন",

    appointmentDate:
      "অ্যাপয়েন্টমেন্টের তারিখ",

    preferredTime:
      "পছন্দের সময়",

    selectPreferredTime:
      "পছন্দের সময় নির্বাচন করুন",

    reasonForVisit:
      "কেন ডাক্তার দেখাচ্ছেন",

    reasonPlaceholder:
      "যেমন: সাধারণ পরামর্শ",

    privacyNote:
      "আপনার ব্যক্তিগত তথ্য গোপনীয় এবং নিরাপদ রাখা হয়।",

    confirmAppointment:
      "অ্যাপয়েন্টমেন্ট নিশ্চিত করুন",

    appointmentBooked:
      "অ্যাপয়েন্টমেন্ট বুক হয়েছে!",

    appointmentSuccessWith:
      "আপনার",

    appointmentSuccessfullyBooked:
      "এর সাথে অ্যাপয়েন্টমেন্ট সফলভাবে বুক হয়েছে।",

    doctorLabel:
      "ডাক্তার",

    dateLabel:
      "তারিখ",

    timeLabel:
      "সময়",

    feeLabel:
      "ফি",

    viewMyAppointments:
      "আমার অ্যাপয়েন্টমেন্ট দেখুন",
  },

  // =====================================================
  // HINDI
  // =====================================================
  hi: {
    // Navbar
    home: "होम",
    doctors: "डॉक्टर",
    appointments: "अपॉइंटमेंट",
    about: "हमारे बारे में",
    emergency: "आपातकाल",
    login: "लॉगिन",
    getStarted: "शुरू करें",

    // Home
    findDoctor: "सही डॉक्टर खोजें",
    healthcareMade: "स्वास्थ्य सेवा आसान",
    welcome: "DoctorCare में आपका स्वागत है",
    simpleAccessible:
      "सभी के लिए सरल, भरोसेमंद और आसानी से उपलब्ध स्वास्थ्य सेवा।",
    findTrusted:
      "Verified डॉक्टर खोजें, अपॉइंटमेंट बुक करें और आसानी से गुणवत्तापूर्ण स्वास्थ्य सेवा प्राप्त करें।",
    emergencyHelp: "आपातकालीन सहायता चाहिए?",
    quickSearch: "त्वरित डॉक्टर खोज",
    verifiedDoctors: "Verified डॉक्टर",
    easyBooking: "आसान बुकिंग",
    safeSecure: "सुरक्षित और भरोसेमंद",
    findDoctors: "डॉक्टर खोजें",
    bookNow: "अभी बुक करें",
    learnMore: "और जानें",

    // Doctor
    verifiedDoctor: "Verified डॉक्टर",
    yearsExperience: "वर्षों का अनुभव",
    consultationFee: "परामर्श शुल्क",
    viewProfile: "प्रोफ़ाइल देखें",

    // Specializations
    cardiologist: "हृदय रोग विशेषज्ञ",
    dermatologist: "त्वचा रोग विशेषज्ञ",
    neurologist: "न्यूरोलॉजिस्ट",
    pediatrician: "बाल रोग विशेषज्ञ",

    // Location
    kolkata: "कोलकाता",

    // Qualification
    mbbsMdCardiology:
      "MBBS, MD कार्डियोलॉजी",

    mbbsMdDermatology:
      "MBBS, MD डर्मेटोलॉजी",

    mbbsDmNeurology:
      "MBBS, DM न्यूरोलॉजी",

    mbbsMdPediatrics:
      "MBBS, MD पीडियाट्रिक्स",

    // Doctor Profile
    bookYourAppointment:
      "अपनी अपॉइंटमेंट बुक करें",

    aboutDoctor:
      "डॉक्टर के बारे में",

    qualification:
      "योग्यता",

    experience:
      "अनुभव",

    rating:
      "रेटिंग",

    availableForConsultation:
      "परामर्श के लिए उपलब्ध",

    onlineInPerson:
      "ऑनलाइन और व्यक्तिगत परामर्श उपलब्ध है",

    browseOtherDoctors:
      "अन्य डॉक्टर देखें",

    backToDoctors:
      "डॉक्टरों पर वापस जाएं",

    doctorNotFound:
      "डॉक्टर नहीं मिला",

    doctorNotFoundMessage:
      "क्षमा करें, हमें इस डॉक्टर की जानकारी नहीं मिली।",

    verifiedDoctorUpper:
      "VERIFIED डॉक्टर",

    specialist:
      "विशेषज्ञ",

    // Search
    searchDoctor:
      "डॉक्टर के नाम से खोजें...",

    noDoctorFound:
      "कोई डॉक्टर नहीं मिला",

    tryAnotherDoctor:
      "किसी अन्य डॉक्टर के नाम से खोजने का प्रयास करें।",

    // =====================================================
    // APPOINTMENT
    // =====================================================

    scheduleConsultation:
      "अपने भरोसेमंद स्वास्थ्य विशेषज्ञ के साथ परामर्श का समय निर्धारित करें।",

    patientInformation:
      "मरीज की जानकारी",

    patientInformationSubtitle:
      "अपॉइंटमेंट बुक करने के लिए अपनी जानकारी दें।",

    fullName:
      "पूरा नाम",

    enterFullName:
      "अपना पूरा नाम दर्ज करें",

    emailAddress:
      "ईमेल पता",

    enterEmail:
      "अपना ईमेल पता दर्ज करें",

    phoneNumber:
      "फोन नंबर",

    enterPhone:
      "अपना फोन नंबर दर्ज करें",

    appointmentDate:
      "अपॉइंटमेंट की तारीख",

    preferredTime:
      "पसंदीदा समय",

    selectPreferredTime:
      "पसंदीदा समय चुनें",

    reasonForVisit:
      "डॉक्टर से मिलने का कारण",

    reasonPlaceholder:
      "जैसे: सामान्य परामर्श",

    privacyNote:
      "आपकी व्यक्तिगत जानकारी निजी और सुरक्षित रखी जाती है।",

    confirmAppointment:
      "अपॉइंटमेंट की पुष्टि करें",

    appointmentBooked:
      "अपॉइंटमेंट बुक हो गया!",

    appointmentSuccessWith:
      "आपकी अपॉइंटमेंट",

    appointmentSuccessfullyBooked:
      "के साथ सफलतापूर्वक बुक हो गई है।",

    doctorLabel:
      "डॉक्टर",

    dateLabel:
      "तारीख",

    timeLabel:
      "समय",

    feeLabel:
      "शुल्क",

    viewMyAppointments:
      "मेरी अपॉइंटमेंट देखें",
  },

  // =====================================================
  // MARATHI
  // =====================================================
  mr: {
    // Navbar
    home: "मुख्यपृष्ठ",
    doctors: "डॉक्टर",
    appointments: "अपॉइंटमेंट",
    about: "आमच्याबद्दल",
    emergency: "आपत्कालीन मदत",
    login: "लॉगिन",
    getStarted: "सुरुवात करा",

    // Home
    findDoctor: "योग्य डॉक्टर शोधा",
    healthcareMade: "आरोग्यसेवा सोपी केली",
    welcome: "DoctorCare मध्ये आपले स्वागत आहे",
    simpleAccessible:
      "सर्वांसाठी सोपी, विश्वासार्ह आणि सहज उपलब्ध आरोग्यसेवा.",
    findTrusted:
      "Verified डॉक्टर शोधा, अपॉइंटमेंट बुक करा आणि सहजपणे दर्जेदार आरोग्यसेवा मिळवा.",
    emergencyHelp:
      "आपत्कालीन मदत हवी आहे?",
    quickSearch:
      "जलद डॉक्टर शोध",
    verifiedDoctors:
      "Verified डॉक्टर",
    easyBooking:
      "सोपी बुकिंग",
    safeSecure:
      "सुरक्षित आणि विश्वासार्ह",
    findDoctors:
      "डॉक्टर शोधा",
    bookNow:
      "आता बुक करा",
    learnMore:
      "अधिक जाणून घ्या",

    // Doctor
    verifiedDoctor:
      "Verified डॉक्टर",
    yearsExperience:
      "वर्षांचा अनुभव",
    consultationFee:
      "सल्ला शुल्क",
    viewProfile:
      "प्रोफाइल पहा",

    // Specializations
    cardiologist:
      "हृदयरोग तज्ज्ञ",
    dermatologist:
      "त्वचारोग तज्ज्ञ",
    neurologist:
      "न्यूरोलॉजिस्ट",
    pediatrician:
      "बालरोग तज्ज्ञ",

    // Location
    kolkata:
      "कोलकाता",

    // Qualification
    mbbsMdCardiology:
      "MBBS, MD कार्डिओलॉजी",
    mbbsMdDermatology:
      "MBBS, MD डर्मेटोलॉजी",
    mbbsDmNeurology:
      "MBBS, DM न्यूरोलॉजी",
    mbbsMdPediatrics:
      "MBBS, MD पेडियाट्रिक्स",

    // Doctor Profile
    bookYourAppointment:
      "तुमची अपॉइंटमेंट बुक करा",

    aboutDoctor:
      "डॉक्टरबद्दल",

    qualification:
      "शैक्षणिक पात्रता",

    experience:
      "अनुभव",

    rating:
      "रेटिंग",

    availableForConsultation:
      "सल्ल्यासाठी उपलब्ध",

    onlineInPerson:
      "ऑनलाइन आणि प्रत्यक्ष सल्ला उपलब्ध आहे",

    browseOtherDoctors:
      "इतर डॉक्टर पहा",

    backToDoctors:
      "डॉक्टरांकडे परत जा",

    doctorNotFound:
      "डॉक्टर सापडला नाही",

    doctorNotFoundMessage:
      "क्षमस्व, आम्हाला या डॉक्टरची माहिती सापडली नाही.",

    verifiedDoctorUpper:
      "VERIFIED डॉक्टर",

    specialist:
      "तज्ज्ञ",

    // Search
    searchDoctor:
      "डॉक्टरच्या नावाने शोधा...",

    noDoctorFound:
      "डॉक्टर सापडला नाही",

    tryAnotherDoctor:
      "दुसऱ्या डॉक्टरच्या नावाने शोधण्याचा प्रयत्न करा.",

    // =====================================================
    // APPOINTMENT
    // =====================================================

    scheduleConsultation:
      "तुमच्या विश्वासू आरोग्य तज्ज्ञासोबत सल्लामसलतीची वेळ निश्चित करा.",

    patientInformation:
      "रुग्णाची माहिती",

    patientInformationSubtitle:
      "अपॉइंटमेंट बुक करण्यासाठी तुमची माहिती द्या.",

    fullName:
      "पूर्ण नाव",

    enterFullName:
      "तुमचे पूर्ण नाव प्रविष्ट करा",

    emailAddress:
      "ईमेल पत्ता",

    enterEmail:
      "तुमचा ईमेल पत्ता प्रविष्ट करा",

    phoneNumber:
      "फोन नंबर",

    enterPhone:
      "तुमचा फोन नंबर प्रविष्ट करा",

    appointmentDate:
      "अपॉइंटमेंटची तारीख",

    preferredTime:
      "पसंतीची वेळ",

    selectPreferredTime:
      "पसंतीची वेळ निवडा",

    reasonForVisit:
      "डॉक्टरांना भेटण्याचे कारण",

    reasonPlaceholder:
      "उदा. सामान्य सल्ला",

    privacyNote:
      "तुमची वैयक्तिक माहिती गोपनीय आणि सुरक्षित ठेवली जाते.",

    confirmAppointment:
      "अपॉइंटमेंट निश्चित करा",

    appointmentBooked:
      "अपॉइंटमेंट बुक झाली!",

    appointmentSuccessWith:
      "तुमची अपॉइंटमेंट",

    appointmentSuccessfullyBooked:
      "यांच्यासोबत यशस्वीरित्या बुक झाली आहे.",

    doctorLabel:
      "डॉक्टर",

    dateLabel:
      "तारीख",

    timeLabel:
      "वेळ",

    feeLabel:
      "शुल्क",

    viewMyAppointments:
      "माझ्या अपॉइंटमेंट पहा",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = (key) => {
    if (!key) return "";

    return (
      translations[language]?.[key] ||
      translations.en?.[key] ||
      key
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
