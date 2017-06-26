export class StudentEntity {
  constructor(
    public _id: number,
    public firstName: string,
    public lastName: string,
    public middleName: string,
    public birthday: Date | null,
    public classId: number | null,
    public other: string
  ) {}
}
