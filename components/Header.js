import Image from "next/image"
import {SearchIcon,
GlobeAltIcon,
MenuIcon,
UsercirclesIcon,
UsersIcon,
UserCircleIcon,} from '@heroicons/react/solid'
import { useState } from "react"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/router";

function Header({placeholder}) {

    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const resetInput = () => {
        setSearchInput("")
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            }
        })
    }

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-3 px-5 
        md:px-10">
            <div className="relative flex items-center h-12" 
            onClick={()=>router.push("/")}>
                <Image src="/Voyage.png" 
                    height={60}
                    width={120}
                    objectFit="contain"
                    objectPosition="left"
                    className="cursor-pointer"
                    
                />
            </div>
            <div className="flex items-center md:border-2 rounded-full p-y-2 md:shadow-sm">
                <input 
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)}
                type="text" placeholder={placeholder || "Start your search"} className="pl-5 bg-transparent
                outline-none flex-grow text-sm text-gray-600 placeholder-gray-400"/>
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 
                cursor-pointer md:mx-2"/>
            </div>
            <div className="flex space-x-4 items-center justify-end text-gray-500">
                <p className="hidden md:inline">Travel Now</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>
                <div className="flex border-2 items-center space-x-2 p-2 rounded-full">
                    <MenuIcon className="h-6"/>
                    <UserCircleIcon className="h-6"/>
                </div>
            </div>
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto">
                    <DateRangePicker 
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}

                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                        <UsersIcon className="h-5" />
                        <input 
                        value={noOfGuests}
                        min={1}
                        onChange={e => setNoOfGuests(e.target.value)}
                        type="number" className='w-12 pl-2 text-lg outline-none
                        text-red-400'/>
                    </div>
                    <div className="flex">
                        <button className="flex-grow text-gray-500" onClick={resetInput}>Cancel</button>
                        <button className="flex-grow text-red-400"
                        onClick={search}>Search</button>
                    </div>
                </div>
            )} 
        </header>
    )
}

export default Header
