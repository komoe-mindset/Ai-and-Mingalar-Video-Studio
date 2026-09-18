export interface GeminiAppInfo {
  id: string;
  category: 'workflow' | 'visual_reference' | 'audio_bgm';
  blockNumber?: 1 | 2 | 3 | 4;
  tagEn: string;
  tagMy: string;
  tabKey: 'block1' | 'block2' | 'block3' | 'block4';
  titleEn: string;
  titleMy: string;
  subtitleEn: string;
  subtitleMy: string;
  descEn: string;
  descMy: string;
  url: string;
  accentColor: 'indigo' | 'emerald' | 'cyan' | 'purple' | 'amber' | 'rose' | 'teal';
  icon: string;
}

export const WORKFLOW_GEMINI_APPS: GeminiAppInfo[] = [
  {
    id: 'block1',
    category: 'workflow',
    blockNumber: 1,
    tagEn: 'Block 1',
    tagMy: 'Block 1',
    tabKey: 'block1',
    titleEn: 'Block 1: Character Sheet Turnaround Gem',
    titleMy: 'Block 1: Character Sheet Turnaround Gemini Mini App',
    subtitleEn: 'Pre-loaded with 5-panel layout rules, facial geometry lock & negative prompts',
    subtitleMy: 'မျက်နှာနှင့် အဝတ်အစား တသမတ်တည်းဖြစ်စေမည့် ၅ မျိုးစုံ Turnaround ညွှန်ကြားချက်များ',
    descEn:
      'Launch the official Gemini Mini App pre-configured with the exact character turnaround prompting logic. Paste your character description and get commercial-ready multi-angle turnaround sheets.',
    descMy:
      'Turnaround Sheet တည်ဆောက်ရန် သီးသန့်ပြုစုထားသော တရားဝင် Gemini Mini App ဖြစ်ပါသည်။ ကာရိုက်တာ အသေးစိတ်ကို ထည့်သွင်းပြီး အလှည့်တိုင်းတွင် မျက်နှာမပြောင်းလဲစေမည့် Sheet ကို တိုက်ရိုက်ရယူပါ။',
    url: 'https://gemini.google.com/share/947f93e59f61?skid=caa9347a-302a-4e70-820a-eb498d2b23fd',
    accentColor: 'indigo',
    icon: '👤',
  },
  {
    id: 'block2',
    category: 'workflow',
    blockNumber: 2,
    tagEn: 'Block 2',
    tagMy: 'Block 2',
    tabKey: 'block2',
    titleEn: 'Block 2: Location Sheet & Freeze Rule Gem',
    titleMy: 'Block 2: Location Sheet & Freeze Rule Gemini Mini App',
    subtitleEn: 'Locks interior architecture, lighting atmosphere & camera angles without drifting',
    subtitleMy: 'ဆိုင်တည်နေရာ၊ တံခါး၊ အလင်းရောင်နှင့် အပြင်အဆင်များကို မပြောင်းလဲစေဘဲ Freeze လုပ်ပေးမည်',
    descEn:
      'Launch the official Location Sheet Gemini Mini App. Ideal for SMEs or concept film sets to generate multi-angle master location reference cards and enforce the 0-credit freeze rule.',
    descMy:
      'ဆိုင်/နေရာ အလင်းအမှောင်နှင့် ထောင့်ပေါင်းစုံ မူရင်း Sheet ဖန်တီးပေးသည့် သီးသန့် Gemini Mini App ဖြစ်ပါသည်။ ဗီဒီယိုခရက်ဒစ်မကုန်မီ နေရာတည်ငြိမ်မှုကို အခမဲ့ သတ်မှတ်ပါ။',
    url: 'https://gemini.google.com/share/613270c37156?skid=5670f99f-5f4b-4646-b7de-321f52974d60',
    accentColor: 'emerald',
    icon: '🏢',
  },
  {
    id: 'block3',
    category: 'workflow',
    blockNumber: 3,
    tagEn: 'Block 3',
    tagMy: 'Block 3',
    tabKey: 'block3',
    titleEn: 'Block 3: Storyboard Blueprint & Chain-of-Thought Gem',
    titleMy: 'Block 3: Storyboard Blueprint & CoT Gemini Mini App',
    subtitleEn: 'Generates 7-scene commercial blueprints, Veo 3.1 camera motions & Burmese dialogue',
    subtitleMy: '၇ ခန်းပါ ကြော်ငြာ ဇာတ်ညွှန်း၊ ကင်မရာ ရွေ့လျားမှု နှင့် သဘာဝကျသော မြန်မာစကားပြောများ',
    descEn:
      'Launch the official Storyboard Blueprint Gemini Mini App. Uses 6-link Chain-of-Thought prompt architecture to plan scene durations, English visual descriptions, and precise Burmese dialogue.',
    descMy:
      'တစ်ခန်းချင်းစီ၏ ကြာချိန်၊ ကင်မရာလှုပ်ရှားမှုနှင့် သဘာဝကျသော မြန်မာစကားပြော စနစ်တကျ ထွက်ရှိစေရန် Chain-of-Thought နည်းလမ်းဖြင့် တည်ဆောက်ထားသော Gemini Mini App ဖြစ်ပါသည်။',
    url: 'https://gemini.google.com/share/a7af395bd682?skid=91a2d956-8679-4415-bf8a-2f750b736883',
    accentColor: 'cyan',
    icon: '🎬',
  },
];

export const VISUAL_REF_GEMINI_APPS: GeminiAppInfo[] = [
  {
    id: 'ref-cartoon-avatar',
    category: 'visual_reference',
    tagEn: 'Visual Ref • Avatar',
    tagMy: 'ပုံစံရည်ညွှန်း • Avatar',
    tabKey: 'block1',
    titleEn: '2D Cartoon Avatar Visual Reference Gem',
    titleMy: '2D Cartoon Avatar Visual Reference Gemini App',
    subtitleEn: 'Stylized 2D cartoon avatars, expressive facial angles & vector animation design',
    subtitleMy: '2D ကာတွန်းပုံစံ Avatar ရုပ်သွင်၊ မျက်နှာအမူအရာနှင့် ကာတွန်းဒီဇိုင်း လမ်းညွှန်',
    descEn:
      'Pre-configured visual reference assistant for generating consistent 2D cartoon characters, avatar turnarounds, vector stylization, and facial geometry suited for animated commercials.',
    descMy:
      'ကာတွန်းပုံစံ ဗီဒီယိုကြော်ငြာများအတွက် 2D Avatar မျက်နှာသွင်ပြင်နှင့် ဒီဇိုင်းစတိုင်လ်ကို တသမတ်တည်း ထိန်းသိမ်းပေးသော Visual Reference Gemini App ဖြစ်ပါသည်။',
    url: 'https://gemini.google.com/share/0bfacba66746?skid=0164a496-4aa1-4d84-918f-c0e9f2d04307',
    accentColor: 'purple',
    icon: '🎨',
  },
  {
    id: 'ref-cartoon-scene',
    category: 'visual_reference',
    tagEn: 'Visual Ref • Scene',
    tagMy: 'ပုံစံရည်ညွှန်း • Scene',
    tabKey: 'block2',
    titleEn: '2D Cartoon Scene & Environment Reference Gem',
    titleMy: '2D Cartoon Scene & Environment Gemini App',
    subtitleEn: 'Stylized 2D environments, background layout, depth perspective & color palettes',
    subtitleMy: '2D ကာတွန်းနောက်ခံ အလွှာများ၊ အခန်းဖွဲ့စည်းမှုနှင့် ကာလာ Palette ရည်ညွှန်းချက်များ',
    descEn:
      'Generate reference environments and backgrounds in consistent 2D cartoon aesthetics. Perfect for establishing clean, non-drifting cartoon locations and interior sets for animated video spots.',
    descMy:
      '2D ကာတွန်းဇာတ်ကွက်များအတွက် အခန်းအပြင်အဆင်၊ နောက်ခံ ရှုထောင့်နှင့် အလင်းအမှောင် မပြောင်းလဲစေဘဲ ရည်ညွှန်းနိုင်သော Gemini App ဖြစ်ပါသည်။',
    url: 'https://gemini.google.com/share/40f1d88c578c?skid=1e5489bd-ff2c-4a55-8cb1-239b86d622f3',
    accentColor: 'amber',
    icon: '🏞️',
  },
  {
    id: 'ref-product-photo',
    category: 'visual_reference',
    tagEn: 'Visual Ref • Product',
    tagMy: 'ပုံစံရည်ညွှန်း • Product',
    tabKey: 'block2',
    titleEn: 'Commercial Product Photography Reference Gem',
    titleMy: 'Commercial Product Photography Gemini App',
    subtitleEn: 'High-end studio lighting, packshots, macro detail & hero product consistency',
    subtitleMy: 'စတူဒီယို အလင်းအမှောင်၊ ကုန်ပစ္စည်း Packshot၊ Macro အနီးကပ်နှင့် ပစ္စည်းပုံစံ ရည်ညွှန်းချက်များ',
    descEn:
      'Essential reference generator for commercial hero products, packshots, and tabletop studio lighting. Ensures the actual bottle, packaging, or consumer good remains 100% faithful and crisp across shots.',
    descMy:
      'ဗီဒီယိုကြော်ငြာများတွင် အဓိကပြသရမည့် ကုန်ပစ္စည်း၊ ထုပ်ပိုးမှုနှင့် စတူဒီယိုအလင်းအမှောင် မပြောင်းလဲစေရန် တိကျစွာ ရည်ညွှန်းနိုင်သော Gemini App ဖြစ်ပါသည်။',
    url: 'https://gemini.google.com/share/2a43a27a3f3c?skid=b22d3e5a-3872-452a-b9eb-a21970086db1',
    accentColor: 'teal',
    icon: '📸',
  },
];

export const AUDIO_GEMINI_APPS: GeminiAppInfo[] = [
  {
    id: 'ref-bgm-studio',
    category: 'audio_bgm',
    blockNumber: 4,
    tagEn: 'Block 4 • Audio & BGM',
    tagMy: 'Block 4 • အသံနှင့် တေးဂီတ',
    tabKey: 'block4',
    titleEn: 'AI Video BGM Prompts & Sound Testing Studio Gem',
    titleMy: 'AI ဗီဒီယိုများအတွက် အသင့်သုံး BGM Prompts & အသံစမ်းသပ်စတူဒီယို',
    subtitleEn: 'Commercial BGM generation prompts, tempo matching, mood scoring & audio studio tests',
    subtitleMy: 'ကြော်ငြာနောက်ခံတေးဂီတ Prompts၊ စိတ်ခံစားမှုရသနှင့် မြန်မာ့ကြော်ငြာအသံစမ်းသပ်ခန်း',
    descEn:
      'Pre-engineered Google Gemini assistant dedicated to composing commercial background music (BGM) prompts, tempo timing (BPM), instrumentation palettes, and mood cues for AI video editors (Google Vids, Suno, Udio, Lyria).',
    descMy:
      'ဗီဒီယိုကြော်ငြာများအတွက် အလိုက်ဖက်ဆုံး နောက်ခံတေးဂီတ (BGM) Prompts၊ တေးသွား အရှိန်အဟုန် (BPM) နှင့် အသံရသ အထူးပြုချက်များကို အသင့်ဖန်တီးပေးမည့် သီးသန့် Gemini AI လက်ထောက် ဖြစ်ပါသည်။',
    url: 'https://share.gemini.google/8OgqLADKpsjG',
    accentColor: 'rose',
    icon: '🎵',
  },
];

// Preserves indexing: [0]=block1, [1]=block2, [2]=block3, [3-5]=visual references, [6]=BGM studio
export const GEMINI_APPS: GeminiAppInfo[] = [
  ...WORKFLOW_GEMINI_APPS,
  ...VISUAL_REF_GEMINI_APPS,
  ...AUDIO_GEMINI_APPS,
];
