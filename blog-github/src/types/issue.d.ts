// src/types/issue.d.ts
export interface GitHubIssue {
    id: number;
    number: number;
    title: string;
    body: string;
    created_at: string;
    html_url: string;
    user: {
      login: string;
    };
  }
  