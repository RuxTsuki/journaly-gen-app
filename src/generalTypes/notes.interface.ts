export interface Note {
  id: string;
  title: string;
  body: string;
  date: number;
  imageUrls?: ImageNote[];
}

export interface ImageNote {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: "jpg" | "png";
  resource_type: "image" | string;
  created_at: string;
  tags: [];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
}
