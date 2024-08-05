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
import CheckIcon from '@mui/icons-material/Check';
import { ArrayScoresResponse } from '@/app/messages';

class JudgeAdminComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 0, stages: 0, times: [], contestant: "", names: [] };
        this.executed = false;
        this.running = true;
    }

    async handleChange (_, v) {
        this.setState({
            value: v,
            stages: this.state.stages,
            times: this.state.times,
            contestant: this.state.contestant,
            names: this.state.names
        });
        if (v === 1) {
            const scoresFetch = await fetch("/api/scores");
            const scoresRaw = await scoresFetch.text();
            let scoresJson = ArrayScoresResponse.decode(new Uint8Array(scoresRaw.split("").map(c => c.charCodeAt(0)))).responses;
            scoresJson = scoresJson.sort((a, b) => a.name.localeCompare(b.name));

            const regInfoFetch = await fetch("/api/info");
            const regInfo = await regInfoFetch.json();

            this.setState({
                value: this.state.value,
                stages: regInfo.stages,
                times: this.state.times,
                contestant: this.state.contestant,
                names: scoresJson
            });
        }
    }

    changeTime (e) {
        let q = this.state.times, w = e.target.value.slice(0, e.target.value.length - 1), c = e.target.value[e.target.value.length - 1];
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."].includes(c)) w += c;
        
        q[e.target.id.substring(1)] = w;
        this.setState({
            value: this.state.value,
            stages: this.state.stages,
            times: q,
            contestant: this.state.contestant,
            names: this.state.names
        });
    }

    async updateScores (_, __) {
        await fetch("/api/contestants", {
            method: "PATCH",
            body: JSON.stringify({ name: this.state.contestant, times: this.state.times })
        });
        this.handleChange(null, 1);
    }

    render() {
        return (
        <main className="flex min-h-screen flex-col items-center">
            <AppBar position="static">
                <Tabs indicatorColor="secondary" textColor="inherit" variant="fullWidth" value={this.state.value} onChange={this.handleChange.bind(this)}>
                    <Tab label="Wyniki" />
                    <Tab label="Uczestnicy" />
                </Tabs>
            </AppBar>

            <div style={{ display: (this.state.value === 0) ? "block" : "none", paddingTop: 16 }}>
                <p>Wybrany uczestnik: <b>{this.state.contestant}</b></p><br />
                {
                    [...Array(this.state.stages)].map((_, i) => (
                        <div key={"div"+i}>
                            <TextField id={"S"+i} label={"Wynik ("+(i+1)+")"} inputProps={{ inputMode: "numeric" }} type="text" sx={{ pb: 2 }} key={"S"+i} value={this.state.times[i] || ""} onChange={this.changeTime.bind(this)} /><br key={"br"+i} />
                        </div>
                    ))
                }
                <Button variant="contained" color="success" align="center" onClick={this.updateScores.bind(this)}>Zatwierdź</Button>
            </div>

            <div style={{ display: (this.state.value === 1) ? "block" : "none", paddingTop: 16 }}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {
                                this.state.names.map(name => (
                                    <TableRow key={name.name} sx={{ backgroundColor: this.state.contestant === name.name ? "blue" : "" }}>
                                        <TableCell key={"n"+name.name}>{name.name}</TableCell>
                                        <TableCell key={"d"+name.name}>
                                            <IconButton size="medium" onClick={(e, v) => {this.setState({value: this.state.value, stages: this.state.stages, times: new Array(this.state.stages).fill(""), contestant: name.name, names: this.state.names});}} key={"i"+name.name}>
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
}

export default function JudgeAdmin() {
    return (
        <JudgeAdminComponent />
    );
}