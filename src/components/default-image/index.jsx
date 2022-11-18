import Image from "next/legacy/image"
import { styled } from "@mui/material/styles"

const CustomImage = styled(Image)({
    '&': {
        height: '100% !important',
        width: "100% !important"
    }
});

const ImageContainer = (props) => (
    <CustomImage
        { ...props } 
    />
);

export default ImageContainer;