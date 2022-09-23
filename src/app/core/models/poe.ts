import { Expose, plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';
export class POE {
  @Expose()
  public id?: number;

  @Expose()
  public name!: string;

  @Expose()
  @Type()
  public beginDate?: Date;

  @Expose()
  @Type()
  public endDate?: Date;

  public deserialize(plainPOE: any): POE {
    const asClass: POE = plainToInstance(POE, plainPOE, {
      excludeExtraneousValues: true,
    });
    return asClass;
  }
}
