export class StudentEntity {
  constructor(
    public _id: any,
    public firstName: string,
    public lastName: string,
    public middleName: string,
    public birthday: Date | null,
    public classId: any,
    public other: string
  ) {}
}
