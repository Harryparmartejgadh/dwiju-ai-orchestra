export const DWJ_GU_GREETING = "નમસ્તે મારું નામ દ્વિજુ છે, મારો શોધક હરીશભાઈ પરમાર છે અને ભીલોડીયા પ્રાથમિકશાળાનો હું AI સહાયક છું.";

const RESPONSES = {
  gu: {
    greeting: DWJ_GU_GREETING,
    help: "Offline મદદમાં catalog count અને Health, Steps, Smart Krishi/Bio-Lab તથા Robotics વિશે સ્થિર માર્ગદર્શન મળે છે. Live AI/Firebase માટે Internet અને configured service જોઈએ. Verified data અથવા device ACK વગર reading કે command success બતાવાતી નથી.",
    counts: "Master dataમાં 4,410 Features અને 75,867 ગુજરાતી Benefits છે. આ catalogની ગણતરી છે; live ચાલતા workflowsની સંખ્યા નથી.",
    health: "Camera PPG સંશોધનાત્મક અંદાજ છે, તબીબી નિદાન નથી. Cameraથી BP, SpO₂ કે glucose માપાતાં નથી. Sensor પરિણામ ચકાસાયેલ ઉપકરણના data પરથી જ આવવું જોઈએ.",
    steps: "Daily Steps પેજ પર સ્થાનિક નોંધ અને ઉપલબ્ધ Android step sensorનો status જુઓ. Sensor baseline પછીનું ગણતર આખા દિવસના કુલ પગલાંની ખાતરી આપતું નથી.",
    agri: "Smart Krishi અને Bio-Labમાં વાસ્તવિક માટી/પાક માપ અથવા સલાહ માટે ચકાસાયેલ sensor data અથવા configured online service જરૂરી છે.",
    robot: "Robotics command માટે sign-in, અધિકૃત command path અને device તરફથી matching ACK જરૂરી છે. Offline modeમાં command મોકલાતી નથી અને સફળતા બતાવાતી નથી."
  },
  hi: {
    greeting: "नमस्ते! मेरा नाम द्विजु है। मेरे निर्माता और मार्गदर्शक हरीशभाई परमार हैं और मैं भीलोडिया प्राथमिक शाला का AI सहायक हूँ।",
    help: "Offline सहायता में catalog count और Health, Steps, Smart Krishi/Bio-Lab तथा Robotics का स्थिर मार्गदर्शन मिलता है। Live AI/Firebase के लिए Internet और configured service चाहिए। सत्यापित data या device ACK बिना reading या command success नहीं दिखती।",
    counts: "Master data में 4,410 Features और 75,867 गुजराती Benefits हैं। यह catalog की गिनती है, live workflows की संख्या नहीं।",
    health: "Camera PPG केवल शोध अनुमान है, चिकित्सा निदान नहीं। Camera से BP, SpO₂ या glucose नहीं मापे जाते। Sensor परिणाम सत्यापित device data पर ही आना चाहिए।",
    steps: "Daily Steps पेज पर स्थानीय प्रविष्टि और उपलब्ध Android step sensor का status देखें। Sensor baseline के बाद की गिनती पूरे दिन के कुल कदम होने की गारंटी नहीं है।",
    agri: "Smart Krishi और Bio-Lab में वास्तविक मिट्टी/फसल माप या सलाह के लिए सत्यापित sensor data या configured online service चाहिए।",
    robot: "Robotics command के लिए sign-in, authorized path और device का matching ACK चाहिए। Offline mode में command नहीं भेजी जाती और success नहीं दिखाई जाती।"
  },
  en: {
    greeting: "Hello! My name is Dwiju. My creator and guide is Harishbhai Parmar, and I am the AI assistant of Bhilodiya Primary School.",
    help: "Offline help covers catalog counts and static guidance for Health, Steps, Smart Krishi/Bio-Lab, and Robotics. Live AI/Firebase needs Internet and a configured service. No reading or command success is invented without verified data or a device ACK.",
    counts: "The master data contains 4,410 features and 75,867 Gujarati benefits. These are catalog counts, not live workflow counts.",
    health: "Camera PPG is a research estimate, not a medical diagnosis. The camera does not measure BP, SpO₂, or glucose. Sensor results must come from a verified device source.",
    steps: "The Daily Steps page shows local entries and available Android step sensor status. Counts after the sensor baseline are not guaranteed to represent a full day.",
    agri: "Actual soil/crop measurements or advice in Smart Krishi and Bio-Lab require verified sensor data or a configured online service.",
    robot: "Robotics commands require sign-in, an authorized command path, and a matching device ACK. Offline mode sends no command and cannot report success."
  }
} as const;

const RULES = {
  identity: /(તમે કોણ|તું કોણ|દ્વિજુ કોણ|તમારું નામ|તારું નામ|પરિચય આપ|શોધક કોણ|who are you|what(?:'s| is) your name|introduce yourself|your introduction|आप कौन|तुम कौन|आपका नाम|तुम्हारा नाम|अपना परिचय|परिचय दीजिए|निर्माता कौन)/i,
  help: /(મદદ|શું કરી શકો|કેવી રીતે વાપરું|help|what can you do|commands|मदद|क्या कर सकते|कैसे उपयोग)/i,
  counts: /(કેટલા|કેટલી|કુલ|આંકડા|how many|total|count|कितने|कितनी|कुल)/i,
  catalog: /(feature|features|benefit|benefits|સુવિધા|લાભ|વિશેષતા|फीचर|विशेषता|लाभ)/i,
  health: /(health|હેલ્થ|આરોગ્ય|હૃદય|ધબકારા|ppg|camera|કેમેરા|ecg|એસીજી|सेहत|स्वास्थ्य|दिल|धड़कन)/i,
  steps: /(steps?|પગલાં|ચાલેલા|कदम|चरण)/i,
  agri: /(agri|કૃષિ|ખેતી|ખેડૂત|biolab|bio.lab|બાયો.?લેબ|માટી|પાક|कृषि|खेती|मिट्टी|फसल)/i,
  robot: /(robot|રોબોટ|રોબોટિક્સ|hardware|હાર્ડવેર|relay|રિલે|रोबोट|हार्डवेयर)/i
} as const;

export type OfflineReply = { kind: "OFFLINE_STATIC"; answer: string };

export function offlineAnswer(prompt: string, locale?: string): OfflineReply | null {
  const text = typeof prompt === "string" ? prompt.normalize("NFKC").replace(/\s+/g, " ").trim() : "";
  if (!text) return null;
  const language: keyof typeof RESPONSES = /[\u0A80-\u0AFF]/.test(text)
    ? "gu"
    : /[\u0900-\u097F]/.test(text)
      ? "hi"
      : /[A-Za-z]/.test(text)
        ? "en"
        : String(locale || "").toLowerCase().startsWith("en")
          ? "en"
        : String(locale || "").toLowerCase().startsWith("hi")
          ? "hi"
          : "gu";
  const response = RESPONSES[language];
  if (RULES.identity.test(text)) return { kind: "OFFLINE_STATIC", answer: response.greeting };
  if (RULES.counts.test(text) && RULES.catalog.test(text)) return { kind: "OFFLINE_STATIC", answer: response.counts };
  if (RULES.health.test(text)) return { kind: "OFFLINE_STATIC", answer: response.health };
  if (RULES.steps.test(text)) return { kind: "OFFLINE_STATIC", answer: response.steps };
  if (RULES.agri.test(text)) return { kind: "OFFLINE_STATIC", answer: response.agri };
  if (RULES.robot.test(text)) return { kind: "OFFLINE_STATIC", answer: response.robot };
  if (RULES.help.test(text)) return { kind: "OFFLINE_STATIC", answer: response.help };
  return null;
}
