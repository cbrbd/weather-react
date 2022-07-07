import './style.css'

export function ThemeSwitch(props){
    console.log(props.checked);
    return(
        <div className='tg-wrapper'>
            <label className="toggle-switch">
                <input className="checkbox" type="checkbox" checked={props.checked} onChange={props.handleChange} />
                <span className="switch" />
            </label>
        </div>
    );
}