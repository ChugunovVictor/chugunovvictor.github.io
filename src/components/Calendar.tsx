import React, { useRef } from 'react'
import { ReactComponent as Down } from '../assets/images/Ubuntu/Down.svg'

type CalendarSliderProps = { index: number, entries: any[], onChange: (index: number) => void }

const CalendarSlider: React.FC<CalendarSliderProps> = (props: CalendarSliderProps) => {
    const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

    const nextIndex = () => props.index + 1 < props.entries.length ? props.index + 1 : 0
    const prevIndex = () => props.index - 1 > -1 ? props.index - 1 : props.entries.length - 1

    const animationToggle = (way: boolean) => {
        for (let e of ref.current.children) { e.classList.toggle(way ? "Slide-Up" : "Slide-Down") }
    }

    const onAnumationEnd = (e: React.AnimationEvent) => {
        switch (e.animationName) {
            case "SlideUp": {
                animationToggle(true);
                props.onChange(nextIndex())
                break;
            }
            case "SlideDown": {
                animationToggle(false);
                props.onChange(prevIndex())
                break;
            }
        }
    }

    return (
        <div className="Calendar-Slider">
            <Down className='Button' onClick={() => animationToggle(true)} />
            <div ref={ref} className='Calendar-Entries' >
                <div className="Calendar-Entry"> {props.entries[prevIndex()]} </div>
                <div className="Calendar-Entry" onAnimationEnd={onAnumationEnd}>{props.entries[props.index]}</div>
                <div className="Calendar-Entry">{props.entries[nextIndex()]}</div>
            </div>
            <Down className='Button' onClick={() => animationToggle(false)} />
        </div >
    );
}

type CalendarProps = { date: Date, onChange: (date: Date) => void }

const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {
    const entries = new Array(99).fill(0).map((_, i) => (i + 1) < 10 ? `0${i + 1}` : (i + 1).toString())

    const day = props.date.getDate()
    const month = props.date.getMonth() + 1
    const year = props.date.getFullYear() - 2000

    const dayIndex = entries.findIndex(e => Number(e) === day);
    const monthIndex = entries.findIndex(e => Number(e) === month);
    const yearIndex = entries.findIndex(e => Number(e) === year);

    const toDate = (dayIndex: number, monthIndex: number, yearIndex: number) => (
        new Date(`20${entries[yearIndex]}-${entries[monthIndex]}-${entries[dayIndex]}`)
    )

    const update = (dayIndex: number, monthIndex: number, yearIndex: number) => (
        props.onChange(toDate(dayIndex, monthIndex, yearIndex))
    )

    return (
        <div className='Calendar'>
            <CalendarSlider index={dayIndex} entries={entries.slice(0, 31)} onChange={(index: number) => update(index, monthIndex, yearIndex)} />
            <CalendarSlider index={monthIndex} entries={entries.slice(0, 12)} onChange={(index: number) => update(dayIndex, index, yearIndex)} />
            <CalendarSlider index={yearIndex} entries={entries} onChange={(index: number) => update(dayIndex, monthIndex, index)} />
        </div>
    );
}

export default Calendar