export class ClassEntity {
  constructor(
    public _id: number,
    public name: string,
    public level: number | null,
    public teacherId: number,
    public studentId: number[],
    public other: string
  ) {}
}
