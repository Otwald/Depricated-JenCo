import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Dropdown } from 'semantic-ui-react';


const adminBlock = props => {

    const [time, setTime] = useState({
        start: null,
        end: null
    })
    const [date, setDate] = useState({
        start: null,
        end: null
    })
    const [block_create, setBlock_create] = useState({
        block_name: 'null',
        block_pnp: false,
        block_start: null,
        block_end: null,
        block_table: [],
        block_max_table: 0
    })

    //saves timeblock into state and updates mongo
    onBlockSave = () => {
        let temp = block_create;
        console.log(temp);
        if (temp.block_name.length === 0) {
            return
        }
        if (date.start === null || date.end === null) {
            return
        }
        if (time.start === null || time.end === null) {
            return
        }
        temp.block_start = date.start + time.start;
        temp.block_end = date.end + time.end
        if (temp.block_start > temp.block_end) {
            return
        }
        Meteor.call('BlockCreate', temp)
    }

    //deletes timebock from state and updates mongo
    onBlockDelete = (v) => {
        Meteor.call('BlockDelete', v._id);
    }

    onDateInput = (e, data) => {
        let temp = date
        temp[data.type] = data.value
        setDate(temp);
    }

    onTimeInput = (e) => {
        let time = '1970-01-01T' + e.target.value + 'Z'
        let temp = time
        temp[e.target.name] = new Date(time).getTime() - 1000 * 60 * 60 * 2
        setTime(temp);

    }

    // Builds an Array of valid Dates from the Event, to Build the Event Timetable
    inBetweenTime = (start, end) => {
        const week = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        let out = []
        let temp = new Date();
        for (let i = start; i <= end;) {
            temp = new Date(i);
            let text = week[temp.getDay()] + ' ' + temp.getDate() + '.' + (temp.getMonth() + 1)
            out.push({ value: i, text: text })
            i = i + 60 * 60 * 24 * 1000;
        }
        return out;
    }

    timeblockClick = (data) => {
        console.log(data)
    }

    let blocks = '';
    if (props.timeblock.length > 0) {
        // if(timeblock.length > 1){}
        props.timeblock.sort(function (a, b) {
            if (a.block_start < b.block_start) {
                return -1;
            }
            if (a.block_start > b.block_start) {
                return +1;
            }
            return 0;
        })
        blocks = props.timeblock.map((k, v) => {
            return (
                <div key={k._id} onClick={() => this.timeblockClick(k)}>
                    <li>{k.block_name}</li>
                    <button onClick={() => this.onBlockDelete(k)} >Destroy</button>
                </div>
            )
        })
    }

    return (
        <ul>
            {blocks}
            <li>Name
                <input
                    type='text'
                    name='block_name'
                    onChange={() => setBlock_create((prev) => {
                        prev.block_name = event.target.value;
                        return prev
                    })}
                    placeholder='Hier Namen einfügen'
                /></li>
            <li>Zeit Start
                    <Dropdown
                    placeholder='Tag'
                    search
                    options={this.inBetweenTime(props.event.e_start, props.event.e_end)}
                    scrolling
                    onChange={this.onDateInput}
                    type='start'
                />
                <input type='time' name='start' onChange={this.onTimeInput} />
            </li>
            <li>
                Zeit Ende
                    <Dropdown
                    placeholder='Tag'
                    search
                    options={this.inBetweenTime(props.event.e_start, props.event.e_end)}
                    scrolling
                    onChange={this.onDateInput}
                    type='end'
                />
                <input type='time' name='end' onChange={this.onTimeInput} />
            </li>
            <li>Tisch Anzahl
                <input
                    type='number'
                    name='block_max_table'
                    onChange={() => setBlock_create((prev) => {
                        prev.block_max_table = Number(event.target.value)
                        return prev
                    })}
                /></li>
            <li>Spielblock
                <input
                    type='checkbox'
                    name='block_pnp'
                    onChange={() => setBlock_create((prev) => {
                        prev.block_pnp = JSON.parse(prev.block_pnp);
                        return prev;
                    })}
                /></li>
            <li><button onClick={this.onBlockSave} >Add</button><br /></li>
        </ul>
    )

}

export default adminBlock