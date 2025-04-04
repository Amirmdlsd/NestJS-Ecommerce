/* eslint-disable prettier/prettier */
import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { category_ids } = createProductDto;
    const product = await this.productRepository.create(createProductDto);
    if (category_ids) {
      const categories = await this.categoryRepository.findBy({ id: In(category_ids) })
      product.categories = categories;
    }
    return await this.productRepository.save(product)
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['categories'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['categories'] });
    if (!product) throw new BadGatewayException("محصول یافت نشد")
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { category_ids } = updateProductDto;
    const product = await this.productRepository.findOne({ where: { id }, relations: ['categories'] });
    if (!product) throw new BadGatewayException("محصول یافت نشد")
    if (updateProductDto.title) product.title = updateProductDto.title
    if (updateProductDto.description) product.description = updateProductDto.description
    if (updateProductDto.stock) product.stock = updateProductDto.stock
    if (category_ids) {
      const categories = await this.categoryRepository.findBy({ id: In(category_ids) });
      product.categories = categories
    }
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
