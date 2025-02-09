"use client";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { IMaskInput } from 'react-imask';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Fab from '@mui/material/Fab';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PublishIcon from '@mui/icons-material/Publish';
import { ArrayScoresResponse } from '@/app/messages';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Constants from "@/app/constants";

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
    const [value, setValue] = React.useState(0);
    const [stages, setStages] = React.useState(0);
    const [times, setTimes] = React.useState([]);
    const [contestant, setContestant] = React.useState("");
    const [names, setNames] = React.useState([]);
    const [time, setTime] = React.useState("");
    const [currentStage, setCurrentStage] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const handleChange = async (reset, v: number): Promise<void> => {
        setValue(v);
        if (v == 1) {
            const scoresFetch: Response = await fetch("/api/scores");
            const scoresRaw: string = await scoresFetch.text();
            let scoresJson = ArrayScoresResponse.decode(new Uint8Array(scoresRaw.split("").map(c => c.charCodeAt(0)))).responses;
            scoresJson = scoresJson.sort((a, b) => a.name.localeCompare(b.name));

            const regInfoFetch = await fetch("/api/info");
            const regInfo = await regInfoFetch.json();

            setNames(scoresJson);

            if (reset == 2 || currentStage == 0) {
                setStages(regInfo.stages);
                setCurrentStage(1);
                setTime("");
                setTimes([]);
            }
        }
    }

    const closeModal = (): void => {
        setModalOpen(false);
    };

    const closeConfirm = (): void => {
        setConfirmOpen(false);
    };

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

    const updateStages = async (): Promise<void> => {
        const regInfoFetch = await fetch("/api/info");
        const regInfo = await regInfoFetch.json();
        setStages(regInfo.stages);
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

    const showConfirm = (): void => {
        setConfirmOpen(true);
    };

    const uploadScores = async(): Promise<void> => {
        await fetch("/api/contestants", {
            method: "PATCH",
            body: JSON.stringify({ name: contestant, times: times.slice(0, stages) })
        });
        closeConfirm();
        handleChange(2, 1);
    };

    return (
        <main className="flex min-h-screen flex-col items-center">
            <AppBar position="static">
                <Tabs indicatorColor="secondary" textColor="inherit" variant="fullWidth" value={value} onChange={handleChange}>
                    <Tab label="Wyniki" />
                    <Tab label="Uczestnicy" />
                </Tabs>
            </AppBar>

            <div style={{ display: (value == 0 && currentStage != 0) ? "block" : "none", paddingTop: 16 }}>
                <p>Wybrany uczestnik: <b>{contestant}</b></p><br />
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
                                    <TableRow key={name.name} sx={{ backgroundColor: contestant == name.name ? "blue" : "" }}>
                                        <TableCell key={"n"+name.name}>{name.name}</TableCell>
                                        <TableCell key={"d"+name.name}>
                                            <IconButton size="medium" onClick={e => {setContestant(name.name); updateStages();}} key={"i"+name.name}>
                                                <CheckIcon key={"c"+name.name} fontSize="medium" color="info" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
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
                            Uczestnik: <b>{contestant}</b><br />
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