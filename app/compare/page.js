"use client";

import { useEffect, useState } from "react";

import Info from "../coin/components/info/info.jsx";
import LineChart from "../coin/components/line-chart/line-chart.jsx";
import ToggleComponents from "../coin/components/toggle-component/toggle-component.jsx";
import SelectCoins from "../compare/components/select-coins/select-coins.jsx";
import List from "../dashboard/components/list/list.jsx";
import Loader from "@/components/loader/loader.jsx";
import { get100Coins } from "@/lib/get100Coins";
import { getCoinData } from "@/lib/getCoinData";
import { getPrices } from "@/lib/getPrices";
import { settingChartData } from "@/lib/settingChartData";
import { settingCoinObject } from "@/lib/settingCoinObject";

function Compare() {
    const [allCoins, setAllCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");

    const [coin1Data, setCoin1Data] = useState({});
    const [coin2Data, setCoin2Data] = useState({});

    const [days, setDays] = useState(30);
    const [priceType, setPriceType] = useState("prices");
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        const coins = await get100Coins();

        if (coins) {
            setAllCoins(coins);
            const data1 = await getCoinData(crypto1);
            const data2 = await getCoinData(crypto2);
            settingCoinObject(data1, setCoin1Data);
            settingCoinObject(data2, setCoin2Data);

            if (data1 && data2) {
                const prices1 = await getPrices(crypto1, days, priceType);
                const prices2 = await getPrices(crypto2, days, priceType);
                settingChartData(setChartData, prices1, prices2);
                setLoading(false);
            }
        }
    };

    const onCoinChange = async (e, isCoin2) => {
        setLoading(true);

        if (isCoin2) {
            const newCrypto2 = e.target.value;
            setCrypto2(newCrypto2);

            const data2 = await getCoinData(newCrypto2);
            settingCoinObject(data2, setCoin2Data);

            const prices1 = await getPrices(crypto1, days, priceType);
            const prices2 = await getPrices(newCrypto2, days, priceType);
            settingChartData(setChartData, prices1, prices2);
        } else {
            const newCrypto1 = e.target.value;
            setCrypto1(newCrypto1);

            const data1 = await getCoinData(newCrypto1);
            settingCoinObject(data1, setCoin1Data);

            const prices1 = await getPrices(newCrypto1, days, priceType);
            const prices2 = await getPrices(crypto2, days, priceType);
            settingChartData(setChartData, prices1, prices2);
        }

        setLoading(false);
    };

    const handleDaysChange = async (e) => {
        const newDays = e.target.value;
        setLoading(true);
        setDays(newDays);

        const prices1 = await getPrices(crypto1, newDays, priceType);
        const prices2 = await getPrices(crypto2, newDays, priceType);
        settingChartData(setChartData, prices1, prices2);

        setLoading(false);
    };

    const handlePriceTypeChange = async (e) => {
        const newPriceType = e.target.value;
        setLoading(true);
        setPriceType(newPriceType);

        const prices1 = await getPrices(crypto1, days, newPriceType);
        const prices2 = await getPrices(crypto2, days, newPriceType);
        settingChartData(setChartData, prices1, prices2);

        setLoading(false);
    };

    return (
        <div>
            {loading || !coin1Data?.id || !coin2Data?.id ? (
                <Loader />
            ) : (
                <>
                    <SelectCoins
                        allCoins={allCoins}
                        crypto1={crypto1}
                        crypto2={crypto2}
                        onCoinChange={onCoinChange}
                        days={days}
                        handleDaysChange={handleDaysChange}
                    />
                    <div className="grey-wrapper">
                        <List coin={coin1Data} />
                    </div>
                    <div className="grey-wrapper">
                        <List coin={coin2Data} />
                    </div>
                    <div className="grey-wrapper">
                        <ToggleComponents
                            priceType={priceType}
                            handlePriceTypeChange={handlePriceTypeChange}
                        />
                        <LineChart chartData={chartData} multiAxis={true} />
                    </div>
                    <Info title={coin1Data.name} desc={coin1Data.desc} />
                    <Info title={coin2Data.name} desc={coin2Data.desc} />
                </>
            )}
        </div>
    );
}

export default Compare;
