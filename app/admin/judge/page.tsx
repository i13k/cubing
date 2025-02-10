"use client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react';
import { IMaskInput } from 'react-imask';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Fab from '@mui/material/Fab';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PublishIcon from '@mui/icons-material/Publish';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Constants from "@/app/constants";
import { Backdrop, CircularProgress } from '@mui/material';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props: any, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="0:00.000"
            inputRef={ref}
            onAccept={value => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const fabStyle = {
    position: 'absolute',
    bottom: 16
};

export default function JudgeAdmin() {
    const [value, setValue] = React.useState(1);
    const [stages, setStages] = React.useState(0);
    const [times, setTimes] = React.useState([]);
    const [contestant, setContestant] = React.useState("");
    const [names, setNames] = React.useState([]);
    const [time, setTime] = React.useState("");
    const [currentStage, setCurrentStage] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const closeModal = (): void => {
        setModalOpen(false);
    };
    const closeConfirm = (): void => {
        setConfirmOpen(false);
    };
    const showConfirm = (): void => {
        setConfirmOpen(true);
    };

    const updateScores = async (): Promise<void> => {
        const regInfoFetch = await fetch("/api/info");
        const regInfo = await regInfoFetch.json();

        setNames(regInfo.grouping);
        setStages(regInfo.stages);

        setCurrentStage(1);
        setTime("");
        setTimes([]);
    };

    const updateStages = async (): Promise<void> => {
        const regInfoFetch = await fetch("/api/info");
        const regInfo = await regInfoFetch.json();

        setStages(regInfo.stages);
    };

    const handleChange = async (v: number): Promise<void> => {
        if (v == 1) await updateScores();
        if (v == 0) await updateStages();
        setValue(v);
    }

    const saveTime = (): boolean => {
        if (!Constants.timeStringRegex.test(time)) {
            setModalOpen(true);
            return false;
        }

        let timesTemp = times;
        timesTemp[currentStage-1] = time;
        setTimes(timesTemp);
        return true;
    };

    const previousStage = (): void => {
        if (!saveTime()) return;
        if (currentStage < 2) return;

        setTime(times[currentStage - 2] || "");
        setCurrentStage(currentStage - 1);
    };
    const nextStage = (): void => {
        if (!saveTime()) return;

        if (currentStage + 1 > stages) { // upload scores
            showConfirm();
            return;
        }
        
        setTime(times[currentStage] || "");
        setCurrentStage(currentStage + 1);
    };

    const uploadScores = async(): Promise<void> => {
        closeConfirm();
        setLoading(true);
        await fetch("/api/contestants", {
            method: "PATCH",
            body: JSON.stringify({ name: contestant, times: times.slice(0, stages) })
        });
        await handleChange(1);
        setLoading(false);
    };

    const selectContestant = async (name: string): Promise<void> => {
        setLoading(true);
        setContestant(name);
        await handleChange(0);
        setLoading(false);
    };

    const updateScoresWithLoading = async (): Promise<void> => {
        setLoading(true);
        await updateScores();
        setLoading(false);
    };

    useEffect(() => {
        updateScoresWithLoading();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Backdrop sx={{ color: "#222222", zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
                {loading && <CircularProgress />}
            </Backdrop>
            <div style={{ display: (value == 0 && currentStage != 0) ? "block" : "none", paddingTop: 16 }}>
                <p>Uczestnik: <b>{contestant}</b></p><br />
                <FormControl variant="standard" key="C">
                    <InputLabel htmlFor="S" key="L">Wynik ({currentStage})</InputLabel>
                    <Input inputProps={{ inputMode: "numeric" }} type="text" key="S" value={time} onChange={e => {setTime(e.target.value);}} inputComponent={TextMaskCustom} />
                </FormControl>
            </div>

            {(value == 0 && currentStage > 1) && (
                <Fab sx={{ ...fabStyle, left: 16, display: value == 0 ? "block" : "none" }} color="secondary" onClick={previousStage}>
                    <NavigateBeforeIcon />
                </Fab>
            )}

            {(value == 0 && currentStage != 0) && (
                <Fab sx={{ ...fabStyle, right: 16, display: value == 0 ? "block" : "none" }} color="primary" onClick={nextStage}>
                    {currentStage < stages ? (<NavigateNextIcon />) : (<PublishIcon />)}
                </Fab>
            )}

            <div style={{ display: value == 1 ? "block" : "none", paddingTop: 16 }}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {
                                names.map(name => (
                                    <TableRow key={name}>
                                        <TableCell key={"n"+name} onClick={() => {selectContestant(name);}}>{name}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <Button variant="contained" onClick={() => {updateScoresWithLoading();}}>Odśwież</Button>
            </div>
            <div>
                <Dialog
                    open={modalOpen}
                    onClose={closeModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Błąd
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Wprowadzone dane są niepełne lub nieprawidłowe.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal}>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={confirmOpen}
                    onClose={closeConfirm}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Potwierdź wyniki
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <b>{contestant}</b><br />
                            {[...Array(stages)].map((_, i) => <span key={"S"+i.toString()}><b>{i+1}</b>: {times[i]}<br /></span>)}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeConfirm}>Popraw</Button>
                        <Button onClick={uploadScores} color="error">Wyślij</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </main>
    );
}