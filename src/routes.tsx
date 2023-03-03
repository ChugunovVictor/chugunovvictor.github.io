import { HomeScreen, AddScreen, EditScreen, CardsScreen, SettingsScreen, DailyScreen, ExportScreen, ImportScreen } from './screens'

type MemoRoute = {
  id: string,
  path: string,
  element: JSX.Element,

  homeButtonShow: boolean,
  addButtonShow: boolean,
  settingsButtonShow: boolean
}

export const memoRoutes: MemoRoute[] = [
  { id: "Home", path: "/", element: <HomeScreen />, homeButtonShow: false, addButtonShow: true, settingsButtonShow: true },
  { id: "Add Card", path: "/add", element: <AddScreen/>, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true },
  { id: "Edit Card", path: "/edit/:id", element: <EditScreen />, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true },
  { id: "Daily", path: "/daily", element: <DailyScreen />, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true },
  { id: "Settings", path: "/settings", element: <SettingsScreen />, homeButtonShow: true, addButtonShow: false, settingsButtonShow: false },
  { id: "Cards", path: "/all", element: <CardsScreen isArchive={false} />, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true },
  { id: "Archive", path: "/archive", element: <CardsScreen isArchive={true} />, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true },
  { id: "Export", path: "/export", element: <ExportScreen />, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true },
  { id: "Import", path: "/import", element: <ImportScreen />, homeButtonShow: true, addButtonShow: false, settingsButtonShow: true }
]