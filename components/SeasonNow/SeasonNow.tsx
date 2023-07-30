"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import styles from './SeasonNow.module.css'
import Link from 'next/link'

export default function SeasonNow({ seasonNow }: any) {
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log("seasonnow", seasonNow)
    },[])
  return (
    <></>
  )
}
