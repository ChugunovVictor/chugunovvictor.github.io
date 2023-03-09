// db.ts
import Dexie, { Table } from 'dexie';
import {Card} from '../model/Card'
import { Setting } from '../model/Setting';
import { Session } from '../model/Session';

export class MySubClassedDexie extends Dexie {
  cards!: Table<Card>; 
  archive!: Table<Card>; 
  settings!: Table<Setting>;
  sessions!: Table<Session>

  constructor() {
    super('MemoDatabase');
    this.version(1).stores({
        cards: '++value',
        archive: '++value',
        settings: '++key',
        sessions: '++date',
    });
  }
}

export const db = new MySubClassedDexie();