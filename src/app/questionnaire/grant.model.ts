import { Question } from './question/question.model';

export interface Grant{
  id: number;
  is_grant: boolean;
  name_de: string;
  name_en: string;
  parent: Grant;
  expires: Date;
  questions: Question[];
}
