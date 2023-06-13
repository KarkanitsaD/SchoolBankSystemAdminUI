export class ClassModel {
    id: string;
    name: string;

    constructor(public init?: Partial<ClassModel>) {
        if (init) {
          Object.assign(this, init);
      }
    }
} 