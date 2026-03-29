import {
  Controller, Get, Post, Body, UploadedFile,
  UseInterceptors, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

const storage = diskStorage({
  destination: join(__dirname, '..', '..', 'uploads'),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + extname(file.originalname));
  },
});

@Controller('api')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('posts/related')
  findAll() {
    return this.postsService.findAll();
  }

  @Post('post/related')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async create(
    @Body() dto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Image is required');
    if (!dto.title) throw new BadRequestException('Title is required');
    const imageUrl = `/uploads/${file.filename}`;
    return this.postsService.create(dto, imageUrl);
  }
}
