import { ClassModel } from "src/app/+shared/models/class.model";

export class LoadClasses {
    static readonly type = '[Class] Search classes';
}

export class UpdateClass {
    static readonly type = '[Class] update class';
    
    constructor(public payload: ClassModel){}
}

export class AddClass {
    static readonly type = '[Class] ad class';

    constructor(public payload: ClassModel) {}
}

export class DeleteClass {
    static readonly type = '[CLass] Delete class';

    constructor(public payload: string) {}
}