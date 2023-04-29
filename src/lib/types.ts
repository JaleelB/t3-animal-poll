// src/types.ts
export type PollQuestion = {
    id: number;
    question: string;
    imageSrc: string;
    options: string[];
}

export type PollResponse = {
    id: number;
    pollId: number;
    option: string;
}

export type VoteInput = {
    pollId: number;
    option: string;
}

export type VoteResponse = {
    message: string;
}
  