"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import Info from "../components/info/info";
import LineChart from "../components/line-chart/line-chart";
import SelectDays from "../components/select-days/select-days";
import ToggleComponents from "../components/toggle-component/toggle-component";

import Button from "@/components/button/button";
import Loader from "@/components/loader/loader";

import List from "../../dashboard/components/list/list";

import { getCoinData } from "@/lib/getCoinData";
import { getPrices } from "@/lib/getPrices";
import { settingChartData } from "@/lib/settingChartData";
import { settingCoinObject } from "@/lib/settingCoinObject";

function Coin({ id }) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
    const [coin, setCoin] = useState({});
    const [days, setDays] = useState(30);
    const [priceType, setPriceType] = useState("prices");

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    const getData = async () => {
        setLoading(true);
        let coinData = await getCoinData(id, setError);
        settingCoinObject(coinData, setCoin);

        if (coinData) {
            const prices = await getPrices(id, days, priceType, setError);

            if (prices) {
                settingChartData(setChartData, prices);
                setLoading(false);
            }
        }
    };

    const handleDaysChange = async (event) => {
        setLoading(true);
        setDays(event.target.value);
        const prices = await getPrices(id, event.target.value, priceType, setError);

        if (prices) {
            settingChartData(setChartData, prices);
            setLoading(false);
        }
    };

    const handlePriceTypeChange = async (event) => {
        setLoading(true);
        setPriceType(event.target.value);
        const prices = await getPrices(id, days, event.target.value, setError);

        if (prices) {
            settingChartData(setChartData, prices);
            setLoading(false);
        }
    };

    return (
        <>
            {!error && !loading && coin.id ? (
                <>
                    <div className="grey-wrapper">
                        <List coin={coin} delay={0.5} />
                    </div>
                    <div className="grey-wrapper">
                        <SelectDays handleDaysChange={handleDaysChange} days={days} />
                        <ToggleComponents
                            priceType={priceType}
                            handlePriceTypeChange={handlePriceTypeChange}
                        />
                        <LineChart chartData={chartData} />
                    </div>
                    <Info title={coin.name} desc={coin.desc} />
                </>
            ) : error ? (
                <div>
                    <h1 style={{ textAlign: "center" }}>
                        {"Sorry, Couldn't find the coin you're looking for 😞"}
                    </h1>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "2rem",
                        }}
                    >
                        <Link href="/dashboard">
                            <Button text="Dashboard" />
                        </Link>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default Coin;
