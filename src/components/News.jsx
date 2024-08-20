import moment from "moment";
import newsImg from "../image/images.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, selectAllNews } from "../services/cryptoSlice";
import { useLocation } from "react-router-dom";

const News = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  const cryptoNews = useSelector(selectAllNews);

  if (!cryptoNews) return "Loading...";

  //
  return (
    <>
      <div className="flex flex-wrap gap-4 pb-4 mt-3">
        {location.pathname.includes("news")
          ? cryptoNews?.map((news, i) => (
              <div
                key={i}
                className=" bg-white rounded p-3 grow"
                style={{ flexBasis: "370px" }}
              >
                <div className="flex items-start justify-between">
                  <h3 className=" font-bold">
                    {news?.article_title.length > 30
                      ? `${news?.article_title.substring(0, 30)}...`
                      : news?.article_title}
                  </h3>
                  <img
                    src={news?.article_photo_url || newsImg}
                    alt=""
                    className="w-32 h-16 rounded-lg"
                  />
                </div>
                <p className="indent-2 text-gray-500 leading-6">
                  {news.article_url && (
                    <a
                      href={news.article_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500"
                    >
                      Link to the full article
                    </a>
                  )}
                </p>
                <div className="flex items-center p-3">
                  <img
                    src={news?.article_photo_url || newsImg}
                    alt=""
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="ps-5">{news?.source}</span>
                  <span className="ms-auto pe-4">
                    {moment(news?.post_time_utc).startOf("ss").fromNow()}
                  </span>
                </div>
              </div>
            ))
          : cryptoNews?.slice(0, 8).map((news, i) => (
              <div
                key={i}
                className=" bg-white rounded p-3 grow"
                style={{ flexBasis: "370px" }}
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold">
                    {news?.article_title.length > 30
                      ? `${news?.article_title.substring(0, 30)}...`
                      : news?.article_title}
                  </h3>
                  <img
                    src={news?.article_photo_url || newsImg}
                    alt=""
                    className="w-32 h-16 rounded-lg"
                  />
                </div>
                <p className="indent-2 text-gray-500 leading-6">
                  {news.article_url && (
                    <a
                      href={news.article_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500"
                    >
                      Link to the full article
                    </a>
                  )}
                </p>
                <div className="flex items-center p-3 ">
                  <img
                    src={news?.article_photo_url || newsImg}
                    alt=""
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="px-5 text-sm">{news?.source}</span>
                  <span className="ms-auto pe-4 text-sm">
                    {moment(news?.post_time_utc).startOf("ss").fromNow()}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default News;
