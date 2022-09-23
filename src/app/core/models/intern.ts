import { Expose, plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';
export class Intern {
  @Expose()
  public id?: number;

  @Expose()
  public name: string;

  @Expose()
  public firstName?: string;

  @Expose()
  public phoneNumber?: string;

  @Expose()
  public email?: string;

  @Expose()
  @Type()
  public birthDate?: Date;

  @Expose()
  public adress?: string;

  public constructor() {
    this.name = '';
  }

  public deserialize(plainIntern: any): Intern {
    return plainToInstance(Intern, plainIntern, {
      excludeExtraneousValues: true,
    });
  }
}
