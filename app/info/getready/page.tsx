"use client";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Constants from '@/app/constants';

interface RozstawienieState {
    round: string;
    people: string[];
    announcement?: string;
}

class RozstawienieComponent extends React.Component {
    interval: any;
    state: RozstawienieState;
    constructor(props) {
        super(props);
        this.state = { round: "", people: [] };
    }
    async refreshData() {
        const regInfoFetch = await fetch("/api/info");
        const regInfo = await regInfoFetch.json();

        if (window.location.pathname != regInfo.currentRoute)
            window.location.pathname = regInfo.currentRoute;

        this.setState({
            round: regInfo.round,
            people: regInfo.people,
            announcement: regInfo.announcement
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.refreshData(), Constants.dataRefreshInterval);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <main className="flex min-h-screen flex-col items-center p-24">
                <table>
                    <tbody>
                        <tr>
                            <td style={{ verticalAlign: "top" }}><FollowTheSignsIcon color="warning" sx={{ fontSize: 256 }} /></td>
                            <td style={{ verticalAlign: "top", fontSize: 32 }}>
                                <p><b style={{ fontSize: 64 }}>Runda { this.state.round }</b></p>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontSize: Constants.fontSize }} align="right">st.</TableCell>
                                                <TableCell sx={{ fontSize: Constants.fontSize }}>uczestnik</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                this.state.people.map((person, index) => (
                                                    <TableRow key={person}>
                                                        <TableCell sx={{ fontSize: Constants.fontSize }} component="th" align="right">{index + 1}</TableCell>
                                                        <TableCell sx={{ fontSize: Constants.fontSize }}>{person}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {this.state.announcement && (<p><InfoIcon color="info" sx={{ fontSize: 32 }} />&nbsp;{this.state.announcement}</p>)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        );
    }
}

export default function GetReady() {
    return (
        <RozstawienieComponent />
    );
}