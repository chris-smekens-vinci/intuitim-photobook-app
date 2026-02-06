export interface CategoryDto {
  _id: string;
  name: string;
}

export interface PhotoDto {
  _id: string;
  title: string;
  url: string;
  category: {
    _id?: string;
    name: string;
  };
  dateOfRealization: Date;
  description?: string;
  comments: Array<{
    content: string;
    createdAt: Date;
  }>;
  isDeleted?: boolean;
}