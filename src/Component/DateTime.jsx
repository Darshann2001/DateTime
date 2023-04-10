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
        const currentDate = new Date();
        let tz = selectedValue;
        let offset = getOffset(tz);
        currentDate.setMinutes(currentDate.getMinutes() - offset);

        const dateArr = {
            day: weekday[currentDate.getDay()],
            month: currentDate.getMonth(),
            date: currentDate.getDate(),
            year: currentDate.getFullYear(),
            hour: currentDate.getHours(),
            minute: currentDate.getMinutes(),
            second: currentDate.getSeconds(),
            hourformat: currentDate.getHours() % 12,
            ampm: currentDate.getHours() >= 12 && currentDate.getHours() < 24 ? "PM" : "AM",
        }
        return dateArr;
    }, [date, selectedValue]);




    useEffect(() => {
        let update = setInterval(() => setDate(new Date()), 1000)
        return () => {
            clearInterval(update);
        };
    });

    var my_timezones = [
        'Africa/Abidjan',
        'Africa/Accra',
        'Africa/Addis_Ababa',
        'Africa/Algiers',
        'America/Campo_Grande',
        'America/Cancun',
        'America/Caracas',
        'America/Cayenne',
    ]

    return (

        <div className='date-time'>
            <select name="country" style={{ color: 'black' }} onChange={(e) => {
                setSeletedValue(e.target.value)
            }}>
                {
                    my_timezones.map((value, key) => {
                        return <option value={value} id={key} style={{ color: 'black' }}>
                            {value}
                        </option>
                    })
                }
            </select>
            {
                format ? <>

                    <p className='time'> {`${dateArr.day}, ${dateArr.month} ${dateArr.date} ${dateArr.year}, ${dateArr.hour} : ${dateArr.minute} : ${dateArr.second} `}</p>
                </> :
                    <>
                        <p className='time'> {`${dateArr.day}, ${dateArr.month} ${dateArr.date} ${dateArr.year}, ${dateArr.hourformat} : ${dateArr.minute} : ${dateArr.second} ${dateArr.ampm}`}</p>
                    </>
            }
            <div className="btn-parent">
                <button className='btn' onClick={() => { setFormat(false) }}>Format to  '12hrs'</button>
                <button className='btn' onClick={() => { setFormat(true) }}>Format to '24hrs'</button>
            </div>

            {/* <div className="animation">
                <img src={animation} alt="animation-img" />
            </div> */}
        </div>
    );
}

export default DateTime;
