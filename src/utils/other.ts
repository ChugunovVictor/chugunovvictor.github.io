import { getCurrentSession, upsertSession } from '../utils/queries'
import { Card as ICard } from '../model/Card'

export function getDate(value: Date): string {
    const days = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
    const months = (value.getMonth() + 1) < 10 ? `0${value.getMonth() + 1}` : value.getMonth() + 1
    const year = value.getFullYear()

    return `${days}.${months}.${year}`
}


export function delay(value: number) {
    return new Promise(resolve => setTimeout(resolve, value));
}

export async function deleteFromSession(card: ICard) {
    const current = await getCurrentSession()
  
    if (current) {
      const size = current.daily.length
      const cards = current.daily.filter(e => e.card.value !== card.value)
      current.daily = cards
  
      if (size != cards.length)
        await upsertSession(current, true)
    }
  }
  
  export async function addToSession(card: ICard) {
    if (card.nextAt && getDate(card.nextAt) != getDate(new Date())) return;
    
    const current = await getCurrentSession()
  
    if (current) {
      current.daily = [...current.daily, { value: false, card: card }]
      await upsertSession(current, true)
    }
  }