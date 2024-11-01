import axios from "axios";
import React, { useEffect, useState } from 'react';

export default function MainPage() {
    //states for the form fields
    const [date, setDate] = useState("");
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
    const [amountinTargetCurrency, setAmountInTargetCurrency] = useState(0);
const [currencyNames, setCurrencyNames] = useState([]);
//handleSubmit method
const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        const response = await axios.get("http://localhost:5000/convert", {
            params:{
                date,
                sourceCurrency,
                targetCurrency,
                amountInSourceCurrency,
            },
        });
        setAmountInTargetCurrency(parseFloat(response.data.targetAmount).toFixed(2));

        console.log(amountInSourceCurrency, amountinTargetCurrency);
    } catch (err) {
        console.error(err)
        
    }
};
// get all currency names
useEffect(()=>{
    const getCurrencyNames = async() => {
        try {
            const response = await axios.get(
                "http://localhost:5000/getAllCurrencies");
            setCurrencyNames(response.data);
            
        } catch (err) {
            console.error(err);
        }
    };
    getCurrencyNames();
}, [])
    return (
    <div>
        <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Thishanwickramasinghe@gmail.com</span>
        <h1 className='lg:mx-32 text-5xl font-bold text-green-600 text-center '>Covert you currencies here</h1>
        <p className='lg:mx32 opacity-40 py-6 text-center'>
        Enter the details below to convert your chosen currency on a specified date. You’ll receive an instant, accurate result based on real-time exchange rates.
        </p>

    <div className='mt-5 flex items-center justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                <label htmlFor={date}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                <input
                onChange={(e)=>setDate(e.target.value)}
                type="date"
                id={date}
                name={date}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-blue-500" required />
                </div>
                
                <div className='mb-4'>
                <label htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Source Currency
                    </label>
                <select
                onChange={(e)=> setSourceCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-blue-500" name={sourceCurrency} id={sourceCurrency}> value={sourceCurrency}
                    <option value=''>Select the source currency</option>
                    {Object.keys(currencyNames).map((currency)=>(
                        <option className="p-1" key={currency} value={currency}>
                            {currencyNames[currency]}
                        </option>
                    ))}
                </select>
                </div>

                <div className='mb-4'>
                <label htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Target Currency
                </label>
                <select
                onChange={(e)=> setTargetCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-blue-500" name={targetCurrency} id={targetCurrency}> value={targetCurrency}
                    <option value=''>Select target currency</option>
                    {Object.keys(currencyNames).map((currency)=>(
                        <option className="p-1" key={currency} value={currency}>
                            {currencyNames[currency]}
                        </option>
                    ))}
                </select>
                </div>

                <div className='mb-4'>
                <label htmlFor={amountinTargetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Amount in source currency
                </label>
                <input
                onChange={(e)=> setAmountInSourceCurrency(e.target.value)}
                type="text" id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="Amount in source currency" required />
                </div>
                <div className="flex justify-center">
                <button className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Click to get the target currency</button>
                </div>
            </form>
        </section>
    </div>
    <section className="mt-5"><span class="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{amountInSourceCurrency}</span> {currencyNames[sourceCurrency]} is equals to {""}
    <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{amountinTargetCurrency}</span> {currencyNames[targetCurrency]}
    </section>
    </div>
)
}
