import { PrizeLevel } from "./prize-level.interface"
import { Raffle } from "./raffle.interface"

export interface Prize {
    prize_id?: number
    name: string
    description: string
    value: string
    quantity: number
    image_url?: string
    image_thumbnail_url?: string
    prizeLevel?: PrizeLevel
    raffle?: Raffle
}


export interface PrizeDTO {
    prize_id?: number
    name: string
    description: string
    value:  string
    quantity: number
    image_url?: string
    image_thumbnail_url?: string
    prize_level_id?: number
    raffle_id?: number
}