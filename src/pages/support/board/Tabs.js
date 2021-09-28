import { Link } from "react-router-dom";
import { useBoardDispatch, useBoardState } from "../../../context/board.context";
import { useHistory } from "react-router";
import { useMemo } from "react";

export default function Tabs() {
  const history = useHistory();
  const prevTab = useMemo(() => history.location.pathname.split('/')[1], [history.location.pathname]);
  
  const dispatch = useBoardDispatch();
  const { config: { faq, notice } } = useBoardState();

  const tabs = [
    {
      name: faq?.name,
      label: 'faq'
    },
    {
      name: notice?.name,
      label: 'notice',
    }
  ];

  const onClickTab = (event, currentTab) => {
    event.preventDefault();
    currentTab !== prevTab && dispatch({
      type: 'SELECT_TAB',
      data: { currentTab }
    });
  }

  return (
    <div className="tab_link_zone">
      <ul className="tab_link_inner">
        {
          tabs.map(({ name, label }) => (
            <li key={ label } className={ `tabs ${ prevTab === label ? 'on' : '' }` } onClick={ event => onClickTab(event, label) }>
              <Link to={`/${label}`} className="tab_btn" title={ `${name} 보기` }><span className="tit">{ name }</span></Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
} 
