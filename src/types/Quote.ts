export interface Quote {
  id: string;
  text: string;
  author: string;
  book: string;
  year?: number;
  genre?: string;
  likes: number;
  isLiked: boolean;
}