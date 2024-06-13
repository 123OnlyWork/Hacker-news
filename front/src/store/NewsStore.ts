import { makeAutoObservable } from "mobx";
import axios from "axios";

interface NewsItem {
  id: number;
  title: string;
  by: string;
  time: number;
  score: number;

}

class NewsStore {
  news: NewsItem[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchNews();
    setInterval(this.fetchNews, 60000); // Update every minute
  }

  fetchNews = async () => {
    this.isLoading = true;
    try {
      const response = await axios.get(
        'https://hacker-news.firebaseio.com/v0/newstories.json'
      );
      const newsIds = response.data.slice(0, 100);
      const newsPromises = newsIds.map(async (id: number) => {
        const newsItem = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return newsItem.data;
      });
      this.news = await Promise.all(newsPromises);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      this.isLoading = false;
    }
  };
}

const newsStore = new NewsStore();
export default newsStore;
