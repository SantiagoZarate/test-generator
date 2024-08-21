export interface PPXT_Response {
  id: string;
  model: string;
  created: number;
  usage: Usage;
  object: string;
  choices: Choice[];
}

export interface Choice {
  index: number;
  finish_reason: string;
  message: Delta;
  delta: Delta;
}

export interface Delta {
  role: string;
  content: string;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
