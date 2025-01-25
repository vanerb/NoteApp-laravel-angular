export class Note {
  id: string;
  name: string;
  description: string;
  user_id: string;
  images: any[];
  category_id: string;
  created_at: string;
  updated_at: string;

  constructor(
    id: string,
    name: string,
    description: string,
    user_id: string,
    images: any[],
    category_id: string,
    created_at: string,
    updated_at: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.user_id = user_id;
    this.images = images;
    this.category_id = category_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
