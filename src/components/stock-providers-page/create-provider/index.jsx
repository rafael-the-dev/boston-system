import * as React from "react";
import classNames from "classnames";

import SaveIcon from '@mui/icons-material/Save';

import classes from "./styles.module.css";

import CancelButton from "src/components/cancel-link";
import Dialog from "src/components/dialog";
import DialogHeader from "src/components/dialog/components/dialog-header";
import PrimaryButton from "src/components/primary-button";
import TextField from "src/components/default-input";

const CreateProvider = () => {
    const [ loading, setLoading ] = React.useState(false);

    const loadingRef = React.useRef(null);
    const onClose = React.useRef(null);
    const onOpen = React.useRef(null);

    const clickHandler = React.useCallback(() => onOpen.current?.(), []);
    const closeHandler = React.useCallback(() => {
        if(loadingRef.current) return;

        onClose.current?.();
    }, [])

    return (
        <>
            <PrimaryButton onClick={clickHandler}>
                Register
            </PrimaryButton>
            <Dialog
                classes={{ paper: classNames(classes.paper, `mx-auto`)}}
                onClose={onClose}
                onOpen={onOpen}
                customClose={closeHandler}>
                <DialogHeader
                    classes={{ root: "bg-blue-500 pl-3 text-white" }}
                    onClose={closeHandler}>
                    Register new provider
                </DialogHeader>
                <form className={classNames("flex flex-col justify-between py-4 px-5 xl:px-6")}>
                    <div>
                        <TextField 
                            className="input"
                            label="Name"
                        />
                        <TextField 
                            className="input"
                            label="NUIT"
                        />
                        <TextField 
                            className="input"
                            label="Address"
                            multiline
                            minRows={6}
                        />
                    </div>
                    <div className="flex justify-end md:mt-6">
                        <CancelButton classes={{ button: "mr-4" }} />
                        <PrimaryButton startIcon={<SaveIcon />}>
                            { loading ? "Loading..." : "Save" }
                        </PrimaryButton>
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default CreateProvider;