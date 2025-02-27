"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Loader from "@/components/loader/loader.jsx";
import TopButton from "@/components/top-button/top-button.jsx";
import Footer from "@/components/footer/footer.jsx";
import Search from "./components/search/search.jsx";
import TabsComponent from "./components/tabs/tabs.jsx";
import PaginationComponent from "./components/pagination/pagination.jsx";

function Dashboard() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [paginatedCoins, setPaginatedCoins] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setLoading(true);
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
            )
            .then((response) => {
                setCoins(response.data);
                setPaginatedCoins(response.data.slice(0, 10));
                setLoading(false);
            })
            .catch((error) => {
                console.log("Failed to Fetch Data: ", error.message);
            });
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    };

    const filteredCoins = coins.filter(
        (coin) =>
            coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
    );

    const handlePageChange = (event, value) => {
        setPage(value);

        const initialCount = (value - 1) * 10;

        setPaginatedCoins(coins.slice(initialCount, initialCount + 10));
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Search search={search} handleChange={handleChange} />
                    <TabsComponent
                        coins={search ? filteredCoins : paginatedCoins}
                        setSearch={setSearch}
                    />
                    {!search && (
                        <PaginationComponent
                            page={page}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </>

            )}
            <TopButton />
            <Footer />
        </>
    );
}

export default Dashboard;