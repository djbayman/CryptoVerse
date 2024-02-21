import moment from "moment";
import newsImg from "../image/images.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, selectAllNews } from "../services/cryptoSlice";

const News = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  const cryptoNews = useSelector(selectAllNews);

  if (!cryptoNews) return "Loadin...";
  //
  return (
    <>
      <div className="flex flex-wrap gap-4 pb-4">
        {cryptoNews?.map((news, i) => (
          <div
            key={i}
            className=" bg-white rounded p-3 grow"
            style={{ flexBasis: "370px" }}
          >
            <div className="flex items-center">
              <h3 className="text-lg font-bold">
                {news.Title.length > 30
                  ? `${news.Title.substring(0, 30)}...`
                  : news.Title}
              </h3>
              <img src={news?.Image || newsImg} alt="" className="w-32 h-32" />
            </div>
            <p className="indent-2 text-gray-500 leading-6">
              {news.Summary.length > 100
                ? `${news.Summary.substring(0, 100)}...`
                : news.Summary}
            </p>
            <div className="flex items-center p-3">
              <img src={news?.Image || newsImg} alt="" className="w-9 h-9" />
              <span className="ps-5">{news.Source}</span>
              <span className="ms-auto pe-4">
                {moment(news.PublishedOn).startOf("ss").fromNow()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;
