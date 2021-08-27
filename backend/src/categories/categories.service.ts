import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = slugify(createCategoryDto.name, { lower: true });
    const categoryExists = await this.categoriesRepository.findOne({ slug });
    if (categoryExists) {
      throw new HttpException(
        `Category ${createCategoryDto.name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    let newCategory = this.categoriesRepository.create(createCategoryDto);

    newCategory.slug = slug;
    return this.categoriesRepository.save(newCategory);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findOne(id: number) {
    return this.categoriesRepository.findOneOrFail(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOneOrFail(id);
    const updateCategory = { ...category, ...updateCategoryDto };
    return this.categoriesRepository.save(updateCategory);
  }

  remove(id: number) {
    return this.categoriesRepository.delete(id);
  }
}
