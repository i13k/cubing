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

export default function JudgeAdmin() {
    const [value, setValue] = React.useState(0);
    const [stages, setStages] = React.useState(0);
    const [times, setTimes] = React.useState([]);
    const [contestant, setContestant] = React.useState("");
    const [names, setNames] = React.useState([]);

    const handleChange = async (_, v): Promise<void> => {
        setValue(v);
        if (v === 1) {
            const scoresFetch: Response = await fetch("/api/scores");
            const scoresRaw: string = await scoresFetch.text();
            let scoresJson = ArrayScoresResponse.decode(new Uint8Array(scoresRaw.split("").map(c => c.charCodeAt(0)))).responses;
            scoresJson = scoresJson.sort((a, b) => a.name.localeCompare(b.name));

            const regInfoFetch = await fetch("/api/info");
            const regInfo = await regInfoFetch.json();

            setStages(regInfo.stages);
            setNames(scoresJson);
            setTimes(new Array(stages).fill("a"))
        }
    }

    const updateScores = async(_): Promise<void> => {
        await fetch("/api/contestants", {
            method: "PATCH",
            body: JSON.stringify({ name: contestant, times: times })
        });
        handleChange(null, 1);
    };

    return (
        <main className="flex min-h-screen flex-col items-center">
            <AppBar position="static">
                <Tabs indicatorColor="secondary" textColor="inherit" variant="fullWidth" value={value} onChange={handleChange}>
                    <Tab label="Wyniki" />
                    <Tab label="Uczestnicy" />
                </Tabs>
            </AppBar>

            <div style={{ display: (value === 0) ? "block" : "none", paddingTop: 16 }}>
                <p>Wybrany uczestnik: <b>{contestant}</b></p><br />
                <Stack spacing={2} sx={{ pb: 2 }}>
                {[...Array(stages)].map((_, i) => (
                    <FormControl variant="standard" key={"C"+i}>
                        <InputLabel htmlFor={"S"+i} key={"L"+i}>Wynik ({i + 1})</InputLabel>
                        <Input inputProps={{ inputMode: "numeric" }} type="text" key={"S"+i} onChange={e => {let q=times;q[i]=e.target.value;setTimes(q);}} inputComponent={TextMaskCustom} />
                    </FormControl>
                ))}
                </Stack>
                <Button variant="contained" color="success" onClick={updateScores}>Zatwierdź</Button>
            </div>

            <div style={{ display: (value === 1) ? "block" : "none", paddingTop: 16 }}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {
                                names.map(name => (
                                    <TableRow key={name.name} sx={{ backgroundColor: contestant === name.name ? "blue" : "" }}>
                                        <TableCell key={"n"+name.name}>{name.name}</TableCell>
                                        <TableCell key={"d"+name.name}>
                                            <IconButton size="medium" onClick={e => {setTimes(new Array(stages).fill("")), setContestant(name.name);}} key={"i"+name.name}>
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