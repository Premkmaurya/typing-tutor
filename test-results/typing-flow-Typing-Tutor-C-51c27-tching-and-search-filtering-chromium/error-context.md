# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: typing-flow.spec.ts >> Typing Tutor Complete End-to-End Flow >> Verify manual chapter selection, category switching and search filtering
- Location: e2e\typing-flow.spec.ts:138:3

# Error details

```
Error: locator.click: Error: strict mode violation: locator('button:has-text("Stories")') resolved to 17 elements:
    1) <button type="button" class="p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20 shadow-xs">…</button> aka getByRole('button', { name: 'EN English QWERTY Layout' })
    2) <button type="button" class="py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300">Stories</button> aka getByRole('button', { name: 'Stories', exact: true })
    3) <button type="button" role="button" aria-pressed="false" data-testid="lesson-card-en-story-1" class="w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60">…</button> aka getByTestId('lesson-card-en-story-1')
    4) <button type="button" role="button" aria-pressed="false" data-testid="lesson-card-en-story-2" class="w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60">…</button> aka getByTestId('lesson-card-en-story-2')
    5) <button type="button" role="button" aria-pressed="false" data-testid="lesson-card-en-story-3" class="w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60">…</button> aka getByTestId('lesson-card-en-story-3')
    6) <button type="button" role="button" aria-pressed="false" data-testid="lesson-card-en-story-4" class="w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60">…</button> aka getByTestId('lesson-card-en-story-4')
    7) <button type="button" role="button" aria-pressed="false" data-testid="lesson-card-en-story-5" class="w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60">…</button> aka getByTestId('lesson-card-en-story-5')
    8) <button type="button" role="button" aria-pressed="false" data-testid="lesson-card-en-story-6" class="w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60">…</button> aka getByTestId('lesson-card-en-story-6')
    9) <button type="button" role="button" aria-pressed="false" data-testid="lesson-card-en-story-7" class="w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60">…</button> aka getByTestId('lesson-card-en-story-7')
    10) <button type="button" role="button" aria-pressed="false" data-testid="lesson-card-en-story-8" class="w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60">…</button> aka getByTestId('lesson-card-en-story-8')
    ...

Call log:
  - waiting for locator('button:has-text("Stories")')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - link "अक्षर Typing" [ref=e7] [cursor=pointer]:
          - /url: /
          - generic [ref=e12]:
            - generic [ref=e13]: अक्षर
            - generic [ref=e14]: Typing
        - navigation [ref=e15]:
          - link "Dashboard" [ref=e16] [cursor=pointer]:
            - /url: /
          - link "Practice Setup" [ref=e19] [cursor=pointer]:
            - /url: /setup
          - link "Analytics" [ref=e22] [cursor=pointer]:
            - /url: /progress
      - generic [ref=e26]:
        - generic [ref=e27]:
          - button "हिन्दी (InScript)" [ref=e28] [cursor=pointer]
          - button "English" [ref=e29] [cursor=pointer]
        - button "Mute sound" [ref=e30] [cursor=pointer]
        - button "Toggle theme" [ref=e35] [cursor=pointer]
        - link [ref=e42] [cursor=pointer]:
          - /url: /setup
          - button "Start Practice" [ref=e43]
  - main [ref=e44]:
    - generic [ref=e45]:
      - generic [ref=e46]:
        - heading "Practice Setup & Curriculum" [level=1] [ref=e47]
        - paragraph [ref=e48]: Select language, target curriculum category, difficulty, practice duration, and choose any chapter.
      - generic [ref=e49]:
        - generic [ref=e50]:
          - generic [ref=e51]: 1. Language & Keyboard Layout
          - generic [ref=e52]:
            - button "क हिन्दी InScript Layout Official Devanagari InScript layout covering all swar, vyanjan, matras, halants, and conjuncts." [ref=e53] [cursor=pointer]:
              - generic [ref=e54]: क
              - generic [ref=e55]:
                - generic [ref=e56]:
                  - heading "हिन्दी" [level=3] [ref=e57]
                  - generic [ref=e58]: InScript Layout
                - paragraph [ref=e59]: Official Devanagari InScript layout covering all swar, vyanjan, matras, halants, and conjuncts.
            - button "EN English QWERTY Layout Standard US QWERTY keyboard curriculum spanning home row, numbers, words, and long stories." [ref=e60] [cursor=pointer]:
              - generic [ref=e61]: EN
              - generic [ref=e62]:
                - generic [ref=e63]:
                  - heading "English" [level=3] [ref=e64]
                  - generic [ref=e65]: QWERTY Layout
                - paragraph [ref=e66]: Standard US QWERTY keyboard curriculum spanning home row, numbers, words, and long stories.
        - generic [ref=e67]:
          - generic [ref=e68]: 2. Practice Duration (Session will continue seamlessly through multiple passages)
          - generic [ref=e69]:
            - button "Unlimited" [ref=e70] [cursor=pointer]
            - button "1 Minute" [ref=e74] [cursor=pointer]
            - button "3 Minutes" [ref=e78] [cursor=pointer]
            - button "5 Minutes" [ref=e82] [cursor=pointer]
            - button "10 Minutes" [ref=e86] [cursor=pointer]
        - generic [ref=e90]:
          - generic [ref=e91]: 3. Curriculum Category
          - generic [ref=e92]:
            - button "All Chapters" [ref=e93] [cursor=pointer]
            - button "Keys" [ref=e94] [cursor=pointer]
            - button "Combinations" [ref=e95] [cursor=pointer]
            - button "Words" [ref=e96] [cursor=pointer]
            - button "Sentences" [ref=e97] [cursor=pointer]
            - button "Paragraphs" [ref=e98] [cursor=pointer]
            - button "Stories" [ref=e99] [cursor=pointer]
            - button "Full Tests" [ref=e100] [cursor=pointer]
        - generic [ref=e101]:
          - generic [ref=e102]:
            - generic [ref=e103]: 4. Difficulty Filter
            - generic [ref=e104]:
              - button "all" [ref=e105] [cursor=pointer]
              - button "beginner" [ref=e106] [cursor=pointer]
              - button "intermediate" [ref=e107] [cursor=pointer]
              - button "advanced" [ref=e108] [cursor=pointer]
          - generic [ref=e109]:
            - generic [ref=e110]: Search Lessons
            - textbox "Search by chapter title, topic or keyword..." [ref=e115]
        - generic [ref=e116]:
          - generic [ref=e117]:
            - generic [ref=e118]: 5. Select Chapter (51 available)
            - generic [ref=e119]: Click any chapter card to select
          - generic [ref=e120]:
            - 'button "Chapter 1: Home Row - Left Hand (A S D F) beginner keys Anchor your left hand on A, S, D, and F. Practice individual finger muscle memory. 4 passages • ~9 words/passage • Sample: asdf asdf asdf asdf aassddff fdsa f... ~1m" [pressed] [ref=e121] [cursor=pointer]':
              - generic [ref=e122]:
                - generic [ref=e123]:
                  - 'heading "Chapter 1: Home Row - Left Hand (A S D F)" [level=4] [ref=e124]'
                  - generic [ref=e125]: beginner
                  - generic [ref=e126]: keys
                - paragraph [ref=e127]: Anchor your left hand on A, S, D, and F. Practice individual finger muscle memory.
                - generic [ref=e128]:
                  - generic [ref=e129]: 4 passages
                  - generic [ref=e130]: •
                  - generic [ref=e131]: ~9 words/passage
                  - generic [ref=e132]: •
                  - generic [ref=e133]: "Sample: asdf asdf asdf asdf aassddff fdsa f..."
              - generic [ref=e134]: ~1m
            - 'button "Chapter 2: Home Row - Right Hand (J K L ;) beginner keys Anchor your right hand on J, K, L, and Semicolon. Master right-hand finger placements. 4 passages • ~9 words/passage • Sample: jkl; jkl; jkl; jkl; jjkkll;; ;lkj ;... ~1m" [ref=e140] [cursor=pointer]':
              - generic [ref=e141]:
                - generic [ref=e142]:
                  - 'heading "Chapter 2: Home Row - Right Hand (J K L ;)" [level=4] [ref=e143]'
                  - generic [ref=e144]: beginner
                  - generic [ref=e145]: keys
                - paragraph [ref=e146]: Anchor your right hand on J, K, L, and Semicolon. Master right-hand finger placements.
                - generic [ref=e147]:
                  - generic [ref=e148]: 4 passages
                  - generic [ref=e149]: •
                  - generic [ref=e150]: ~9 words/passage
                  - generic [ref=e151]: •
                  - generic [ref=e152]: "Sample: jkl; jkl; jkl; jkl; jjkkll;; ;lkj ;..."
              - generic [ref=e153]: ~1m
            - 'button "Chapter 3: Complete Home Row Coordination beginner keys Combine both hands on the home row: ASDF and JKL; with coordination patterns. 4 passages • ~14 words/passage • Sample: asdf jkl; asdf jkl; a; s l dk fj fj... ~1m" [ref=e157] [cursor=pointer]':
              - generic [ref=e158]:
                - generic [ref=e159]:
                  - 'heading "Chapter 3: Complete Home Row Coordination" [level=4] [ref=e160]'
                  - generic [ref=e161]: beginner
                  - generic [ref=e162]: keys
                - paragraph [ref=e163]: "Combine both hands on the home row: ASDF and JKL; with coordination patterns."
                - generic [ref=e164]:
                  - generic [ref=e165]: 4 passages
                  - generic [ref=e166]: •
                  - generic [ref=e167]: ~14 words/passage
                  - generic [ref=e168]: •
                  - generic [ref=e169]: "Sample: asdf jkl; asdf jkl; a; s l dk fj fj..."
              - generic [ref=e170]: ~1m
            - 'button "Chapter 4: Top Row - Left Hand (Q W E R T) beginner keys Reach upward from home row with left fingers to Q, W, E, R, and T. 4 passages • ~9 words/passage • Sample: qwer trew qwer trew qwert trewq qwe... ~1m" [ref=e174] [cursor=pointer]':
              - generic [ref=e175]:
                - generic [ref=e176]:
                  - 'heading "Chapter 4: Top Row - Left Hand (Q W E R T)" [level=4] [ref=e177]'
                  - generic [ref=e178]: beginner
                  - generic [ref=e179]: keys
                - paragraph [ref=e180]: Reach upward from home row with left fingers to Q, W, E, R, and T.
                - generic [ref=e181]:
                  - generic [ref=e182]: 4 passages
                  - generic [ref=e183]: •
                  - generic [ref=e184]: ~9 words/passage
                  - generic [ref=e185]: •
                  - generic [ref=e186]: "Sample: qwer trew qwer trew qwert trewq qwe..."
              - generic [ref=e187]: ~1m
            - 'button "Chapter 5: Top Row - Right Hand (Y U I O P) beginner keys Reach upward from home row with right fingers to Y, U, I, O, and P. 4 passages • ~9 words/passage • Sample: yuio poiuy yuio poiuy yuiop poiuy y... ~1m" [ref=e191] [cursor=pointer]':
              - generic [ref=e192]:
                - generic [ref=e193]:
                  - 'heading "Chapter 5: Top Row - Right Hand (Y U I O P)" [level=4] [ref=e194]'
                  - generic [ref=e195]: beginner
                  - generic [ref=e196]: keys
                - paragraph [ref=e197]: Reach upward from home row with right fingers to Y, U, I, O, and P.
                - generic [ref=e198]:
                  - generic [ref=e199]: 4 passages
                  - generic [ref=e200]: •
                  - generic [ref=e201]: ~9 words/passage
                  - generic [ref=e202]: •
                  - generic [ref=e203]: "Sample: yuio poiuy yuio poiuy yuiop poiuy y..."
              - generic [ref=e204]: ~1m
            - 'button "Chapter 6: Complete Top Row beginner keys Full top row integration connecting QWERTY with UIOP across both hands. 4 passages • ~9 words/passage • Sample: qwerty uiop qwerty uiop query route... ~1m" [ref=e208] [cursor=pointer]':
              - generic [ref=e209]:
                - generic [ref=e210]:
                  - 'heading "Chapter 6: Complete Top Row" [level=4] [ref=e211]'
                  - generic [ref=e212]: beginner
                  - generic [ref=e213]: keys
                - paragraph [ref=e214]: Full top row integration connecting QWERTY with UIOP across both hands.
                - generic [ref=e215]:
                  - generic [ref=e216]: 4 passages
                  - generic [ref=e217]: •
                  - generic [ref=e218]: ~9 words/passage
                  - generic [ref=e219]: •
                  - generic [ref=e220]: "Sample: qwerty uiop qwerty uiop query route..."
              - generic [ref=e221]: ~1m
            - 'button "Chapter 7: Bottom Row - Left Hand (Z X C V B) beginner keys Curl left-hand fingers downward from home row to Z, X, C, V, and B. 4 passages • ~9 words/passage • Sample: zxcv bvcxz zxcv bvcxz zxcvb bvcxz z... ~1m" [ref=e225] [cursor=pointer]':
              - generic [ref=e226]:
                - generic [ref=e227]:
                  - 'heading "Chapter 7: Bottom Row - Left Hand (Z X C V B)" [level=4] [ref=e228]'
                  - generic [ref=e229]: beginner
                  - generic [ref=e230]: keys
                - paragraph [ref=e231]: Curl left-hand fingers downward from home row to Z, X, C, V, and B.
                - generic [ref=e232]:
                  - generic [ref=e233]: 4 passages
                  - generic [ref=e234]: •
                  - generic [ref=e235]: ~9 words/passage
                  - generic [ref=e236]: •
                  - generic [ref=e237]: "Sample: zxcv bvcxz zxcv bvcxz zxcvb bvcxz z..."
              - generic [ref=e238]: ~1m
            - 'button "Chapter 8: Bottom Row - Right Hand (N M , . /) beginner keys Reach downward with right-hand fingers to N, M, comma, period, and slash. 4 passages • ~10 words/passage • Sample: nm,. nm,. nm,. nm,. men man norm mo... ~1m" [ref=e242] [cursor=pointer]':
              - generic [ref=e243]:
                - generic [ref=e244]:
                  - 'heading "Chapter 8: Bottom Row - Right Hand (N M , . /)" [level=4] [ref=e245]'
                  - generic [ref=e246]: beginner
                  - generic [ref=e247]: keys
                - paragraph [ref=e248]: Reach downward with right-hand fingers to N, M, comma, period, and slash.
                - generic [ref=e249]:
                  - generic [ref=e250]: 4 passages
                  - generic [ref=e251]: •
                  - generic [ref=e252]: ~10 words/passage
                  - generic [ref=e253]: •
                  - generic [ref=e254]: "Sample: nm,. nm,. nm,. nm,. men man norm mo..."
              - generic [ref=e255]: ~1m
            - 'button "Chapter 9: Complete Bottom Row beginner keys Integrate full bottom row keys from Z through slash across both hands. 4 passages • ~9 words/passage • Sample: zxcvbnm zxcvbnm cab man wax bin map... ~1m" [ref=e259] [cursor=pointer]':
              - generic [ref=e260]:
                - generic [ref=e261]:
                  - 'heading "Chapter 9: Complete Bottom Row" [level=4] [ref=e262]'
                  - generic [ref=e263]: beginner
                  - generic [ref=e264]: keys
                - paragraph [ref=e265]: Integrate full bottom row keys from Z through slash across both hands.
                - generic [ref=e266]:
                  - generic [ref=e267]: 4 passages
                  - generic [ref=e268]: •
                  - generic [ref=e269]: ~9 words/passage
                  - generic [ref=e270]: •
                  - generic [ref=e271]: "Sample: zxcvbnm zxcvbnm cab man wax bin map..."
              - generic [ref=e272]: ~1m
            - 'button "Chapter 10: Spacebar and Modifier Keys beginner keys Develop consistent thumb cadence on spacebar and smooth rhythm between words. 4 passages • ~25 words/passage • Sample: a s d f j k l ; q w e r t y u i o p... ~1m" [ref=e276] [cursor=pointer]':
              - generic [ref=e277]:
                - generic [ref=e278]:
                  - 'heading "Chapter 10: Spacebar and Modifier Keys" [level=4] [ref=e279]'
                  - generic [ref=e280]: beginner
                  - generic [ref=e281]: keys
                - paragraph [ref=e282]: Develop consistent thumb cadence on spacebar and smooth rhythm between words.
                - generic [ref=e283]:
                  - generic [ref=e284]: 4 passages
                  - generic [ref=e285]: •
                  - generic [ref=e286]: ~25 words/passage
                  - generic [ref=e287]: •
                  - generic [ref=e288]: "Sample: a s d f j k l ; q w e r t y u i o p..."
              - generic [ref=e289]: ~1m
            - 'button "Chapter 11: Number Row 0–9 intermediate combinations Master upper reaching finger paths to digits 1 2 3 4 5 6 7 8 9 0. 4 passages • ~14 words/passage • Sample: 12345 67890 12345 67890 10 29 38 47... ~1m" [ref=e293] [cursor=pointer]':
              - generic [ref=e294]:
                - generic [ref=e295]:
                  - 'heading "Chapter 11: Number Row 0–9" [level=4] [ref=e296]'
                  - generic [ref=e297]: intermediate
                  - generic [ref=e298]: combinations
                - paragraph [ref=e299]: Master upper reaching finger paths to digits 1 2 3 4 5 6 7 8 9 0.
                - generic [ref=e300]:
                  - generic [ref=e301]: 4 passages
                  - generic [ref=e302]: •
                  - generic [ref=e303]: ~14 words/passage
                  - generic [ref=e304]: •
                  - generic [ref=e305]: "Sample: 12345 67890 12345 67890 10 29 38 47..."
              - generic [ref=e306]: ~1m
            - 'button "Chapter 12: Shifted Number Symbols (! @ # $ % ^ & * ( )) intermediate combinations Practice Shift key combinations with number keys to type standard symbols. 4 passages • ~23 words/passage • Sample: ! @ # $ % ^ & * ( ) ! @ # $ % ^ & *... ~1m" [ref=e310] [cursor=pointer]':
              - generic [ref=e311]:
                - generic [ref=e312]:
                  - 'heading "Chapter 12: Shifted Number Symbols (! @ # $ % ^ & * ( ))" [level=4] [ref=e313]'
                  - generic [ref=e314]: intermediate
                  - generic [ref=e315]: combinations
                - paragraph [ref=e316]: Practice Shift key combinations with number keys to type standard symbols.
                - generic [ref=e317]:
                  - generic [ref=e318]: 4 passages
                  - generic [ref=e319]: •
                  - generic [ref=e320]: ~23 words/passage
                  - generic [ref=e321]: •
                  - generic [ref=e322]: "Sample: ! @ # $ % ^ & * ( ) ! @ # $ % ^ & *..."
              - generic [ref=e323]: ~1m
            - 'button "Chapter 13: Common Punctuation (. , ; : ? ! \" '') intermediate combinations Build precision typing periods, commas, semicolons, colons, question marks, and quotes. 4 passages • ~10 words/passage • Sample: Yes, really? No; wait: \"Stop!\" Did ... ~1m" [ref=e327] [cursor=pointer]':
              - generic [ref=e328]:
                - generic [ref=e329]:
                  - 'heading "Chapter 13: Common Punctuation (. , ; : ? ! \" '')" [level=4] [ref=e330]'
                  - generic [ref=e331]: intermediate
                  - generic [ref=e332]: combinations
                - paragraph [ref=e333]: Build precision typing periods, commas, semicolons, colons, question marks, and quotes.
                - generic [ref=e334]:
                  - generic [ref=e335]: 4 passages
                  - generic [ref=e336]: •
                  - generic [ref=e337]: ~10 words/passage
                  - generic [ref=e338]: •
                  - generic [ref=e339]: "Sample: Yes, really? No; wait: \"Stop!\" Did ..."
              - generic [ref=e340]: ~1m
            - 'button "Chapter 14: Symbols and Brackets ([ ] { } < > / \\ | ~ `) intermediate combinations Reach brackets, braces, angle brackets, slashes, and code symbols. 4 passages • ~8 words/passage • Sample: [data] {code} <element> ~/home/path... ~1m" [ref=e344] [cursor=pointer]':
              - generic [ref=e345]:
                - generic [ref=e346]:
                  - 'heading "Chapter 14: Symbols and Brackets ([ ] { } < > / \\ | ~ `)" [level=4] [ref=e347]'
                  - generic [ref=e348]: intermediate
                  - generic [ref=e349]: combinations
                - paragraph [ref=e350]: Reach brackets, braces, angle brackets, slashes, and code symbols.
                - generic [ref=e351]:
                  - generic [ref=e352]: 4 passages
                  - generic [ref=e353]: •
                  - generic [ref=e354]: ~8 words/passage
                  - generic [ref=e355]: •
                  - generic [ref=e356]: "Sample: [data] {code} <element> ~/home/path..."
              - generic [ref=e357]: ~1m
            - 'button "Chapter 15: Capital Letters and Shift Combinations intermediate combinations Coordinate left and right Shift keys for alternating capitalized words and acronyms. 4 passages • ~10 words/passage • Sample: London Paris Tokyo New York New Del... ~1m" [ref=e361] [cursor=pointer]':
              - generic [ref=e362]:
                - generic [ref=e363]:
                  - 'heading "Chapter 15: Capital Letters and Shift Combinations" [level=4] [ref=e364]'
                  - generic [ref=e365]: intermediate
                  - generic [ref=e366]: combinations
                - paragraph [ref=e367]: Coordinate left and right Shift keys for alternating capitalized words and acronyms.
                - generic [ref=e368]:
                  - generic [ref=e369]: 4 passages
                  - generic [ref=e370]: •
                  - generic [ref=e371]: ~10 words/passage
                  - generic [ref=e372]: •
                  - generic [ref=e373]: "Sample: London Paris Tokyo New York New Del..."
              - generic [ref=e374]: ~1m
            - 'button "Chapter 16: Mixed Keyboard Practice intermediate combinations Fluid transition between letters, numbers, punctuation, and symbols. 4 passages • ~11 words/passage • Sample: The 12 items in Box #A-4 costs $18.... ~1m" [ref=e378] [cursor=pointer]':
              - generic [ref=e379]:
                - generic [ref=e380]:
                  - 'heading "Chapter 16: Mixed Keyboard Practice" [level=4] [ref=e381]'
                  - generic [ref=e382]: intermediate
                  - generic [ref=e383]: combinations
                - paragraph [ref=e384]: Fluid transition between letters, numbers, punctuation, and symbols.
                - generic [ref=e385]:
                  - generic [ref=e386]: 4 passages
                  - generic [ref=e387]: •
                  - generic [ref=e388]: ~11 words/passage
                  - generic [ref=e389]: •
                  - generic [ref=e390]: "Sample: The 12 items in Box #A-4 costs $18...."
              - generic [ref=e391]: ~1m
            - 'button "Essential Two-Letter Words beginner words Common two-letter connecting words and prepositions for typing velocity. 4 passages • ~24 words/passage • Sample: am an as at be by do go he if in is... ~1m" [ref=e395] [cursor=pointer]':
              - generic [ref=e396]:
                - generic [ref=e397]:
                  - heading "Essential Two-Letter Words" [level=4] [ref=e398]
                  - generic [ref=e399]: beginner
                  - generic [ref=e400]: words
                - paragraph [ref=e401]: Common two-letter connecting words and prepositions for typing velocity.
                - generic [ref=e402]:
                  - generic [ref=e403]: 4 passages
                  - generic [ref=e404]: •
                  - generic [ref=e405]: ~24 words/passage
                  - generic [ref=e406]: •
                  - generic [ref=e407]: "Sample: am an as at be by do go he if in is..."
              - generic [ref=e408]: ~1m
            - 'button "Fundamental Three-Letter Words beginner words High-frequency three-letter nouns, verbs, and pronouns. 4 passages • ~35 words/passage • Sample: the and for you say but his not her... ~1m" [ref=e412] [cursor=pointer]':
              - generic [ref=e413]:
                - generic [ref=e414]:
                  - heading "Fundamental Three-Letter Words" [level=4] [ref=e415]
                  - generic [ref=e416]: beginner
                  - generic [ref=e417]: words
                - paragraph [ref=e418]: High-frequency three-letter nouns, verbs, and pronouns.
                - generic [ref=e419]:
                  - generic [ref=e420]: 4 passages
                  - generic [ref=e421]: •
                  - generic [ref=e422]: ~35 words/passage
                  - generic [ref=e423]: •
                  - generic [ref=e424]: "Sample: the and for you say but his not her..."
              - generic [ref=e425]: ~1m
            - 'button "Core Four-Letter Words intermediate words Crucial 4-letter vocabulary establishing finger coordination and rhythm. 4 passages • ~45 words/passage • Sample: time year work over back think afte... ~2m" [ref=e429] [cursor=pointer]':
              - generic [ref=e430]:
                - generic [ref=e431]:
                  - heading "Core Four-Letter Words" [level=4] [ref=e432]
                  - generic [ref=e433]: intermediate
                  - generic [ref=e434]: words
                - paragraph [ref=e435]: Crucial 4-letter vocabulary establishing finger coordination and rhythm.
                - generic [ref=e436]:
                  - generic [ref=e437]: 4 passages
                  - generic [ref=e438]: •
                  - generic [ref=e439]: ~45 words/passage
                  - generic [ref=e440]: •
                  - generic [ref=e441]: "Sample: time year work over back think afte..."
              - generic [ref=e442]: ~2m
            - 'button "Five-Letter Everyday Vocabulary intermediate words Versatile 5-letter words with common prefixes and suffixes. 4 passages • ~40 words/passage • Sample: about after again along begin below... ~2m" [ref=e446] [cursor=pointer]':
              - generic [ref=e447]:
                - generic [ref=e448]:
                  - heading "Five-Letter Everyday Vocabulary" [level=4] [ref=e449]
                  - generic [ref=e450]: intermediate
                  - generic [ref=e451]: words
                - paragraph [ref=e452]: Versatile 5-letter words with common prefixes and suffixes.
                - generic [ref=e453]:
                  - generic [ref=e454]: 4 passages
                  - generic [ref=e455]: •
                  - generic [ref=e456]: ~40 words/passage
                  - generic [ref=e457]: •
                  - generic [ref=e458]: "Sample: about after again along begin below..."
              - generic [ref=e459]: ~2m
            - 'button "Six-to-Eight Letter Word Practice intermediate words Longer words that develop sustained typing consistency. 4 passages • ~35 words/passage • Sample: action animal answer belong change ... ~2m" [ref=e463] [cursor=pointer]':
              - generic [ref=e464]:
                - generic [ref=e465]:
                  - heading "Six-to-Eight Letter Word Practice" [level=4] [ref=e466]
                  - generic [ref=e467]: intermediate
                  - generic [ref=e468]: words
                - paragraph [ref=e469]: Longer words that develop sustained typing consistency.
                - generic [ref=e470]:
                  - generic [ref=e471]: 4 passages
                  - generic [ref=e472]: •
                  - generic [ref=e473]: ~35 words/passage
                  - generic [ref=e474]: •
                  - generic [ref=e475]: "Sample: action animal answer belong change ..."
              - generic [ref=e476]: ~2m
            - 'button "Difficult Spelling & Double Letters advanced words Tackle awkward spelling patterns, silent letters, and doubled consonants. 4 passages • ~26 words/passage • Sample: accommodate achievement beautiful c... ~2m" [ref=e480] [cursor=pointer]':
              - generic [ref=e481]:
                - generic [ref=e482]:
                  - heading "Difficult Spelling & Double Letters" [level=4] [ref=e483]
                  - generic [ref=e484]: advanced
                  - generic [ref=e485]: words
                - paragraph [ref=e486]: Tackle awkward spelling patterns, silent letters, and doubled consonants.
                - generic [ref=e487]:
                  - generic [ref=e488]: 4 passages
                  - generic [ref=e489]: •
                  - generic [ref=e490]: ~26 words/passage
                  - generic [ref=e491]: •
                  - generic [ref=e492]: "Sample: accommodate achievement beautiful c..."
              - generic [ref=e493]: ~2m
            - 'button "Advanced Polysyllabic Vocabulary advanced words Master long technical and professional vocabulary with precision keystrokes. 4 passages • ~20 words/passage • Sample: architecture algorithm configuratio... ~2m" [ref=e497] [cursor=pointer]':
              - generic [ref=e498]:
                - generic [ref=e499]:
                  - heading "Advanced Polysyllabic Vocabulary" [level=4] [ref=e500]
                  - generic [ref=e501]: advanced
                  - generic [ref=e502]: words
                - paragraph [ref=e503]: Master long technical and professional vocabulary with precision keystrokes.
                - generic [ref=e504]:
                  - generic [ref=e505]: 4 passages
                  - generic [ref=e506]: •
                  - generic [ref=e507]: ~20 words/passage
                  - generic [ref=e508]: •
                  - generic [ref=e509]: "Sample: architecture algorithm configuratio..."
              - generic [ref=e510]: ~2m
            - 'button "Daily Routine & Conversational Sentences beginner sentences Natural daily conversational sentences for practical typing fluency. 10 passages • ~12 words/passage • Sample: Good morning, I hope you have a won... ~1m" [ref=e514] [cursor=pointer]':
              - generic [ref=e515]:
                - generic [ref=e516]:
                  - heading "Daily Routine & Conversational Sentences" [level=4] [ref=e517]
                  - generic [ref=e518]: beginner
                  - generic [ref=e519]: sentences
                - paragraph [ref=e520]: Natural daily conversational sentences for practical typing fluency.
                - generic [ref=e521]:
                  - generic [ref=e522]: 10 passages
                  - generic [ref=e523]: •
                  - generic [ref=e524]: ~12 words/passage
                  - generic [ref=e525]: •
                  - generic [ref=e526]: "Sample: Good morning, I hope you have a won..."
              - generic [ref=e527]: ~1m
            - 'button "Education & School Life Sentences beginner sentences Sentences centered around classroom, reading, knowledge, and study habits. 10 passages • ~9 words/passage • Sample: Education opens endless doors to pe... ~1m" [ref=e531] [cursor=pointer]':
              - generic [ref=e532]:
                - generic [ref=e533]:
                  - heading "Education & School Life Sentences" [level=4] [ref=e534]
                  - generic [ref=e535]: beginner
                  - generic [ref=e536]: sentences
                - paragraph [ref=e537]: Sentences centered around classroom, reading, knowledge, and study habits.
                - generic [ref=e538]:
                  - generic [ref=e539]: 10 passages
                  - generic [ref=e540]: •
                  - generic [ref=e541]: ~9 words/passage
                  - generic [ref=e542]: •
                  - generic [ref=e543]: "Sample: Education opens endless doors to pe..."
              - generic [ref=e544]: ~1m
            - 'button "Technology & Digital Communication intermediate sentences Vocabulary and syntax reflecting contemporary software, digital tools, and computing. 10 passages • ~12 words/passage • Sample: Clean code is easy to read, test, d... ~1m" [ref=e548] [cursor=pointer]':
              - generic [ref=e549]:
                - generic [ref=e550]:
                  - heading "Technology & Digital Communication" [level=4] [ref=e551]
                  - generic [ref=e552]: intermediate
                  - generic [ref=e553]: sentences
                - paragraph [ref=e554]: Vocabulary and syntax reflecting contemporary software, digital tools, and computing.
                - generic [ref=e555]:
                  - generic [ref=e556]: 10 passages
                  - generic [ref=e557]: •
                  - generic [ref=e558]: ~12 words/passage
                  - generic [ref=e559]: •
                  - generic [ref=e560]: "Sample: Clean code is easy to read, test, d..."
              - generic [ref=e561]: ~1m
            - 'button "Professional & Business Communication intermediate sentences Professional emails, memos, project updates, and meeting correspondence. 10 passages • ~8 words/passage • Sample: Please find attached the quarterly ... ~1m" [ref=e565] [cursor=pointer]':
              - generic [ref=e566]:
                - generic [ref=e567]:
                  - heading "Professional & Business Communication" [level=4] [ref=e568]
                  - generic [ref=e569]: intermediate
                  - generic [ref=e570]: sentences
                - paragraph [ref=e571]: Professional emails, memos, project updates, and meeting correspondence.
                - generic [ref=e572]:
                  - generic [ref=e573]: 10 passages
                  - generic [ref=e574]: •
                  - generic [ref=e575]: ~8 words/passage
                  - generic [ref=e576]: •
                  - generic [ref=e577]: "Sample: Please find attached the quarterly ..."
              - generic [ref=e578]: ~1m
            - 'button "Punctuation-Rich & Complex Sentences advanced sentences Sentences featuring semicolons, quotation marks, dashes, and varied punctuation. 10 passages • ~11 words/passage • Sample: To succeed in typing, practice dail... ~1m" [ref=e582] [cursor=pointer]':
              - generic [ref=e583]:
                - generic [ref=e584]:
                  - heading "Punctuation-Rich & Complex Sentences" [level=4] [ref=e585]
                  - generic [ref=e586]: advanced
                  - generic [ref=e587]: sentences
                - paragraph [ref=e588]: Sentences featuring semicolons, quotation marks, dashes, and varied punctuation.
                - generic [ref=e589]:
                  - generic [ref=e590]: 10 passages
                  - generic [ref=e591]: •
                  - generic [ref=e592]: ~11 words/passage
                  - generic [ref=e593]: •
                  - generic [ref=e594]: "Sample: To succeed in typing, practice dail..."
              - generic [ref=e595]: ~1m
            - 'button "Morning Routines and Daily Focus intermediate paragraphs Reflective passage on starting the morning with clarity and intention. 3 passages • ~53 words/passage • Sample: A calm morning routine sets the ton... ~2m" [ref=e599] [cursor=pointer]':
              - generic [ref=e600]:
                - generic [ref=e601]:
                  - heading "Morning Routines and Daily Focus" [level=4] [ref=e602]
                  - generic [ref=e603]: intermediate
                  - generic [ref=e604]: paragraphs
                - paragraph [ref=e605]: Reflective passage on starting the morning with clarity and intention.
                - generic [ref=e606]:
                  - generic [ref=e607]: 3 passages
                  - generic [ref=e608]: •
                  - generic [ref=e609]: ~53 words/passage
                  - generic [ref=e610]: •
                  - generic [ref=e611]: "Sample: A calm morning routine sets the ton..."
              - generic [ref=e612]: ~2m
            - 'button "The Transformative Power of Education intermediate paragraphs A thought-provoking paragraph on learning, inquiry, and human development. 3 passages • ~54 words/passage • Sample: Education is not merely the accumul... ~2m" [ref=e616] [cursor=pointer]':
              - generic [ref=e617]:
                - generic [ref=e618]:
                  - heading "The Transformative Power of Education" [level=4] [ref=e619]
                  - generic [ref=e620]: intermediate
                  - generic [ref=e621]: paragraphs
                - paragraph [ref=e622]: A thought-provoking paragraph on learning, inquiry, and human development.
                - generic [ref=e623]:
                  - generic [ref=e624]: 3 passages
                  - generic [ref=e625]: •
                  - generic [ref=e626]: ~54 words/passage
                  - generic [ref=e627]: •
                  - generic [ref=e628]: "Sample: Education is not merely the accumul..."
              - generic [ref=e629]: ~2m
            - 'button "Technology and Human Connection intermediate paragraphs Examining how modern communication networks reshape society. 3 passages • ~46 words/passage • Sample: Digital technology has connected th... ~2m" [ref=e633] [cursor=pointer]':
              - generic [ref=e634]:
                - generic [ref=e635]:
                  - heading "Technology and Human Connection" [level=4] [ref=e636]
                  - generic [ref=e637]: intermediate
                  - generic [ref=e638]: paragraphs
                - paragraph [ref=e639]: Examining how modern communication networks reshape society.
                - generic [ref=e640]:
                  - generic [ref=e641]: 3 passages
                  - generic [ref=e642]: •
                  - generic [ref=e643]: ~46 words/passage
                  - generic [ref=e644]: •
                  - generic [ref=e645]: "Sample: Digital technology has connected th..."
              - generic [ref=e646]: ~2m
            - 'button "Nature, Forests and Environmental Harmony intermediate paragraphs Appreciating ecological balance and preserving the natural world. 3 passages • ~50 words/passage • Sample: Forests are the living lungs of our... ~2m" [ref=e650] [cursor=pointer]':
              - generic [ref=e651]:
                - generic [ref=e652]:
                  - heading "Nature, Forests and Environmental Harmony" [level=4] [ref=e653]
                  - generic [ref=e654]: intermediate
                  - generic [ref=e655]: paragraphs
                - paragraph [ref=e656]: Appreciating ecological balance and preserving the natural world.
                - generic [ref=e657]:
                  - generic [ref=e658]: 3 passages
                  - generic [ref=e659]: •
                  - generic [ref=e660]: ~50 words/passage
                  - generic [ref=e661]: •
                  - generic [ref=e662]: "Sample: Forests are the living lungs of our..."
              - generic [ref=e663]: ~2m
            - 'button "The Science of Habit and Personal Mastery advanced paragraphs How small incremental improvements compound into remarkable achievements. 3 passages • ~44 words/passage • Sample: Significant life changes rarely occ... ~2m" [ref=e667] [cursor=pointer]':
              - generic [ref=e668]:
                - generic [ref=e669]:
                  - heading "The Science of Habit and Personal Mastery" [level=4] [ref=e670]
                  - generic [ref=e671]: advanced
                  - generic [ref=e672]: paragraphs
                - paragraph [ref=e673]: How small incremental improvements compound into remarkable achievements.
                - generic [ref=e674]:
                  - generic [ref=e675]: 3 passages
                  - generic [ref=e676]: •
                  - generic [ref=e677]: ~44 words/passage
                  - generic [ref=e678]: •
                  - generic [ref=e679]: "Sample: Significant life changes rarely occ..."
              - generic [ref=e680]: ~2m
            - 'button "History and the Evolution of Written Language advanced paragraphs Tracing the path from ancient clay tablets to modern digital keyboards. 3 passages • ~40 words/passage • Sample: The invention of writing stands amo... ~2m" [ref=e684] [cursor=pointer]':
              - generic [ref=e685]:
                - generic [ref=e686]:
                  - heading "History and the Evolution of Written Language" [level=4] [ref=e687]
                  - generic [ref=e688]: advanced
                  - generic [ref=e689]: paragraphs
                - paragraph [ref=e690]: Tracing the path from ancient clay tablets to modern digital keyboards.
                - generic [ref=e691]:
                  - generic [ref=e692]: 3 passages
                  - generic [ref=e693]: •
                  - generic [ref=e694]: ~40 words/passage
                  - generic [ref=e695]: •
                  - generic [ref=e696]: "Sample: The invention of writing stands amo..."
              - generic [ref=e697]: ~2m
            - 'button "Story 1: A Day in the Village intermediate stories A peaceful narrative chronicling morning life and community spirit in a rural hamlet. 3 passages • ~48 words/passage • Sample: The morning sun rose gently over th... ~2m" [ref=e701] [cursor=pointer]':
              - generic [ref=e702]:
                - generic [ref=e703]:
                  - 'heading "Story 1: A Day in the Village" [level=4] [ref=e704]'
                  - generic [ref=e705]: intermediate
                  - generic [ref=e706]: stories
                - paragraph [ref=e707]: A peaceful narrative chronicling morning life and community spirit in a rural hamlet.
                - generic [ref=e708]:
                  - generic [ref=e709]: 3 passages
                  - generic [ref=e710]: •
                  - generic [ref=e711]: ~48 words/passage
                  - generic [ref=e712]: •
                  - generic [ref=e713]: "Sample: The morning sun rose gently over th..."
              - generic [ref=e714]: ~2m
            - 'button "Story 2: The Honest Student intermediate stories A story about integrity, difficult choices, and moral courage in school. 3 passages • ~53 words/passage • Sample: Rahul was an earnest student who at... ~2m" [ref=e718] [cursor=pointer]':
              - generic [ref=e719]:
                - generic [ref=e720]:
                  - 'heading "Story 2: The Honest Student" [level=4] [ref=e721]'
                  - generic [ref=e722]: intermediate
                  - generic [ref=e723]: stories
                - paragraph [ref=e724]: A story about integrity, difficult choices, and moral courage in school.
                - generic [ref=e725]:
                  - generic [ref=e726]: 3 passages
                  - generic [ref=e727]: •
                  - generic [ref=e728]: ~53 words/passage
                  - generic [ref=e729]: •
                  - generic [ref=e730]: "Sample: Rahul was an earnest student who at..."
              - generic [ref=e731]: ~2m
            - 'button "Story 3: The Clever Farmer intermediate stories How ingenuity, perseverance, and sustainable farming rescued a village from drought. 3 passages • ~41 words/passage • Sample: In an arid valley where seasonal ra... ~2m" [ref=e735] [cursor=pointer]':
              - generic [ref=e736]:
                - generic [ref=e737]:
                  - 'heading "Story 3: The Clever Farmer" [level=4] [ref=e738]'
                  - generic [ref=e739]: intermediate
                  - generic [ref=e740]: stories
                - paragraph [ref=e741]: How ingenuity, perseverance, and sustainable farming rescued a village from drought.
                - generic [ref=e742]:
                  - generic [ref=e743]: 3 passages
                  - generic [ref=e744]: •
                  - generic [ref=e745]: ~41 words/passage
                  - generic [ref=e746]: •
                  - generic [ref=e747]: "Sample: In an arid valley where seasonal ra..."
              - generic [ref=e748]: ~2m
            - 'button "Story 4: A Journey by Train intermediate stories The sights, sounds, and vibrant human encounters during a cross-country railway adventure. 3 passages • ~43 words/passage • Sample: The rhythmic clatter of iron wheels... ~2m" [ref=e752] [cursor=pointer]':
              - generic [ref=e753]:
                - generic [ref=e754]:
                  - 'heading "Story 4: A Journey by Train" [level=4] [ref=e755]'
                  - generic [ref=e756]: intermediate
                  - generic [ref=e757]: stories
                - paragraph [ref=e758]: The sights, sounds, and vibrant human encounters during a cross-country railway adventure.
                - generic [ref=e759]:
                  - generic [ref=e760]: 3 passages
                  - generic [ref=e761]: •
                  - generic [ref=e762]: ~43 words/passage
                  - generic [ref=e763]: •
                  - generic [ref=e764]: "Sample: The rhythmic clatter of iron wheels..."
              - generic [ref=e765]: ~2m
            - 'button "Story 5: The Power of Hard Work advanced stories A portrait of dedication, resilience, and triumph against overwhelming odds. 3 passages • ~50 words/passage • Sample: Pooja grew up in a humble household... ~2m" [ref=e769] [cursor=pointer]':
              - generic [ref=e770]:
                - generic [ref=e771]:
                  - 'heading "Story 5: The Power of Hard Work" [level=4] [ref=e772]'
                  - generic [ref=e773]: advanced
                  - generic [ref=e774]: stories
                - paragraph [ref=e775]: A portrait of dedication, resilience, and triumph against overwhelming odds.
                - generic [ref=e776]:
                  - generic [ref=e777]: 3 passages
                  - generic [ref=e778]: •
                  - generic [ref=e779]: ~50 words/passage
                  - generic [ref=e780]: •
                  - generic [ref=e781]: "Sample: Pooja grew up in a humble household..."
              - generic [ref=e782]: ~2m
            - 'button "Story 6: A Visit to the Library intermediate stories Discovering quiet wonder and ancient wisdom within the peaceful halls of a city library. 3 passages • ~48 words/passage • Sample: Stepping inside the majestic centra... ~2m" [ref=e786] [cursor=pointer]':
              - generic [ref=e787]:
                - generic [ref=e788]:
                  - 'heading "Story 6: A Visit to the Library" [level=4] [ref=e789]'
                  - generic [ref=e790]: intermediate
                  - generic [ref=e791]: stories
                - paragraph [ref=e792]: Discovering quiet wonder and ancient wisdom within the peaceful halls of a city library.
                - generic [ref=e793]:
                  - generic [ref=e794]: 3 passages
                  - generic [ref=e795]: •
                  - generic [ref=e796]: ~48 words/passage
                  - generic [ref=e797]: •
                  - generic [ref=e798]: "Sample: Stepping inside the majestic centra..."
              - generic [ref=e799]: ~2m
            - 'button "Story 7: An Unexpected Friendship intermediate stories How two contrasting personalities found common ground through music and empathy. 3 passages • ~41 words/passage • Sample: Vikram was an introverted computer ... ~2m" [ref=e803] [cursor=pointer]':
              - generic [ref=e804]:
                - generic [ref=e805]:
                  - 'heading "Story 7: An Unexpected Friendship" [level=4] [ref=e806]'
                  - generic [ref=e807]: intermediate
                  - generic [ref=e808]: stories
                - paragraph [ref=e809]: How two contrasting personalities found common ground through music and empathy.
                - generic [ref=e810]:
                  - generic [ref=e811]: 3 passages
                  - generic [ref=e812]: •
                  - generic [ref=e813]: ~41 words/passage
                  - generic [ref=e814]: •
                  - generic [ref=e815]: "Sample: Vikram was an introverted computer ..."
              - generic [ref=e816]: ~2m
            - 'button "Story 8: The Importance of Time advanced stories An inspiring parable on valuing fleeting moments and guarding our life energy. 3 passages • ~51 words/passage • Sample: An ancient philosopher once gathere... ~2m" [ref=e820] [cursor=pointer]':
              - generic [ref=e821]:
                - generic [ref=e822]:
                  - 'heading "Story 8: The Importance of Time" [level=4] [ref=e823]'
                  - generic [ref=e824]: advanced
                  - generic [ref=e825]: stories
                - paragraph [ref=e826]: An inspiring parable on valuing fleeting moments and guarding our life energy.
                - generic [ref=e827]:
                  - generic [ref=e828]: 3 passages
                  - generic [ref=e829]: •
                  - generic [ref=e830]: ~51 words/passage
                  - generic [ref=e831]: •
                  - generic [ref=e832]: "Sample: An ancient philosopher once gathere..."
              - generic [ref=e833]: ~2m
            - 'button "Story 9: The Mountain Climber advanced stories Tackling freezing winds and sheer cliffs to achieve the pinnacle summit. 3 passages • ~45 words/passage • Sample: At four o''clock in the morning, und... ~2m" [ref=e837] [cursor=pointer]':
              - generic [ref=e838]:
                - generic [ref=e839]:
                  - 'heading "Story 9: The Mountain Climber" [level=4] [ref=e840]'
                  - generic [ref=e841]: advanced
                  - generic [ref=e842]: stories
                - paragraph [ref=e843]: Tackling freezing winds and sheer cliffs to achieve the pinnacle summit.
                - generic [ref=e844]:
                  - generic [ref=e845]: 3 passages
                  - generic [ref=e846]: •
                  - generic [ref=e847]: ~45 words/passage
                  - generic [ref=e848]: •
                  - generic [ref=e849]: "Sample: At four o'clock in the morning, und..."
              - generic [ref=e850]: ~2m
            - 'button "Story 10: The Ancient Clockmaker advanced stories Craftsmanship, patient precision, and devotion to timeless horological art. 3 passages • ~41 words/passage • Sample: In a quiet cobblestone alley tucked... ~2m" [ref=e854] [cursor=pointer]':
              - generic [ref=e855]:
                - generic [ref=e856]:
                  - 'heading "Story 10: The Ancient Clockmaker" [level=4] [ref=e857]'
                  - generic [ref=e858]: advanced
                  - generic [ref=e859]: stories
                - paragraph [ref=e860]: Craftsmanship, patient precision, and devotion to timeless horological art.
                - generic [ref=e861]:
                  - generic [ref=e862]: 3 passages
                  - generic [ref=e863]: •
                  - generic [ref=e864]: ~41 words/passage
                  - generic [ref=e865]: •
                  - generic [ref=e866]: "Sample: In a quiet cobblestone alley tucked..."
              - generic [ref=e867]: ~2m
            - 'button "Story 11: The Village Potter intermediate stories The meditative art of molding wet clay into vessels of beauty and utility. 3 passages • ~48 words/passage • Sample: Beside a flowing riverbank, an arti... ~2m" [ref=e871] [cursor=pointer]':
              - generic [ref=e872]:
                - generic [ref=e873]:
                  - 'heading "Story 11: The Village Potter" [level=4] [ref=e874]'
                  - generic [ref=e875]: intermediate
                  - generic [ref=e876]: stories
                - paragraph [ref=e877]: The meditative art of molding wet clay into vessels of beauty and utility.
                - generic [ref=e878]:
                  - generic [ref=e879]: 3 passages
                  - generic [ref=e880]: •
                  - generic [ref=e881]: ~48 words/passage
                  - generic [ref=e882]: •
                  - generic [ref=e883]: "Sample: Beside a flowing riverbank, an arti..."
              - generic [ref=e884]: ~2m
            - 'button "Story 12: The Forest Ranger intermediate stories Guarding wildlife sanctuaries and preserving ancient wilderness for future generations. 3 passages • ~44 words/passage • Sample: Deep within the Jim Corbett wildern... ~2m" [ref=e888] [cursor=pointer]':
              - generic [ref=e889]:
                - generic [ref=e890]:
                  - 'heading "Story 12: The Forest Ranger" [level=4] [ref=e891]'
                  - generic [ref=e892]: intermediate
                  - generic [ref=e893]: stories
                - paragraph [ref=e894]: Guarding wildlife sanctuaries and preserving ancient wilderness for future generations.
                - generic [ref=e895]:
                  - generic [ref=e896]: 3 passages
                  - generic [ref=e897]: •
                  - generic [ref=e898]: ~44 words/passage
                  - generic [ref=e899]: •
                  - generic [ref=e900]: "Sample: Deep within the Jim Corbett wildern..."
              - generic [ref=e901]: ~2m
            - 'button "Story 13: The Starlight Prism advanced stories A scientific curiosity in an optical laboratory yields an unexpected breakthrough. 3 passages • ~38 words/passage • Sample: Working late into the quiet evening... ~2m" [ref=e905] [cursor=pointer]':
              - generic [ref=e906]:
                - generic [ref=e907]:
                  - 'heading "Story 13: The Starlight Prism" [level=4] [ref=e908]'
                  - generic [ref=e909]: advanced
                  - generic [ref=e910]: stories
                - paragraph [ref=e911]: A scientific curiosity in an optical laboratory yields an unexpected breakthrough.
                - generic [ref=e912]:
                  - generic [ref=e913]: 3 passages
                  - generic [ref=e914]: •
                  - generic [ref=e915]: ~38 words/passage
                  - generic [ref=e916]: •
                  - generic [ref=e917]: "Sample: Working late into the quiet evening..."
              - generic [ref=e918]: ~2m
            - 'button "Story 14: The Old Fisherman and the Reef intermediate stories Revitalizing a damaged marine sanctuary through traditional ecological wisdom. 3 passages • ~44 words/passage • Sample: Along the southern coast, grandfath... ~2m" [ref=e922] [cursor=pointer]':
              - generic [ref=e923]:
                - generic [ref=e924]:
                  - 'heading "Story 14: The Old Fisherman and the Reef" [level=4] [ref=e925]'
                  - generic [ref=e926]: intermediate
                  - generic [ref=e927]: stories
                - paragraph [ref=e928]: Revitalizing a damaged marine sanctuary through traditional ecological wisdom.
                - generic [ref=e929]:
                  - generic [ref=e930]: 3 passages
                  - generic [ref=e931]: •
                  - generic [ref=e932]: ~44 words/passage
                  - generic [ref=e933]: •
                  - generic [ref=e934]: "Sample: Along the southern coast, grandfath..."
              - generic [ref=e935]: ~2m
            - 'button "Story 15: The Digital Architect advanced stories Building resilient software systems that empower millions of everyday users. 3 passages • ~42 words/passage • Sample: A software engineer named Maya sat ... ~2m" [ref=e939] [cursor=pointer]':
              - generic [ref=e940]:
                - generic [ref=e941]:
                  - 'heading "Story 15: The Digital Architect" [level=4] [ref=e942]'
                  - generic [ref=e943]: advanced
                  - generic [ref=e944]: stories
                - paragraph [ref=e945]: Building resilient software systems that empower millions of everyday users.
                - generic [ref=e946]:
                  - generic [ref=e947]: 3 passages
                  - generic [ref=e948]: •
                  - generic [ref=e949]: ~42 words/passage
                  - generic [ref=e950]: •
                  - generic [ref=e951]: "Sample: A software engineer named Maya sat ..."
              - generic [ref=e952]: ~2m
            - 'button "Full Typing Test: Standard General Assessment intermediate tests Standard 5-minute typing test evaluation covering mixed vocabulary, punctuation, and numerals. 3 passages • ~16 words/passage • Sample: A complete typing evaluation measur... ~1m" [ref=e956] [cursor=pointer]':
              - generic [ref=e957]:
                - generic [ref=e958]:
                  - 'heading "Full Typing Test: Standard General Assessment" [level=4] [ref=e959]'
                  - generic [ref=e960]: intermediate
                  - generic [ref=e961]: tests
                - paragraph [ref=e962]: Standard 5-minute typing test evaluation covering mixed vocabulary, punctuation, and numerals.
                - generic [ref=e963]:
                  - generic [ref=e964]: 3 passages
                  - generic [ref=e965]: •
                  - generic [ref=e966]: ~16 words/passage
                  - generic [ref=e967]: •
                  - generic [ref=e968]: "Sample: A complete typing evaluation measur..."
              - generic [ref=e969]: ~1m
            - 'button "Full Typing Test: High-Speed Sprint Challenge advanced tests Demanding endurance test designed for advanced typists aiming for 70+ WPM precision. 3 passages • ~17 words/passage • Sample: Mastery of touch typing transforms ... ~1m" [ref=e973] [cursor=pointer]':
              - generic [ref=e974]:
                - generic [ref=e975]:
                  - 'heading "Full Typing Test: High-Speed Sprint Challenge" [level=4] [ref=e976]'
                  - generic [ref=e977]: advanced
                  - generic [ref=e978]: tests
                - paragraph [ref=e979]: Demanding endurance test designed for advanced typists aiming for 70+ WPM precision.
                - generic [ref=e980]:
                  - generic [ref=e981]: 3 passages
                  - generic [ref=e982]: •
                  - generic [ref=e983]: ~17 words/passage
                  - generic [ref=e984]: •
                  - generic [ref=e985]: "Sample: Mastery of touch typing transforms ..."
              - generic [ref=e986]: ~1m
        - generic [ref=e990]:
          - generic [ref=e994]:
            - text: "Ready to practice:"
            - strong [ref=e995]: "Chapter 1: Home Row - Left Hand (A S D F)"
          - button "Start Practice" [ref=e996] [cursor=pointer]
  - contentinfo [ref=e1000]:
    - generic [ref=e1001]:
      - paragraph [ref=e1002]: अक्षर Hindi InScript & English Typing Tutor • Verified BIS IS 13194:1991 & Unicode CLDR 43
      - paragraph [ref=e1003]: Pure Client-Side Web Application • No OS Keyboard Installation Required
```

# Test source

```ts
  43  | 
  44  |     // 4. Verify Virtual Keyboard is visible
  45  |     const keyboardTitle = page.locator('text=Devanagari InScript');
  46  |     await expect(keyboardTitle).toBeVisible();
  47  | 
  48  |     // Word 0 is 'कम': क (KeyK) + म (KeyC) + Space
  49  |     await page.keyboard.press('KeyK');
  50  |     await page.keyboard.press('KeyC');
  51  |     await page.keyboard.press('Space');
  52  | 
  53  |     // Word 1 is 'पर': प (KeyH) + र (KeyJ) + Space
  54  |     await page.keyboard.press('KeyH');
  55  |     await page.keyboard.press('KeyJ');
  56  |     await page.keyboard.press('Space');
  57  | 
  58  |     // 5. Verify Virtual key click works: click KeyT + KeyB ('तब') + Space
  59  |     const virtualKeyT = page.locator('button[aria-label*="KeyL"]').first(); // त (KeyL)
  60  |     await expect(virtualKeyT).toBeVisible();
  61  |     await virtualKeyT.click();
  62  |     const virtualKeyB = page.locator('button[aria-label*="KeyY"]').first(); // ब (KeyY)
  63  |     await virtualKeyB.click();
  64  |     const virtualSpace = page.locator('button[aria-label*="Space"]');
  65  |     await virtualSpace.click();
  66  | 
  67  |     // Verify stats are live
  68  |     const accuracy = page.locator('text=Accuracy');
  69  |     await expect(accuracy).toBeVisible();
  70  | 
  71  |     // 6. Test Pause & Resume Controls
  72  |     const pauseButton = page.locator('button:has-text("Pause")');
  73  |     await expect(pauseButton).toBeVisible();
  74  |     await pauseButton.click();
  75  |     await expect(page.locator('text=Practice Paused')).toBeVisible();
  76  | 
  77  |     const resumeButton = page.locator('button:has-text("Resume")');
  78  |     await expect(resumeButton).toBeVisible();
  79  |     await resumeButton.click();
  80  |     await expect(page.locator('text=Practice Paused')).not.toBeVisible();
  81  |   });
  82  | 
  83  |   test('Complete English QWERTY typing session and results verification', async ({ page }) => {
  84  |     // 1. Open App
  85  |     await page.goto('/');
  86  | 
  87  |     // 2. Select English Setup
  88  |     await page.goto('/setup?lang=en');
  89  |     await expect(page.locator('text=QWERTY Layout').first()).toBeVisible();
  90  | 
  91  |     // Select Chapter 1
  92  |     const chapter1 = page.locator('button:has-text("Chapter 1: Home Row - Left Hand")');
  93  |     await chapter1.click();
  94  |     await expect(chapter1).toHaveAttribute('aria-pressed', 'true');
  95  | 
  96  |     // Start Practice
  97  |     await page.click('button[data-testid="start-practice-btn"]');
  98  |     await expect(page).toHaveURL(/.*practice/);
  99  | 
  100 |     // Verify English layout indicator
  101 |     await expect(page.locator('text=English US QWERTY')).toBeVisible();
  102 | 
  103 |     // Type sequence: 'asdf' + Space
  104 |     await page.keyboard.press('KeyA');
  105 |     await page.keyboard.press('KeyS');
  106 |     await page.keyboard.press('KeyD');
  107 |     await page.keyboard.press('KeyF');
  108 |     await page.keyboard.press('Space');
  109 | 
  110 |     // Type second word: 'asdf' + Space
  111 |     await page.keyboard.press('KeyA');
  112 |     await page.keyboard.press('KeyS');
  113 |     await page.keyboard.press('KeyD');
  114 |     await page.keyboard.press('KeyF');
  115 |     await page.keyboard.press('Space');
  116 | 
  117 |     // Verify 0 mistakes and 100% accuracy
  118 |     const mistakeCard = page.locator('text=Mistakes').locator('..');
  119 |     await expect(mistakeCard).toContainText('0');
  120 | 
  121 |     const accuracyCard = page.locator('text=Accuracy').locator('..');
  122 |     await expect(accuracyCard).toContainText('100%');
  123 | 
  124 |     // Verify live stats display
  125 |     await expect(page.locator('text=WPM / Speed')).toBeVisible();
  126 | 
  127 |     // Test Virtual Keyboard toggle button
  128 |     const toggleButton = page.locator('button:has-text("Hide Keyboard")');
  129 |     await expect(toggleButton).toBeVisible();
  130 |     await toggleButton.click();
  131 |     await expect(page.locator('text=English US QWERTY')).not.toBeVisible();
  132 | 
  133 |     const showButton = page.locator('button:has-text("Show Keyboard")');
  134 |     await showButton.click();
  135 |     await expect(page.locator('text=English US QWERTY')).toBeVisible();
  136 |   });
  137 | 
  138 |   test('Verify manual chapter selection, category switching and search filtering', async ({ page }) => {
  139 |     await page.goto('/setup?lang=en');
  140 | 
  141 |     // 1. Switch to Stories category
  142 |     const storiesTab = page.locator('button:has-text("Stories")');
> 143 |     await storiesTab.click();
      |                      ^ Error: locator.click: Error: strict mode violation: locator('button:has-text("Stories")') resolved to 17 elements:
  144 | 
  145 |     // Verify Stories are displayed
  146 |     const villageStory = page.locator('button:has-text("Story 1: A Day in the Village")');
  147 |     await expect(villageStory).toBeVisible();
  148 | 
  149 |     // Click village story card
  150 |     await villageStory.click();
  151 |     await expect(villageStory).toHaveAttribute('aria-pressed', 'true');
  152 | 
  153 |     // 2. Use Search bar
  154 |     const searchInput = page.locator('input[placeholder*="Search by chapter title"]');
  155 |     await searchInput.fill('Train');
  156 | 
  157 |     const trainStory = page.locator('button:has-text("Story 4: A Journey by Train")');
  158 |     await expect(trainStory).toBeVisible();
  159 |     await trainStory.click();
  160 |     await expect(trainStory).toHaveAttribute('aria-pressed', 'true');
  161 | 
  162 |     // Start practice with selected chapter
  163 |     await page.click('button[data-testid="start-practice-btn"]');
  164 |     await expect(page).toHaveURL(/.*practice/);
  165 |     await expect(page.locator('text=Story 4: A Journey by Train')).toBeVisible();
  166 |   });
  167 | 
  168 |   test('Verify word-level typing validation with automatic cursor advancement across English and Hindi InScript', async ({
  169 |     page,
  170 |   }) => {
  171 |     // 1. Open English Practice Setup
  172 |     await page.goto('/setup?lang=en');
  173 |     const chapter1 = page.locator('button:has-text("Chapter 1: Home Row - Left Hand")');
  174 |     await chapter1.click();
  175 |     await page.click('button[data-testid="start-practice-btn"]');
  176 |     await expect(page).toHaveURL(/.*practice/);
  177 | 
  178 |     // Initial state: Word 0 is 'asdf', active status (blue)
  179 |     const word0 = page.locator('span[data-testid="word-0"]');
  180 |     await expect(word0).toBeVisible();
  181 |     await expect(word0).toHaveAttribute('data-status', 'active');
  182 |     await expect(word0).toHaveAttribute('data-expected', 'asdf');
  183 |     await expect(word0).toHaveClass(/text-blue-700/);
  184 | 
  185 |     // Type "asdf" and press Space -> Word 0 must turn GREEN
  186 |     await page.keyboard.press('KeyA');
  187 |     await page.keyboard.press('KeyS');
  188 |     await page.keyboard.press('KeyD');
  189 |     await page.keyboard.press('KeyF');
  190 |     await page.keyboard.press('Space');
  191 | 
  192 |     await expect(word0).toHaveAttribute('data-status', 'correct');
  193 |     await expect(word0).toHaveClass(/text-emerald-600/);
  194 | 
  195 |     // Cursor automatically moves to Word 1 ('asdf') which becomes BLUE active
  196 |     const word1 = page.locator('span[data-testid="word-1"]');
  197 |     await expect(word1).toBeVisible();
  198 |     await expect(word1).toHaveAttribute('data-status', 'active');
  199 |     await expect(word1).toHaveClass(/text-blue-700/);
  200 | 
  201 |     // Double Space test: pressing Space when buffer is empty must NOT skip word 1
  202 |     await page.keyboard.press('Space');
  203 |     await page.keyboard.press('Space');
  204 |     await expect(word1).toHaveAttribute('data-status', 'active');
  205 | 
  206 |     // Type INCORRECT word for word 1: 'wrong' + Space
  207 |     await page.keyboard.press('KeyW');
  208 |     await page.keyboard.press('KeyR');
  209 |     await page.keyboard.press('KeyO');
  210 |     await page.keyboard.press('KeyN');
  211 |     await page.keyboard.press('KeyG');
  212 |     await page.keyboard.press('Space');
  213 | 
  214 |     // Word 1 must turn entirely RED
  215 |     await expect(word1).toHaveAttribute('data-status', 'incorrect');
  216 |     await expect(word1).toHaveClass(/text-red-500/);
  217 |     await expect(word1).toHaveClass(/bg-red-100/);
  218 | 
  219 |     // Mistakes counter must increase to 1
  220 |     const mistakeCard = page.locator('text=Mistakes').locator('..');
  221 |     await expect(mistakeCard).toContainText('1');
  222 | 
  223 |     // User is NOT blocked! Cursor automatically moves to Word 2 ('asdf')
  224 |     const word2 = page.locator('span[data-testid="word-2"]');
  225 |     await expect(word2).toHaveAttribute('data-status', 'active');
  226 |     await expect(word2).toHaveClass(/text-blue-700/);
  227 | 
  228 |     // Test Backspace on Word 2: type 'asx', then Backspace, then 'df' + Space
  229 |     await page.keyboard.press('KeyA');
  230 |     await page.keyboard.press('KeyS');
  231 |     await page.keyboard.press('KeyX');
  232 |     await page.keyboard.press('Backspace');
  233 |     await page.keyboard.press('KeyD');
  234 |     await page.keyboard.press('KeyF');
  235 |     await page.keyboard.press('Space');
  236 | 
  237 |     // Word 2 turns GREEN
  238 |     await expect(word2).toHaveAttribute('data-status', 'correct');
  239 |     await expect(word2).toHaveClass(/text-emerald-600/);
  240 | 
  241 |     // 2. Test Hindi InScript Word-Level Validation
  242 |     await page.goto('/setup?lang=hi');
  243 |     const hindiWords = page.locator('button:has-text("दो अक्षर वाले सरल अमात्रिक शब्द")');
```