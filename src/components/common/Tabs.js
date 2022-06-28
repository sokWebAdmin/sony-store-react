import { useEffect } from 'react';
import {OnclickTracker} from "../ReactGA4Tracker";

export default function Tabs({ tabs, tabState, setTabState, defaultState }) {
  useEffect(() => {
    if (!defaultState) return;
    setTabState(defaultState);
  }, []);
  return (
    <ul>
      {tabs.map(({ tabName, label }) => (
        <li key={`tab_${tabName}`} className={`tabs ${tabState === tabName && 'on'}`}>
          <a
            className="btn"
            href={`#${tabName}`}
            onClick={(event) => {
              event.preventDefault();
              setTabState(tabName);
              OnclickTracker(tabState, tabState);
            }}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
