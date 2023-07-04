import * as P from '@prisma/client';
import { Article } from 'src/entities/article';
import { User } from 'src/entities/user';

export const toEntities = (article: P.Article, user: User): Article => {
  return new Article(
    article.id,
    article.title,
    article.description,
    article.publishAt,
    user,
  );
};
