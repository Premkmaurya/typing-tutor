import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TypingArea } from '../components/practice/TypingArea';
import { TypingLesson } from '../types/lesson.types';
import { WordResult } from '../types/typing.types';

describe('TypingArea Component Word-Level Visual Feedback', () => {
  const dummyLesson: TypingLesson = {
    id: 'test-words-1',
    language: 'en',
    title: 'Test Word Lesson',
    difficulty: 'beginner',
    practiceType: 'words',
    targetText: 'the quick brown fox',
    order: 1,
    steps: [],
  };

  it('renders initial state with active blue word on word 0 and pending gray on remaining', () => {
    const wordResults: WordResult[] = [
      { expected: 'the', actual: '', status: 'active', errors: 0, characters: [] },
      { expected: 'quick', actual: '', status: 'pending', errors: 0, characters: [] },
      { expected: 'brown', actual: '', status: 'pending', errors: 0, characters: [] },
      { expected: 'fox', actual: '', status: 'pending', errors: 0, characters: [] },
    ];

    render(
      <TypingArea
        lesson={dummyLesson}
        words={['the', 'quick', 'brown', 'fox']}
        currentWordIndex={0}
        currentWordBuffer=""
        wordResults={wordResults}
        status="running"
      />
    );

    const word0 = screen.getByTestId('word-0');
    expect(word0.getAttribute('data-status')).toBe('active');
    expect(word0.textContent).toContain('the');
    expect(word0.className).toContain('text-blue-700');
    expect(word0.className).toContain('bg-blue-100');

    const word1 = screen.getByTestId('word-1');
    expect(word1.getAttribute('data-status')).toBe('pending');
    expect(word1.className).toContain('text-slate-400');

    // Active cursor indicator present on current word
    const cursor = screen.getByTestId('word-cursor');
    expect(cursor).not.toBeNull();
  });

  it('keeps the active word visible in the bounded passage viewport', () => {
    const wordResults: WordResult[] = [
      { expected: 'the', actual: '', status: 'active', errors: 0, characters: [] },
      { expected: 'quick', actual: '', status: 'pending', errors: 0, characters: [] },
      { expected: 'brown', actual: '', status: 'pending', errors: 0, characters: [] },
      { expected: 'fox', actual: '', status: 'pending', errors: 0, characters: [] },
    ];

    const { rerender } = render(
      <TypingArea
        lesson={dummyLesson}
        words={['the', 'quick', 'brown', 'fox']}
        currentWordIndex={0}
        wordResults={wordResults}
        status="running"
      />
    );

    const passage = screen.getByTestId('typing-passage');
    expect(passage.className).toContain('max-h-32');
    expect(passage.className).toContain('overflow-hidden');
    Object.defineProperty(passage, 'clientHeight', { configurable: true, value: 100 });
    passage.scrollTop = 0;
    passage.getBoundingClientRect = () => new DOMRect(0, 0, 400, 100);
    screen.getByTestId('word-2').getBoundingClientRect = () =>
      new DOMRect(0, 200, 50, 20);

    rerender(
      <TypingArea
        lesson={dummyLesson}
        words={['the', 'quick', 'brown', 'fox']}
        currentWordIndex={2}
        wordResults={wordResults}
        status="running"
      />
    );

    expect(passage.scrollTop).toBeGreaterThan(0);
  });

  it('renders entire incorrect word in RED when finalized with mistake and verifies debug UI is removed', () => {
    const wordResults: WordResult[] = [
      { expected: 'the', actual: 'the', status: 'correct', errors: 0, characters: [] },
      { expected: 'quick', actual: 'quik', status: 'incorrect', errors: 1, characters: [] },
      { expected: 'brown', actual: '', status: 'active', errors: 0, characters: [] },
      { expected: 'fox', actual: '', status: 'pending', errors: 0, characters: [] },
    ];

    render(
      <TypingArea
        lesson={dummyLesson}
        words={['the', 'quick', 'brown', 'fox']}
        currentWordIndex={2}
        currentWordBuffer="bro"
        wordResults={wordResults}
        status="running"
      />
    );

    // Word 0: correct -> green
    const word0 = screen.getByTestId('word-0');
    expect(word0.getAttribute('data-status')).toBe('correct');
    expect(word0.className).toContain('text-emerald-600');

    // Word 1: entire word in RED
    const word1 = screen.getByTestId('word-1');
    expect(word1.getAttribute('data-status')).toBe('incorrect');
    expect(word1.textContent).toContain('quick');
    expect(word1.className).toContain('text-red-500');
    expect(word1.className).toContain('bg-red-100');
    expect(word1.className).toContain('border-red-500');

    // Word 2: active -> blue
    const word2 = screen.getByTestId('word-2');
    expect(word2.getAttribute('data-status')).toBe('active');
    expect(word2.className).toContain('text-blue-700');

    // Requirement 5: Debug buffer preview is completely removed from practice interface
    const preview = screen.queryByTestId('word-buffer-preview');
    expect(preview).toBeNull();
  });

  it('renders Hindi words with proper InScript Devanagari text and classes', () => {
    const hindiLesson: TypingLesson = {
      id: 'hi-test',
      language: 'hi',
      title: 'Hindi Test',
      difficulty: 'beginner',
      practiceType: 'words',
      targetText: 'मेरा भारत सुंदर है',
      order: 1,
      steps: [],
    };

    const wordResults: WordResult[] = [
      { expected: 'मेरा', actual: 'मेरा', status: 'correct', errors: 0, characters: [] },
      { expected: 'भारत', actual: 'भारट', status: 'incorrect', errors: 1, characters: [] },
      { expected: 'सुंदर', actual: '', status: 'active', errors: 0, characters: [] },
      { expected: 'है', actual: '', status: 'pending', errors: 0, characters: [] },
    ];

    render(
      <TypingArea
        lesson={hindiLesson}
        words={['मेरा', 'भारत', 'सुंदर', 'है']}
        currentWordIndex={2}
        currentWordBuffer=""
        wordResults={wordResults}
        status="running"
      />
    );

    const word0 = screen.getByTestId('word-0');
    expect(word0.getAttribute('data-status')).toBe('correct');
    expect(word0.textContent).toContain('मेरा');
    expect(word0.className).toContain('text-emerald-600');

    const word1 = screen.getByTestId('word-1');
    expect(word1.getAttribute('data-status')).toBe('incorrect');
    expect(word1.textContent).toContain('भारत');
    expect(word1.className).toContain('text-red-500');
  });
});
