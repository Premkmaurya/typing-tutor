import { test, expect } from '@playwright/test';

test.describe('Typing Tutor Complete End-to-End Flow', () => {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => {
      if (typeof Element !== 'undefined' && !Element.prototype.checkVisibility) {
        Element.prototype.checkVisibility = function (options?: {
          checkOpacity?: boolean;
          checkVisibilityCSS?: boolean;
        }) {
          if (!this.isConnected) return false;
          const style = window.getComputedStyle(this);
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          if (options && options.checkOpacity && (style.opacity === '0' || style.opacity === '0.0')) {
            return false;
          }
          return true;
        };
      }
    });
  });

  test('Complete Hindi InScript typing session and persistence verification', async ({ page }) => {
    // 1. Open App
    await page.goto('/');
    await expect(page).toHaveTitle(/Hindi & English Typing Tutor/);

    // 2. Choose Hindi Practice Setup
    await page.goto('/setup?lang=hi');
    await expect(page).toHaveURL(/.*setup/);

    // Verify InScript Layout badge
    await expect(page.locator('text=InScript Layout').first()).toBeVisible();

    // Select Hindi words chapter
    const wordLessonCard = page.locator('button:has-text("दो अक्षर वाले सरल अमात्रिक शब्द")');
    await wordLessonCard.click();
    await expect(wordLessonCard).toHaveAttribute('aria-pressed', 'true');

    // 3. Start Practice
    await page.click('button[data-testid="start-practice-btn"]');
    await expect(page).toHaveURL(/.*practice/);

    // 4. Verify Virtual Keyboard is visible
    const keyboardTitle = page.locator('text=Devanagari InScript');
    await expect(keyboardTitle).toBeVisible();

    // Word 0 is 'कम': क (KeyK) + म (KeyC) + Space
    await page.keyboard.press('KeyK');
    await page.keyboard.press('KeyC');
    await page.keyboard.press('Space');

    // Word 1 is 'पर': प (KeyH) + र (KeyJ) + Space
    await page.keyboard.press('KeyH');
    await page.keyboard.press('KeyJ');
    await page.keyboard.press('Space');

    // 5. Verify Virtual key click works: click KeyT + KeyB ('तब') + Space
    const virtualKeyT = page.locator('button[aria-label*="KeyL"]').first(); // त (KeyL)
    await expect(virtualKeyT).toBeVisible();
    await virtualKeyT.click();
    const virtualKeyB = page.locator('button[aria-label*="KeyY"]').first(); // ब (KeyY)
    await virtualKeyB.click();
    const virtualSpace = page.locator('button[aria-label*="Space"]');
    await virtualSpace.click();

    // Verify stats are live
    const accuracy = page.locator('text=Accuracy');
    await expect(accuracy).toBeVisible();

    // 6. Test Pause & Resume Controls
    const pauseButton = page.locator('button:has-text("Pause")');
    await expect(pauseButton).toBeVisible();
    await pauseButton.click();
    await expect(page.locator('text=Practice Paused')).toBeVisible();

    const resumeButton = page.locator('button:has-text("Resume")');
    await expect(resumeButton).toBeVisible();
    await resumeButton.click();
    await expect(page.locator('text=Practice Paused')).not.toBeVisible();
  });

  test('Complete English QWERTY typing session and results verification', async ({ page }) => {
    // 1. Open App
    await page.goto('/');

    // 2. Select English Setup
    await page.goto('/setup?lang=en');
    await expect(page.locator('text=QWERTY Layout').first()).toBeVisible();

    // Select Chapter 1
    const chapter1 = page.locator('button:has-text("Chapter 1: Home Row - Left Hand")');
    await chapter1.click();
    await expect(chapter1).toHaveAttribute('aria-pressed', 'true');

    // Start Practice
    await page.click('button[data-testid="start-practice-btn"]');
    await expect(page).toHaveURL(/.*practice/);

    // Verify English layout indicator
    await expect(page.locator('text=English US QWERTY')).toBeVisible();

    // Type sequence: 'asdf' + Space
    await page.keyboard.press('KeyA');
    await page.keyboard.press('KeyS');
    await page.keyboard.press('KeyD');
    await page.keyboard.press('KeyF');
    await page.keyboard.press('Space');

    // Type second word: 'asdf' + Space
    await page.keyboard.press('KeyA');
    await page.keyboard.press('KeyS');
    await page.keyboard.press('KeyD');
    await page.keyboard.press('KeyF');
    await page.keyboard.press('Space');

    // Verify 0 mistakes and 100% accuracy
    const mistakeCard = page.locator('text=Mistakes').locator('..');
    await expect(mistakeCard).toContainText('0');

    const accuracyCard = page.locator('text=Accuracy').locator('..');
    await expect(accuracyCard).toContainText('100%');

    // Verify live stats display
    await expect(page.locator('text=WPM / Speed')).toBeVisible();

    // Test Virtual Keyboard toggle button
    const toggleButton = page.locator('button:has-text("Hide Keyboard")');
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();
    await expect(page.locator('text=English US QWERTY')).not.toBeVisible();

    const showButton = page.locator('button:has-text("Show Keyboard")');
    await showButton.click();
    await expect(page.locator('text=English US QWERTY')).toBeVisible();
  });

  test('Verify manual chapter selection, category switching and search filtering', async ({ page }) => {
    await page.goto('/setup?lang=en');

    // 1. Switch to Stories category
    const storiesTab = page.locator('button:has-text("Stories")');
    await storiesTab.click();

    // Verify Stories are displayed
    const villageStory = page.locator('button:has-text("Story 1: A Day in the Village")');
    await expect(villageStory).toBeVisible();

    // Click village story card
    await villageStory.click();
    await expect(villageStory).toHaveAttribute('aria-pressed', 'true');

    // 2. Use Search bar
    const searchInput = page.locator('input[placeholder*="Search by chapter title"]');
    await searchInput.fill('Train');

    const trainStory = page.locator('button:has-text("Story 4: A Journey by Train")');
    await expect(trainStory).toBeVisible();
    await trainStory.click();
    await expect(trainStory).toHaveAttribute('aria-pressed', 'true');

    // Start practice with selected chapter
    await page.click('button[data-testid="start-practice-btn"]');
    await expect(page).toHaveURL(/.*practice/);
    await expect(page.locator('text=Story 4: A Journey by Train')).toBeVisible();
  });

  test('Verify word-level typing validation with automatic cursor advancement across English and Hindi InScript', async ({
    page,
  }) => {
    // 1. Open English Practice Setup
    await page.goto('/setup?lang=en');
    const chapter1 = page.locator('button:has-text("Chapter 1: Home Row - Left Hand")');
    await chapter1.click();
    await page.click('button[data-testid="start-practice-btn"]');
    await expect(page).toHaveURL(/.*practice/);

    // Initial state: Word 0 is 'asdf', active status (blue)
    const word0 = page.locator('span[data-testid="word-0"]');
    await expect(word0).toBeVisible();
    await expect(word0).toHaveAttribute('data-status', 'active');
    await expect(word0).toHaveAttribute('data-expected', 'asdf');
    await expect(word0).toHaveClass(/text-blue-700/);

    // Type "asdf" and press Space -> Word 0 must turn GREEN
    await page.keyboard.press('KeyA');
    await page.keyboard.press('KeyS');
    await page.keyboard.press('KeyD');
    await page.keyboard.press('KeyF');
    await page.keyboard.press('Space');

    await expect(word0).toHaveAttribute('data-status', 'correct');
    await expect(word0).toHaveClass(/text-emerald-600/);

    // Cursor automatically moves to Word 1 ('asdf') which becomes BLUE active
    const word1 = page.locator('span[data-testid="word-1"]');
    await expect(word1).toBeVisible();
    await expect(word1).toHaveAttribute('data-status', 'active');
    await expect(word1).toHaveClass(/text-blue-700/);

    // Double Space test: pressing Space when buffer is empty must NOT skip word 1
    await page.keyboard.press('Space');
    await page.keyboard.press('Space');
    await expect(word1).toHaveAttribute('data-status', 'active');

    // Type INCORRECT word for word 1: 'wrong' + Space
    await page.keyboard.press('KeyW');
    await page.keyboard.press('KeyR');
    await page.keyboard.press('KeyO');
    await page.keyboard.press('KeyN');
    await page.keyboard.press('KeyG');
    await page.keyboard.press('Space');

    // Word 1 must turn entirely RED
    await expect(word1).toHaveAttribute('data-status', 'incorrect');
    await expect(word1).toHaveClass(/text-red-500/);
    await expect(word1).toHaveClass(/bg-red-100/);

    // Mistakes counter must increase to 1
    const mistakeCard = page.locator('text=Mistakes').locator('..');
    await expect(mistakeCard).toContainText('1');

    // User is NOT blocked! Cursor automatically moves to Word 2 ('asdf')
    const word2 = page.locator('span[data-testid="word-2"]');
    await expect(word2).toHaveAttribute('data-status', 'active');
    await expect(word2).toHaveClass(/text-blue-700/);

    // Test Backspace on Word 2: type 'asx', then Backspace, then 'df' + Space
    await page.keyboard.press('KeyA');
    await page.keyboard.press('KeyS');
    await page.keyboard.press('KeyX');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('KeyD');
    await page.keyboard.press('KeyF');
    await page.keyboard.press('Space');

    // Word 2 turns GREEN
    await expect(word2).toHaveAttribute('data-status', 'correct');
    await expect(word2).toHaveClass(/text-emerald-600/);

    // 2. Test Hindi InScript Word-Level Validation
    await page.goto('/setup?lang=hi');
    const hindiWords = page.locator('button:has-text("दो अक्षर वाले सरल अमात्रिक शब्द")');
    await hindiWords.click();
    await page.click('button[data-testid="start-practice-btn"]');
    await expect(page).toHaveURL(/.*practice/);

    const hindiWord0 = page.locator('span[data-testid="word-0"]');
    await expect(hindiWord0).toBeVisible();
    await expect(hindiWord0).toHaveAttribute('data-status', 'active');
    await expect(hindiWord0).toHaveAttribute('data-expected', 'कम');

    // Type correct 'कम': क (KeyK) + म (KeyC) + Space -> turns GREEN
    await page.keyboard.press('KeyK');
    await page.keyboard.press('KeyC');
    await page.keyboard.press('Space');
    await expect(hindiWord0).toHaveAttribute('data-status', 'correct');
    await expect(hindiWord0).toHaveClass(/text-emerald-600/);

    // Word 1 ('पर') is now active
    const hindiWord1 = page.locator('span[data-testid="word-1"]');
    await expect(hindiWord1).toBeVisible();
    await expect(hindiWord1).toHaveAttribute('data-status', 'active');

    // Type WRONG Hindi key (KeyL producing 'त' instead of 'प') + Space
    await page.keyboard.press('KeyL');
    await page.keyboard.press('Space');

    // Word 1 turns RED, cursor automatically moves to Word 2 ('तब')
    await expect(hindiWord1).toHaveAttribute('data-status', 'incorrect');
    await expect(hindiWord1).toHaveClass(/text-red-500/);

    const hindiWord2 = page.locator('span[data-testid="word-2"]');
    await expect(hindiWord2).toHaveAttribute('data-status', 'active');
  });

  test('Verify Timed Practice Session continues across multiple passages', async ({ page }) => {
    // 1. Setup 1-Minute session
    await page.goto('/setup?lang=en');
    const oneMinBtn = page.locator('button:has-text("1 Minute")');
    await oneMinBtn.click();

    // Select Chapter 1
    const chapter1 = page.locator('button:has-text("Chapter 1: Home Row - Left Hand")');
    await chapter1.click();

    await page.click('button[data-testid="start-practice-btn"]');
    await expect(page).toHaveURL(/.*practice/);

    // Verify Passage 1 indicator
    await expect(page.locator('text=Passage 1 of 4')).toBeVisible();

    // Verify remaining timer countdown
    const timerCard = page.locator('text=Remaining').locator('..');
    await expect(timerCard).toBeVisible();

    // Complete the first passage words rapidly
    const passage1Words = [
      'asdf', 'asdf', 'asdf', 'asdf', 'aassddff',
      'fdsa', 'fdsa', 'fads', 'asdf'
    ];

    for (const word of passage1Words) {
      for (const ch of word) {
        await page.keyboard.press(`Key${ch.toUpperCase()}`);
      }
      await page.keyboard.press('Space');
    }

    // Verify Passage 2 automatically loaded and practice CONTINUES!
    await expect(page.locator('text=Passage 2 of 4')).toBeVisible({ timeout: 5000 });
    // Still on /practice! Never finished early!
    await expect(page).toHaveURL(/.*practice/);

    // Finish session manually
    const finishBtn = page.locator('button:has-text("Finish Session")');
    await finishBtn.click();
    await expect(page).toHaveURL(/.*results/);
    await expect(page.locator('text=Session Complete!')).toBeVisible();
  });
});
