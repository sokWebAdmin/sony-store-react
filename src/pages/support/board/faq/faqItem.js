import { React, useState } from 'react';
import { useBoardState } from "../../../../context/board.context";
import { getBoardByArticleId } from '../../../../api/board';


export default function FaqItem() {
  const { config, faqBoard } = useBoardState();

  const [answer, setAnswer] = useState({ });

  const fetchAnswer = async (articleNo) => {
    const response = await getBoardByArticleId({ pathParams: { boardNo: config.faq.boardNo, articleNo } });

    setAnswer(prevState => ({
      ...prevState,
      [articleNo]: {
        ...response.data,
        show: true,
      }
    }));
  }

  const onToggleAnswer = (event, articleNo) => {
    event.preventDefault();

    if (!answer[articleNo]) {
      fetchAnswer(articleNo);
      return;
    }

    setAnswer(prev => {
      const prevArticle = prev[articleNo];

      return {
        ...prev,
        [articleNo]: {
          ...prevArticle,
          show: !prevArticle.show,
        }
      }
    });
  }

  return (
    <div className="acc acc_ui_zone">
      {
        faqBoard.items.map(({
                              articleNo,
                              categoryLabel,
                              title
                            }) => {
          return (
            <div key={ articleNo } className="acc_item" data-article-no={ articleNo }>
              <div className="acc_head">
                <a href="상세 내용 토글" className="acc_btn" onClick={ event => onToggleAnswer(event, articleNo) } title="상세 내용 토글">
                  <span className="category_tit">{ categoryLabel }</span>
                  <span className="acc_tit">{ title }</span>
                  <span className="acc_arrow">선택됨/상세 닫기</span>
                </a>

              </div>
              <div style={{ display: answer[articleNo]?.show ? 'block' : 'none' }}>
                <div className="acc_box">
                  <p className="txt" dangerouslySetInnerHTML={{__html: answer[articleNo]?.content}} />
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}  