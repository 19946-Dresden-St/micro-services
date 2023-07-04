import { User } from './user';

export class Article {
  constructor(
    private id: number,
    private title: string,
    private description: string,
    private publishDate: Date,
    private user: User,
  ) {}

  isSame(article: Article): boolean {
    return this.id === article.id;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      publishDate: this.publishDate,
      user: this.user,
    };
  }
}
