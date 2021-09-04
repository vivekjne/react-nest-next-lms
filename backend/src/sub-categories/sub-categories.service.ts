import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategory } from './entities/sub-category.entity';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoriesRepository: Repository<SubCategory>,

    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(
    createSubCategoryDto: CreateSubCategoryDto,
    file: Express.Multer.File,
  ) {
    const slug = slugify(createSubCategoryDto.name, { lower: true });
    const categoryExists = await this.subCategoriesRepository.findOne({ slug });
    if (categoryExists) {
      throw new HttpException(
        `Category ${createSubCategoryDto.name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const categoryData = await this.categoriesRepository.findOneOrFail(
      createSubCategoryDto.categoryId,
    );

    let newSubCategory =
      this.subCategoriesRepository.create(createSubCategoryDto);
    newSubCategory.category = categoryData;
    newSubCategory.slug = slug;
    newSubCategory.image = file.filename;
    return this.subCategoriesRepository.save(newSubCategory);
  }

  findAll() {
    return this.subCategoriesRepository.find();
  }

  findOne(id: number) {
    return this.subCategoriesRepository.findOneOrFail(id);
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    const category = await this.subCategoriesRepository.findOneOrFail(id);
    const updateSubCategory = { ...category, ...updateSubCategoryDto };
    return this.subCategoriesRepository.save(updateSubCategory);
  }

  remove(id: number) {
    return this.subCategoriesRepository.delete(id);
  }
}
