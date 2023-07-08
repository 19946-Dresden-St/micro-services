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
import { DummyUser } from 'src/entities/user';

@Injectable()
export class ArticleSqliteAdapter implements ArticleRepository {
  constructor(
    private prisma: PrismaService,
    @Inject(GrpcUserAdapter)
    private readonly userRepository: UserRepository,
  ) {}

  private async getArticleByTitle(title: string): Promise<Article | undefined> {
    const article = await this.prisma.article.findFirst({
      where: {
        title,
      },
    });

    if (!article) {
      return undefined;
    }

    const user = await this.userRepository.getUserById(article.userId);

    if (!user) {
      return undefined;
    }

    return Dto.toEntities(article, user);
  }

  async getArticles(): Promise<Article[]> {
    const articles = await this.prisma.article.findMany();
    return Promise.all(
      articles.map(async (article) => {
        const user = await this.userRepository
          .getUserById(article.userId)
          .catch((err) => console.log(err));

        if (!user) {
          return Dto.toEntities(article, DummyUser);
        }

        return Dto.toEntities(article, user);
      }),
    );
  }

  async createArticle({
    title,
    description,
    token,
  }: CreateArticle): Promise<Article | undefined> {
    try {
      const existArticle = await this.getArticleByTitle(title);

      if (existArticle) {
        return undefined;
      }

      const user = await this.userRepository.getUserWithToken(token);

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
