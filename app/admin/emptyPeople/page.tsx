"use client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

interface Score {
    name: string;
    times: number[];
}

export default function EmptyPeople() {
    const [names, setNames] = React.useState([]);
    const [selNames, setSelNames] = React.useState([]);
    
    const refresh = async _ => {
        const scoresFetch = await fetch("/api/scores");
        let scoresJson = await scoresFetch.json();
        scoresJson = scoresJson.filter(a => a.times.length === 0);
        scoresJson = scoresJson.sort((a, b) => a.name.localeCompare(b.name));
        setNames(scoresJson);
    };
    const selectContestant = (name: string): void => {
        let q: string[] = selNames;
        if (q.indexOf(name) === -1)
            q.push(name);
        else
            q = q.filter(a => a != name);
        setSelNames(q);
        fetch("/api/selectedContestants", {
            method: "PUT",
            body: JSON.stringify({ names: q })
        });
        refresh(null);
    };

    return (
        <main className="flex min-h-screen flex-col items-center">
            <Button variant="contained" color="info" onClick={refresh} sx={{ pt: 1, mt: 3, mb: 2 }}>Odśwież</Button>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {
                                names.map((name: Score) => (
                                    <TableRow key={name.name} sx={{ backgroundColor: selNames.indexOf(name.name) !== -1 ? "blue" : "" }}>
                                        <TableCell key={"n"+name.name}>{name.name}</TableCell>
                                        <TableCell key={"d"+name.name}>
                                            <IconButton size="medium" onClick={e => {selectContestant(name.name);}}>
                                                <CheckIcon fontSize="medium" color="info" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        </main>
    );
}