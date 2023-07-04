import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as Dto from './dto.article';

import {
  ArticleRepository,
  CreateArticle,
} from 'src/repository/article.repository';
import { UserRepository } from 'src/repository/user.repository';
import { Article } from 'src/entities/article';
import { GrpcUserAdapter } from '../grpc/user.adapter';

@Injectable()
export class ArticleSqliteAdapter implements ArticleRepository {
  constructor(
    private prisma: PrismaService,
    @Inject(GrpcUserAdapter)
    private readonly userRepository: UserRepository,
  ) {}

  async getArticles(): Promise<Article[]> {
    const articles = await this.prisma.article.findMany();
    return Promise.all(
      articles.map(async (article) => {
        const user = await this.userRepository.getUserById(article.userId);

        return Dto.toEntities(article, user);
      }),
    );
  }

  async createArticle({
    title,
    description,
    user,
  }: CreateArticle): Promise<Article | undefined> {
    try {
      const article = await this.prisma.article.create({
        data: {
          title,
          description,
          publishAt: new Date(),
          userId: user.id,
        },
      });

      return Dto.toEntities(article, user);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async getArticle(id: number): Promise<Article | undefined> {
    try {
      const article = await this.prisma.article.findUnique({
        where: {
          id,
        },
      });

      const user = await this.userRepository.getUserById(article.userId);

      return Dto.toEntities(article, user);
    } catch {
      return undefined;
    }
  }

  async deleteArticle(id: number): Promise<boolean> {
    try {
      await this.prisma.article.delete({
        where: {
          id,
        },
      });
      return true;
    } catch {
      return false;
    }
  }
}
