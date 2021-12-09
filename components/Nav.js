import React from 'react'
import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/events'>Events</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav