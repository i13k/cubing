"use client";
import InfoIcon from '@mui/icons-material/Info';
import React, { Component } from 'react';
import { ArrayScoresResponse } from '@/app/messages';
import Constants from '@/app/constants';

interface InfoCenterState {
    peopleCount: string;
    announcement: string;
    peopleText: string;
}

class InfoCenterComponent extends React.Component {
    state: InfoCenterState;
    interval: any;
    constructor(props) {
        super(props);
        this.state = { peopleCount: "", announcement: "", peopleText: "" };
    }
    async refreshData() {
        const regInfoFetch = await fetch("/api/info");
        const regInfo = await regInfoFetch.json();

        if (window.location.pathname != regInfo.route)
            window.location.pathname = regInfo.route;

        const scoresFetch = await fetch("/api/scores");
        const scoresRaw = await scoresFetch.text();
        const scores = ArrayScoresResponse.decode(new Uint8Array(scoresRaw.split("").map(c => c.charCodeAt(0)))).responses;

        const lastDigit = scores.length.toString()[scores.length.toString().length - 1];
        let text: string = "";

        switch (lastDigit) {
            case '2':
            case '3':
            case '4':
                text = "osoby zarejestrowane";
                break;
            default:
                text = "osób zarejestrowanych";
                break; 
        }

        this.setState({
            announcement: regInfo.announcement,
            peopleCount: scores.length.toString(),
            peopleText: text
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
            <main className="flex min-h-screen flex-col items-center p-24" style={{ background: "rgb(18, 18, 18)", color: "rgb(255, 255, 255)" }}>
                <table>
                    <tbody>
                        <tr>
                            <td style={{ verticalAlign: "top" }}><InfoIcon color="info" sx={{ fontSize: 256 }} /></td>
                            <td style={{ verticalAlign: "top", fontSize: 32 }}>
                                <p><b style={{ fontSize: 64 }}>Rejestracja</b></p>
                                <p>{ this.state.announcement }</p>
                                <p><b style={{ fontSize: 56 }}>{ this.state.peopleCount }</b>&nbsp;{ this.state.peopleText }</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </main>
        );
    }
}

export default function InfoCenter() {
    return (
        <InfoCenterComponent />
    );
}