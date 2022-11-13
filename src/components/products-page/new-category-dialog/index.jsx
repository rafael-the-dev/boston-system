import * as React from "react";
import { Button } from "@mui/material";
import classNames from "classnames";

import classes from "./styles.module.css";

import { getCategories } from "src/helpers/queries"

import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";
import TextField from "src/components/default-input";

const CategoryDialog = ({ setCategories }) => {
    const [ description, setDescription ] = React.useState("");
    const [ loading, setLoading ] = React.useState(false);
    const [ type, setType ] = React.useState("");

    const descriptionRef = React.useRef(null);
    const typeRef = React.useRef(null);

    const onClose = React.useRef(null);
    const onOpen = React.useRef(null);
    
    const closeHandler = React.useCallback(() => {
        if(loading) return;

        onClose.current?.();
    }, [ loading ]);
    const clickHandler = React.useCallback(() => onOpen.current?.(), []);

    const changeHandler = React.useCallback(func => e => func(e.target.value), []);

    const submitHandler = React.useCallback(e => {
        e.preventDefault();

        try {
            setLoading(isLoading => {
                if(isLoading) throw new Error();

                return true;
            });

            const headers = {
                "Authorization": JSON.parse(localStorage.getItem(process.env.LOCAL_STORAGE)).user.token
            };

            const options = {
                body: JSON.stringify({ description: descriptionRef.current.value, type: typeRef.current.value }),
                headers,
                method: "POST"
            }

            fetch("/api/categories", options)
                .then(async res => {
                    if(res.status !== 201) throw new Error();
                    
                    setDescription("");
                    setType("");

                    await getCategories({ options: { headers }})
                        .then(data => setCategories(data));

                        
                    setLoading(false);
                    onClose.current?.();
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                })
        } catch(e) {

        }
    }, [ setCategories ])

    const buttonMemo = React.useMemo(() => (
        <Button
            className="border-blue-500 mr-3 mb-4 py-2 sm:mb-0 text-blue-500 md:py-3 hover:bg-blue-500 hover:text-white"
            onClick={clickHandler}
            variant="outlined">
            Add new category
        </Button>
    ), [ clickHandler ]);

    const headerMemo = React.useMemo(() => (
        <DialogHeader 
            classes={{ root: "bg-blue-700 pl-2 text-white" }}
            onClose={closeHandler}>
            Add new category
        </DialogHeader>
    ), [ closeHandler ]);

    return (
        <>
            { buttonMemo }
            <Dialog
                classes={{ paper: classNames(classes.paper, `m-0`) }}
                customClose={closeHandler}
                onClose={onClose}
                onOpen={onOpen}>
                { headerMemo }
                <form 
                    className="px-4 py-6"
                    onSubmit={submitHandler}>
                    <div className="flex flex-wrap justify-between">
                        <TextField 
                            className="input w12"
                            inputRef={typeRef}
                            label="Type"
                            onChange={changeHandler(setType)}
                            required
                            value={type}
                            variant='outlined'
                        />
                        <TextField 
                            className="input w12"
                            inputRef={descriptionRef}
                            label="Description"
                            onChange={changeHandler(setDescription)}
                            required
                            value={description}
                            variant='outlined'
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className="bg-blue-500 border-blue-500 py-2 text-white md:py-3 hover:bg-blue-700"
                            disabled={description.length ===  0 || type.length === 0}
                            type="submit"
                            variant="outlined">
                            { loading ? "Loading..." : "Submit" }
                        </Button>
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default CategoryDialog;