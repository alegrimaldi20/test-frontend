import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { RelatedPost } from './posts/related-post.entity';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, '..', 'data', 'db.sqlite'),
      entities: [RelatedPost],
      synchronize: true,
    }),
    PostsModule,
  ],
})
export class AppModule {}
