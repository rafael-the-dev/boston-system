import * as React from "react";
import Button from "@mui/material/Button";

const Image = React.forwardRef(({ alt, classes, src }, ref) => {
    const [ file, setFile ] = React.useState({
        url: src
    });

    const inputRef = React.useRef(null);

    const changeHandler = React.useCallback(e => {
        const inputFile = event.target.files[0];
        
        if(inputFile) {
            const reader = new FileReader();

            reader.onload = event => {
                setFile({
                    input: inputFile,
                    url: event.target.result
                })
            };

            reader.readAsDataURL(inputFile);
        }
    }, []);

    const clickHandler = React.useCallback(() => {
        inputRef.current?.click();
    }, [])

    return (
        <Button 
            className={ classes?.root }
            onClick={clickHandler}>
            <img
                alt={alt ?? ""}
                className="block h-full w-full"
                ref={ref}
                src={file.url}
            />
            <input 
                className="hidden"
                onChange={changeHandler}
                ref={inputRef}
                type="file"
            />
        </Button>
    );
});

Image.displayName = 'Image';

export default Image;