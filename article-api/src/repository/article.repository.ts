import { Article } from 'src/entities/article';
import { User } from 'src/entities/user';

export interface ArticleRepository {
  getArticles(): Promise<Article[]>;
  createArticle(article: CreateArticle): Promise<Article>;
  getArticle(id: number): Promise<Article>;
  deleteArticle(id: number): Promise<boolean>;
}

export interface CreateArticle {
  title: string;
  description: string;

  user: User;
}
