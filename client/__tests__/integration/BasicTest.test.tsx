import React from 'react';

import { render, screen } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';
import { BasicTestPage } from '../../src/pages/basic-test';

const TEST_MOCKUP_QUESTIONS = [
  'First question',
  'Second question',
  'Third question',
];

interface TestContext {
  user: UserEvent;
}

describe('Basic Test Page Test', () => {
  beforeEach<TestContext>(async (ctx) => {
    render(<BasicTestPage />);
    ctx.user = userEvent.setup();
  });

  test<TestContext>('Add and Delete question', async ({ user }) => {
    const form = await screen.getByRole('form');
    expect(form).toBeDefined();

    const questionsPlaceholder = await screen.getByTestId(
      'questions-placeholder'
    );
    expect(questionsPlaceholder).toBeDefined();

    const inputForm = form.querySelector('input');
    expect(inputForm).toBeDefined();

    const submitFormButton = form.querySelector('button');
    expect(submitFormButton).toBeDefined();
    expect(submitFormButton!.disabled).toBeTruthy();

    await user.type(inputForm!, TEST_MOCKUP_QUESTIONS[0]);
    await user.click(submitFormButton!);

    expect(inputForm?.value).toBe('');

    const questionsList = await screen.getByTestId('questions-list');
    expect(questionsList).toBeDefined();
    expect(questionsList.childElementCount).toBe(1);

    const firstQuestion = questionsList.querySelector('li');
    expect(firstQuestion).toBeDefined();

    const deleteButton = firstQuestion!.querySelector('button');
    expect(deleteButton).toBeDefined();
    await user.click(deleteButton!);

    expect(questionsPlaceholder).toBeDefined();
    screen.debug();
  });
});
