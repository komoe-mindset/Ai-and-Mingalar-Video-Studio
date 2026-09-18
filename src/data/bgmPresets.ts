export interface BgmPreset {
  id: string;
  titleEn: string;
  titleMy: string;
  genre: string;
  bpm: string;
  moodEn: string;
  moodMy: string;
  targetVideoEn: string;
  targetVideoMy: string;
  prompt: string;
  instruments: string[];
}

export const BGM_PRESETS: BgmPreset[] = [
  {
    id: 'sme-retail',
    titleEn: 'Energetic SME Retail & Promotion',
    titleMy: 'ဆိုင်နှင့် ကုန်ပစ္စည်း အရောင်းမြှင့်တင်ရေး BGM',
    genre: 'Upbeat Acoustic Pop-Commercial',
    bpm: '124 BPM',
    moodEn: 'Uplifting, optimistic, confident, high customer conversion momentum',
    moodMy: 'တက်ကြွရွှင်လန်း၊ ဖောက်သည်စိတ်ဝင်စားမှု လျင်မြန်စွာရရှိစေမည့် စည်းချက်',
    targetVideoEn: 'Retail discounts, food menus, product unboxings, TikTok / Reels ads',
    targetVideoMy: 'အရောင်းပရိုမိုးရှင်း၊ စားသောက်ဆိုင်မီနူး၊ TikTok & Reels ကြော်ငြာတိုများ',
    prompt:
      'Upbeat acoustic pop-commercial background music, 124 BPM, cheerful strummed acoustic guitar, lively handclaps, crisp electronic percussion, warm bassline, optimistic and energetic atmosphere, no vocals, high quality studio mix for retail ad.',
    instruments: ['Acoustic Guitar', 'Handclaps', 'Punchy Kick', 'Bright Synth Plucks'],
  },
  {
    id: 'modern-tech',
    titleEn: 'Modern Corporate & Tech Minimalist',
    titleMy: 'ခေတ်မီနည်းပညာနှင့် စီးပွားရေးလုပ်ငန်း BGM',
    genre: 'Ambient Minimalist Electronic / Corporate',
    bpm: '112 BPM',
    moodEn: 'Sophisticated, innovative, reliable, clear forward-thinking energy',
    moodMy: 'ယုံကြည်စိတ်ချရမှု၊ ဆန်းသစ်တီထွင်မှုနှင့် ခေတ်မီဆန်းပြားသော အငွေ့အသက်',
    targetVideoEn: 'Tech startup demos, corporate services, software showcases, business presentations',
    targetVideoMy: 'ဆော့ဖ်ဝဲလ်မိတ်ဆက်၊ ဝန်ဆောင်မှုလုပ်ငန်း၊ ကုမ္ပဏီ Profiles ကြော်ငြာများ',
    prompt:
      'Modern corporate tech minimalist background music, 112 BPM, soft electronic synthesizer pulses, light digital hi-hats, elegant piano chords, deep warm sub-bass, inspiring and sophisticated mood, clean mix, instrumental only.',
    instruments: ['Analog Synth Pulses', 'Acoustic Piano', 'Sub Bass', 'Digital Hi-hats'],
  },
  {
    id: 'emotional-story',
    titleEn: 'Emotional Storytelling & Nostalgia',
    titleMy: 'ခံစားချက်ဖော်ကျူး ဇာတ်လမ်းဆန်ဆန် BGM',
    genre: 'Cinematic Acoustic Piano & Strings',
    bpm: '76 BPM',
    moodEn: 'Heartwarming, touching, nostalgic, gradual emotional crescendo',
    moodMy: 'ရင်ထဲထိရှစေမည့် ဇာတ်လမ်း၊ မေတ္တာနှင့် ကျေးဇူးတရား ဖော်ညွှန်းချက်များ',
    targetVideoEn: 'Brand origin stories, family products, healthcare, charity / gratitude spots',
    targetVideoMy: 'မိသားစုသုံးပစ္စည်း၊ ကျန်းမာရေး၊ အမှတ်တရနှင့် အမှတ်တံဆိပ်သမိုင်း ကြော်ငြာများ',
    prompt:
      'Emotional cinematic acoustic background music, 76 BPM, tender fingerstyle acoustic guitar, poignant cello melody, soft piano progression, gradual inspiring crescendo, warm nostalgic atmosphere, no vocals, pure instrumental storytelling.',
    instruments: ['Solo Cello', 'Acoustic Fingerpicking', 'Soft Grand Piano', 'Warm Strings'],
  },
  {
    id: 'myanmar-fusion',
    titleEn: 'Traditional Myanmar Cultural Fusion',
    titleMy: 'ရိုးရာနှင့် ခေတ်ပေါ်ပေါင်းစပ် မြန်မာ့ရသ BGM',
    genre: 'Burmese Cultural World Fusion / Chill Groove',
    bpm: '105 BPM',
    moodEn: 'Festive, culturally vibrant, authentic yet modern & accessible',
    moodMy: 'ပွဲတော်ဆန်ဆန် ပျော်ရွှင်ဖွယ်၊ မြန်မာ့ရိုးရာနှင့် ခေတ်ပေါ် ရောစပ်သံ',
    targetVideoEn: 'Thingyan / Thadingyut festival campaigns, local Myanmar handicrafts, tea & traditional food',
    targetVideoMy: 'သင်္ကြန်၊ သီတင်းကျွတ်ပွဲတော် ကမ်ပိန်းများ၊ ရိုးရာလက်မှုနှင့် ဒေသအစားအစာ ကြော်ငြာများ',
    prompt:
      'Traditional Myanmar cultural fusion background music, 105 BPM, authentic Burmese Saing Waing rhythmic patterns, subtle pattala bamboo xylophone accents, gentle brass chimes blended with modern smooth chill lounge groove, festive commercial ambience, instrumental.',
    instruments: ['Burmese Saing Waing', 'Bamboo Pattala', 'Kyay Si Chimes', 'Chill Lounge Bass'],
  },
  {
    id: 'cafe-lofi',
    titleEn: 'Trendy Café, Fashion & Lo-Fi Lifestyle',
    titleMy: 'ကော်ဖီဆိုင်၊ ဖက်ရှင်နှင့် လူနေမှုဘဝ Lo-Fi BGM',
    genre: 'Cozy Lo-Fi Chillhop / Jazzy Boom-Bap',
    bpm: '85 BPM',
    moodEn: 'Cozy, aesthetic, relaxed, trendy, effortlessly chic',
    moodMy: 'အေးချမ်းသက်တောင့်သက်သာ၊ စတိုင်လ်ကျလှပသော ကော်ဖီဆိုင်နှင့် ဖက်ရှင်ရသ',
    targetVideoEn: 'Boutique clothing, specialty coffee, cosmetics, lifestyle vlogs, aesthetic reels',
    targetVideoMy: 'အထည်အလိပ်၊ အလှကုန်ပစ္စည်း၊ ကော်ဖီဆိုင်နှင့် လူနေမှုစတိုင်လ် ဗီဒီယိုများ',
    prompt:
      'Cozy lo-fi aesthetic chillhop background music, 85 BPM, warm vintage vinyl crackle, lush Rhodes electric piano chords, soft jazzy hip-hop beat, smooth deep bass, relaxed coffee shop and boutique fashion aesthetic, instrumental only.',
    instruments: ['Rhodes Electric Piano', 'Vinyl Crackle', 'Jazzy Boom-Bap Drums', 'Mellow Bass'],
  },
  {
    id: 'action-teaser',
    titleEn: 'High-Impact 3-Second Action Hook',
    titleMy: 'ပထမ ၃ စက္ကန့် ဖမ်းစားမည့် အက်ရှင် Hook BGM',
    genre: 'Cinematic Hybrid Trailer / Action Riser',
    bpm: '135 BPM',
    moodEn: 'Dramatic, intense, suspenseful, instant stop-scrolling hook',
    moodMy: 'စိတ်လှုပ်ရှားဖွယ် ရင်ခုန်သံ၊ Scroll ဆွဲမသွားအောင် ချက်ချင်းရပ်တန့်စေမည့် စည်းချက်',
    targetVideoEn: 'Flash sale teasers, urgent announcements, cinematic sports, energetic product unveilings',
    targetVideoMy: 'လျှပ်တစ်ပြက် လျှော့စျေး ကြေညာချက်၊ အားကစားနှင့် စိတ်လှုပ်ရှားဖွယ် ပစ္စည်းသစ်မိတ်ဆက်',
    prompt:
      'High-energy cinematic teaser background music, 135 BPM, explosive hybrid trailer drums, tension-building synth risers, rhythmic brass stabs, hard-hitting sub bass drops, instant 3-second attention hook, instrumental only.',
    instruments: ['Trailer Taiko Drums', 'Synth Risers', 'Brass Stabs', 'Sub Bass Drop'],
  },
];
