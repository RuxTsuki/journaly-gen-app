import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ImageNote } from "../../../generalTypes/notes.interface";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size}&h=${size}&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ImageGallery = ({ images = [] }: { images: ImageNote[] }) => {
  return (
    <ImageList
      sx={{ width: "100%", height: 450, mt: 2 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {images.map((img) => (
        <ImageListItem key={img.asset_id}>
          <img
            {...srcset(img.secure_url, 164)}
            alt={`img Note ${img.asset_id}`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGallery;
