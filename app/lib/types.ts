export interface Question {
  id: string;
  text: string;
  required: boolean;
  type: 'text' | 'email' | 'date' | 'tel' | 'url' | 'dropdown';
  metadata?: {
    multiple?: boolean;
    options?: string[];
  }
  // TODO: add more field types like radio, checkbox, etc.
}