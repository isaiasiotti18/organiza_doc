export interface DocumentInterface {
  id: string;
  name: string;
  description: string;
  file: File
  category: string | undefined;
  dueDate: Date
  url: string;
}