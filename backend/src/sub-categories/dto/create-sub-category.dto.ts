import { IsEmpty, IsNotEmpty, Max, MaxLength } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @MaxLength(30)
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly active: boolean;

  @IsNotEmpty()
  readonly categoryId: number;
}
