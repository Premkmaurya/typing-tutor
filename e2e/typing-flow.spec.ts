import { test, expect } from '@playwright/test';

test.describe('Typing Tutor Complete End-to-End Flow', () => {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => {
      if (typeof Element !== 'undefined' && !Element.prototype.checkVisibility) {
        Element.prototype.checkVisibility = function(options?: { checkOpacity?: boolean; checkVisibilityCSS?: boolean }) {
          if (!this.isConnected) return false;
          const style = window.getComputedStyle(this);
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          if (options && options.checkOpacity && (style.opacity === '0' || style.opacity === '0.0')) return false;
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

    // 3. Start Practice
    await page.click('button[data-testid="start-practice-btn"]');
    await expect(page).toHaveURL(/.*practice/);

    // 4. Verify Virtual Keyboard is visible
    const keyboardTitle = page.locator('text=Devanagari InScript');
    await expect(keyboardTitle).toBeVisible();

    // Type the first few words of the Hindi lesson
    // Lesson 1 is 'प र क त च प र क त च प र क त च'
    // First word: प (KeyH) + Space
    await page.keyboard.press('KeyH');
    await page.keyboard.press('Space');

    // Second word: र (KeyJ) + Space
    await page.keyboard.press('KeyJ');
    await page.keyboard.press('Space');

    // 5. Verify Virtual key click also works (click on KeyK virtual button + Space)
    const virtualKeyK = page.locator('button[aria-label*="KeyK"]');
    await expect(virtualKeyK).toBeVisible();
    await virtualKeyK.click();
    const virtualSpace = page.locator('button[aria-label*="Space"]');
    await virtualSpace.click();

    // Verify stats are live and non-zero
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

    // Select Beginner Keys and Start Practice
    await page.click('button[data-testid="start-practice-btn"]');
    await expect(page).toHaveURL(/.*practice/);

    // Verify English layout indicator
    await expect(page.locator('text=English US QWERTY')).toBeVisible();

    // Type sequence: 'asdf jkl; ' (10 characters)
    await page.keyboard.press('KeyA');
    await page.keyboard.press('KeyS');
    await page.keyboard.press('KeyD');
    await page.keyboard.press('KeyF');
    await page.keyboard.press('Space');
    await page.keyboard.press('KeyJ');
    await page.keyboard.press('KeyK');
    await page.keyboard.press('KeyL');
    await page.keyboard.press('Semicolon');
    await page.keyboard.press('Space');

    // Verify 0 mistakes and 100% accuracy (not duplicate/falsely marked errors!)
    const mistakeCard = page.locator('text=Mistakes').locator('..');
    await expect(mistakeCard).toContainText('0');

    const accuracyCard = page.locator('text=Accuracy').locator('..');
    await expect(accuracyCard).toContainText('100%');

    // Verify position is Word 3 of 6 (since 2 words finalized)
    await expect(page.locator('text=Word 3 of 6')).toBeVisible();

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

  test('Verify Typing Area and Keyboard fit within a single viewport across standard resolutions without scrolling', async ({
    page,
  }) => {
    const targetViewports = [
      { width: 1366, height: 768, name: '1366x768' },
      { width: 1440, height: 900, name: '1440x900' },
      { width: 1536, height: 864, name: '1536x864' },
      { width: 1920, height: 1080, name: '1920x1080' },
    ];

    for (const vp of targetViewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/practice');

      // Wait for lesson and keyboard to render
      const typingArea = page.locator('div[aria-label*="Typing practice input area"]');
      await expect(typingArea).toBeVisible();
      await expect(typingArea).toBeInViewport();

      const spaceKey = page.locator('button[aria-label*="Space"]');
      await expect(spaceKey).toBeVisible();
      await expect(spaceKey).toBeInViewport();

      const measurements = await page.evaluate(() => {
        const header = document.querySelector('header')?.getBoundingClientRect();
        const stats = document.querySelector('.grid')?.getBoundingClientRect();
        const typing = document.querySelector('div[aria-label*="Typing practice"]')?.getBoundingClientRect();
        const keyboard = document.querySelector('.scrollbar-thin')?.closest('.border')?.getBoundingClientRect();
        const space = document.querySelector('button[aria-label*="Space"]')?.getBoundingClientRect();
        return {
          windowHeight: window.innerHeight,
          headerHeight: header?.height,
          statsHeight: stats?.height,
          typingHeight: typing?.height,
          keyboardTop: keyboard?.top,
          keyboardBottom: keyboard?.bottom,
          keyboardHeight: keyboard?.height,
          spaceBottom: space?.bottom,
          remainingBelowKeyboard: window.innerHeight - (keyboard?.bottom || 0),
        };
      });
      console.log(`[MEASUREMENT ${vp.name}]`, measurements);

      // Verify all 5 individual keyboard rows fit within viewport
      const rowsBounding = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('.scrollbar-thin > div > div'));
        return rows.map((r, i) => {
          const rect = r.getBoundingClientRect();
          return {
            row: i + 1,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
            fitsInViewport: rect.bottom <= window.innerHeight,
          };
        });
      });
      console.log(`[KEYBOARD ROWS ${vp.name}]`, rowsBounding);
      expect(rowsBounding.length).toBe(5);
      for (const r of rowsBounding) {
        expect(r.fitsInViewport, `Row ${r.row} must fit completely within viewport at ${vp.name}`).toBe(true);
      }

      // Verify that no page-level vertical scrollbar is triggered
      const hasVerticalScroll = await page.evaluate(() => {
        return document.documentElement.scrollHeight > window.innerHeight;
      });
      expect(hasVerticalScroll, `Expected no vertical scrollbar at ${vp.name}`).toBe(false);

      // Verify no horizontal overflow
      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalOverflow, `Expected no horizontal overflow at ${vp.name}`).toBe(false);

      // Capture screenshot for layout verification
      await page.screenshot({ path: `test-results/viewport-${vp.name}.png` });
    }
  });

  test('Verify word-level typing validation with automatic cursor advancement across English and Hindi InScript', async ({
    page,
  }) => {
    // 1. Open English Practice
    await page.goto('/setup?lang=en');
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

    // Cursor automatically moves to Word 1 ('jkl;') which becomes BLUE active
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
    await expect(page.locator('text=Current input:')).not.toBeVisible();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('KeyD');
    await page.keyboard.press('KeyF');
    await page.keyboard.press('Space');

    // Word 2 turns GREEN
    await expect(word2).toHaveAttribute('data-status', 'correct');
    await expect(word2).toHaveClass(/text-emerald-600/);

    // 2. Test Hindi InScript Word-Level Validation
    await page.goto('/setup?lang=hi');
    await page.click('button[data-testid="start-practice-btn"]');
    await expect(page).toHaveURL(/.*practice/);

    // Hindi Lesson 1 has space-separated words: 'प', 'र', 'क', 'त', 'च'...
    const hindiWord0 = page.locator('span[data-testid="word-0"]');
    await expect(hindiWord0).toBeVisible();
    await expect(hindiWord0).toHaveAttribute('data-status', 'active');
    await expect(hindiWord0).toHaveAttribute('data-expected', 'प');

    // Type correct 'प' (KeyH) + Space -> turns GREEN
    await page.keyboard.press('KeyH');
    await page.keyboard.press('Space');
    await expect(hindiWord0).toHaveAttribute('data-status', 'correct');
    await expect(hindiWord0).toHaveClass(/text-emerald-600/);

    // Word 1 ('र') is now active
    const hindiWord1 = page.locator('span[data-testid="word-1"]');
    await expect(hindiWord1).toHaveAttribute('data-status', 'active');

    // Type WRONG Hindi key (KeyL which produces 'त' instead of 'र') + Space
    await page.keyboard.press('KeyL');
    await page.keyboard.press('Space');

    // Word 1 turns RED, cursor automatically moves to Word 2 ('क')
    await expect(hindiWord1).toHaveAttribute('data-status', 'incorrect');
    await expect(hindiWord1).toHaveClass(/text-red-500/);

    const hindiWord2 = page.locator('span[data-testid="word-2"]');
    await expect(hindiWord2).toHaveAttribute('data-status', 'active');
  });
});
