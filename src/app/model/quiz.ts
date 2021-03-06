import { Question } from "./question";

export class Quiz {
    id: number = 0;
    title: string = '';
    description: string = '';
    questions: number[] = new Array;
    qnums?: number = 0;
    active: boolean = true;
}
