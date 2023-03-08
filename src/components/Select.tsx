import { useSettingQuery, upsertSetting } from '../utils/queries';
import React, { useState } from 'react'
import { Language } from '../screens/SettingsScreen';

type Props = { name: string, items: (string | Language)[], isLanguage?: boolean }

const Select: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false)

  const key = props.name

  const defaultValue = useSettingQuery(key)

  async function setValue(value: string) {
    try {
      if (value) {
        await upsertSetting({
          key,
          value
        }, defaultValue);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setOpen(false)
    }
  }

  const textOption = (e: any) => <div
    className='Select-Option'
    data-name={e}
    key={e}
    onClick={() => {
      setValue(e)
    }}
  >
    {e}
  </div>

  const languageOption = (e: Language) => <div
    className='Select-Option'
    data-name={e.signature}
    key={e.name}
    onClick={() => {
      setValue(e.signature)
    }}
  >
    {e.name}
  </div>

  return (
    <div className='Select'>
      <div className='Select-Value' onClick={() => setOpen(!open)}>{
        props.isLanguage ? (props.items as Language[]).filter(e => e.signature == defaultValue?.value)[0]?.name : defaultValue?.value
      }</div>
      {open &&
        <div className='Select-Options'>
          {props.items.map(e => props.isLanguage ? languageOption(e as Language) : textOption(e))}
        </div>}
    </div>
  );
}

export default Select