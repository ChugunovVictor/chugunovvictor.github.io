import {db} from '../db'
import { useLiveQuery } from "dexie-react-hooks";

type Props = {name: string, items: any[], option?: (e: any)=>JSX.Element}

const defaultOption = (e: any) => <option data-name={e} key={e}>{e}</option>

const Select: React.FC<Props> = (props: Props) => {
    const key = props.name

    const defaultValue = useLiveQuery(
        () => db.settings.where('key').equals(key).first()
    );

    async function setValue(value: string){
        try {
          if(value){
            if(defaultValue)
              await db.settings.put({
                  key,
                  value
              });
            else  
              await db.settings.add({
                  key,
                  value
              });
          }
        } catch (error) {
          console.log(error)
        }
      }

    console.log (key, ": ", defaultValue) 
    return ( 
        <select value={defaultValue?.value} onChange={(e) => {
            const item = e.target.selectedOptions.item(0) as HTMLOptionElement
            setValue(item.getAttribute("data-name") as string)}
        }>
            { props.items.map(props.option ? props.option : defaultOption) }
        </select>
    );
}

export default Select