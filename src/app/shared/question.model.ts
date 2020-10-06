export interface Question {
  text_de: string;
  text_en: string;
  type: number;
  id: number;
}

export interface Requirement {
  id: number;
  bool: boolean;
  int_exact: number;
  int_lt: number;
  int_gt: number;
  date_exact: string;
  date_lt: string;
  date_gt: string;
  grant_id: number;
  question: number;
}
