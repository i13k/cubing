"use client";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ArrayScoresResponse } from '@/app/messages';

export default function RegAdmin() {
    const [value, setValue] = React.useState(0);
    const [name, setName] = React.useState("");
    const [names, setNames] = React.useState([]);
    
    const handleChange = async (e, v) => {
        setValue(v);
        if (v === 1) {
            const scoresFetch = await fetch("/api/scores");
            const scoresRaw = await scoresFetch.text();
            let scoresJson = ArrayScoresResponse.decode(new Uint8Array(scoresRaw.split("").map(c => c.charCodeAt(0)))).responses;
            scoresJson = scoresJson.sort((a, b) => a.name.localeCompare(b.name));
            setNames(scoresJson);
        }
    };
    const addContestant = async (e, v) => {
        setName("");
        await fetch("/api/contestants", {
            method: "PUT",
            body: name
        });
    };
    const deleteContestant = (name, index) => {
        let newNames = [];
        names.map(name2 => {if (name2.name != name) newNames.push(name2)});
        setNames(newNames);
        fetch("/api/contestants", {
            method: "DELETE",
            body: name
        })
    };
    return (
        <main className="flex min-h-screen flex-col items-center">
            <AppBar position="static">
                <Tabs indicatorColor="secondary" textColor="inherit" variant="fullWidth" value={value} onChange={handleChange}>
                    <Tab label="Rejestracja" />
                    <Tab label="Uczestnicy" />
                </Tabs>
            </AppBar>

            <div style={{ display: (value === 0) ? "block" : "none", paddingTop: 16 }}>
                <TextField label="Imię i nazwisko" sx={{ pb: 2 }} value={name} onChange={e => setName(e.target.value)} /><br />
                <Button variant="contained" color="success" align="center" onClick={addContestant}>Dodaj</Button>
            </div>

            <div style={{ display: (value === 1) ? "block" : "none", paddingTop: 16 }}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {
                                names.map(name => (
                                    <TableRow key={name.name}>
                                        <TableCell key={"n"+name.name}>{name.name}</TableCell>
                                        <TableCell key={"d"+name.name}>
                                            <IconButton size="medium" onClick={(e, v) => {deleteContestant(name.name);}}>
                                                <DeleteIcon fontSize="medium" color="error" />
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