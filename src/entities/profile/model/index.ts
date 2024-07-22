export interface Profile {
  name: string;
  email: string;
  slug: string;
  description: string;
  image: {
    id: string;
    url: string;
    width: string;
    height: string;
  } | null;
  cover: {
    id: string;
    url: string;
    width: string;
    height: string;
  } | null;
}
