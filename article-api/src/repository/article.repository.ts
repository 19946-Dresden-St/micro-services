import { Article } from 'src/entities/article';

export interface ArticleRepository {
  getArticles(): Promise<Article[]>;
  createArticle(article: CreateArticle): Promise<Article>;
  getArticle(id: number): Promise<Article>;
  deleteArticle(id: number): Promise<boolean>;
}

export interface CreateArticle {
  title: string;
  description: string;

  token: string;
}
