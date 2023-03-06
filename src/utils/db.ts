// db.ts
import Dexie, { Table } from 'dexie';
import {Card} from '../model/Card'
import { Setting } from '../model/Setting';

export class MySubClassedDexie extends Dexie {
  cards!: Table<Card>; 
  archive!: Table<Card>; 
  settings!: Table<Setting>;

  constructor() {
    super('MemoDatabase');
    this.version(1).stores({
        cards: '++value',
        archive: '++value',
        settings: '++key',
    });
  }
}

export const db = new MySubClassedDexie();