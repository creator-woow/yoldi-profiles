export interface User {
  name: string;
  email: string;
  slug: string;
  description: string | null;
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
