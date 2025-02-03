"use client";
import Button from '@mui/material/Button';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function ContestAdmin() {
    const [confirmRemoveContestantsOpen, setConfirmRemoveContestantsOpen] = React.useState(false);
    const [route, setRoute] = React.useState("/");
    const [round, setRound] = React.useState("1");
    const [stages, setStages] = React.useState("3");
    const [type, setType] = React.useState("M");
    const [qualification, setQualification] = React.useState("20");
    const [announcement, setAnnouncement] = React.useState("Testowe ogłoszenie.");

    const removeContestantsOpen = (_: any): void => {
        setConfirmRemoveContestantsOpen(true);
    }
    const removeContestantsClose = (_: any): void => {
        setConfirmRemoveContestantsOpen(false);
    }

    const syncDownload = async (): Promise<void> => {
        const regInfoFetch = await fetch("/api/info");
        const regInfo = await regInfoFetch.json();

        setRoute(regInfo.route);
        setRound(regInfo.round.toString());
        setStages(regInfo.stages.toString());
        setType(regInfo.type.toString());
        setQualification(regInfo.qualification.toString());
        setAnnouncement(regInfo.announcement.toString());
    };

    const syncUpload = (): void => {
        fetch("/api/options", {
            method: "PATCH",
            body: JSON.stringify({ "route": route, "round": parseInt(round), "stages": parseInt(stages), "type": type, "qualification": parseInt(qualification), "announcement": announcement })
        });
    }

    const removeContestants = async (_: any): Promise<void> => {
        await fetch("/api/sortScores?delete=true");
        syncDownload();
    };
    const autoGrouping = async (_: any): Promise<void> => {
        await fetch("/api/autoGrouping");
        syncDownload();
    };

    return (
        <main className="flex min-h-screen flex-col items-center">
            <p style={{ paddingTop: 16, fontSize: 24 }}><b>Administracja turniejem</b></p>

            <div style={{ paddingTop: 16 }}>
                <Button variant="contained" onClick={syncDownload}>Pobierz z bazy</Button>
            </div>

            <div style={{ paddingTop: 16 }}>
                <FormControl fullWidth>
                    <InputLabel id="route-label">Projektor</InputLabel>
                    <Select labelId="route-label" id="route" value={route} label="Projektor" onChange={e => {setRoute(e.target.value);}}>
                        <MenuItem value="/">Wyniki</MenuItem>
                        <MenuItem value="/info/getready">Rozstawienie</MenuItem>
                        <MenuItem value="/info/registration">Rejestracja</MenuItem>
                    </Select>
                </FormControl>
            </div>
            
            <div style={{ paddingTop: 16 }}>
                <TextField type="text" label="Runda" value={round} onChange={e => {setRound(e.target.value);}} style={{ width: 64 }} />&nbsp;
                <TextField type="text" label="Etapy" value={stages} onChange={e => {setStages(e.target.value);}} style={{ width: 64 }} />
            </div>

            <div style={{ paddingTop: 16 }}>
                <FormControl fullWidth>
                    <InputLabel id="kind-label">Rodzaj</InputLabel>
                    <Select labelId="kind-label" id="kind" value={type} label="Rodzaj" onChange={e => {setType(e.target.value);}}>
                        <MenuItem value="M">Średnia [M]</MenuItem>
                        <MenuItem value="A">Śr. obcięta [A]</MenuItem>
                        <MenuItem value="B">Tylko najlepszy [B]</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div style={{ paddingTop: 16 }}>
                <TextField type="text" label="Kwalifikacja" value={qualification} onChange={e => {setQualification(e.target.value);}} />
            </div>

            <div style={{ paddingTop: 16 }}>
                <TextField type="text" label="Ogłoszenie" value={announcement} onChange={e => {setAnnouncement(e.target.value);}} />
            </div>

            <div style={{ paddingTop: 16 }}>
                <Button variant="contained" onClick={syncUpload}>Zapisz do bazy</Button>
            </div>
            <div style={{ paddingTop: 16 }}>
                <Button variant="contained" onClick={autoGrouping}>Auto-rozstawienie</Button>
            </div>
            <div style={{ paddingTop: 16 }}>
                <Button variant="contained" color="error" onClick={removeContestantsOpen}>Następna runda</Button>
            </div>
            <div>
                <Dialog
                    open={confirmRemoveContestantsOpen}
                    onClose={removeContestantsClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Ostrzeżenie
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Uwaga! Ta czynność:<br />
                            * usunie wszystkich nieoznaczonych na zielono,<br />
                            * wyzeruje wyniki wszystkich uczestników,<br />
                            * zwiększy numer rundy o 1.<br/>
                            Numer rundy wyświetlany jest na stronie z rozstawieniem.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={removeContestantsClose}>Anuluj</Button>
                        <Button onClick={removeContestants} color="error">Potwierdź</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </main>
    );
}