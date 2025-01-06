"use client";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
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
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PublishIcon from '@mui/icons-material/Publish';
import { ArrayScoresResponse } from '@/app/messages';

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

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boder: '2px solid #000',
    boxShadow: 24,
    p: 4
};

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

    const saveTime = (): void => {
        let timesTemp = times;
        timesTemp[currentStage-1] = time;
        setTimes(timesTemp);
    };

    const previousStage = (): void => {
        saveTime();

        if (currentStage < 2) return;

        setTime(times[currentStage - 2]);
        setCurrentStage(currentStage - 1);
    };

    const nextStage = (): void => {
        saveTime();

        if (currentStage + 1 > stages) {
            updateScores();
            return;
        }
        
        setTime(times[currentStage]);
        setCurrentStage(currentStage + 1);
    };

    const updateScores = async(): Promise<void> => {
        await fetch("/api/contestants", {
            method: "PATCH",
            body: JSON.stringify({ name: contestant, times: times })
        });
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
                                            <IconButton size="medium" onClick={e => {setTimes(new Array(stages).fill("")); setContestant(name.name);}} key={"i"+name.name}>
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

            
        </main>
    );
}

/*

    const [modalOpen, setModalOpen] = React.useState(false);
<div>
                <Modal open={modalOpen} onClose={closeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Błąd danych
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Wprowadzone dane są niepełne lub nieprawidłowe.
                        </Typography>
                    </Box>
                </Modal>
            </div>
            let error = false;
        for (let i = 0; i < times.length; ++i) {
            if (times[i].length != 8) { error = true; break; }
            if (parseInt(times[i][2]) > 5) { error = true; break; }
        }
        if (error) {
            setModalOpen(true);
            return;
        }
*/