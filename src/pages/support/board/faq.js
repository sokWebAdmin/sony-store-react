// import * as test from 'react';
import React, { useEffect } from 'react';

//SEO
import SEOHelmet from '../../../components/SEOHelmet';

//api

//css
import "../../../assets/scss/contents.scss";
import "../../../assets/scss/support.scss";

//context
import { fetchBoardConfig, useBoardDispatch, useBoardState } from '../../../context/board.context';

//components
import FaqContent from './faq/faqContent';
// import { Link } from 'react-router-dom';
import Tabs from './tabs';
import SelectBox from '../../../components/common/SelectBox';

export default function Faq(props) {
  const dispatch = useBoardDispatch();
  const { config } = useBoardState();

  useEffect(() => {
    if (config.faq?.boardNo > 0) return;
    fetchBoardConfig(dispatch, config.faq?.boardNo);
  }, [dispatch, config.faq?.boardNo]);

  return (
    <>
      <SEOHelmet title={"구매상담 이용약관 동의"} />
      <div className="contents support">
        <div className="container full">
          <div className="content">
            <div className="faq_notice_head">
              <div className="common_head first_tit">
                <h1 className="common_head_name">FAQ &amp; 공지사항</h1>
                <p className="common_head_txt">소니스토어에 많이 물어보시는 질문과<br className="pc_none" />새로운 소식을 만나보세요.</p>
              </div>
              <Tabs />
            </div>
            <SelectBox
              selectOptions={[
                {
                  optionNo: 1,
                  label: 'test',
                },
                {
                  optionNo: 2,
                  label: 'test2',
                  disabled: true,
                },
              ]}
              selectOption={
                (number, label) => {
                  console.log(number, label);
                }
              }
            />
            <SelectBox
              defaultInfo={{
                type: 'dropdown',
                placeholder: '다른 것을 선택하세요',
                tag: '쿠폰',
              }}
              selectOptions={[
                {
                  optionNo: 3,
                  label: '쿠폰test',
                },
                {
                  optionNo: 4,
                  label: '쿠폰test2',
                  disabled: true,
                },
              ]}
              selectOption={
                (number, label) => {
                  console.log(number, label);
                }
              }
            />
            <FaqContent />
          </div>
        </div>
      </div>
    </>
  );
} 