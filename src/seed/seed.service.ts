import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../shemas/user.shema';
import { Category } from '../shemas/category.shema';

@Injectable()
export class SeedService implements OnModuleInit {
    private readonly logger = new Logger(SeedService.name);

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    ) { }

    async onModuleInit() {
        this.logger.log('Starting Seeding process...');
        await this.seedUsers();
        await this.seedCategories();
        this.logger.log('Seeding process completed!');
    }

    private async seedUsers() {
        const usersCount = await this.userModel.countDocuments();
        if (usersCount === 0) {
            this.logger.log('No users found. Seeding default users...');

            const hashedPassword = await bcrypt.hash('admin123', 10);

            const defaultUsers = [
                {
                    username: 'superadmin',
                    password: hashedPassword,
                    email: 'superadmin@example.com',
                    type: 'superadmin',
                },
                {
                    username: 'admin',
                    password: hashedPassword,
                    email: 'admin@example.com',
                    type: 'admin',
                },
                {
                    username: 'tech1',
                    password: hashedPassword,
                    email: 'tech1@example.com',
                    type: 'technician',
                },
                {
                    username: 'client1',
                    password: hashedPassword,
                    email: 'client1@example.com',
                    type: 'user',
                },
            ];

            await this.userModel.insertMany(defaultUsers);
            this.logger.log('Default users seeded successfully.');
        } else {
            this.logger.log('Users already exist. Skipping user seeding.');
        }
    }

    private async seedCategories() {
        const categoriesCount = await this.categoryModel.countDocuments();
        if (categoriesCount === 0) {
            this.logger.log('No categories found. Seeding default categories...');

            const defaultCategories = [
                { name: 'Hardware', description: 'Hardware related issues (PCs, Printers, etc.)' },
                { name: 'Software', description: 'Software related issues (OS, Office, Apps)' },
                { name: 'Network', description: 'Network related issues (WiFi, VPN, Cable)' },
                { name: 'Security', description: 'Security related issues (Account lock, Virus, etc.)' },
            ];

            await this.categoryModel.insertMany(defaultCategories);
            this.logger.log('Default categories seeded successfully.');
        } else {
            this.logger.log('Categories already exist. Skipping category seeding.');
        }
    }
}
