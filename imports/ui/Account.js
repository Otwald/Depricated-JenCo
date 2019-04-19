import React from 'react';

import {Dropdown} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css'

export default class Account extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            account : {
                profil:null,
                real_name : null,
                age : null,
                email : null,
            }
        }
    }

    onInput=(e)=>{
        console.log(e.target.value)
        var temp = this.state.account
        temp[e.target.name] = e.target.value
        this.setState({account : temp})
    }

    // timeCount=(min, max)=>{
    //     var out = [];
    //     while(min <= max){
    //         var item = <a className="dropdown-item" href="#" key={min}>{min}</a>
    //         out.push(item)
    //         min++
    //     }
    //     return (
    //         <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    //         {out}
    //         </div>
    //     )
    // }

    timeCount=(min, max)=>{
        var out = [];
        while(min <= max){
            var item = {key : min , text : min, value : min}
            out.push(item)
            min++
        }
        return out
    }

    render(){
        const today = new Date()
        return(
            <div>
                <ul>
                    Account Content
                    <li>Profil Name<input type='text' name='profil' onChange={this.onInput}/></li>
                    <li>Real Name<input type='text' name='real_name' onChange={this.onInput}/></li>
                    <li>

                        <Dropdown
                        placeholder='Tage'
                        options={this.timeCount(1,31)}
                        
                        />
                        <Dropdown
                        placeholder='Monate'
                        options={this.timeCount(1,12)}
                        
                        />

                        <Dropdown
                        placeholder='Jahr'
                        search
                        options={this.timeCount(1900,today.getFullYear())}
                        />
                        {/* <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Days
                        </button>
                        {this.timeCount(1,31)}
                    </div> */}
                    </li>
                    {/* <li>Alter<select name='days' multiple value={[0,1]} onChange={this.onInput}/></li>
                    <li>Alter<select id='simple' name='days' multiple onChange={this.onInput}>
                    {this.timeCount(1,31)}
                    </select>
                    </li> */}

                    <li>Veranstaltungsinfo per Mail<input type='text' name='email' onChange={this.onInput}/></li>
                </ul>
            </div>
        )
    }
}