import { TypingLesson } from '../../types/lesson.types';
import { createLesson } from '../lessonBuilder';

export const HINDI_KEY_LESSONS: TypingLesson[] = [
  // Chapter 1: Basic Swar (अ आ इ ई उ ऊ ऋ ए ऐ ओ औ)
  createLesson(
    'hi-keys-1',
    'अध्याय 1: बुनियादी स्वर (Basic Swar: अ आ इ ई उ ऊ ऋ ए ऐ ओ औ)',
    'hi',
    'keys',
    'beginner',
    'इनस्क्रिप्ट कीबोर्ड पर बुनियादी स्वतंत्र स्वरों का अभ्यास: अ (Shift+D), आ (Shift+E), इ (Shift+F), ई (Shift+R), उ (Shift+G), ऊ (Shift+T), ऋ (Shift+=), ए (Shift+S), ऐ (Shift+W), ओ (Shift+A), औ (Shift+Q)।',
    [
      'अ आ इ ई उ ऊ ऋ ए ऐ ओ औ अ आ इ ई उ ऊ ऋ ए ऐ ओ औ',
      'अ आ इ ई उ ऊ ए ऐ ओ औ अ आ इ ई उ ऊ ए ऐ ओ औ',
      'अमर आग इधर ईख उधर ऊपर ऋषि एक ऐनक ओस औरत',
      'अ आ इ ई उ ऊ ऋ ए ऐ ओ औ अमर आग इधर ईख उधर ऊपर',
    ],
    1,
    ['swar', 'vowels', 'inscript']
  ),

  // Chapter 2: Remaining Swar and Extended Vowels (ऍ ऑ ऎ)
  createLesson(
    'hi-keys-2',
    'अध्याय 2: विस्तारित स्वर (Extended Swar: ऍ ऑ ऎ)',
    'hi',
    'keys',
    'beginner',
    'विस्तारित और आगत स्वर: ऍ (Shift+1), ऑ (Shift+\\), ऎ (Shift+Z)।',
    [
      'ऍ ऑ ऎ ऍ ऑ ऎ ऍ ऑ ऎ ऍ ऑ ऎ ऍ ऑ ऎ ऍ ऑ ऎ',
      'ऑ ऍ ऎ ऑ ऍ ऎ ऍ ऑ ऎ ऑ ऍ ऎ ऍ ऑ ऎ ऑ ऍ ऎ',
      'डॉक्टर कॉलेज ऑफिस टॉर्च मॉल बॉल कॉपी कॉफी',
      'ऍ ऑ ऎ डॉक्टर कॉलेज ऑफिस मॉल बॉल कॉपी कॉफी',
    ],
    2,
    ['extended-swar', 'foreign-vowels']
  ),

  // Chapter 3: Vyanjan - First Group: Ka-varg & Cha-varg (क ख ग घ ङ च छ ज झ ञ)
  createLesson(
    'hi-keys-3',
    'अध्याय 3: व्यंजन - प्रथम समूह: क-वर्ग व च-वर्ग',
    'hi',
    'keys',
    'beginner',
    'क (K), ख (Shift+K), ग (I), घ (Shift+I), ङ (Shift+U), च (;), छ (Shift+;), ज (P), झ (Shift+P), ञ (Shift+])।',
    [
      'क ख ग घ ङ च छ ज झ ञ क ख ग घ ङ च छ ज झ ञ',
      'क ख ग घ च छ ज झ क ख ग घ च छ ज झ क ख ग घ',
      'कमल खग गगन घट चरण छत्र जल झरना क ख ग घ च छ',
      'क ख ग घ ङ च छ ज झ ञ कमल खग गगन घट चरण जल',
    ],
    3,
    ['vyanjan', 'ka-varg', 'cha-varg']
  ),

  // Chapter 4: Vyanjan - Second Group: Ta-varg & Tha-varg (ट ठ ड ढ ण त थ द ध न)
  createLesson(
    'hi-keys-4',
    'अध्याय 4: व्यंजन - द्वितीय समूह: ट-वर्ग व त-वर्ग',
    'hi',
    'keys',
    'beginner',
    'ट (\'), ठ (Shift+\'), ड ([), ढ (Shift+[), ण (Shift+C), त (L), थ (Shift+L), द (O), ध (Shift+O), न (V)।',
    [
      'ट ठ ड ढ ण त थ द ध न ट ठ ड ढ ण त थ द ध न',
      'ट ठ ड ढ त थ द ध न ट ठ ड ढ त थ द ध न ट ठ',
      'टमटम डमरू ढक्कन तरुवर थल दल धन नल तपन नमन',
      'ट ठ ड ढ ण त थ द ध न तरुवर डमरू दल धन नल तपन',
    ],
    4,
    ['vyanjan', 'ta-varg', 'tha-varg']
  ),

  // Chapter 5: Vyanjan - Third Group: Pa-varg & Antastha (प फ ब भ म य र ल व)
  createLesson(
    'hi-keys-5',
    'अध्याय 5: व्यंजन - तृतीय समूह: प-वर्ग व अंतस्थ',
    'hi',
    'keys',
    'beginner',
    'प (H), फ (Shift+H), ब (Y), भ (Shift+Y), म (C), य (/), र (J), ल (N), व (B)।',
    [
      'प फ ब भ म य र ल व प फ ब भ म य र ल व प फ ब',
      'प ब म य र ल व प ब म य र ल व प फ ब भ म य र',
      'पवन फल बक भवन मन यश रथ लय वन पर बल मन वन',
      'प फ ब भ म य र ल व पवन फल बक भवन मन यश रथ',
    ],
    5,
    ['vyanjan', 'pa-varg', 'antastha']
  ),

  // Chapter 6: Vyanjan - Remaining Groups: Ushma & Sanyukta (श ष स ह क्ष त्र ज्ञ श्र)
  createLesson(
    'hi-keys-6',
    'अध्याय 6: व्यंजन - ऊष्म व संयुक्त व्यंजन (श ष स ह क्ष त्र ज्ञ श्र)',
    'hi',
    'keys',
    'beginner',
    'श (Shift+M), ष (Shift+,), स (M), ह (U), क्ष (Shift+7), त्र (Shift+6), ज्ञ (Shift+5), श्र (Shift+8)।',
    [
      'श ष स ह क्ष त्र ज्ञ श्र श ष स ह क्ष त्र ज्ञ श्र',
      'श स ह क्ष त्र ज्ञ श्र श स ह क्ष त्र ज्ञ श्र श स',
      'शहर सहज हल क्षमा त्रिशूल ज्ञान श्रम शांति शक्ति',
      'श ष स ह क्ष त्र ज्ञ श्र शहर सहज हल क्षमा ज्ञान श्रम',
    ],
    6,
    ['vyanjan', 'ushma', 'sanyukta']
  ),

  // Chapter 7: Complete Home Row Mapping (ो े ् ि ु प र क त च ट)
  createLesson(
    'hi-keys-7',
    'अध्याय 7: सम्पूर्ण गृह पंक्ति (Complete Home Row)',
    'hi',
    'keys',
    'beginner',
    'गृह पंक्ति कुंजियां: बाएं हाथ: ो (A), े (S), ् (D), ि (F), ु (G); दाएं हाथ: प (H), र (J), क (K), त (L), च (;), ट (\')।',
    [
      'ो े ् ि ु प र क त च ट ो े ् ि ु प र क त च ट',
      'पर कर तर चर पट कट रत चट पक पर कत तर चर',
      'पति रवि कवि गति प्रति कृति पति रवि कवि गति प्रति',
      'ो े ् ि ु प र क त च ट पर कर तर चर पति रवि गति',
    ],
    7,
    ['home-row', 'inscript']
  ),

  // Chapter 8: Top Row Mapping (ौ ै ा ी ू ब ह ग द ज ड ़ ॉ)
  createLesson(
    'hi-keys-8',
    'अध्याय 8: सम्पूर्ण ऊपरी पंक्ति (Complete Top Row)',
    'hi',
    'keys',
    'beginner',
    'ऊपरी पंक्ति कुंजियां: बाएं हाथ: ौ (Q), ै (W), ा (E), ी (R), ू (T); दाएं हाथ: ब (Y), ह (U), ग (I), द (O), ज (P), ड ([), ़ (]), ॉ (\\)।',
    [
      'ौ ै ा ी ू ब ह ग द ज ड ़ ॉ ौ ै ा ी ू ब ह ग द ज ड',
      'बाद हद गद जड़ बाग दाज बाद हद गद जड़ बाग दाज',
      'हाथ बात गीत जीत दीप धूप बीज फूल दूध गान',
      'ौ ै ा ी ू ब ह ग द ज ड ़ ॉ हाथ बात गीत जीत दीप',
    ],
    8,
    ['top-row', 'inscript']
  ),

  // Chapter 9: Bottom Row Mapping (ॆ ं म न व ल स , . य)
  createLesson(
    'hi-keys-9',
    'अध्याय 9: सम्पूर्ण निचली पंक्ति (Complete Bottom Row)',
    'hi',
    'keys',
    'beginner',
    'निचली पंक्ति कुंजियां: ॆ (Z), ं (X), म (C), न (V), व (B), ल (N), स (M), , (,), . (.), य (/)।',
    [
      'ं म न व ल स य ं म न व ल स य ं म न व ल स य',
      'मन वन लस सम नम नव मलय नवल सरल वसन मलय',
      'हंस रंग संग चंपक मंदिर चंदन सुंदर नंदन मंगल',
      'ं म न व ल स य मन वन लस सम नम नव मलय सरल',
    ],
    9,
    ['bottom-row', 'inscript']
  ),

  // Chapter 10: Special Hindi Characters & Numerals (१ २ ३ ४ ५ ६ ७ ८ ९ ० ₹ । ॥)
  createLesson(
    'hi-keys-10',
    'अध्याय 10: विशेष देवनागरी अंक व विराम चिह्न (१–० ₹ । ॥ ॰)',
    'hi',
    'combinations',
    'intermediate',
    'देवनागरी अंक: १ २ ३ ४ ५ ६ ७ ८ ९ ० (AltGr अंक रो), पूर्ण विराम । (Shift+.), दीर्घ विराम ॥ (AltGr+.), रुपया ₹ (AltGr+4)।',
    [
      '१ २ ३ ४ ५ ६ ७ ८ ९ ० । ॥ ₹ ॰ १ २ ३ ४ ५ ६ ७ ८ ९ ०',
      'मूल्य ₹ ५० है। पृष्ठ संख्या १२ पर अध्याय ३ है।',
      'सत्यमेव जयते। विद्या ददाति विनयम्॥ श्रम ही जीवन है।',
      'वर्ष २०२६ में कुल ३६५ दिन हैं। लक्ष्य १००% सफल हुआ।',
    ],
    10,
    ['numerals', 'special-characters', 'punctuation']
  ),
];
