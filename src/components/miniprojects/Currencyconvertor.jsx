import React, { useId } from 'react';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import { useState } from 'react';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    const amountInputId = useId();

    return (
        <div className={`bg-[#232946] p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-blue-200 mb-2 inline-block font-semibold">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-[#121629] text-white py-1.5 px-2 rounded focus:ring-2 focus:ring-blue-500 transition"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-blue-200 mb-2 w-full font-semibold">Currency Type</p>
                <select
                    className="rounded-lg px-2 py-1 bg-[#121629] text-white cursor-pointer outline-none border border-blue-600 focus:ring-2 focus:ring-blue-400 transition"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}


function Currencyconvertor() {
    
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('INR');
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from) || {};

    const options = Object.keys(currencyInfo);

    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(0);
        setAmount(0);
    }

    const convertCurrency = () => {
        if (amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }
        if (!currencyInfo[to]) {
            alert("Invalid currency selected");
            return;
        }

        const rate = currencyInfo[to];
        const converted = (amount * rate).toFixed(2);
        setConvertedAmount(converted);
    };
    return (
        <div
            className="w-full min-h-screen flex flex-wrap justify-center items-center relative overflow-hidden"
        >
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/reserve/NV0eHnNkQDHA21GC3BAJ_Paris%20Louvr.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(7px)',
                }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#121629] via-[#232946] to-[#1a223f] opacity-60" />
            
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convertCurrency();
                           
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={setAmount}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable={true}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from} to {to}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );}

export default Currencyconvertor