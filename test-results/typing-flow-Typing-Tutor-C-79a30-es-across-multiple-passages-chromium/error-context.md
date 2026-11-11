# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: typing-flow.spec.ts >> Typing Tutor Complete End-to-End Flow >> Verify Timed Practice Session continues across multiple passages
- Location: e2e\typing-flow.spec.ts:277:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Passage 2 of 4')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('text=Passage 2 of 4') with timeout 5000ms
  - waiting for locator('text=Passage 2 of 4')

```

```yaml
- banner:
  - link "अक्षर Typing":
    - /url: /
  - navigation:
    - link "Dashboard":
      - /url: /
    - link "Practice Setup":
      - /url: /setup
    - link "Analytics":
      - /url: /progress
  - button "हिन्दी (InScript)"
  - button "English"
  - button "Mute sound"
  - button "Toggle theme"
  - link "Start Practice":
    - /url: /setup
    - button "Start Practice"
- main:
  - heading "Session Complete!" [level=1]
  - text: "Chapter 1: Home Row - Left Hand (A S D F) English QWERTY beginner 0 Passages Completed WPM (Speed) 7"
  - paragraph: words per minute
  - text: Word Accuracy 86%
  - paragraph: 6 / 7 words
  - text: Char Accuracy 100%
  - paragraph: 29 / 35 keys
  - text: Practice Duration 1:00
  - paragraph: 1 min scheduled session
  - heading "Performance Breakdown" [level=3]
  - text: Words Completed 7 (6 correct, 1 incorrect) Total Keypresses 35 Correct Keypresses 29 Incorrect Keypresses 0 Backspace Corrections 0 Errors Corrected 0 Total Mistakes Recorded 0
  - heading "Most Frequently Mistyped Keys" [level=3]
  - paragraph: Flawless precision!
  - paragraph: You didn't mistype any keys in this session.
  - link "Back to Dashboard":
    - /url: /
    - button "Back to Dashboard"
  - button "Restart Lesson"
  - link "Next Lesson":
    - /url: /setup
    - button "Next Lesson"
- contentinfo:
  - paragraph: अक्षर Hindi InScript & English Typing Tutor • Verified BIS IS 13194:1991 & Unicode CLDR 43
  - paragraph: Pure Client-Side Web Application • No OS Keyboard Installation Required
```

# Test source

```ts
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
  244 |     await hindiWords.click();
  245 |     await page.click('button[data-testid="start-practice-btn"]');
  246 |     await expect(page).toHaveURL(/.*practice/);
  247 | 
  248 |     const hindiWord0 = page.locator('span[data-testid="word-0"]');
  249 |     await expect(hindiWord0).toBeVisible();
  250 |     await expect(hindiWord0).toHaveAttribute('data-status', 'active');
  251 |     await expect(hindiWord0).toHaveAttribute('data-expected', 'कम');
  252 | 
  253 |     // Type correct 'कम': क (KeyK) + म (KeyC) + Space -> turns GREEN
  254 |     await page.keyboard.press('KeyK');
  255 |     await page.keyboard.press('KeyC');
  256 |     await page.keyboard.press('Space');
  257 |     await expect(hindiWord0).toHaveAttribute('data-status', 'correct');
  258 |     await expect(hindiWord0).toHaveClass(/text-emerald-600/);
  259 | 
  260 |     // Word 1 ('पर') is now active
  261 |     const hindiWord1 = page.locator('span[data-testid="word-1"]');
  262 |     await expect(hindiWord1).toBeVisible();
  263 |     await expect(hindiWord1).toHaveAttribute('data-status', 'active');
  264 | 
  265 |     // Type WRONG Hindi key (KeyL producing 'त' instead of 'प') + Space
  266 |     await page.keyboard.press('KeyL');
  267 |     await page.keyboard.press('Space');
  268 | 
  269 |     // Word 1 turns RED, cursor automatically moves to Word 2 ('तब')
  270 |     await expect(hindiWord1).toHaveAttribute('data-status', 'incorrect');
  271 |     await expect(hindiWord1).toHaveClass(/text-red-500/);
  272 | 
  273 |     const hindiWord2 = page.locator('span[data-testid="word-2"]');
  274 |     await expect(hindiWord2).toHaveAttribute('data-status', 'active');
  275 |   });
  276 | 
  277 |   test('Verify Timed Practice Session continues across multiple passages', async ({ page }) => {
  278 |     // 1. Setup 1-Minute session
  279 |     await page.goto('/setup?lang=en');
  280 |     const oneMinBtn = page.locator('button:has-text("1 Minute")');
  281 |     await oneMinBtn.click();
  282 | 
  283 |     // Select Chapter 1
  284 |     const chapter1 = page.locator('button:has-text("Chapter 1: Home Row - Left Hand")');
  285 |     await chapter1.click();
  286 | 
  287 |     await page.click('button[data-testid="start-practice-btn"]');
  288 |     await expect(page).toHaveURL(/.*practice/);
  289 | 
  290 |     // Verify Passage 1 indicator
  291 |     await expect(page.locator('text=Passage 1 of 4')).toBeVisible();
  292 | 
  293 |     // Verify remaining timer countdown
  294 |     const timerCard = page.locator('text=Remaining').locator('..');
  295 |     await expect(timerCard).toBeVisible();
  296 | 
  297 |     // Complete the first passage words rapidly
  298 |     const passage1Words = [
  299 |       'asdf', 'asdf', 'asdf', 'asdf', 'aassddff',
  300 |       'fdsa', 'fdsa', 'fads', 'asdf'
  301 |     ];
  302 | 
  303 |     for (const word of passage1Words) {
  304 |       for (const ch of word) {
  305 |         await page.keyboard.press(`Key${ch.toUpperCase()}`);
  306 |       }
  307 |       await page.keyboard.press('Space');
  308 |     }
  309 | 
  310 |     // Verify Passage 2 automatically loaded and practice CONTINUES!
> 311 |     await expect(page.locator('text=Passage 2 of 4')).toBeVisible({ timeout: 5000 });
      |                                                       ^ Error: expect(locator).toBeVisible() failed
  312 |     // Still on /practice! Never finished early!
  313 |     await expect(page).toHaveURL(/.*practice/);
  314 | 
  315 |     // Finish session manually
  316 |     const finishBtn = page.locator('button:has-text("Finish Session")');
  317 |     await finishBtn.click();
  318 |     await expect(page).toHaveURL(/.*results/);
  319 |     await expect(page.locator('text=Session Complete!')).toBeVisible();
  320 |   });
  321 | });
  322 | 
```