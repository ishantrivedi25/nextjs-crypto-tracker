"use client";

import { useEffect, useState } from "react";
import Link from "next/link.js";

import Button from "@/components/button/button";
import TabsComponent from "../dashboard/components/tabs/tabs.jsx";
import { get100Coins } from "@/lib/get100Coins.js";

function Watchlist() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        if (watchlist) {
            getData();
        }
    }, []);

    const getData = async () => {
        const allCoins = await get100Coins();
        if (allCoins) {
            setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
        }
    };

    return (
        <div>
            {watchlist?.length > 0 ? (
                <TabsComponent coins={coins} />
            ) : (
                <div>
                    <h1 style={{ textAlign: "center" }}>
                        Sorry, No Items In The Watchlist.
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
            )}
        </div>
    );
}

export default Watchlist;
