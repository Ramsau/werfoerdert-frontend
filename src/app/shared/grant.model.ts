import { Question, Requirement } from './question.model';

export interface Grant{
  id: number;
  is_grant: boolean;
  name_de: string;
  name_en: string;
  parent: Grant;
  expires: Date;
  questions: Question[];
  children: Grant[];
  requirements: Requirement[];
  is_edit?: boolean;
}

export interface QuestionnaireState{
  current_grant: Grant | null;
  grants_met: Grant[];
}
