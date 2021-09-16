export default function Articles({ articles }) {
  const middle = Math.ceil(articles?.length / 2);
  return (
    <div className="list_cont">
      <ul>
        {
          articles.slice(0, middle).map((title, index) => {
            const articleNo = index + 1;
            return (
              <li key={articleNo + title}>
                <a href={ `#article${ articleNo < 10 ? `0${articleNo}` : articleNo }` }>{ `제${articleNo}조 ${title}` }</a>
              </li>
            )
          })
        }
      </ul>
      <ul>
        {
          articles.slice(middle, articles.length).map((title, index) => {
            const articleNo = index + middle + 1;
            return (
              <li key={articleNo + title}>
                <a href={ `#article${ articleNo < 10 ? `0${articleNo}` : articleNo }` }>{ `제${articleNo}조 ${title}` }</a>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}