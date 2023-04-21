import {useEffect,useState} from 'react'
import { Router, useRouter } from 'next/router'
import './_app.js'

export default function header() {

    return(
        <div className="header">
            <h1>Tile Game</h1>
        </div>
    )

}