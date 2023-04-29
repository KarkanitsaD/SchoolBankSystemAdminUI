import { RewardModel } from "./reward.model";
import { StudentModel } from "./student.model";
import { TeacherModel } from "./teacher.model";

export class StudentRewardModel {
    id: string;
    sum: number;
    reward: RewardModel;
    student: StudentModel;
    teacher: TeacherModel;

    constructor(init?: Partial<StudentRewardModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}