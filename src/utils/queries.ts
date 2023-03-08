import { Card } from '../model/Card'
import { db } from './db'
import { useLiveQuery } from "dexie-react-hooks";
import { getDate } from './other';
import { liveQuery } from 'dexie';
import { Setting } from '../model/Setting';

export const upsertCard = (value: Card, update: boolean) => update ? db.cards.put(value) : db.cards.add(value)
export const deleteCard = (id: string) => db.cards.delete(id)

export const upsertSetting = (value: Setting, update: any) => update ? db.settings.put(value) : db.settings.add(value)

export const cardsQuery = () => liveQuery(() => db.cards.toArray());
export const archiveQuery = () => liveQuery(() => db.archive.toArray());
export const settingsQuery = () => liveQuery(() => db.settings.toArray());

export const cardInfoQuery = (id: string) => liveQuery(
    () => db.cards.filter(e => e.value == id).first()
);

export const useSettingQuery = (id: string) => useLiveQuery(
    () => db.settings.where('key').equals(id).first()
);

export const settingQuery = (id: string) => liveQuery(
    () => db.settings.where('key').equals(id).first()
);
  
export const dailyQuery = () => liveQuery(
    () => db.cards
      .filter(e => e.nextAt ? getDate(e.nextAt) === getDate(new Date()) : true)
      .toArray()
);

export const importDataBase = (cards?: Card[], settings?: Setting[], archive?: Card[]) => {
    if (cards) {
        db.cards.clear()
        db.cards.bulkAdd(cards)
    }
    if (settings) {
        db.settings.clear()
        db.settings.bulkAdd(settings)
    }
    if (archive) {
        db.archive.clear()
        db.archive.bulkAdd(archive)
    }
}