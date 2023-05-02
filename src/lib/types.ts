export type PollQuestion = {
    id: number;
    question: string;
    imageSrc: string;
    options: string[];
}

export type PollData = {
    id: number;
    maxLength: number;
    questionNumber: number;
    imageUrl: string;
    question: string;
    options: [string, string];
};

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

export interface TotalAnswers {
    totalYes: number;
    totalNo: number;
}
  
export interface PollOptionStats {
    [option: string]: number;
}

export interface PollStatistics {
    id: number;
    question: string;
    options: string[] | null;
    statistics: PollOptionStats;
}
  