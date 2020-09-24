import { Question } from './question.model';

export interface Grant{
  id: number;
  is_grant: boolean;
  name_de: string;
  name_en: string;
  parent: Grant;
  expires: Date;
  questions: Question[];
  children: Grant[];
}


export interface QuestionnaireState{
  current_grant: Grant | null;
  grants_met: Grant[];
}
