import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function Gnb() {
    const [hovering, setHovering] = useState(false); 

    const [subMenu1, setSubMenu1] = useState(false); 
    const [subMenu2, setSubMenu2] = useState(false); 
    const [subMenu3, setSubMenu3] = useState(false); 
    const [subMenu4, setSubMenu4] = useState(false); 
    const [subMenu5, setSubMenu5] = useState(false); 


    const [mSubMenu, setMSubMenu] = useState(''); 
  
    const mouseOver = (onoff) => {
        if(onoff){
            setHovering(true);
        } else{
            setHovering(false);
        }
    }

    return (
        <>
            <nav className={`gnb ${hovering ? "gnb--active" : ""}`}>
                <ul className="gnb__menu" 
                    onMouseOver={()=>{
                        mouseOver(true)
                    }}
                    onMouseLeave={()=>{
                        mouseOver(false)
                    }}
                >
                    <li className={`${subMenu1 ? "active" : ""} ${mSubMenu == 1 ? "mo--active" : ""}`}
                        onMouseOver={()=>{
                            setSubMenu1(true)
                        }}
                        onMouseLeave={()=>{
                            setSubMenu1(false)
                        }}
                    >
                    <a href="#" onClick={()=>{
                        setMSubMenu(1)
                    }}>스토어 추천 제품</a>
                    <ul className="gnb__menu__secondary">
                        <li>
                        <a href="/recommend">추천 제품</a>
                        </li>
                    </ul>
                    </li>
                    
                    <li className={`${subMenu2 ? "active" : ""} ${mSubMenu == 2 ? "mo--active" : ""}`}
                        onMouseOver={()=>{
                            setSubMenu2(true)
                        }}
                        onMouseLeave={()=>{
                            setSubMenu2(false)
                        }}
                        onClick={()=>{
                            setMSubMenu(2)
                        }}
                        >
                    <a href="#">제품</a>
                    <ul className="gnb__menu__secondary">
                        <li>
                        <a href="/products/camera">카메라</a>
                        </li>
                        <li>
                        <a href="/products/videocamera">비디오카메라</a>
                        </li>
                        <li>
                        <a href="/products/audio">오디오</a>
                        </li>
                        <li>
                        <a href="/products/accessory">액세서리</a>
                        </li>
                        <li>
                        <a href="/products/playstation">PlayStation®</a>
                        </li>
                        <li>
                        <a href="/products/test">test</a>
                        </li>
                    </ul>
                    </li>

                    <li className={`${subMenu3 ? "active" : ""} ${mSubMenu == 3 ? "mo--active" : ""}`} onMouseOver={()=>{
                            setSubMenu3(true)
                        }}
                        onMouseLeave={()=>{
                            setSubMenu3(false)
                        }}
                        onClick={()=>{
                            setMSubMenu(3)
                        }}
                        >
                    <a href="/event/list">기획전</a>
                    <ul className="gnb__menu__secondary">
                        <li>
                        <a href="/event/list">소니스토어 단독</a>
                        </li>
                        <li>
                        <a href="/event/refurbish">혜택존</a>
                        </li>
                        <li>
                        <a href="/event/list">예약판매</a>
                        </li>
                        <li>
                        <a href="/event/refined">정품 등록 이벤트</a>
                        </li>
                        <li>
                        <a href="/event/live-on">LIVE ON</a>
                        </li>
                    </ul>
                    </li>

                    <li className={`${subMenu4 ? "active" : ""} ${mSubMenu == 4 ? "mo--active" : ""}`} onMouseOver={()=>{
                            setSubMenu4(true)
                        }}
                        onMouseLeave={()=>{
                            setSubMenu4(false)
                        }}
                        onClick={()=>{
                            setMSubMenu(4)
                        }}
                        >
                    <a href="#">멤버십</a>
                    <ul className="gnb__menu__secondary">
                        <li>
                        <a href="#">등급&amp;혜택 안내</a>
                        </li>
                    </ul>
                    </li>
                    
                    <li className={`${subMenu5 ? "active" : ""} ${mSubMenu == 5 ? "mo--active" : ""}`} onMouseOver={()=>{
                            setSubMenu5(true)
                        }}
                        onMouseLeave={()=>{
                            setSubMenu5(false)
                        }}
                        onClick={()=>{
                            setMSubMenu(5)
                        }}
                        >
                    <a href="#">고객 서비스</a>
                    <ul className="gnb__menu__secondary">
                        <li>
                        <a href="/faq">FAQ&amp;공지사항</a>
                        </li>
                        <li>
                        <a href="https://www.sony.co.kr/scs/handler/Index-Start?asa&#x3D;Sa">정품등록 안내</a>
                        </li>
                        <li>
                        <a href="https://www.sony.co.kr/electronics/support">제품 지원</a>
                        </li>
                        <li>
                        <a href="/purchase-consulting">구매 상담</a>
                        </li>
                        <li>
                        <a href="/store-info">직영점 안내</a>
                        </li>
                        <li>
                        <a href="/video-course">동영상 강좌</a>
                        </li>
                    </ul>
                    </li>
                </ul>
                </nav>
        </>
    );
}