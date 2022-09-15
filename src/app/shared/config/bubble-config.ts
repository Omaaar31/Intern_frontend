import { plainToClass } from 'class-transformer';

export class BubbleConfig {
  public height?: string = '2em';
  public width?: string = '2em';
  public lineHeight?: string = '2em';
  public readonly verticalAlign?: string = 'middle';
  public readonly textAlign?: string = 'center';
  public fontWeight?: string = 'bold';
  public readonly borderRadius?: string = '50%';
  public backgroundColor?: string = 'rgba(127, 127, 127, .7)';
  public color?: string = '#000';

  public deserialize(config: any): BubbleConfig {
    return plainToClass(BubbleConfig, config);
  }
}
