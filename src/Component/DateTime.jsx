import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import animation from '../asset/animation.png';

const getOffset = (timeZone = 'UTC', date = new Date()) => {
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
    return (tzDate.getTime() - utcDate.getTime()) / 6e4;
}

const DateTime = () => {
    const [date, setDate] = useState(new Date());
    const [format, setFormat] = useState(false);
    const [selectedValue, setSeletedValue] = useState('Africa/Abidjan');

    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let dateArr = useMemo(() => {
        const tz = selectedValue;
        // Use the Intl.DateTimeFormat API to properly format the date in the selected timezone
        const options = {
            timeZone: tz,
            hour12: false,
        };
        
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const currentDate = new Date();
        
        // Format the date according to the selected timezone
        const formattedDate = new Date(formatter.format(currentDate));
        
        // For more accurate timezone handling, we'll use the Intl API directly
        const day = currentDate.toLocaleString('en-US', { weekday: 'long', timeZone: tz });
        const month = currentDate.toLocaleString('en-US', { month: 'long', timeZone: tz });
        const dateNum = currentDate.toLocaleString('en-US', { day: 'numeric', timeZone: tz });
        const year = currentDate.toLocaleString('en-US', { year: 'numeric', timeZone: tz });
        const hour = currentDate.toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: tz });
        const minute = currentDate.toLocaleString('en-US', { minute: 'numeric', timeZone: tz }).padStart(2, '0');
        const second = currentDate.toLocaleString('en-US', { second: 'numeric', timeZone: tz }).padStart(2, '0');
        const hourFormat = currentDate.toLocaleString('en-US', { hour: 'numeric', hour12: true, timeZone: tz });
        const ampm = currentDate.toLocaleString('en-US', { hour12: true, timeZone: tz }).includes('PM') ? 'PM' : 'AM';

        return {
            day,
            month,
            date: dateNum,
            year,
            hour,
            minute,
            second,
            hourformat: hourFormat.replace(' AM', '').replace(' PM', ''),
            ampm,
        };
    }, [date, selectedValue]);




    useEffect(() => {
        let update = setInterval(() => setDate(new Date()), 1000)
        return () => {
            clearInterval(update);
        };
    });

    var my_timezones = [
        // Africa
        'Africa/Abidjan',
        'Africa/Accra',
        'Africa/Addis_Ababa',
        'Africa/Algiers',
        'Africa/Cairo',
        'Africa/Casablanca',
        'Africa/Johannesburg',
        'Africa/Lagos',
        'Africa/Nairobi',
        'Africa/Tunis',
        
        // Americas
        'America/Anchorage',
        'America/Bogota',
        'America/Buenos_Aires',
        'America/Campo_Grande',
        'America/Cancun',
        'America/Caracas',
        'America/Cayenne',
        'America/Chicago',
        'America/Denver',
        'America/Halifax',
        'America/Havana',
        'America/Lima',
        'America/Los_Angeles',
        'America/Mexico_City',
        'America/New_York',
        'America/Phoenix',
        'America/Santiago',
        'America/Sao_Paulo',
        'America/St_Johns',
        'America/Toronto',
        'America/Vancouver',
        
        // Asia
        'Asia/Bangkok',
        'Asia/Beirut',
        'Asia/Dhaka',
        'Asia/Dubai',
        'Asia/Hong_Kong',
        'Asia/Istanbul',
        'Asia/Jakarta',
        'Asia/Jerusalem',
        'Asia/Kabul',
        'Asia/Karachi',
        'Asia/Kathmandu',
        'Asia/Kolkata',
        'Asia/Kuala_Lumpur',
        'Asia/Manila',
        'Asia/Riyadh',
        'Asia/Seoul',
        'Asia/Shanghai',
        'Asia/Singapore',
        'Asia/Taipei',
        'Asia/Tehran',
        'Asia/Tokyo',
        
        // Australia and Pacific
        'Australia/Adelaide',
        'Australia/Brisbane',
        'Australia/Darwin',
        'Australia/Melbourne',
        'Australia/Perth',
        'Australia/Sydney',
        'Pacific/Auckland',
        'Pacific/Fiji',
        'Pacific/Honolulu',
        'Pacific/Noumea',
        
        // Europe
        'Europe/Amsterdam',
        'Europe/Athens',
        'Europe/Belgrade',
        'Europe/Berlin',
        'Europe/Brussels',
        'Europe/Bucharest',
        'Europe/Dublin',
        'Europe/Helsinki',
        'Europe/Lisbon',
        'Europe/London',
        'Europe/Madrid',
        'Europe/Moscow',
        'Europe/Oslo',
        'Europe/Paris',
        'Europe/Prague',
        'Europe/Rome',
        'Europe/Stockholm',
        'Europe/Vienna',
        'Europe/Warsaw',
        'Europe/Zurich'
    ]

    return (
        <div className="date-time">
            <div className="header">
                <h1>World Clock</h1>
                <p>Check the current time across different timezones</p>
            </div>
            
            {/* <div className="animation">
                <img src={animation} alt="animation" />
            </div> */}
            
            <select name="country" value={selectedValue} onChange={(e) => {
                setSeletedValue(e.target.value)
            }}>
                {my_timezones.map((timezone, index) => (
                    <option key={index} value={timezone}>
                        {timezone}
                    </option>
                ))}
            </select>
            
            {
                format ? <>
                    <p className='time'> {`${dateArr.day}, ${dateArr.month} ${dateArr.date} ${dateArr.year}, ${dateArr.hour}:${dateArr.minute}:${dateArr.second}`}</p>
                </> :
                    <>
                        <p className='time'> {`${dateArr.day}, ${dateArr.month} ${dateArr.date} ${dateArr.year}, ${dateArr.hourformat}:${dateArr.minute}:${dateArr.second} ${dateArr.ampm}`}</p>
                    </>
            }
            <div className="btn-parent">
                <button className='btn' onClick={() => { setFormat(false) }}>Format to  '12hrs'</button>
                <button className='btn' onClick={() => { setFormat(true) }}>Format to '24hrs'</button>
            </div>
        </div>
    );
}

export default DateTime;
