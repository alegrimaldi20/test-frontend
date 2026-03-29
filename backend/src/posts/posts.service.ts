import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RelatedPost } from './related-post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(RelatedPost)
    private readonly postRepository: Repository<RelatedPost>,
  ) {}

  async findAll(): Promise<RelatedPost[]> {
    return this.postRepository.find({ order: { createdAt: 'DESC' } });
  }

  async create(dto: CreatePostDto, imageUrl: string): Promise<RelatedPost> {
    const post = this.postRepository.create({
      title: dto.title,
      imageUrl,
    });
    return this.postRepository.save(post);
  }
}
