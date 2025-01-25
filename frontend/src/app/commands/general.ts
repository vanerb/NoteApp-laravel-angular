export interface CardGeneral {
  id: string;
  name: string;
  description: string;
  url: string;
  images: any[]
}

export interface HeaderGeneral {
    name: string;
    url: string;
    isEnabled: boolean;
    action?:()=>void
}
