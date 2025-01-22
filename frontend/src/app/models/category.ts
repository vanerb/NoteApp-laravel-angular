export class Category {
    id: string;
    name: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  
    constructor(
      id: string,
      name: string,
      user_id: string,
      created_at: string,
      updated_at: string
    ) {
      this.id = id;
      this.name = name;
      this.user_id = user_id;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
}
