import fetchUsers from '~/utils/fetchUsers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    return NextResponse.json(await fetchUsers())
}