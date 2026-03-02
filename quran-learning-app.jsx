import { useState, useEffect, useCallback } from "react";

// ===== QURAN DATA =====
const SURAHS = [
  { id: 1, name: "الفاتحة", emoji: "🌟", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ","الرَّحْمَٰنِ الرَّحِيمِ","مَالِكِ يَوْمِ الدِّينِ","إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ","اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ","صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"] },
  { id: 2, name: "الإخلاص", emoji: "💎", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","قُلْ هُوَ اللَّهُ أَحَدٌ","اللَّهُ الصَّمَدُ","لَمْ يَلِدْ وَلَمْ يُولَدْ","وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"] },
  { id: 3, name: "الفلق", emoji: "🌅", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ","مِن شَرِّ مَا خَلَقَ","وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ","وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ","وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"] },
  { id: 4, name: "الناس", emoji: "👨‍👩‍👧‍👦", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","قُلْ أَعُوذُ بِرَبِّ النَّاسِ","مَلِكِ النَّاسِ","إِلَٰهِ النَّاسِ","مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ","الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ","مِنَ الْجِنَّةِ وَالنَّاسِ"] },
  { id: 5, name: "الكافرون", emoji: "🛡️", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","قُلْ يَا أَيُّهَا الْكَافِرُونَ","لَا أَعْبُدُ مَا تَعْبُدُونَ","وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ","وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ","وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ","لَكُمْ دِينُكُمْ وَلِيَ دِينِ"] },
  { id: 6, name: "النصر", emoji: "🏆", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ","وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا","فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا"] },
  { id: 7, name: "المسد", emoji: "🔥", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ","مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ","سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ","وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ","فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ"] },
  { id: 8, name: "قريش", emoji: "🐪", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","لِإِيلَافِ قُرَيْشٍ","إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ","فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ","الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ"] },
  { id: 9, name: "الماعون", emoji: "🤲", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ","فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ","وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ","فَوَيْلٌ لِّلْمُصَلِّينَ","الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ","الَّذِينَ هُمْ يُرَاءُونَ","وَيَمْنَعُونَ الْمَاعُونَ"] },
  { id: 10, name: "الكوثر", emoji: "💧", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ","فَصَلِّ لِرَبِّكَ وَانْحَرْ","إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ"] },
  { id: 11, name: "العصر", emoji: "⏰", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","وَالْعَصْرِ","إِنَّ الْإِنسَانَ لَفِي خُسْرٍ","إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ"] },
  { id: 12, name: "الهمزة", emoji: "⚡", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ","الَّذِي جَمَعَ مَالًا وَعَدَّدَهُ","يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ","كَلَّا لَيُنبَذَنَّ فِي الْحُطَمَةِ","وَمَا أَدْرَاكَ مَا الْحُطَمَةُ","نَارُ اللَّهِ الْمُوقَدَةُ","الَّتِي تَطَّلِعُ عَلَى الْأَفْئِدَةِ","إِنَّهَا عَلَيْهِم مُّؤْصَدَةٌ","فِي عَمَدٍ مُّمَدَّدَةٍ"] },
  { id: 13, name: "الفيل", emoji: "🐘", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ","أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ","وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ","تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ","فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ"] },
  { id: 14, name: "القارعة", emoji: "🌍", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","الْقَارِعَةُ","مَا الْقَارِعَةُ","وَمَا أَدْرَاكَ مَا الْقَارِعَةُ","يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ","وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنفُوشِ","فَأَمَّا مَن ثَقُلَتْ مَوَازِينُهُ","فَهُوَ فِي عِيشَةٍ رَّاضِيَةٍ","وَأَمَّا مَنْ خَفَّتْ مَوَازِينُهُ","فَأُمُّهُ هَاوِيَةٌ","وَمَا أَدْرَاكَ مَا هِيَهْ","نَارٌ حَامِيَةٌ"] },
  { id: 15, name: "التكاثر", emoji: "📚", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","أَلْهَاكُمُ التَّكَاثُرُ","حَتَّىٰ زُرْتُمُ الْمَقَابِرَ","كَلَّا سَوْفَ تَعْلَمُونَ","ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ","كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ","لَتَرَوُنَّ الْجَحِيمَ","ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ","ثُمَّ لَتُسْأَلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ"] },
  { id: 16, name: "الزلزلة", emoji: "🌋", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا","وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا","وَقَالَ الْإِنسَانُ مَا لَهَا","يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا","بِأَنَّ رَبَّكَ أَوْحَىٰ لَهَا","يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِّيُرَوْا أَعْمَالَهُمْ","فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ","وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ"] },
  { id: 17, name: "العاديات", emoji: "🐎", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","وَالْعَادِيَاتِ ضَبْحًا","فَالْمُورِيَاتِ قَدْحًا","فَالْمُغِيرَاتِ صُبْحًا","فَأَثَرْنَ بِهِ نَقْعًا","فَوَسَطْنَ بِهِ جَمْعًا","إِنَّ الْإِنسَانَ لِرَبِّهِ لَكَنُودٌ","وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ","وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ","أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِي الْقُبُورِ","وَحُصِّلَ مَا فِي الصُّدُورِ","إِنَّ رَبَّهُم بِهِمْ يَوْمَئِذٍ لَّخَبِيرٌ"] },
  { id: 18, name: "القدر", emoji: "🌙", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ","وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ","لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ","تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ","سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ"] },
  { id: 19, name: "البينة", emoji: "📜", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","لَمْ يَكُنِ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ مُنفَكِّينَ حَتَّىٰ تَأْتِيَهُمُ الْبَيِّنَةُ","رَسُولٌ مِّنَ اللَّهِ يَتْلُو صُحُفًا مُّطَهَّرَةً","فِيهَا كُتُبٌ قَيِّمَةٌ","وَمَا تَفَرَّقَ الَّذِينَ أُوتُوا الْكِتَابَ إِلَّا مِن بَعْدِ مَا جَاءَتْهُمُ الْبَيِّنَةُ","وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ وَذَٰلِكَ دِينُ الْقَيِّمَةِ","إِنَّ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ فِي نَارِ جَهَنَّمَ خَالِدِينَ فِيهَا أُولَٰئِكَ هُمْ شَرُّ الْبَرِيَّةِ","إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أُولَٰئِكَ هُمْ خَيْرُ الْبَرِيَّةِ","جَزَاؤُهُمْ عِندَ رَبِّهِمْ جَنَّاتُ عَدْنٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا رَّضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ ذَٰلِكَ لِمَنْ خَشِيَ رَبَّهُ"] },
  { id: 20, name: "التين", emoji: "🫒", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","وَالتِّينِ وَالزَّيْتُونِ","وَطُورِ سِينِينَ","وَهَٰذَا الْبَلَدِ الْأَمِينِ","لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ","ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ","إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ","فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ","أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ"] },
  { id: 21, name: "العلق", emoji: "🖊️", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ","خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ","اقْرَأْ وَرَبُّكَ الْأَكْرَمُ","الَّذِي عَلَّمَ بِالْقَلَمِ","عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ","كَلَّا إِنَّ الْإِنسَانَ لَيَطْغَىٰ","أَن رَّآهُ اسْتَغْنَىٰ","إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰ","أَرَأَيْتَ الَّذِي يَنْهَىٰ","عَبْدًا إِذَا صَلَّىٰ","أَرَأَيْتَ إِن كَانَ عَلَى الْهُدَىٰ","أَوْ أَمَرَ بِالتَّقْوَىٰ","أَرَأَيْتَ إِن كَذَّبَ وَتَوَلَّىٰ","أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ","كَلَّا لَئِن لَّمْ يَنتَهِ لَنَسْفَعًا بِالنَّاصِيَةِ","نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ","فَلْيَدْعُ نَادِيَهُ","سَنَدْعُ الزَّبَانِيَةَ","كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِبْ"] },
  { id: 22, name: "الضحى", emoji: "☀️", verses: ["بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","وَالضُّحَىٰ","وَاللَّيْلِ إِذَا سَجَىٰ","مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ","وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ","وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ","أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ","وَوَجَدَكَ ضَالًّا فَهَدَىٰ","وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ","فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ","وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ","وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ"] },
];

const STREAK3 = [
  { text: "ما شاء الله! ثلاث صحيحة!", icon: "🌟" },
  { text: "أحسنت يا بطل!", icon: "💫" },
  { text: "بارك الله فيك!", icon: "✨" },
  { text: "رائع! واصل يا نجم!", icon: "⭐" },
  { text: "يا سلام عليك!", icon: "🚀" },
  { text: "ممتاز! أنت ذكي جداً!", icon: "🧠" },
];
const STREAK5 = [
  { text: "خمسة صحيحة! أنت بطل الحفظ!", icon: "👑" },
  { text: "ما شاء الله! أداء خرافي!", icon: "🏆" },
  { text: "أنت نجم ساطع! واصل!", icon: "🔥" },
  { text: "سبحان الله! ذاكرة حديدية!", icon: "💎" },
  { text: "يا بطل! خمسة من خمسة!", icon: "⚡" },
  { text: "أنت أسد الحفظ! لا يوقفك شيء!", icon: "🦁" },
];
const randMsg = (a) => a[Math.floor(Math.random() * a.length)];

// ===== HELPERS =====
function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function splitPhrases(v) { const w = v.split(" "); const p = []; let i = 0; while (i < w.length) { const c = w.length - i <= 3 ? w.length - i : Math.random() < 0.5 ? 2 : 3; p.push(w.slice(i, i + c).join(" ")); i += c; } return p; }

// ===== EXERCISE GENERATORS =====
function genComplete(s) { const v = s.verses.filter((_, i) => i > 0); if (v.length < 2) return null; const i = Math.floor(Math.random() * (v.length - 1)); return { type: "أكمل الآية", question: `ما الآية التي تلي:\n"${v[i]}"؟`, options: shuffle([v[i + 1], ...shuffle(v.filter((_, j) => j !== i + 1)).slice(0, 2)]), correct: v[i + 1] }; }
function genIdentify(s, all) { const v = s.verses.filter((_, i) => i > 0); const verse = v[Math.floor(Math.random() * v.length)]; return { type: "حدد السورة", question: `من أي سورة هذه الآية:\n"${verse}"؟`, options: shuffle([s.name, ...shuffle(all.filter(x => x.id !== s.id)).slice(0, 2).map(x => x.name)]), correct: s.name }; }
function genPhraseOrder(s) { const v = s.verses.filter((_, i) => i > 0).filter(x => x.split(" ").length >= 5); if (!v.length) return null; const verse = v[Math.floor(Math.random() * v.length)]; const p = splitPhrases(verse); if (p.length < 3) return null; return { type: "رتّب العبارات", question: "رتّب العبارات لتكوين الآية:", phrases: shuffle([...p]), correct: p, correctVerse: verse }; }
function genVerseOrder(s) { const v = s.verses.filter((_, i) => i > 0); if (v.length < 3) return null; const i = Math.floor(Math.random() * (v.length - 2)); const sel = v.slice(i, i + 3); return { type: "رتّب الآيات", question: "رتّب الآيات بالترتيب الصحيح:", verses: shuffle([...sel]), correct: sel }; }
function genFillEasy(s, all) { const v = s.verses.filter((_, i) => i > 0).filter(x => x.split(" ").length >= 4); if (!v.length) return null; const verse = v[Math.floor(Math.random() * v.length)]; const w = verse.split(" "); const rc = w.length >= 6 ? 2 : 1; const rs = 1 + Math.floor(Math.random() * (w.length - rc - 1)); const rm = w.slice(rs, rs + rc); const allW = []; all.forEach(x => x.verses.filter((_, i) => i > 0).forEach(v2 => v2.split(" ").forEach(w2 => { if (!rm.includes(w2) && !allW.includes(w2)) allW.push(w2); }))); return { type: "أكمل الفراغ", difficulty: "سهل", question: "أكمل الكلمات الناقصة:", before: w.slice(0, rs).join(" "), after: w.slice(rs + rc).join(" "), removed: rm, removedText: rm.join(" "), fullVerse: verse, wordBank: shuffle([...rm, ...shuffle(allW).slice(0, 3)]) }; }
function genFillHard(s) { const v = s.verses.filter((_, i) => i > 0).filter(x => x.split(" ").length >= 4); if (!v.length) return null; const verse = v[Math.floor(Math.random() * v.length)]; const w = verse.split(" "); const rc = w.length >= 6 ? 2 : 1; const rs = 1 + Math.floor(Math.random() * (w.length - rc - 1)); const rm = w.slice(rs, rs + rc); return { type: "أكمل الفراغ", difficulty: "صعب", question: "اكتب الكلمات الناقصة (بدون مساعدة!):", before: w.slice(0, rs).join(" "), after: w.slice(rs + rc).join(" "), removed: rm, removedText: rm.join(" "), fullVerse: verse, wordBank: null }; }
function genFirst(s, all) { const f = s.verses[1]; if (!f) return null; return { type: "أول آية", question: `ما أول آية في سورة ${s.name}؟\n(بعد البسملة)`, options: shuffle([f, ...shuffle(all.filter(x => x.id !== s.id && x.verses.length > 1).map(x => x.verses[1])).slice(0, 2)]), correct: f }; }
function genLast(s, all) { const l = s.verses[s.verses.length - 1]; return { type: "آخر آية", question: `ما آخر آية في سورة ${s.name}؟`, options: shuffle([l, ...shuffle(all.filter(x => x.id !== s.id).map(x => x.verses[x.verses.length - 1])).slice(0, 2)]), correct: l }; }

function makeExercises(s, all, n = 7) {
  const exs = []; const gens = [() => genComplete(s), () => genIdentify(s, all), () => genPhraseOrder(s), () => genVerseOrder(s), () => genFillEasy(s, all), () => genFillHard(s), () => genFirst(s, all), () => genLast(s, all)];
  let att = 0; while (exs.length < n && att < 50) { const e = gens[Math.floor(Math.random() * gens.length)](); if (e && !exs.find(x => x.type === e.type && x.question === e.question && x.difficulty === e.difficulty)) exs.push(e); att++; } return exs;
}

// ===== KIDS COLOR PALETTE =====
const K = {
  bg: "#FFF8F0",
  bgGrad: "linear-gradient(180deg, #FFF8F0 0%, #FDE8D0 30%, #E8F4FD 60%, #FFF0F5 100%)",
  card: "#FFFFFF",
  cardBorder: "#FFE0B2",
  primary: "#FF6B35",
  primaryLight: "#FF9A76",
  primaryDark: "#E55A2B",
  secondary: "#4ECDC4",
  secondaryDark: "#3BA99C",
  accent1: "#FFE66D",
  accent2: "#95E1D3",
  accent3: "#F38181",
  accent4: "#AA96DA",
  accent5: "#FCBAD3",
  green: "#4CAF50",
  greenLight: "#81C784",
  greenBg: "#E8F5E9",
  red: "#FF5252",
  redLight: "#FF8A80",
  redBg: "#FFEBEE",
  text: "#2D3436",
  textDim: "#636E72",
  gold: "#FFB300",
  goldLight: "#FFD54F",
  goldDark: "#FF8F00",
  star: "#FFD700",
  starEmpty: "#E0E0E0",
  purple: "#7C4DFF",
  purpleLight: "#B388FF",
  blue: "#42A5F5",
  blueLight: "#90CAF9",
  orange: "#FF9800",
  pink: "#FF80AB",
};

const surahColors = ["#FF6B35","#4ECDC4","#FFE66D","#95E1D3","#F38181","#AA96DA","#FCBAD3","#FF9800","#42A5F5","#81C784","#FF80AB","#B388FF","#FFB300","#4DD0E1","#AED581","#FF8A65","#CE93D8","#80DEEA","#FFCC80","#A5D6A7","#EF9A9A","#90CAF9"];

// ===== COMPONENTS =====
const KStar = ({ filled, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? K.star : K.starEmpty} stroke={filled ? K.goldDark : "none"} strokeWidth="0.5" style={{ filter: filled ? "drop-shadow(0 2px 4px rgba(255,215,0,0.4))" : "none" }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const KProgress = ({ value, max, color = K.primary }) => (
  <div style={{ width: "100%", height: 12, background: "#F0F0F0", borderRadius: 20, overflow: "hidden", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" }}>
    <div style={{ width: `${Math.min((value / max) * 100, 100)}%`, height: "100%", background: `linear-gradient(90deg, ${color}, ${K.accent1})`, borderRadius: 20, transition: "width 0.5s ease", boxShadow: `0 2px 8px ${color}50` }} />
  </div>
);

const KBadge = ({ text, icon, earned }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: 12, background: earned ? `linear-gradient(135deg, #FFF9E6, #FFF3CC)` : "#F5F5F5", borderRadius: 16, border: `2px solid ${earned ? K.gold : "#E0E0E0"}`, opacity: earned ? 1 : 0.45, minWidth: 80, boxShadow: earned ? "0 4px 12px rgba(255,179,0,0.2)" : "none", transform: earned ? "scale(1)" : "scale(0.95)" }}>
    <span style={{ fontSize: 32, filter: earned ? "none" : "grayscale(1)" }}>{icon}</span>
    <span style={{ fontSize: 11, color: earned ? K.text : K.textDim, textAlign: "center", fontFamily: "'Amiri', serif", fontWeight: 700 }}>{text}</span>
  </div>
);

const StreakBanner = ({ message, onDismiss }) => {
  const [vis, setVis] = useState(true);
  useEffect(() => { const t = setTimeout(() => { setVis(false); setTimeout(onDismiss, 400); }, 3000); return () => clearTimeout(t); }, [onDismiss]);
  if (!message) return null;
  const is5 = message.level === 5;
  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, pointerEvents: "none", animation: vis ? "fadeIn 0.4s ease" : "fadeOut 0.4s ease forwards" }}>
      <div style={{ position: "absolute", inset: 0, background: is5 ? "radial-gradient(circle, rgba(255,179,0,0.15) 0%, rgba(255,255,255,0.9) 70%)" : "radial-gradient(circle, rgba(76,175,80,0.1) 0%, rgba(255,255,255,0.9) 70%)" }} />
      <div style={{ position: "relative", background: is5 ? "linear-gradient(135deg, #FFF9E6, #FFFDE7, #FFF8E1)" : "linear-gradient(135deg, #E8F5E9, #F1F8E9)", borderRadius: 28, padding: "36px 44px", textAlign: "center", border: `3px solid ${is5 ? K.gold : K.green}`, boxShadow: is5 ? "0 10px 50px rgba(255,179,0,0.3), 0 0 80px rgba(255,215,0,0.15)" : "0 10px 40px rgba(76,175,80,0.2)", maxWidth: 340, margin: "0 20px", animation: "popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275)" }}>
        {is5 && [...Array(12)].map((_, i) => <div key={i} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: ["#FFD700", "#FF6B35", "#4ECDC4", "#FF80AB", "#AA96DA"][i % 5], top: `${10 + Math.random() * 80}%`, left: `${5 + Math.random() * 90}%`, animation: `sparkle ${0.6 + Math.random() * 0.6}s ease ${Math.random() * 0.4}s infinite alternate` }} />)}
        <div style={{ fontSize: is5 ? 72 : 56, marginBottom: 8, animation: "bounce2 0.6s ease infinite alternate" }}>{message.icon}</div>
        <div style={{ fontSize: is5 ? 20 : 17, fontWeight: 700, color: is5 ? K.goldDark : K.green, fontFamily: "'Amiri', serif", marginBottom: 4 }}>{is5 ? "🔥 خمسة متتالية! 🔥" : "⚡ ثلاثة متتالية! ⚡"}</div>
        <div style={{ fontSize: is5 ? 22 : 18, fontWeight: 700, color: K.text, lineHeight: 1.9, fontFamily: "'Amiri', serif" }}>{message.text}</div>
        <div style={{ marginTop: 14, display: "inline-block", background: is5 ? `linear-gradient(135deg, ${K.gold}, ${K.goldDark})` : `linear-gradient(135deg, ${K.green}, ${K.greenLight})`, color: "#fff", padding: "8px 24px", borderRadius: 24, fontSize: 16, fontWeight: 700, fontFamily: "'Amiri', serif", boxShadow: `0 4px 12px ${is5 ? K.gold : K.green}40` }}>+{is5 ? 25 : 10} نقطة!</div>
      </div>
    </div>
  );
};

// ===== MAIN APP =====
export default function QuranKidsApp() {
  const [screen, setScreen] = useState("home");
  const [selSurah, setSelSurah] = useState(null);
  const [exs, setExs] = useState([]);
  const [curEx, setCurEx] = useState(0);
  const [score, setScore] = useState(0);
  const [totalPts, setTotalPts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastPlay, setLastPlay] = useState(null);
  const [done, setDone] = useState({});
  const [stars, setStarsMap] = useState({});
  const [selAns, setSelAns] = useState(null);
  const [isCorr, setIsCorr] = useState(null);
  const [exResults, setExResults] = useState([]);
  const [isTest, setIsTest] = useState(false);
  const [showV, setShowV] = useState(false);
  const [level, setLevel] = useState("مبتدئ");
  const [animP, setAnimP] = useState(false);
  const [showBdg, setShowBdg] = useState(false);
  const [cStreak, setCStreak] = useState(0);
  const [sMsg, setSMsg] = useState(null);
  const [ordered, setOrdered] = useState([]);
  const [avail, setAvail] = useState([]);
  const [fillSel, setFillSel] = useState([]);
  const [fillBank, setFillBank] = useState([]);
  const [fillTyped, setFillTyped] = useState("");

  const updLevel = useCallback((p) => { setLevel(p >= 500 ? "حافظ" : p >= 200 ? "متوسط" : "مبتدئ"); }, []);
  const updStreak = useCallback(() => { const t = new Date().toDateString(); if (lastPlay !== t) { const y = new Date(); y.setDate(y.getDate() - 1); setStreak(s => lastPlay === y.toDateString() ? s + 1 : 1); setLastPlay(t); } }, [lastPlay]);
  const trigStreak = useCallback((n) => { if (n === 5 || (n > 5 && n % 5 === 0)) { setSMsg({ ...randMsg(STREAK5), level: 5 }); setTotalPts(p => { const v = p + 25; updLevel(v); return v; }); setScore(s => s + 25); } else if (n === 3) { setSMsg({ ...randMsg(STREAK3), level: 3 }); setTotalPts(p => { const v = p + 10; updLevel(v); return v; }); setScore(s => s + 10); } }, [updLevel]);

  const onC = (pts) => { setScore(s => s + pts); setTotalPts(p => { const v = p + pts; updLevel(v); return v; }); setAnimP(true); setTimeout(() => setAnimP(false), 600); const ns = cStreak + 1; setCStreak(ns); trigStreak(ns); };
  const onW = () => setCStreak(0);

  const initEx = (ex) => { setSelAns(null); setIsCorr(null); setOrdered([]); setFillSel([]); setFillTyped(""); if (ex.type === "رتّب العبارات") setAvail([...ex.phrases]); else if (ex.type === "رتّب الآيات") setAvail([...ex.verses]); else setAvail([]); if (ex.type === "أكمل الفراغ" && ex.wordBank) setFillBank([...ex.wordBank]); else setFillBank([]); };

  const startLesson = (s, test) => { updStreak(); setSelSurah(s); setIsTest(test); const e = test ? makeExercises(s, SURAHS, 10) : makeExercises(s, SURAHS, 7); setExs(e); setCurEx(0); setScore(0); setExResults([]); setCStreak(0); setSMsg(null); if (e.length) initEx(e[0]); setScreen("exercise"); };

  const handleMC = (a) => { if (selAns) return; const ex = exs[curEx]; const c = a === ex.correct; setSelAns(a); setIsCorr(c); if (c) onC(isTest ? 15 : 10); else onW(); setExResults(r => [...r, { correct: c }]); };
  const handleOrdTap = (item, idx) => { if (isCorr !== null) return; const no = [...ordered, item]; const na = avail.filter((_, i) => i !== idx); setOrdered(no); setAvail(na); if (!na.length) { const ex = exs[curEx]; const c = no.every((v, i) => v === ex.correct[i]); setIsCorr(c); setSelAns("done"); if (c) onC(isTest ? 20 : 15); else onW(); setExResults(r => [...r, { correct: c }]); } };
  const rmOrd = (idx) => { if (isCorr !== null) return; setOrdered(ordered.filter((_, i) => i !== idx)); setAvail([...avail, ordered[idx]]); };
  const handleFillTap = (w, idx) => { if (isCorr !== null) return; const ex = exs[curEx]; const ns = [...fillSel, w]; const nb = fillBank.filter((_, i) => i !== idx); setFillSel(ns); setFillBank(nb); if (ns.length === ex.removed.length) { const c = ns.every((x, i) => x === ex.removed[i]); setIsCorr(c); setSelAns("done"); if (c) onC(isTest ? 15 : 10); else onW(); setExResults(r => [...r, { correct: c }]); } };
  const rmFill = (idx) => { if (isCorr !== null) return; setFillSel(fillSel.filter((_, i) => i !== idx)); setFillBank([...fillBank, fillSel[idx]]); };
  const handleFillSubmit = () => { if (isCorr !== null) return; const ex = exs[curEx]; const c = fillTyped.trim() === ex.removedText; setIsCorr(c); setSelAns("done"); if (c) onC(isTest ? 25 : 20); else onW(); setExResults(r => [...r, { correct: c }]); };

  const nextEx = () => { if (curEx + 1 >= exs.length) { const cc = exResults.filter(r => r.correct).length; const tc = exs.length; const st = cc === tc ? 3 : cc >= tc * 0.7 ? 2 : cc >= tc * 0.4 ? 1 : 0; if (isTest && st >= 2) setDone(d => ({ ...d, [selSurah.id]: true })); setStarsMap(s => ({ ...s, [selSurah.id]: Math.max(s[selSurah.id] || 0, st) })); setScreen("results"); } else { const ni = curEx + 1; setCurEx(ni); initEx(exs[ni]); } };

  const doneCount = Object.keys(done).length;
  const badges = [
    { text: "أول درس", icon: "📖", earned: totalPts > 0 },
    { text: "٥ سور", icon: "⭐", earned: doneCount >= 5 },
    { text: "١٠ سور", icon: "🌟", earned: doneCount >= 10 },
    { text: "كل السور", icon: "👑", earned: doneCount >= SURAHS.length },
    { text: "سلسلة ٣", icon: "🔥", earned: streak >= 3 },
    { text: "سلسلة ٧", icon: "💎", earned: streak >= 7 },
    { text: "١٠٠ نقطة", icon: "🎯", earned: totalPts >= 100 },
    { text: "٥٠٠ نقطة", icon: "🏆", earned: totalPts >= 500 },
  ];

  const ctr = { minHeight: "100vh", background: K.bgGrad, fontFamily: "'Amiri','Noto Naskh Arabic',serif", direction: "rtl", color: K.text, maxWidth: 480, margin: "0 auto", position: "relative" };

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeOut{from{opacity:1}to{opacity:0}}
    @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-10px)}40%{transform:translateX(10px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}
    @keyframes bounce2{from{transform:scale(1)}to{transform:scale(1.12)}}
    @keyframes popIn{0%{opacity:0;transform:scale(0.3)}60%{transform:scale(1.1)}100%{opacity:1;transform:scale(1)}}
    @keyframes pointsUp{from{opacity:1;transform:translateY(0) scale(1)}to{opacity:0;transform:translateY(-35px) scale(1.3)}}
    @keyframes scaleIn{from{opacity:0;transform:scale(0.4)}to{opacity:1;transform:scale(1)}}
    @keyframes confetti{0%{opacity:1;transform:translateY(0) rotate(0) scale(1)}100%{opacity:0;transform:translateY(250px) rotate(720deg) scale(0.5)}}
    @keyframes sparkle{from{opacity:0.2;transform:scale(0.4)}to{opacity:1;transform:scale(1.3)}}
    @keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}}
    @keyframes glowBar{0%,100%{box-shadow:0 0 8px ${K.gold}40}50%{box-shadow:0 0 20px ${K.gold}70}}
    @keyframes rainbow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
    @keyframes floatBubble{0%{transform:translateY(100vh) scale(0)}50%{opacity:1}100%{transform:translateY(-10vh) scale(1);opacity:0}}
    *{box-sizing:border-box;scrollbar-width:thin}
    input[type="text"]{outline:none}
    button{transition:transform 0.15s ease}
    button:active{transform:scale(0.96)!important}
  `;

  // ===== HOME =====
  if (screen === "home") {
    return (
      <div style={ctr}>
        <style>{CSS}</style>
        {/* Floating decorations */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
          {["🌟","⭐","✨","🌙","💫"].map((e, i) => <div key={i} style={{ position: "absolute", fontSize: 20, opacity: 0.15, top: `${10 + i * 18}%`, left: `${5 + i * 20}%`, animation: `float ${3 + i}s ease-in-out ${i * 0.5}s infinite` }}>{e}</div>)}
        </div>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #FF6B35, #FF9A76, #FFB74D)", padding: "20px 20px 24px", borderRadius: "0 0 32px 32px", boxShadow: "0 8px 30px rgba(255,107,53,0.25)", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 40, animation: "float 3s ease-in-out infinite" }}>🕌</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>حِفظ جزء عمّ</div>
                <div style={{ fontSize: 13, color: "#FFE0B2", display: "flex", alignItems: "center", gap: 4 }}>المستوى: <span style={{ background: "#fff3", padding: "1px 10px", borderRadius: 10, fontWeight: 700, color: "#fff" }}>{level}</span></div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#fff2", borderRadius: 16, padding: "6px 12px" }}>
                <span style={{ fontSize: 20 }}>🔥</span>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>{streak}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#fff2", borderRadius: 16, padding: "6px 12px" }}>
                <span style={{ fontSize: 18 }}>⭐</span>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{totalPts}</span>
              </div>
              <div onClick={() => setShowBdg(!showBdg)} style={{ cursor: "pointer", fontSize: 28, animation: "wiggle 2s ease infinite" }}>🏅</div>
            </div>
          </div>
          {/* Progress */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#FFE0B2", marginBottom: 6 }}><span>التقدم الكلي</span><span style={{ fontWeight: 700, color: "#fff" }}>{doneCount}/{SURAHS.length} سورة</span></div>
            <div style={{ height: 10, background: "#fff3", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ width: `${(doneCount / SURAHS.length) * 100}%`, height: "100%", background: "linear-gradient(90deg, #FFE66D, #fff)", borderRadius: 20, transition: "width 0.5s" }} />
            </div>
          </div>
        </div>

        {/* Badges */}
        {showBdg && (<div style={{ padding: 16, margin: "12px 16px 0", background: "#fff", borderRadius: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", animation: "fadeIn 0.3s ease", zIndex: 1, position: "relative" }}><div style={{ fontSize: 17, fontWeight: 700, color: K.primary, marginBottom: 12, textAlign: "center" }}>🏅 الأوسمة والإنجازات 🏅</div><div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>{badges.map((b, i) => <KBadge key={i} {...b} />)}</div></div>)}

        {/* Surah List */}
        <div style={{ padding: "16px 16px 120px", display: "flex", flexDirection: "column", gap: 10, position: "relative", zIndex: 1 }}>
          {SURAHS.map((surah, idx) => {
            const isDone = done[surah.id]; const st = stars[surah.id] || 0;
            const locked = idx > 0 && !done[SURAHS[idx - 1].id] && !isDone && idx > doneCount;
            const clr = surahColors[idx % surahColors.length];
            return (
              <div key={surah.id} onClick={() => { if (!locked) { setSelSurah(surah); setScreen("surahDetail"); } }} style={{
                background: locked ? "#F5F5F5" : "#fff",
                borderRadius: 20, padding: "16px 18px",
                border: `2px solid ${locked ? "#E0E0E0" : isDone ? K.gold : clr + "40"}`,
                opacity: locked ? 0.5 : 1, cursor: locked ? "not-allowed" : "pointer",
                animation: `fadeIn 0.3s ease ${idx * 0.04}s both`,
                boxShadow: isDone ? `0 4px 16px ${K.gold}25` : locked ? "none" : `0 4px 16px ${clr}15`,
                position: "relative", overflow: "hidden"
              }}>
                {isDone && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${K.gold}, ${K.accent1})` }} />}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 16, background: locked ? "#E0E0E0" : isDone ? `linear-gradient(135deg, ${K.gold}, ${K.goldLight})` : `linear-gradient(135deg, ${clr}, ${clr}CC)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: locked ? 20 : 24, boxShadow: locked ? "none" : `0 4px 12px ${clr}30` }}>
                      {locked ? "🔒" : surah.emoji}
                    </div>
                    <div>
                      <div style={{ fontSize: 19, fontWeight: 700, color: isDone ? K.goldDark : K.text }}>سورة {surah.name}</div>
                      <div style={{ fontSize: 12, color: K.textDim, display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: clr }} />
                        {surah.verses.length - 1} آيات
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 3 }}>{[1, 2, 3].map(s => <KStar key={s} filled={s <= st} size={22} />)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ===== SURAH DETAIL =====
  if (screen === "surahDetail" && selSurah) {
    const idx = SURAHS.findIndex(s => s.id === selSurah.id);
    const clr = surahColors[idx % surahColors.length];
    return (
      <div style={ctr}>
        <style>{CSS}</style>
        <div style={{ background: `linear-gradient(135deg, ${clr}, ${clr}CC)`, padding: "20px 20px 30px", borderRadius: "0 0 32px 32px", boxShadow: `0 8px 30px ${clr}30`, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div onClick={() => setScreen("home")} style={{ cursor: "pointer", fontSize: 22, color: "#fff", background: "#fff3", borderRadius: 12, padding: "6px 14px" }}>→ رجوع</div>
            <div style={{ width: 30 }} />
          </div>
          <div style={{ fontSize: 56, marginBottom: 8, animation: "float 3s ease-in-out infinite" }}>{selSurah.emoji}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>سورة {selSurah.name}</div>
          <div style={{ color: "#ffffffCC", fontSize: 14, marginTop: 4 }}>{selSurah.verses.length - 1} آيات</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>{[1, 2, 3].map(s => <KStar key={s} filled={s <= (stars[selSurah.id] || 0)} size={34} />)}</div>
        </div>
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <button onClick={() => setShowV(!showV)} style={{ background: "#fff", color: K.text, border: `2px solid ${clr}40`, borderRadius: 16, padding: "16px 20px", fontSize: 17, cursor: "pointer", fontFamily: "'Amiri', serif", fontWeight: 700, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>📜 {showV ? "إخفاء الآيات" : "قراءة الآيات"}</button>
          {showV && (<div style={{ background: "#fff", borderRadius: 16, padding: 20, border: `2px solid ${clr}20`, animation: "fadeIn 0.3s ease", maxHeight: 300, overflowY: "auto", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>{selSurah.verses.map((v, i) => (<div key={i} style={{ padding: "10px 0", borderBottom: i < selSurah.verses.length - 1 ? "1px solid #F0F0F0" : "none", fontSize: 18, lineHeight: 2.2, textAlign: "center", color: i === 0 ? K.primary : K.text }}>{v} {i > 0 ? <span style={{ color: clr, fontWeight: 700 }}>﴿{i}﴾</span> : ""}</div>))}</div>)}
          <button onClick={() => startLesson(selSurah, false)} style={{ background: `linear-gradient(135deg, ${clr}, ${clr}DD)`, color: "#fff", border: "none", borderRadius: 16, padding: "18px 20px", fontSize: 19, fontWeight: 700, cursor: "pointer", fontFamily: "'Amiri', serif", boxShadow: `0 6px 24px ${clr}35` }}>✏️ بدء التمرين</button>
          <button onClick={() => startLesson(selSurah, true)} style={{ background: `linear-gradient(135deg, ${K.secondary}, ${K.secondaryDark})`, color: "#fff", border: "none", borderRadius: 16, padding: "18px 20px", fontSize: 19, fontWeight: 700, cursor: "pointer", fontFamily: "'Amiri', serif", boxShadow: `0 6px 24px ${K.secondary}35` }}>📝 اختبار السورة</button>
        </div>
      </div>
    );
  }

  // ===== EXERCISE =====
  if (screen === "exercise" && exs.length > 0) {
    const ex = exs[curEx];
    const isMC = ["أكمل الآية", "حدد السورة", "أول آية", "آخر آية"].includes(ex.type);
    const isOrd = ["رتّب العبارات", "رتّب الآيات"].includes(ex.type);
    const isFill = ex.type === "أكمل الفراغ";
    const isFE = isFill && ex.difficulty === "سهل";
    const isFH = isFill && ex.difficulty === "صعب";
    const typeColor = isOrd ? K.orange : isFH ? K.purple : isFE ? K.secondary : K.primary;

    return (
      <div style={ctr}>
        <style>{CSS}</style>
        {sMsg && <StreakBanner message={sMsg} onDismiss={() => setSMsg(null)} />}

        {/* Top bar */}
        <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div onClick={() => setScreen("surahDetail")} style={{ cursor: "pointer", fontSize: 20, color: K.textDim, background: "#F5F5F5", borderRadius: 10, padding: "4px 10px" }}>✕</div>
          <div style={{ flex: 1 }}><KProgress value={curEx + 1} max={exs.length} color={typeColor} /></div>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 4, background: `${K.gold}20`, borderRadius: 14, padding: "4px 12px" }}>
            <span style={{ fontSize: 16 }}>⭐</span>
            <span style={{ color: K.goldDark, fontWeight: 700, fontSize: 16 }}>{score}</span>
            {animP && <span style={{ position: "absolute", top: -18, right: 4, color: K.green, fontWeight: 700, fontSize: 15, animation: "pointsUp 0.6s ease forwards" }}>+</span>}
          </div>
        </div>

        {/* Streak bar */}
        {cStreak >= 2 && (
          <div style={{ margin: "8px 16px", padding: "8px 16px", background: `linear-gradient(135deg, ${K.gold}15, ${K.accent1}20)`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: `2px solid ${K.gold}30`, animation: cStreak >= 3 ? "glowBar 1.5s ease infinite" : "fadeIn 0.3s ease" }}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <span style={{ color: K.goldDark, fontSize: 14, fontWeight: 700 }}>{cStreak} صحيحة متتالية!</span>
            {[...Array(Math.min(cStreak, 5))].map((_, i) => <span key={i} style={{ fontSize: 12 }}>⭐</span>)}
          </div>
        )}

        {/* Type badge */}
        <div style={{ textAlign: "center", padding: "10px 20px 4px", display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ background: `${typeColor}15`, color: typeColor, padding: "5px 16px", borderRadius: 14, fontSize: 14, fontWeight: 700, border: `1.5px solid ${typeColor}30` }}>
            {isTest ? "📝 اختبار" : "✏️ تمرين"} — {ex.type}
          </span>
          {isFill && <span style={{ background: isFH ? `${K.red}12` : `${K.green}12`, color: isFH ? K.red : K.green, padding: "5px 14px", borderRadius: 14, fontSize: 13, fontWeight: 700, border: `1.5px solid ${isFH ? K.red : K.green}25` }}>{isFH ? "🔴 صعب" : "🟢 سهل"}</span>}
        </div>

        {/* Question */}
        <div style={{ padding: "12px 16px", animation: "fadeIn 0.3s ease" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 20, border: `2px solid ${typeColor}20`, fontSize: 18, lineHeight: 2.2, textAlign: "center", color: K.text, marginBottom: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.04)", whiteSpace: "pre-line" }}>{ex.question}</div>

          {/* MC */}
          {isMC && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ex.options.map((opt, i) => {
                const sel = selAns === opt; const right = opt === ex.correct;
                let bg = "#fff", bc = "#E0E0E0", shadow = "0 2px 8px rgba(0,0,0,0.04)";
                if (selAns !== null) { if (right) { bg = K.greenBg; bc = K.green; shadow = `0 4px 12px ${K.green}25`; } else if (sel) { bg = K.redBg; bc = K.red; shadow = `0 4px 12px ${K.red}20`; } }
                return (<button key={i} onClick={() => handleMC(opt)} style={{ background: bg, border: `2px solid ${bc}`, borderRadius: 16, padding: "14px 18px", fontSize: 16, color: K.text, cursor: selAns ? "default" : "pointer", textAlign: "right", fontFamily: "'Amiri', serif", lineHeight: 1.9, boxShadow: shadow, animation: sel && !right && selAns ? "shake 0.4s ease" : right && selAns ? "popIn 0.3s ease" : "none" }}>
                  {selAns && right && <span style={{ marginLeft: 8 }}>✅</span>}
                  {sel && !right && selAns && <span style={{ marginLeft: 8 }}>❌</span>}
                  {opt}
                </button>);
              })}
            </div>
          )}

          {/* ORDERING */}
          {isOrd && (
            <div>
              <div style={{ minHeight: 70, background: "#fff", borderRadius: 16, padding: 12, marginBottom: 12, border: `2px solid ${isCorr === true ? K.green : isCorr === false ? K.red : "#E0E0E0"}`, display: "flex", flexDirection: "column", gap: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", animation: isCorr === false ? "shake 0.4s ease" : "none" }}>
                {!ordered.length && <span style={{ color: K.textDim, fontSize: 14, textAlign: "center", padding: 12 }}>👆 اضغط على {ex.type === "رتّب الآيات" ? "الآيات" : "العبارات"} لترتيبها</span>}
                {ordered.map((item, i) => (
                  <div key={i} onClick={() => rmOrd(i)} style={{ background: `linear-gradient(135deg, ${K.orange}12, ${K.accent1}15)`, color: K.text, padding: "10px 14px", borderRadius: 14, fontSize: ex.type === "رتّب الآيات" ? 15 : 16, cursor: isCorr !== null ? "default" : "pointer", border: `1.5px solid ${K.orange}25`, fontFamily: "'Amiri', serif", lineHeight: 1.8, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ background: `linear-gradient(135deg, ${K.orange}, ${K.primary})`, color: "#fff", width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {avail.map((item, i) => (
                  <div key={i} onClick={() => handleOrdTap(item, i)} style={{ background: "#F8F9FA", color: K.text, padding: "10px 14px", borderRadius: 14, fontSize: ex.type === "رتّب الآيات" ? 15 : 16, cursor: "pointer", border: "2px solid #E0E0E0", fontFamily: "'Amiri', serif", lineHeight: 1.8, transition: "all 0.15s" }}>{item}</div>
                ))}
              </div>
              {isCorr !== null && (
                <div style={{ marginTop: 12, padding: 14, borderRadius: 16, textAlign: "center", background: isCorr ? K.greenBg : K.redBg, border: `2px solid ${isCorr ? K.green : K.red}30`, animation: "fadeIn 0.3s ease" }}>
                  {isCorr ? <span style={{ fontSize: 18, color: K.green, fontWeight: 700 }}>✅ أحسنت! ترتيب ممتاز!</span> : (<div><span style={{ fontSize: 16, color: K.red, fontWeight: 700 }}>❌ الترتيب الصحيح:</span><div style={{ marginTop: 8 }}>{ex.correct.map((v, i) => <div key={i} style={{ padding: "4px 0", color: K.text, fontSize: 14 }}>﴿{i + 1}﴾ {v}</div>)}</div></div>)}
                </div>
              )}
            </div>
          )}

          {/* FILL EASY */}
          {isFE && (
            <div>
              <div style={{ background: "#fff", borderRadius: 16, padding: 18, marginBottom: 12, border: `2px solid ${K.secondary}20`, fontSize: 18, lineHeight: 2.4, textAlign: "center", fontFamily: "'Amiri', serif", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
                <span>{ex.before} </span>
                <span style={{ display: "inline-block", minWidth: fillSel.length ? "auto" : 80, borderBottom: `3px solid ${isCorr === true ? K.green : isCorr === false ? K.red : K.secondary}`, padding: "2px 10px", margin: "0 4px", color: isCorr === true ? K.green : isCorr === false ? K.red : K.secondaryDark, fontWeight: 700, background: `${K.secondary}10`, borderRadius: 6 }}>{fillSel.length ? fillSel.join(" ") : "⬜⬜⬜"}</span>
                <span> {ex.after}</span>
              </div>
              {fillSel.length > 0 && isCorr === null && (<div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 10 }}>{fillSel.map((w, i) => (<span key={i} onClick={() => rmFill(i)} style={{ background: `${K.secondary}15`, color: K.secondaryDark, padding: "6px 14px", borderRadius: 12, fontSize: 15, cursor: "pointer", border: `1.5px solid ${K.secondary}30`, fontFamily: "'Amiri', serif" }}>✕ {w}</span>))}</div>)}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>{fillBank.map((w, i) => (<span key={i} onClick={() => handleFillTap(w, i)} style={{ background: "#F8F9FA", color: K.text, padding: "10px 18px", borderRadius: 14, fontSize: 17, cursor: isCorr !== null ? "default" : "pointer", border: "2px solid #E0E0E0", fontFamily: "'Amiri', serif" }}>{w}</span>))}</div>
              {isCorr !== null && (<div style={{ marginTop: 12, padding: 14, borderRadius: 16, textAlign: "center", background: isCorr ? K.greenBg : K.redBg, border: `2px solid ${isCorr ? K.green : K.red}30`, animation: "fadeIn 0.3s ease" }}><span style={{ fontSize: 16, fontWeight: 700, color: isCorr ? K.green : K.red }}>{isCorr ? "✅ أحسنت!" : `❌ الصحيح: ${ex.removedText}`}</span></div>)}
            </div>
          )}

          {/* FILL HARD */}
          {isFH && (
            <div>
              <div style={{ background: "#fff", borderRadius: 16, padding: 18, marginBottom: 12, border: `2px solid ${K.purple}20`, fontSize: 18, lineHeight: 2.4, textAlign: "center", fontFamily: "'Amiri', serif", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
                <span>{ex.before} </span>
                <span style={{ display: "inline-block", minWidth: 80, borderBottom: `3px solid ${isCorr === true ? K.green : isCorr === false ? K.red : K.purple}`, padding: "2px 10px", margin: "0 4px", color: isCorr === true ? K.green : isCorr === false ? K.red : K.purple, fontWeight: 700, background: `${K.purple}10`, borderRadius: 6 }}>{isCorr !== null ? (isCorr ? fillTyped : ex.removedText) : (fillTyped || "✍️ ...")}</span>
                <span> {ex.after}</span>
              </div>
              {isCorr === null && (<div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <input type="text" value={fillTyped} onChange={(e) => setFillTyped(e.target.value)} onKeyDown={(e) => e.key === "Enter" && fillTyped.trim() && handleFillSubmit()} placeholder="اكتب الكلمات الناقصة..." style={{ flex: 1, background: "#fff", color: K.text, border: `2px solid ${K.purple}30`, borderRadius: 14, padding: "14px 16px", fontSize: 18, fontFamily: "'Amiri', serif", direction: "rtl", textAlign: "right", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }} />
                <button onClick={handleFillSubmit} disabled={!fillTyped.trim()} style={{ background: fillTyped.trim() ? `linear-gradient(135deg, ${K.purple}, ${K.purpleLight})` : "#E0E0E0", color: "#fff", border: "none", borderRadius: 14, padding: "14px 22px", fontSize: 17, fontWeight: 700, cursor: fillTyped.trim() ? "pointer" : "default", fontFamily: "'Amiri', serif" }}>تأكيد</button>
              </div>)}
              {isCorr !== null && (<div style={{ marginTop: 12, padding: 14, borderRadius: 16, textAlign: "center", background: isCorr ? K.greenBg : K.redBg, border: `2px solid ${isCorr ? K.green : K.red}30`, animation: "fadeIn 0.3s ease" }}><div style={{ fontSize: 16, fontWeight: 700, color: isCorr ? K.green : K.red }}>{isCorr ? "✅ رائع! أنت بطل!" : "❌ إجابة خاطئة"}</div>{!isCorr && <div style={{ marginTop: 6, color: K.text, fontSize: 14 }}>الصحيح: <strong style={{ color: K.purple }}>{ex.removedText}</strong></div>}{isCorr && <div style={{ marginTop: 4, fontSize: 13, color: K.purple }}>+{isTest ? 25 : 20} نقطة (مستوى صعب!) 💪</div>}</div>)}
            </div>
          )}

          {/* MC Feedback */}
          {selAns && isMC && (
            <div style={{ marginTop: 12, padding: 14, borderRadius: 16, textAlign: "center", background: isCorr ? K.greenBg : K.redBg, border: `2px solid ${isCorr ? K.green : K.red}30`, fontSize: 18, fontWeight: 700, color: isCorr ? K.green : K.red, animation: "fadeIn 0.3s ease" }}>
              {isCorr ? "✅ أحسنت يا بطل!" : "❌ لا بأس، حاول مرة أخرى!"}
            </div>
          )}

          {/* Next */}
          {(selAns !== null || isCorr !== null) && (
            <button onClick={nextEx} style={{ marginTop: 16, width: "100%", background: `linear-gradient(135deg, ${typeColor}, ${typeColor}CC)`, color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontSize: 19, fontWeight: 700, cursor: "pointer", fontFamily: "'Amiri', serif", boxShadow: `0 6px 20px ${typeColor}30`, animation: "fadeIn 0.3s ease" }}>
              {curEx + 1 >= exs.length ? "🎉 عرض النتائج" : "التالي ←"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ===== RESULTS =====
  if (screen === "results") {
    const cc = exResults.filter(r => r.correct).length;
    const tc = exs.length;
    const pct = Math.round((cc / tc) * 100);
    const st = cc === tc ? 3 : cc >= tc * 0.7 ? 2 : cc >= tc * 0.4 ? 1 : 0;
    const passed = isTest ? st >= 2 : true;
    const colors = [K.primary, K.secondary, K.accent1, K.accent3, K.accent4, K.purple, K.blue, K.pink, K.orange, K.green];
    return (
      <div style={ctr}>
        <style>{CSS}</style>
        <div style={{ padding: 20, textAlign: "center" }}>
          {pct >= 70 && (<div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>{Array.from({ length: 30 }).map((_, i) => (<div key={i} style={{ position: "absolute", top: -10, left: `${Math.random() * 100}%`, width: 10 + Math.random() * 8, height: 10 + Math.random() * 8, borderRadius: Math.random() > 0.5 ? "50%" : 3, background: colors[i % colors.length], animation: `confetti ${2 + Math.random() * 1.5}s ease ${Math.random() * 0.8}s forwards` }} />))}</div>)}

          <div style={{ fontSize: 80, marginBottom: 8, animation: "scaleIn 0.5s ease" }}>{pct >= 70 ? "🎉" : pct >= 40 ? "💪" : "📚"}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: K.primary, marginBottom: 4, animation: "fadeIn 0.4s ease 0.2s both" }}>{isTest ? (passed ? "🏆 اجتزت الاختبار! 🏆" : "حاول مرة أخرى!") : "أحسنت يا بطل!"}</div>
          <div style={{ fontSize: 16, color: K.textDim, marginBottom: 20, animation: "fadeIn 0.4s ease 0.3s both" }}>سورة {selSurah?.name} {selSurah?.emoji}</div>

          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 24, animation: "fadeIn 0.4s ease 0.4s both" }}>{[1, 2, 3].map(s => (<div key={s} style={{ animation: s <= st ? `scaleIn 0.3s ease ${0.4 + s * 0.15}s both` : "none" }}><KStar filled={s <= st} size={52} /></div>))}</div>

          <div style={{ background: "#fff", borderRadius: 24, padding: 24, border: "2px solid #F0F0F0", marginBottom: 20, boxShadow: "0 6px 24px rgba(0,0,0,0.06)", animation: "fadeIn 0.4s ease 0.5s both" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div><div style={{ fontSize: 36, fontWeight: 700, color: K.primary }}>{pct}%</div><div style={{ fontSize: 13, color: K.textDim }}>النسبة</div></div>
              <div style={{ width: 2, background: "#F0F0F0" }} />
              <div><div style={{ fontSize: 36, fontWeight: 700, color: K.green }}>{cc}/{tc}</div><div style={{ fontSize: 13, color: K.textDim }}>صحيحة</div></div>
              <div style={{ width: 2, background: "#F0F0F0" }} />
              <div><div style={{ fontSize: 36, fontWeight: 700, color: K.goldDark }}>+{score}</div><div style={{ fontSize: 13, color: K.textDim }}>نقاط ⭐</div></div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeIn 0.4s ease 0.6s both" }}>
            <button onClick={() => startLesson(selSurah, isTest)} style={{ background: `linear-gradient(135deg, ${K.primary}, ${K.primaryLight})`, color: "#fff", border: "none", borderRadius: 16, padding: "16px", fontSize: 18, fontWeight: 700, cursor: "pointer", fontFamily: "'Amiri', serif", boxShadow: `0 6px 20px ${K.primary}30` }}>🔄 إعادة {isTest ? "الاختبار" : "التمرين"}</button>
            <button onClick={() => { setScreen("surahDetail"); setShowV(false); }} style={{ background: "#fff", color: K.text, border: "2px solid #E0E0E0", borderRadius: 16, padding: "16px", fontSize: 17, cursor: "pointer", fontFamily: "'Amiri', serif", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>← العودة للسورة</button>
            <button onClick={() => setScreen("home")} style={{ background: "transparent", color: K.textDim, border: "none", padding: "12px", fontSize: 15, cursor: "pointer", fontFamily: "'Amiri', serif" }}>🏠 الرئيسية</button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
