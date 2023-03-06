import React from 'react'
import { HomeScreen, AddScreen, EditScreen, CardsScreen, SettingsScreen, ExportScreen, ImportScreen } from '../screens'

type MemoRoute = {
  id: string,
  path: string,
  element: (e: (el:JSX.Element) => void) => JSX.Element,

  homeButtonShow: boolean,
  addButtonShow: boolean,
  settingsButtonShow: boolean
}

export const memoRoutes: MemoRoute[] = [
  { id: "Home", path: "/", element: (e: (el:JSX.Element) => void) => <HomeScreen setFooterButtons={e}/>, homeButtonShow: false, addButtonShow: true, settingsButtonShow: true },
  { id: "Add Card", path: "/add", element: (e: (el:JSX.Element) => void) =>  <AddScreen setFooterButtons={e}/>, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true },
  { id: "Edit Card", path: "/edit/:id", element: (e: (el:JSX.Element) => void) => <EditScreen setFooterButtons={e}/>, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true },
  { id: "Settings", path: "/settings", element: (e: (el:JSX.Element) => void) => <SettingsScreen setFooterButtons={e}/>, homeButtonShow: true, addButtonShow: false, settingsButtonShow: false },
  { id: "Cards", path: "/cards", element: (e: (el:JSX.Element) => void) => <CardsScreen setFooterButtons={e}/>, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true },
  { id: "Export", path: "/export", element: (e: (el:JSX.Element) => void) => <ExportScreen setFooterButtons={e}/>, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true },
  { id: "Import", path: "/import", element: (e: (el:JSX.Element) => void) => <ImportScreen setFooterButtons={e}/>, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true }
]