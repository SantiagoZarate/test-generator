import React from 'react';

import { render, screen, cleanup } from '@testing-library/react';
import { UserEvent, userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { BasicTestPage } from '../../src/pages/basic-test';
import { type TestContext } from './testContext';

const TEST_MOCKUP_QUESTIONS = [
  'First question',
  'Second question',
  'Third question',
];

class BasicTestPOM {
  //
  private _submitButton: HTMLButtonElement;
  private _input: HTMLInputElement;
  private _form: HTMLFormElement;
  private _user: UserEvent;
  //

  constructor(private _screen: typeof screen) {
    this._user = userEvent.setup();
    this._form = _screen.getByTestId('basic-test-form');
    this._input = this._form.querySelector('input')!;
    this._submitButton = this._form.querySelector('button')!;
  }

  public addQuestion = async (text: string) => {
    await this._user.type(this._input, text);
    await this._user.click(this._submitButton);
  };

  public getQuestionList = () => {
    return this._screen.getByTestId('questions-list');
  };

  public getQuestion = (index: number) => {
    return this._screen.getByTestId('questions-list').querySelectorAll('li')[
      index
    ];
  };

  public deleteQuestion = async (index: number) => {
    const deleteButton = this.getQuestionList()
      .querySelectorAll('li')
      .item(index)
      .querySelector('button');

    await this._user.click(deleteButton!);
  };

  public get input() {
    return this._input;
  }
}

describe('Basic Test Page Test', () => {
  beforeEach<TestContext>(async (ctx) => {
    render(<BasicTestPage />);
    ctx.user = userEvent.setup();
  });

  afterEach(() => {
    cleanup();
  });

  test<TestContext>('Initial state page', async () => {
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
  });

  test<TestContext>('Add and Delete question', async () => {
    const page = new BasicTestPOM(screen);
    await page.addQuestion(TEST_MOCKUP_QUESTIONS[0]);

    expect(page.input.value).toBe('');

    const questionsList = page.getQuestionList();
    expect(questionsList).toBeDefined();
    expect(questionsList.childElementCount).toBe(1);

    const firstQuestion = questionsList.querySelector('li');
    expect(firstQuestion).toBeDefined();

    await page.deleteQuestion(0);

    const questionsPlaceholder = screen.getByTestId('questions-placeholder');
    expect(questionsPlaceholder).toBeDefined();
    screen.debug();
  });

  test<TestContext>('Add Three questions and display AI button', async () => {
    const page = new BasicTestPOM(screen);

    await page.addQuestion(TEST_MOCKUP_QUESTIONS[0]);
    await page.addQuestion(TEST_MOCKUP_QUESTIONS[1]);
    await page.addQuestion(TEST_MOCKUP_QUESTIONS[2]);

    const AIButton = screen.getByTestId('ai-button');
    expect(AIButton).toBeDefined();
  });
});
