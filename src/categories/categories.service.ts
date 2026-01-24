import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../shemas/category.shema';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';
import { QueryCategoryDto } from './query-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>,
    ) { }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const existing = await this.categoryModel.findOne({ name: createCategoryDto.name });
        if (existing) {
            throw new HttpException('Category already exists', HttpStatus.BAD_REQUEST);
        }
        const createdCategory = new this.categoryModel(createCategoryDto);
        return createdCategory.save();
    }

    async findAll(query: QueryCategoryDto) {
        const { page = 1, limit = 10, search } = query;
        const skip = (page - 1) * limit;

        const filter: any = {};
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        const [items, total] = await Promise.all([
            this.categoryModel
                .find(filter)
                .skip(skip)
                .limit(limit)
                .sort({ name: 1 })
                .exec(),
            this.categoryModel.countDocuments(filter),
        ]);

        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        return category;
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
        if (!updatedCategory) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        return updatedCategory;
    }

    async remove(id: string): Promise<any> {
        const deleted = await this.categoryModel.findByIdAndDelete(id).exec();
        if (!deleted) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'Category deleted successfully' };
    }
}
