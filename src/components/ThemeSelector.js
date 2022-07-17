import { useTheme } from '../hooks/useTheme'
import modeIcon from '../assets/mode-icon.svg'

//styles
import './ThemeSelector.css'

const themeColours = ['#58249c', '#249c6b', '#b70233']

export default function ThemeSelector() {

    const { changeColor, mode, changeMode } = useTheme()
    
    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }
    console.log(mode)
    
    return (
        <div className="themeselector">
            <div className="modeselector">
                <img 
                    src={ modeIcon }
                    onClick={ toggleMode }
                    alt="dark/light mode-icon"
                    style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
                />
            </div>
            <div className="themebuttons">
                {
                    themeColours.map(color => (
                        <div
                            key={color}
                            onClick={() => changeColor(color)}
                            style={{ background: color }}
                        />
                    ))
                }
            </div>
        </div>
    )
}