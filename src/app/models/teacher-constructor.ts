export class TeacherEntity {
  constructor(
    public _id: number,
    public firstName: string,
    public lastName: string,
    public middleName: string,
    public birthday: Date | null,
    public classId: number,
    public other: string
  ) {}
}
