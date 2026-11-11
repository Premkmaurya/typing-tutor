import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { PracticeSetupPage } from '../pages/PracticeSetupPage';
import { useSessionStore } from '../store/sessionStore';
import { ALL_LESSONS } from '../data/lessons';

describe('Manual Chapter Selection and Practice Setup Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders lesson cards and allows clicking any chapter without reset', () => {
    render(
      <MemoryRouter initialEntries={['/setup?lang=en']}>
        <PracticeSetupPage />
      </MemoryRouter>
    );

    // Filter to Keys
    const keysTab = screen.getByRole('button', { name: /^keys$/i });
    fireEvent.click(keysTab);

    // Look for Chapter 1 and Chapter 3
    const chapter1 = screen.getByRole('button', { name: /Chapter 1: Home Row - Left Hand/i });
    const chapter3 = screen.getByRole('button', { name: /Chapter 3: Complete Home Row/i });

    expect(chapter1).toBeDefined();
    expect(chapter3).toBeDefined();

    // Click Chapter 3
    fireEvent.click(chapter3);

    // Chapter 3 must now be selected (aria-pressed=true)
    expect(chapter3.getAttribute('aria-pressed')).toBe('true');
    expect(chapter1.getAttribute('aria-pressed')).toBe('false');

    // Re-verify that another click on Chapter 1 selects Chapter 1 and deselects Chapter 3
    fireEvent.click(chapter1);
    expect(chapter1.getAttribute('aria-pressed')).toBe('true');
    expect(chapter3.getAttribute('aria-pressed')).toBe('false');
  });

  it('selects chapters near top, middle, and bottom of the list reliably', () => {
    render(
      <MemoryRouter initialEntries={['/setup?lang=en']}>
        <PracticeSetupPage />
      </MemoryRouter>
    );

    // Get all lesson cards
    const buttons = screen.getAllByRole('button');
    const lessonCards = buttons.filter((b) => b.getAttribute('data-testid')?.startsWith('lesson-card-'));
    expect(lessonCards.length).toBeGreaterThan(10);

    // Top card (index 0)
    const topCard = lessonCards[0];
    fireEvent.click(topCard);
    expect(topCard.getAttribute('aria-pressed')).toBe('true');

    // Middle card
    const middleIndex = Math.floor(lessonCards.length / 2);
    const middleCard = lessonCards[middleIndex];
    fireEvent.click(middleCard);
    expect(middleCard.getAttribute('aria-pressed')).toBe('true');
    expect(topCard.getAttribute('aria-pressed')).toBe('false');

    // Bottom card
    const bottomCard = lessonCards[lessonCards.length - 1];
    fireEvent.click(bottomCard);
    expect(bottomCard.getAttribute('aria-pressed')).toBe('true');
    expect(middleCard.getAttribute('aria-pressed')).toBe('false');
  });

  it('filters lessons accurately via search input without losing clickability', () => {
    render(
      <MemoryRouter initialEntries={['/setup?lang=en']}>
        <PracticeSetupPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search by chapter title/i);
    fireEvent.change(searchInput, { target: { value: 'Village' } });

    const villageCard = screen.getByRole('button', { name: /Story 1: A Day in the Village/i });
    expect(villageCard).toBeDefined();

    fireEvent.click(villageCard);
    expect(villageCard.getAttribute('aria-pressed')).toBe('true');

    // Start practice initiates session with the searched and selected card
    const startBtn = screen.getByTestId('start-practice-btn');
    fireEvent.click(startBtn);

    const sessionState = useSessionStore.getState();
    expect(sessionState.lesson?.title).toContain('A Day in the Village');
  });

  it('switches to Hindi InScript layout and selects Hindi chapters correctly', () => {
    render(
      <MemoryRouter initialEntries={['/setup?lang=hi']}>
        <PracticeSetupPage />
      </MemoryRouter>
    );

    // Swar & Vyanjan chapters
    const swarLessonCard = screen.getByRole('button', { name: /अध्याय 1: बुनियादी स्वर/i });
    expect(swarLessonCard).toBeDefined();

    const vyanjanLessonCard = screen.getByRole('button', { name: /अध्याय 3: व्यंजन/i });
    expect(vyanjanLessonCard).toBeDefined();

    fireEvent.click(vyanjanLessonCard);
    expect(vyanjanLessonCard.getAttribute('aria-pressed')).toBe('true');
    expect(swarLessonCard.getAttribute('aria-pressed')).toBe('false');

    // Select 5 Minutes duration
    const fiveMinBtn = screen.getByRole('button', { name: /5 Minutes/i });
    fireEvent.click(fiveMinBtn);

    // Start practice
    const startBtn = screen.getByTestId('start-practice-btn');
    fireEvent.click(startBtn);

    const sessionState = useSessionStore.getState();
    expect(sessionState.language).toBe('hi');
    expect(sessionState.durationMinutes).toBe(5);
    expect(sessionState.remainingSeconds).toBe(300);
    expect(sessionState.lesson?.title).toContain('अध्याय 3: व्यंजन');
  });
});
