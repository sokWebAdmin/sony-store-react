import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { useHeaderDispatch, closeSideBar } from '../context/header.context';
import { useCategoryState } from '../context/category.context';
import { getAgent } from '../utils/detectAgent.js';

import '../assets/scss/partials/appMenu.scss';
import { useMediaQuery } from '../hooks';

export default function Gnb() {
  const agent = getAgent(); // test code
  const underPc = useMediaQuery('(max-width: 1280px)');

  const history = useHistory();
  const headerDispatch = useHeaderDispatch();

  const [hovering, setHovering] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);

  const [activeMIndex, setActiveMIndex] = useState(-1);

  const routePushAndClose = (gcc) => {
    if (gcc?.href) {
      closeSideBar(headerDispatch);
      window.open(gcc.href);
    }

    if (gcc?.route) {
      history.push(gcc.route);
      closeSideBar(headerDispatch);
    }
  };

  const { gnbCategories } = useCategoryState();
  const gnbRef = useRef();

  return (
    <>
      <nav className={`gnb ${hovering ? 'gnb--active' : ''}`} ref={gnbRef}>
        <ul
          className="gnb__menu"
          onMouseOver={() => {
            setHovering(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
          }}
        >
          {gnbCategories.map((gc, index) => {
            return (
              <li
                key={`gnb-menu-${index}`}
                className={`${activeIndex === index
                  ? 'active'
                  : ''} ${activeMIndex === index ? 'mo--active' : ''}`}
                onMouseOver={() => {
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  setActiveIndex(-1);
                }}
              >
                <a
                  href="#none"
                  onClick={(e) => {
                    setActiveMIndex(index);
                    e.preventDefault();
                    if (activeMIndex === index || !underPc) {
                      routePushAndClose(gc);
                    }
                  }}
                >
                  {gc.label}
                </a>
                <ul className="gnb__menu__secondary">
                  {gc.children.map((gcc, gccIndex) => {
                    return (
                      <li key={`gnb-menu-${index}-${gccIndex}`}>
                        <a
                          href="#none"
                          onClick={(e) => {
                            gnbRef.current.classList.remove('gnb--active');
                            routePushAndClose(gcc);
                            e.preventDefault();
                          }}
                        >
                          {gcc.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
      {agent.isApp &&
      <div className="appmenu" style={{ display: 'block' }}>
        <ul>
          <li className="appmenu__qr"><a href="sonyapp://closemall/qr">QR스캔</a>
          </li>
          <li className="appmenu__setting"><a href="sonyapp://setting">설정</a>
          </li>
          <li className="appmenu__push"><a href='/app/push-list' onClick={e => {
            e.preventDefault();
            history.push('/app/push-list');
            closeSideBar(headerDispatch);
          }}>PUSH 알림 메시지함</a></li>
        </ul>
      </div>
      }
    </>
  );
}
