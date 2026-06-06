export interface Folder {
  id: string;
  name: string;
  parent_id: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  allow_contributions: boolean;
  children?: Folder[];
}

export interface PDF {
  id: string;
  folder_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
}
