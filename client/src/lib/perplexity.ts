import { envs } from '@/config/envs';
import { PPXT_Response } from '@/types/ai.type';

const buildPrompt = (message: string): { role: 'user'; content: string }[] => {
  return [{ role: 'user', content: message }];
};

export async function getAiGeneratedSuggestions(
  prevQuestions: string[]
): Promise<string[]> {
  const questionsSortedByLength = prevQuestions.sort(
    (a, b) => b.length - a.length
  );

  const prompt = `
  You are an AI designed to generate educational questions.
  Give me 3 questions suggestions following the cognitive level of the following questions:

   ${questionsSortedByLength.map((q) => q + '\n').join('')}

   The language of the output suggestions should be on the same languages as the used on the previous questions, the questions should be open,
   i dont want a yes/no type of question and just give the questions because im going to parse the response right away.

   The expected output should be an array of strings like the following:
   """json
   [
    "first questions suggestion",
    "second question suggestion",
    "thrid question suggestion"
   ]
   """
  `;

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${envs.PPXT_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-chat',
      messages: buildPrompt(prompt),
    }),
  };

  return await fetch('https://api.perplexity.ai/chat/completions', options)
    .then((response) => response.json())
    .then((response: PPXT_Response) => {
      const content = response.choices[0].message.content;
      const cleanContent = content
        .split('')
        .slice(7, content.length - 3)
        .join('')
        .trim();

      return JSON.parse(cleanContent);
    })
    .catch((err) => console.error(err));
}
