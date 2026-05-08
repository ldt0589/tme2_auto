import { expect } from '@playwright/test';
import { callGemini } from '../gemini/aiClient';

type WorkoutOverviewParams = {
  userPrompt: string;
  ollyResponse: string;
  workoutData: any[];
};

type JudgeVerdict = { passed: boolean; reason: string };

function buildJudgePrompt(params: WorkoutOverviewParams): string {
  return `
    You are an AI QA evaluator.

    User question:
    "${params.userPrompt}"

    Olly AI response:
    "${params.ollyResponse}"

    Backend workout assignment data (JSON):
    ${JSON.stringify(params.workoutData, null, 2)}

    Evaluation rules:
    - If workoutData is empty, Olly MUST clearly say no workout assignments.
    - If workoutData is NOT empty, Olly MUST NOT say there are no workouts.
    - Ignore wording, tone, and formatting.
    - Judge only factual correctness.

    Return ONLY valid JSON in this format:
    {
      "passed": true | false,
      "reason": "short explanation"
    }
    `;
}

export async function verifyWorkoutOverviewByAI(
  params: WorkoutOverviewParams
): Promise<void> {
  const judgePrompt = buildJudgePrompt(params);
  console.log('========== [AI-JUDGE] START ==========');
  console.log('[AI-JUDGE] User prompt:', params.userPrompt);
  console.log('[AI-JUDGE] Olly response:', params.ollyResponse);
  console.log('[AI-JUDGE] Sending prompt to Gemini...');

  const resultText = await callGemini(judgePrompt);
  console.log('[AI-JUDGE] Gemini raw result:', resultText);

  const verdict = JSON.parse(resultText) as JudgeVerdict;
  console.log(`[AI-JUDGE] Verdict: ${verdict.passed ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log('[AI-JUDGE] Reason:', verdict.reason);
  expect(verdict.passed).toBe(true);
  console.log('=========== [AI-JUDGE] END ===========');
}