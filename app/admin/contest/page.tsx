"use client";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import React from 'react';

export default function ContestAdmin() {
    const removeContestants = (_: any): void => {
        fetch("/api/sortScores?delete=true");
    };
    const autoGrouping = (_: any): void => {
        fetch("/api/autoGrouping");
    };
    return (
        <main className="flex min-h-screen flex-col items-center">
            <AppBar position="static">
                <Tabs indicatorColor="secondary" textColor="inherit" variant="fullWidth" value={0}>
                    <Tab label="Konkurs" />
                </Tabs>
            </AppBar>

            <div style={{ paddingTop: 16 }}>
                <Button variant="contained" color="error" onClick={removeContestants}>Obetnij osoby/następna runda</Button>
            </div>

            <div style={{ paddingTop: 16 }}>
                <Button variant="contained" onClick={autoGrouping}>Auto-rozstawienie</Button>
            </div>
        </main>
    );
}