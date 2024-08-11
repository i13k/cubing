"use client";
import { React, Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Decimal from 'decimal.js';
import { green } from '@mui/material/colors';
import { Fade } from '@mui/material';
import { ArraySortScoreResponse } from './messages';

const getNumberOfRows = () => {// table header   row height
    if (typeof window === "undefined") return 0;
    return Math.floor((window.innerHeight - 56.5) / 101.63);
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

const styles = {
    name: {
        width: "25%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    ranking: {
        width: 100,
        pr: 2
    },
    cell: {
        pr: 0,
        "&:last-child": {
            pr: 4
        }
    },
    advancing: {
        color: theme => theme.palette.getContrastText(green["A400"]),
        backgroundColor: green["A400"]
    }
};

class ScoresComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { scores: [], stages: 0, fontSize: 48, status: "shown" };
        this.executed = false;
        this.running = true;
    }
    psetState(newState) { return new Promise(resolve => this.setState(newState, resolve)); }
    async refreshData() {
        const regInfoFetch = await fetch("/api/info");
        const regInfo = await regInfoFetch.json();

        const scoresFetch = await fetch("/api/sortScores");
        const scoresRaw = await scoresFetch.text();
        const scores = ArraySortScoreResponse.decode(new Uint8Array(scoresRaw.split("").map(c => c.charCodeAt(0)))).responses;

        if (window.location.pathname != regInfo.currentRoute)
            window.location.pathname = regInfo.currentRoute;

        await this.psetState({
            scores: scores,
            stages: regInfo.stages,
            fontSize: regInfo.fontSize,
            status: this.state.status
        });
    }

    async setStatus(status) {
        await this.psetState({
            scores: this.state.scores,
            stages: this.state.stages,
            fontSize: this.state.fontSize,
            status: status
        });
    }

    async mainLoop() {
        if (this.executed) return;
        else this.executed = true;
        await this.refreshData();

        while (this.running) {

            await this.setStatus("showing");
            await sleep(1000);

            await this.setStatus("shown");
            await sleep(2000);

            await this.setStatus("hiding");
            await sleep(1000);

            this.currentRow += getNumberOfRows();
            if (this.currentRow >= this.state.scores.length) {
                this.currentRow = 0;
                await this.refreshData();
            }

            await sleep(1000);
        }
    }

    componentDidMount() {
        this.currentRow = 0;
        this.running = true;
        /*this.interval = setInterval(() => {
            this.currentRow += getNumberOfRows();
            if (this.currentRow >= this.state.scores.length) {
                this.currentRow = 0;
                this.refreshData();
            }
            this.setState({
                scores: this.state.scores,
                stages: this.state.stages,
                fontSize: this.state.fontSize,
                status: this.state.status
            });
        }, 3000);*/
        this.mainLoop();
    }
    componentWillUnmount() {
        this.running = false;
    }

    floatToTime(tseconds) {
        if (typeof tseconds === "undefined" || tseconds === null) return "";
        if (tseconds.toString() === "0") return "DNF";
        if (!(tseconds instanceof Decimal)) tseconds = new Decimal(tseconds);

        const minutes = tseconds.div(60).floor();
        let seconds = tseconds.sub(minutes.mul(60));
        let millis = seconds.sub(seconds.floor()).mul(1000).round().toString();
        seconds = seconds.floor().toString();

        if (seconds.length == 1) seconds = "0" + seconds;
        if (millis.length == 1) millis = "00" + millis;
        else if (millis.length == 2) millis = "0" + millis;
        
        return minutes.toString() + ":" + seconds + "." + millis;
    }
    
    render() {
        return (
            <main style={{ width: "100%" }}>
              <TableContainer>
                  <Table sx={{ tableLayout: "fixed", width: "100%" }}>
                      <TableHead>
                          <TableRow key="h">
                              <TableCell sx={{ fontSize: this.state.fontSize, ...styles.cell, ...styles.ranking }} align="right">#</TableCell>
                              <TableCell sx={{ fontSize: this.state.fontSize, ...styles.cell, ...styles.name }}>uczestnik</TableCell>
                              {[...Array(this.state.stages)].map((_, i) => <TableCell sx={{ fontSize: this.state.fontSize, ...styles.cell }} align="right" key={"H"+i}>{i + 1}</TableCell>)}
                              <TableCell sx={{ fontSize: this.state.fontSize, ...styles.cell }} align="right">=</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {
                              this.state.scores.slice(this.currentRow, this.currentRow + getNumberOfRows()).map((score, index) => (
                                <Fade timeout={{ enter: 1000, exit: 1000 }} style={ this.state.status === "showing" ? { transitionDelay: `${index * 150}ms`} : {}} direction="right"
                                in={["showing", "shown"].includes(this.state.status)} key={"F"+score.name}>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: this.state.fontSize, ...(score.green ? styles.advancing : {}), ...styles.ranking, ...styles.name }} align="right" key={"P"+score.name}>{score.place}</TableCell>
                                        <TableCell sx={{ fontSize: this.state.fontSize, ...styles.cell, ...styles.name }} key={"N"+score.name}>{score.name}</TableCell>
                                        {
                                            [...Array(this.state.stages)].map((_, i) =>
                                                <TableCell
                                                    sx={{ fontSize: this.state.fontSize, color: score.gray.includes(score.times[i]) ? "gray" : "", ...styles.cell }}
                                                    align="right"
                                                    key={"T"+i+score.name}
                                                >{this.floatToTime(score.times[i])}</TableCell>
                                        )}
                                        <TableCell sx={{ fontSize: this.state.fontSize, ...styles.cell }} align="right" key={"A"+score.name}>{score.avg}</TableCell>
                                    </TableRow>
                                </Fade>
                              ))
                          }
                      </TableBody>
                  </Table>
              </TableContainer>
            </main>
        );
    }
}

export default function Home() {
    return (
        <ScoresComponent />
    );
}