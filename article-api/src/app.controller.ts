import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ArticleSqliteAdapter } from './adapter/sqlite/article.adapter';
import { ArticleRepository } from './repository/article.repository';
import { Article } from './entities/article';
import { User } from './entities/user';
import {
  CheckTokenRequest,
  CheckTokenResponse,
} from './stubs/user/v1alpha/user';

@Controller('/article')
export class AppController {
  constructor(
    @Inject(ArticleSqliteAdapter)
    private readonly articleService: ArticleRepository,
  ) {}

  @Get()
  async getUsers(): Promise<Article[]> {
    return this.articleService.getArticles();
  }

  @Get('/:id')
  async getUser(@Param('id') id): Promise<Article> {
    return this.articleService.getArticle(id);
  }

  @Post('')
  @HttpCode(200)
  async createArticle(
    @Body()
    {
      title,
      description,
      token,
    }: {
      title: string;
      description: string;
      token: string;
    },
  ): Promise<Article> {
    return this.articleService.createArticle({
      title,
      description,
      token,
    });
  }

  @Delete('/:id')
  async createUser(@Param('id') id): Promise<boolean> {
    return this.articleService.deleteArticle(id);
  }
}
